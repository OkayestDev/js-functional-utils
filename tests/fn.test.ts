import { fn, $ } from '../src/fn';
import { Result } from '../src/result-monad';

describe('fn', () => {
    const add = (x: number, y: number) => x + y;

    it('wraps function with curry and result', async () => {
        const fnAdd = fn(add);
        const curried = fnAdd(5, $);
        expect(typeof curried).toBe('function');
        const result = curried(10);
        expect(result instanceof Result).toBe(true);
        expect(result.unwrap()).toBe(15);
    });
});
