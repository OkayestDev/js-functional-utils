import * as objectUtil from '../src/object';

describe('object', () => {
    describe('isPopulatedObject', () => {
        test('returns false on empty object', () => {
            expect(objectUtil.isPopulatedObject({})).toBe(false);
        });

        test('returns true on non-empty object', () => {
            expect(objectUtil.isPopulatedObject({ some: 'value' })).toBe(true);
        });
    });

    describe('areValuesAllNot', () => {
        test('returns false when a value is not', () => {
            const object = {
                key: undefined,
                otherKey: 'defined',
            };
            const result = objectUtil.areValuesAllNot(object);
            expect(result).toBe(false);
        });

        test('returns true when all values are not', () => {
            const object = {
                one: 'defined',
                two: 'defined',
            };
            const result = objectUtil.areValuesAllNot(object);
            expect(result).toBe(true);
        });
    });
});
