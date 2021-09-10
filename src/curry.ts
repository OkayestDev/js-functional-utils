import { areValuesAllNot } from './object';
import { parseFunctionsObjectParams } from './string';

export const curry =
    (fn: Function) =>
    (...args: any[]): Function | any =>
        args.length >= fn.length ? fn(...args) : (...more: any[]) => curry(fn)(...args, ...more);

export const curryObj = (fn: Function) => (args: object) => {
    const baseObj = parseFunctionsObjectParams(fn);
    return areValuesAllNot({ ...baseObj, ...args })
        ? fn(args)
        : (more) => curryObj(fn)({ ...args, ...more });
};
