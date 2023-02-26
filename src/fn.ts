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

export const fn = <G, T extends (...args: any[]) => G>(fnVar: T) => {
    const modifiedFn = curryPipe(toResult(fnVar));
    return handleFnProxy(modifiedFn, fn.name) as typeof modifiedFn;
};
