export const invokeFns =
    <T>(...fns: ((...params: any[]) => T)[]) =>
    (...params: any[]): T[] =>
        fns.map((fn) => fn(...params));
