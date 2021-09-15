import { isEmptyString } from './string';
import { isEmptyArray } from './array';
import { isEmptyObject } from './object';

const typeToEmptyCheckMap = {
    String: isEmptyString,
    Array: isEmptyArray,
    Object: isEmptyObject,
};

export const isEmpty = (value: string | Array<any> | object): boolean =>
    typeToEmptyCheckMap[value.constructor.name](value);
