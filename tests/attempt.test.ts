import { attempt } from '../src/attempt';

describe('attempt', () => {
    it('works with a function', () => {
        const add = (x: number, y: number) => x + y;
        const attemptAdd = attempt(add);
        expect(typeof attemptAdd).toBe('function');
        const res = attemptAdd(5, 4);
        expect(res).toStrictEqual([9, undefined]);
    });

    it('works with async function', async () => {
        const add = async (x: number, y: number) => x + y;
        const attemptAdd = attempt(add);
        expect(typeof attemptAdd).toBe('function');
        const res = await attemptAdd(5, 5);
        expect(res).toStrictEqual([10, undefined]);
    });

    it('works with function that throws', () => {
        const throwError = () => {
            throw new Error('howdy');
        };
        const attemptError = attempt(throwError);
        expect(typeof attemptError).toBe('function');
        const res = attemptError();
        expect(res).toStrictEqual([undefined, new Error('howdy')]);
    });

    it('works with async function that throws', async () => {
        const throwError = async () => {
            throw new Error('howdy');
        };
        const attemptError = await attempt(throwError);
        expect(typeof attemptError).toBe('function');
        const res = await attemptError();
        expect(res).toStrictEqual([undefined, new Error('howdy')]);
    });
});
