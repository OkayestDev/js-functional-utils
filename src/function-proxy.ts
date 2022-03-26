import { curry, curryObj } from './curry';
import { TAnyFunction } from './types/any-function.type';

export const PARAMS = 'PARAMS';
export const RESPONSE = 'RESPONSE';

interface IFuncConfig {
    logger?: (...args: any[]) => any;
    isCurry?: boolean;
    isObjectCurry?: boolean;
}

const GLOBAL_CONFIG: IFuncConfig = {
    logger: console.log,
};

export const setGlobalConfig = (config: IFuncConfig) => {
    Object.assign(GLOBAL_CONFIG, config);
};

const isLog = (): boolean => process.env.FUNC_IS_LOG === 'true';

export const setIsLog = (isLog: boolean) => {
    process.env.FUNC_IS_LOG = String(isLog);
};

const handleLog = (config?: IFuncConfig) => (prefix: string, logItem: any) => {
    if (isLog()) {
        Promise.resolve(logItem).then((resolvedLogItem) => {
            config?.logger?.(prefix, resolvedLogItem);
        });
    }
};

const applyConfigModifications = <T extends TAnyFunction>(fn: T, config?: IFuncConfig): T => {
    if (config?.isCurry) {
        return curry(fn) as T;
    }

    if (config?.isObjectCurry) {
        return curryObj(fn) as T;
    }

    return fn;
};

const funcProxyHandler = (config?: IFuncConfig, additionalLogParams: any[] = []) => ({
    apply<T extends Function>(targetFn: T, _, args: any[]) {
        const logger = handleLog(config);

        const handler = (response) => {
            if (typeof response === 'function') {
                return func(response, config, [...additionalLogParams, ...args]);
            }

            if (response instanceof Promise) {
                return Promise.resolve(response).then(handler);
            }

            logger(PARAMS, [...additionalLogParams, ...args]);
            logger(RESPONSE, response);
            return response;
        };

        const response = targetFn(...args);
        return handler(response);
    },
});

const func = <T extends TAnyFunction>(
    fn: T,
    config?: IFuncConfig,
    additionalLogParams: any[] = []
) => {
    const modifiedFn = applyConfigModifications(fn, config);
    return new Proxy<T>(modifiedFn, funcProxyHandler(config, additionalLogParams));
};

export default func;
