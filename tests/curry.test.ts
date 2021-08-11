import { curry, curryObj } from '../src/curry';

describe('curry', () => {
    test('curries function', () => {
        const add = curry((x, y) => x + y);
        expect(add(1)(2)).toBe(3);
    });

    describe('curryObj', () => {
        test('curries obj params', () => {
            const add = ({ x, y, z, w, aa, bb, longObjectKeyName }) =>
                x + y + z + w + aa + bb + longObjectKeyName;
            const curriedAdd = curryObj(add);
            const curriedAdd2 = curriedAdd({ x: 1 });
            expect(typeof curriedAdd2).toBe('function');
            const curriedAdd3 = curriedAdd2({ y: 2, z: 5 });
            expect(typeof curriedAdd3).toBe('function');
            const finalResult = curriedAdd3({ w: 10, aa: 1, bb: 1, longObjectKeyName: 1 });
            expect(finalResult).toBe(21);
        });
    });
});
