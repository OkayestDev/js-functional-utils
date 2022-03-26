import { curry } from './curry';
import { TAnyFunction } from './types/any-function.type';

export const PARAMS = 'PARAMS';
export const RESPONSE = 'RESPONSE';

interface IFuncConfig {
    logger?: (...args: any[]) => any;
    isLog?: boolean;
    isCurry?: boolean;
}

const FUNCTION_PROXY_GLOBAL_CONFIG: IFuncConfig = {
    logger: console.log,
    isLog: false,
    isCurry: false,
};

export const setFunctionProxyGlobalConfig = (config: Partial<IFuncConfig>) => {
    Object.assign(FUNCTION_PROXY_GLOBAL_CONFIG, config);
};

const isLog = (config?: IFuncConfig) => Boolean(config?.isLog);

const handleLog = (config?: IFuncConfig) => (functionName, prefix: string, logItem: any) => {
    if (isLog(config)) {
        Promise.resolve(logItem).then((resolvedLogItem) => {
            config?.logger?.(functionName, prefix, resolvedLogItem);
        });
    }
};

const applyConfigModifications = <T extends TAnyFunction>(fn: T, config?: IFuncConfig): T => {
    if (config?.isCurry) {
        return curry(fn) as T;
    }
    return fn;
};

const mergeGlobalAndPassedConfig = (passedConfig?: IFuncConfig) => ({
    ...FUNCTION_PROXY_GLOBAL_CONFIG,
    ...passedConfig,
});

const handleFunctionProxy = <T extends TAnyFunction>(
    modifiedFn: T,
    originalFunctionName: string,
    config?: IFuncConfig,
    additionalLogParams: any[] = []
) => {
    const funcProxyHandler = {
        apply<T extends Function>(targetFn: T, _, args: any[]) {
            const logger = handleLog(config);
            const handler = (response) => {
                if (typeof response === 'function') {
                    return handleFunctionProxy(response, originalFunctionName, config, [
                        ...additionalLogParams,
                        ...args,
                    ]);
                }

                if (response instanceof Promise) {
                    return Promise.resolve(response).then(handler);
                }

                logger(originalFunctionName, PARAMS, [...additionalLogParams, ...args]);
                logger(originalFunctionName, RESPONSE, response);
                return response;
            };
            const response = targetFn(...args);
            return handler(response);
        },
    };

    return new Proxy<T>(modifiedFn, funcProxyHandler);
};

export const functionProxy = <T extends TAnyFunction>(fn: T, config?: IFuncConfig) => {
    const allConfig = mergeGlobalAndPassedConfig(config);
    const modifiedFn = applyConfigModifications(fn, allConfig);
    return handleFunctionProxy(modifiedFn, fn.name, allConfig);
};

export default functionProxy;
