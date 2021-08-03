import { peek } from '../src/array';

describe('array', () => {
    describe('peek', () => {
        test('returns last element of array', () => {
            const array = [1, 2, 3];
            expect(peek(array)).toBe(3);
        });
    });
});
