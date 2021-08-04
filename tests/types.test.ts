import * as types from '../src/types';

describe('types', () => {
    describe('isObject', () => {
        test('returns true when arg is an object', () => {
            const obj = { im: 'an object' };
            const result = types.isObject(obj);
            expect(result).toBe(true);
        });

        test('returns false when passing array', () => {
            const array = [1, 2, 3];
            const result = types.isObject(array);
            expect(result).toBe(false);
        });
    });
});
