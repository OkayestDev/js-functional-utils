import { SubParams } from './types/utility-types.type';

interface ICurryPipeOptions {
    curryArg?: string | number;
}

export const _ = '_';

const updateArgs = (args: any[], more: any[], curryArg: ICurryPipeOptions['curryArg']) => {
    const newArgs = [...args];
    for (let i = 0; i < more.length; i++) {
        const arg = more[i];
        for (let j = 0; j < newArgs.length; j++) {
            if (newArgs[j] === curryArg) {
                newArgs[j] = arg;
            }
        }
    }
    return newArgs;
};

const DEFAULT_OPTIONS = {
    curryArg: _,
};

export const curryPipe =
    (fn, options = DEFAULT_OPTIONS) =>
    (...args) => {
        const { curryArg } = options;
        if (args.length >= fn.length && !args.includes(curryArg)) {
            return fn(...args);
        }

        return (...more) => {
            const newArgs = updateArgs(args, more, curryArg);
            return curryPipe(fn)(...([...newArgs] as unknown as SubParams<typeof fn>));
        };
    };
