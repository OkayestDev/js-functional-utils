import { curry } from './curry';
import { AnyFunction, Curry } from './types/utility-types.type';

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

const applyConfigModifications = <F extends AnyFunction>(
    fn: F,
    config?: IFuncConfig
): F | Curry => {
    if (config?.isCurry) {
        return curry(fn) as Curry;
    }
    return fn;
};

const mergeGlobalAndPassedConfig = (passedConfig?: IFuncConfig) => ({
    ...FUNCTION_PROXY_GLOBAL_CONFIG,
    ...passedConfig,
});

const handleFunctionProxy = <T extends AnyFunction>(
    modifiedFn: T,
    originalFunctionName: string,
    config?: IFuncConfig,
    additionalLogParams: any[] = []
) => {
    const funcProxyHandler = {
        apply<T extends AnyFunction>(targetFn: T, _, args: any[]) {
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

type FunctionProxyReturnType<T extends AnyFunction> = (...args: any[]) => ReturnType<T> | Curry;

export const functionProxy = <T extends AnyFunction>(
    fn: T,
    config?: IFuncConfig
): FunctionProxyReturnType<T> => {
    const allConfig = mergeGlobalAndPassedConfig(config);
    const modifiedFn = applyConfigModifications(fn, allConfig);
    return handleFunctionProxy(modifiedFn, fn.name, allConfig);
};

export default functionProxy;
