const { isArray } = Array;

export const isObject = (obj: any): boolean =>
    typeof obj === 'object' && obj !== null && !isArray(obj);

export const isIterable = (obj: any): boolean => isArray(obj) || isObject(obj);
