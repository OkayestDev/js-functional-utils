type ValueOf<T> = T[keyof T];

export const grab =
    <T>(key: keyof T) =>
    (obj: T): ValueOf<T> =>
        obj[key];
