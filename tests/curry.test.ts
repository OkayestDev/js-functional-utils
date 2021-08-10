import { curry, curryObj } from '../src/curry';

describe('curry', () => {
    test('curries function', () => {
        const add = curry((x, y) => x + y);
        expect(add(1)(2)).toBe(3);
    });

    // describe('curryObj', () => {
    //     test('curries obj params', () => {
    //         const add = ({ x, y }) => x + y;
    //         const curriedAdd = curryObj(add);
    //         const result = curriedAdd({ x: 1 });
    //         console.info({ result });
    //         expect(typeof result).toBe('function');
    //     });
    // });
});
