export const grab =
    <T>(key: keyof T) =>
    (obj: T): T[keyof T] =>
        obj[key];
