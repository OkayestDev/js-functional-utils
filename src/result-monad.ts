export const toResult = <
    A extends any[],
    T,
    G extends Error,
>(
    callback: (...args: A) => T
) => {
    return (...args: A) => {
        const unwrapped = fromResults(args);
        const result = new Result<T, G>();
        try {
            const callbackResponse = callback(...(unwrapped as A));

            if (callbackResponse instanceof Promise) {
                return callbackResponse
                    .then((val) => result.ok(val))
                    .catch((error) => result.err(error));
            }

            return result.ok(callbackResponse);
        } catch (error) {
            return result.err(error as G);
        }
    };
};

export const fromResults = <T, G>(vals: (Result<T, G> | T | G)[]) => vals.map(fromResult);

export const fromResult = <T, G>(val: Result<T, G> | T | G) =>
    val instanceof Result ? val.unwrap() : val;

export class Result<Ok, Err> {
    private okVal: undefined | Ok;
    private okayed: boolean = false;

    private errVal: undefined | Err;
    private errored: boolean = false;

    public ok(val: Ok) {
        this.okayed = true;
        this.okVal = val;
        return this;
    }

    public err(val: Err) {
        this.errored = true;
        this.errVal = val;
        return this;
    }

    public isOk() {
        return this.okayed;
    }

    public isErr() {
        return this.errored;
    }

    public unwrap(): Err | Ok {
        if (this.errored) {
            return this.errVal as Err;
        }
        return this.okVal as Ok;
    }
}

function asyncFunction<T>(fn: () => T | Promise<T>): T extends Promise<any> ? T : Promise<T> {
    const result = fn();
    if (result instanceof Promise) {
        return result as any;
    }
    return Promise.resolve(result) as any;
}

async function getUser(): Promise<{ name: string; age: number }> {
    return { name: 'John Doe', age: 30 };
}

function notAsync(): { name: string } {
    return { name: 'howdy' };
}

async function main() {
    const user = await asyncFunction(getUser);
    console.log(user.name); // John Doe

    const test = asyncFunction(notAsync);
}
