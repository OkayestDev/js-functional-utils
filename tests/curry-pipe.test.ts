import { curryPipe, $ } from '../src/curry-pipe';
import { pipe } from '../src/pipe';

describe('curryPipe', () => {
    const add = (x: number, y: number, z: number): number => x + y + z;

    it('curries curryPipe', () => {
        const curried = curryPipe(add);
        const partial = curried(4, $, 5);
        expect(typeof partial).toBe('function');
        const result = partial(10);
        expect(result).toBe(19);
    });

    it('works with piping', () => {
        const curriedAdd = curryPipe(add);
        const result = pipe(
            curriedAdd(5, $, $),
            curriedAdd($, 10, 32),
            curriedAdd(5, 5, $)
        )(20, 10);
        expect(result).toBe(87);
    });
});
