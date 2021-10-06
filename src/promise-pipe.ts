import { grab } from './grab';

type FnsType<T> = [...((...params: any[]) => Promise<any>)[], (...params: any[]) => Promise<T>];

export const promisePipe =
    <T>(...fns: FnsType<T>) =>
    (...args): Promise<T> =>
        fns
            .reduce(async (acc, fn) => [await fn(...(await acc))], Promise.resolve(args))
            .then(grab(0));
