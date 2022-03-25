import { curry, curryObj } from './curry';

export const PARAMS = 'PARAMS';
export const RESPONSE = 'RESPONSE`';

const isLog = (): boolean => process.env.FUNC_IS_LOG === 'true';

export const setIsLog = (isLog: boolean) => {
    process.env.FUNC_IS_LOG = String(isLog);
};

const DEFAULT_CONFIG = Object.freeze({
    logger: console.log,
});

// @todo global config?
interface IFuncConfig {
    logger: (...args: any[]) => any;
    isCurry?: boolean;
    isObjectCurry?: boolean;
}

const handleLog = (config: IFuncConfig) => (prefix: string, logItem: any) => {
    if (isLog()) {
        Promise.resolve(logItem).then((resolvedLogItem) => {
            config.logger(prefix, resolvedLogItem);
        });
    }
};

const funcProxyHandler = (config: IFuncConfig) => ({
    apply(targetFn: Function, _, args: any[]) {
        const logger = handleLog(config);
        logger(PARAMS, args);
        const response = targetFn(...args);
        logger(RESPONSE, response);
        return response;
    },
});

const func = (fn: Function, config: IFuncConfig = DEFAULT_CONFIG) => {
    return new Proxy(fn, funcProxyHandler(config));
};

export default func;
