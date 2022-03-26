import { curry } from './curry';
import { TAnyFunction } from './types/any-function.type';

export const PARAMS = 'PARAMS';
export const RESPONSE = 'RESPONSE';

interface IFuncConfig {
    logger?: (...args: any[]) => any;
    isLog?: boolean;
    isCurry?: boolean;
}

const GLOBAL_CONFIG: IFuncConfig = {
    logger: console.log,
    isLog: false,
    isCurry: false,
};

export const setGlobalConfig = (config: Partial<IFuncConfig>) => {
    Object.assign(GLOBAL_CONFIG, config);
};

const isLog = (config?: IFuncConfig) => Boolean(config?.isLog);

const handleLog = (config?: IFuncConfig) => (prefix: string, logItem: any) => {
    if (isLog(config)) {
        Promise.resolve(logItem).then((resolvedLogItem) => {
            config?.logger?.(prefix, resolvedLogItem);
        });
    }
};

const applyConfigModifications = <T extends TAnyFunction>(fn: T, config?: IFuncConfig): T => {
    if (config?.isCurry) {
        return curry(fn) as T;
    }
    return fn;
};

const funcProxyHandler = (config?: IFuncConfig, additionalLogParams: any[] = []) => ({
    apply<T extends Function>(targetFn: T, _, args: any[]) {
        const logger = handleLog(config);

        const handler = (response) => {
            if (typeof response === 'function') {
                return handleFunctionProxy(response, config, [...additionalLogParams, ...args]);
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

const mergeGlobalAndPassedConfig = (passedConfig?: IFuncConfig) => ({
    ...GLOBAL_CONFIG,
    ...passedConfig,
});

const handleFunctionProxy = <T extends TAnyFunction>(
    modifiedFn: T,
    config?: IFuncConfig,
    additionalLogParams: any[] = []
) => {
    return new Proxy<T>(modifiedFn, funcProxyHandler(config, additionalLogParams));
};

export const functionProxy = <T extends TAnyFunction>(fn: T, config?: IFuncConfig) => {
    const allConfig = mergeGlobalAndPassedConfig(config);
    const modifiedFn = applyConfigModifications(fn, allConfig);
    return handleFunctionProxy(modifiedFn, allConfig);
};

export default functionProxy;
