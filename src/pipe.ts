type FnsType<T> = [...((...params: any[]) => any)[], (...params: any[]) => T];

export const pipe =
    <T>(...fns: FnsType<T>) =>
    (...args): T =>
        fns.reduce((acc, fn) => [fn(...acc)], args)[0];
