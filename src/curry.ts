import { areValuesAllNot } from './object';
import { parseFunctionsObjectParams } from './string';

export const curry =
    <T>(fn: (...args: any) => T) =>
    (...args: any[]): Function | T =>
        args.length >= fn.length ? fn(...args) : (...more: any[]) => curry(fn)(...args, ...more);

export const curryObj = (fn: Function) => (args: object) => {
    const baseObj = parseFunctionsObjectParams(fn);
    return areValuesAllNot({ ...baseObj, ...args })
        ? fn(args)
        : (more) => curryObj(fn)({ ...args, ...more });
};
