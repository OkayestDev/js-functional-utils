export type Expression<T> = (x: T) => any;

interface IOption<T> {
    run: <G>(expression: (x: T) => G) => IOption<G | undefined>;
    get: () => T;
}

type FnType<X, G> = (value: X) => G;

export class Option<T extends any | undefined> {
    constructor(private value: T) {}

    run<X extends T, G>(fn: FnType<X, G>): Option<G | undefined> {
        if (this.value === undefined) {
            return Option.from(undefined);
        }

        const result = fn(this.value as X);
        return Option.from(result);
    }

    get(): T {
        return this.value;
    }

    static from<T>(value: T) {
        return new Option(value);
    }
}
