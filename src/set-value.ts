import { curry } from './curry';

export const setValue = curry((obj: object, key: string, value: any) => {
    return {
        ...obj,
        [key]: value,
    };
});
