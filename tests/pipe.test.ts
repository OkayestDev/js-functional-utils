import { pipe } from '../src/pipe';

describe('pipe', () => {
    test('calls all functions passing arguments sequentially', () => {
        const add =
            (x) =>
            (y): number =>
                x + y;
        const result = pipe(add(2), add(4))(5);
        expect(result).toBe(11);
    });

    test('typings with a string', () => {
        const addS = (string) => `${string}s`;
        const addX = (string) => `${string}x`;
        const result = pipe(addS, addX)('');
        expect(result).toBe('sx');
    });
});
