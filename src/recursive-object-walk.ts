import { isIterable } from './types';

type onCheckType = (arg: any) => boolean;

const getInitValue = (obj: any) => (Array.isArray(obj) ? [] : {});

export const recursiveObjectWalk = (onCheck: onCheckType, onFind: Function, obj: object) => {
    const getValue = (value: any): any => {
        if (isIterable(value)) {
            return recursiveObjectWalk(onCheck, onFind, value);
        }

        return value;
    };

    if (onCheck(obj)) {
        onFind(obj);
    }

    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (Array.isArray(acc)) {
            acc[key] = getValue(value);
            return acc;
        }

        return {
            ...acc,
            [key]: getValue(value),
        };
    }, getInitValue(obj));
};
