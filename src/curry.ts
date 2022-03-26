import { areValuesAllNot } from './object';
import { parseFunctionsObjectParams } from './string';
import { TAnyFunction } from './types/any-function.type';

export const curry =
    (fn: TAnyFunction) =>
    (...args) => {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return (...more) => curry(fn)(...args, ...more);
    };

export const curryObj = (fn: TAnyFunction) => (args: object) => {
    const baseObj = parseFunctionsObjectParams(fn);
    return areValuesAllNot({ ...baseObj, ...args })
        ? fn(args)
        : (more) => curryObj(fn)({ ...args, ...more });
};
