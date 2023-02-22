import { curry } from '../src/curry';

describe('curry', () => {
    const add = (x: number, y: number, z: number): number => x + y + z;

    test('curries function', () => {
        const curriedAdd = curry(add);
        const partial = curriedAdd(1);
        const result = partial(3, 5);
        expect(typeof partial).toBe('function');
        expect(result).toBe(9);
    });

    test('curries function with differing params', () => {
        const addNumberAndString = (x: number, y: string) => {
            return x + y;
        };
        const curried = curry(addNumberAndString);
        const firstStep = curried(3);
        const secondStep = firstStep('4');
        expect(secondStep).toBe('34');
    });
});
