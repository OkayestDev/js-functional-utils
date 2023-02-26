import { fn, $ } from '../src/fn';
import { Result } from '../src/result-monad';

describe('fn', () => {
    const add = (x: number, y: number) => x + y;

    it('wraps function with curry and result', async () => {
        const fnAdd = fn(add);
        const curried = fnAdd(5, $);
        expect(typeof curried).toBe('function');
        const result = await curried(10);
        expect(result instanceof Result).toBe(true);
        expect(result.unwrap()).toBe(15);
    });

    it('works with async functions', async () => {
        const asyncAdd = async (x: number, y: number) => x + y;
        const fnAdd = fn(asyncAdd);
        const curried = fnAdd(10, $);
        expect(typeof curried).toBe('function');
        const result = await curried(20);
        expect(result.isOk()).toBe(true);
        expect(result.unwrap()).toBe(30);
    });
});
