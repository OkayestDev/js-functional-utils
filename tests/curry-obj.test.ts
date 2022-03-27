import { curryObj } from '../src/curry-obj';

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
