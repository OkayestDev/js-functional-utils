import * as booleanUtil from '../src/boolean';

describe('boolean', () => {
    describe('andChain', () => {
        test('chains fns & values', () => {
            const result = booleanUtil.andChain(
                (value) => value !== undefined,
                (value) => value > 2,
                true
            )(3);
            expect(result).toBe(true);
        });
    });

    describe('orChain', () => {
        test('chains fns and values', () => {
            const result = booleanUtil.orChain(
                (value) => value === 4,
                (value) => value === 5,
                (value) => value === 3
            )(3);
            expect(result).toBe(true);
        });
    });
});
