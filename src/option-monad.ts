type FnType<X, G> = (value: X) => G;

const returnAnOption = (value: any) => (value instanceof Option ? value : Option.from(value));

const openOption = (value: any) => (value instanceof Option ? value.get() : value);

// @ts-ignore
Promise.prototype.run = function (fn) {
    return this.then(async (result) => {
        const opened = openOption(result);
        const value = await fn(opened);
        return returnAnOption(value);
    });
};

export class Option<T extends any | undefined> {
    constructor(private value: T) {}

    run<X, G>(fn: FnType<X, G>): Option<G | undefined> {
        if (this.value === undefined) {
            return Option.from(undefined);
        }

        if (this.value instanceof Promise) {
            // @ts-ignore
            return this.value.then((res) => {
                return returnAnOption(res).run(fn);
            });
        }

        const opened = openOption(this.value) as X;
        const result = fn(opened);
        return returnAnOption(result);
    }

    get(): T {
        return this.value;
    }

    static from<T>(value: T) {
        return new Option(value);
    }
}
