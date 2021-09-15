import { peek } from './array';
import { equalAny } from './boolean';

export const convertToSentenceCase = (camelCase: string): string => {
    return camelCase
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .trim();
};

export const convertToTitleCase = (camelCase: string): string => {
    return camelCase
        .replace(/([A-Z])/g, ' $1')
        .split(' ')
        .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
        .join(' ')
        .trim();
};

export const isValidEmail = (email: string): boolean => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const parseFunctionsObjectParams = (fn: Function): object => {
    const str = fn.toString();
    const parts = str.split(',');
    const baseObj = {};
    parts.forEach((value) => {
        const varName = peek(value.split(';')[0].replace(';', '').split('.')).trim();
        baseObj[varName] = undefined;
    });
    return baseObj;
};

export const isEmptyString = (str: string) => equalAny(str, [undefined, null, '']);
