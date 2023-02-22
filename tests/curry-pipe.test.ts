import { curryPipe, _ } from '../src/curry-pipe';

describe('curryPipe', () => {
    const add = (x: number, y: number, z: number): number => x + y + z;

    it('curries curryPipe', () => {
        const partial = curryPipe(add)(4, _, 5);
        expect(typeof partial).toBe('function');
        const result = partial(10);
        expect(result).toBe(19);
    });
});
