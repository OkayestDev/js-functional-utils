import { curry } from '../src/curry';

describe('curry', () => {
    test('curries function', () => {
        const add = curry((x, y) => x + y);
        expect(add(1)(2)).toBe(3);
    });
});
