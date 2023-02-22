import { Curry, SubParams } from './types/utility-types.type';

export const curry: Curry =
    (fn) =>
    (...args) => {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return (...more) => curry(fn)(...([...args, ...more] as unknown as SubParams<typeof fn>));
    };


