export const toResult = <A extends any[], T, G = any>(callback: (...args: A) => T) => {
    return (...args: A) => {
        const result = new Result<T, G>();
        try {
            const callbackResult = callback(...args);
            return result.ok(callbackResult);
        } catch (error) {
            return result.err(error as G);
        }
    };
};

export const asyncToResult = <A extends any[], T, G = any>(
    callback: (...args: A) => Promise<T>
) => {
    return async (...args: A) => {
        const result = new Result<T, G>();
        return callback(...args)
            .then((val) => result.ok(val))
            .catch((error) => result.err(error));
    };
};

interface IResult<Ok, Err> {
    okVal: undefined | Ok;
    errVal: undefined | Err;

    errored: boolean;
    okayed: boolean;

    ok: (val: Ok) => IResult<Ok, Err>;

    err: (val: Err) => IResult<Ok, Err>;

    isOk: () => boolean;
    isErr: () => boolean;

    unwrap: () => Ok | Err;
}

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

export const fromResult = <T, G>(val: Result<T, G> | T | G) =>
    val instanceof Result ? val.unwrap() : val;
