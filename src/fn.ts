import { curryPipe } from './curry-pipe';
import { toResult } from './result-monad';
import { AnyFunction } from './types/utility-types.type';
import { $ } from './curry-pipe';

export { $ };

const handleFnProxy = (modifiedFn, fnName) => {
    const proxy = {
        apply<T extends AnyFunction>(targetFn: T, _, args: any[]) {
            const handler = (response) => {
                if (typeof response === 'function') {
                    return handleFnProxy(response, fnName);
                }

                if (response instanceof Promise) {
                    return Promise.resolve(response).then(handler);
                }

                console.log(fnName, 'PARAMS', args);
                console.log(fnName, 'RESPONSE', response);
                return response;
            };
            const response = targetFn(...args);
            return handler(response);
        },
    };

    return new Proxy<any>(modifiedFn, proxy);
};

const applyWrappers = <T extends AnyFunction>(fn: T) => {
    return curryPipe(toResult(fn));
};

export const fn = <T extends AnyFunction>(fn: T) => {
    const modifiedFn = applyWrappers(fn);
    return handleFnProxy(modifiedFn, fn.name);
};
