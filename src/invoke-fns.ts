export const invokeFns =
    (...fns: ((...params: any[]) => any)[]) =>
    (...params: any[]): any[] =>
        fns.map((fn) => fn(...params));
