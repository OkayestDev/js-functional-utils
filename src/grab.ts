export const grab =
    <T>(key: keyof T) =>
    (obj: T) =>
        obj[key];
