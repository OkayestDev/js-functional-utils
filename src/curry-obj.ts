import { areValuesAllNot } from './object';
import { parseFunctionsObjectParams } from './string';
import { AnyFunction } from './types/utility-types.type';

export const curryObj = (fn: AnyFunction) => (args: object) => {
    const baseObj = parseFunctionsObjectParams(fn);
    return areValuesAllNot({ ...baseObj, ...args })
        ? fn(args)
        : (more) => curryObj(fn)({ ...args, ...more });
};
