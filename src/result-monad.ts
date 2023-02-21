export const toResult = <A extends any[], T, G = any>(callback: (...args: A) => T) => {
    return (...args: A) => {
        const result = Result<T, G>();
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
        const result = Result<T, G>();
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

export const Result = <Ok, Err>(): IResult<Ok, Err> => ({
    okVal: undefined as undefined | Ok,
    okayed: false,

    errVal: undefined as undefined | Err,
    errored: false,

    ok: function (val: Ok) {
        this.okayed = true;
        this.okVal = val;
        return this;
    },

    err: function (val: Err) {
        this.errored = true;
        this.errVal = val;
        return this;
    },

    isOk: function () {
        return this.okayed;
    },

    isErr: function () {
        return this.errored;
    },

    unwrap: function (): Err | Ok {
        if (this.errored) {
            return this.errVal as Err;
        }
        return this.okVal as Ok;
    },
});
