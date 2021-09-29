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

    describe('addToArrayValue', () => {
        test('instantiates empty array if undefined', () => {
            const obj = {};
            const result = objectUtil.addToArrayValue(obj, 'test', { add: 'me' });
            expect(result).toStrictEqual({ test: [{ add: 'me' }] });
            expect(obj).toStrictEqual({});
        });

        test('typings', () => {
            interface ValueInterface {
                symbol: string;
                someValue: number;
            }
            interface TestInterface {
                [key: string]: ValueInterface[];
            }

            const obj: TestInterface = {};
            const value = {
                symbol: 'test',
                someValue: 1,
            };

            const result = objectUtil.addToArrayValue(obj, 'someKey', value);
            expect(result).toStrictEqual({
                someKey: [value],
            });
        });
    });

    describe('conditionallyInstantiate', () => {
        test('instantiate value if undefined', () => {
            const obj = {};
            const initial = {
                test: 'value',
            };
            const result = objectUtil.conditionallyInstantiate(initial)('key', obj);
            expect(obj).toStrictEqual({});
            expect(result).toStrictEqual({
                key: {
                    test: 'value',
                },
            });
        });
    });
});
