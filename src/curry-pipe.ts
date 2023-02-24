import { CurryPipe } from './types/curry-pipe.type';
import { SubParams } from './types/utility-types.type';

export const $ = Symbol('$');

const updateArgs = (args: any[], more: any[]) => {
    const newArgs = [...args];
    for (let i = 0; i < newArgs.length; i++) {
        if (newArgs[i] === $) {
            newArgs[i] = more.shift();
        }
    }
    return newArgs;
};

export const curryPipe =
    (fn) =>
    (...args) => {
        if (args.length >= fn.length && !args.includes($)) {
            return fn(...args);
        }

        return (...more) => {
            const newArgs = updateArgs(args, more);
            return curryPipe(fn)(...newArgs);
        };
    };
