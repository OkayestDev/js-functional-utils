import { AnyFunction, FilteredTypeArray, Tuple } from './types/utility-types.type';

export const $ = Symbol('$');

export type CurryPipe<FnReturnType, Args extends any[]> = <
    PassedArgs extends (Partial<Args>[number] | typeof $)[]
>(
    ...args: PassedArgs
) => Exclude<PassedArgs, Args> extends never
    ? FnReturnType
    : CurryPipe<
          FnReturnType,
          Tuple<Args[number], FilteredTypeArray<PassedArgs, typeof $>['length']>
      >;

const updateArgs = (args: any[], more: any[]) => {
    for (let i = 0; i < args.length; i++) {
        if (args[i] === $) {
            args[i] = more.shift();
        }
    }
    return [...args, ...more];
};

export const curryPipe =
    <T extends AnyFunction>(fn: T): CurryPipe<ReturnType<T>, Parameters<T>> =>
    (...args) => {
        if (args.length >= fn.length && !args.includes($)) {
            return fn(...args);
        }

        return (...more) => {
            const newArgs = updateArgs(args, more);
            return curryPipe(fn)(...newArgs);
        };
    };
