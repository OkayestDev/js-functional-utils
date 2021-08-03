export const curry =
    (fn: Function) =>
    (...args: any[]): Function | any =>
        args.length >= fn.length ? fn(...args) : (...more: any[]) => curry(fn)(...args, ...more);
