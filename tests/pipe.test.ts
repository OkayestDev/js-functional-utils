import { pipe } from '../src/pipe';

describe('pipe', () => {
    test('calls all functions passing arguments sequentially', () => {
        const add = (x) => (y) => x + y;
        const result = pipe(add(2), add(4))(5);
        expect(result).toBe(11);
    });
});
