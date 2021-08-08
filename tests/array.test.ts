import * as arrayUtil from '../src/array';

describe('array', () => {
    describe('peek', () => {
        test('returns last element of array', () => {
            const array = [1, 2, 3];
            expect(arrayUtil.peek(array)).toBe(3);
        });
    });

    describe('isMaxOfObjectArray', () => {
        test('returns true when is max of array', () => {
            const array = [
                {
                    high: 1,
                },
                {
                    high: 3,
                },
                {
                    high: 2,
                },
            ];

            const result = arrayUtil.isMaxOfObjectArray(array, 1, 'high');
            expect(result).toBe(true);
        });
    });

    describe('isMinOfObjectArray', () => {
        test('returns true when is min of array', () => {
            const array = [
                {
                    low: -8,
                },
                {
                    low: 10,
                },
                {
                    low: 4,
                },
            ];
            const result = arrayUtil.isMinOfObjectArray(array, 0, 'low');
            expect(result).toBe(true);
        });
    });
});
