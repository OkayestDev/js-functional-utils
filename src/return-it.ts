export const returnIt =
    <T>(value: T): (() => T) =>
    () =>
        value;
