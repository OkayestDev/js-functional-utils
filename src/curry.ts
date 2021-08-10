import { areValuesAllNot } from './object';

export const curry =
    (fn: Function) =>
    (...args: any[]): Function | any =>
        args.length >= fn.length ? fn(...args) : (...more: any[]) => curry(fn)(...args, ...more);

// @todo
export const curryObj = function (fn: Function) {
    return (args: object) => {
        const con = fn.constructor;
        const str = fn.toString();

        return areValuesAllNot(args) ? fn(args) : (more) => curry(fn)({ ...args, ...more });
    };
};
