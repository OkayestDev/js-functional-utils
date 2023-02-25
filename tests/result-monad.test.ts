import { asyncToResult, Result, toResult } from '../src/result-monad';
import { curryPipe, $ } from '../src/curry-pipe';
import { pipe } from '../src/pipe';

describe('result-monad', () => {
    describe('toResult', () => {
        it('wraps function to result', () => {
            const add = (x: number, y: number) => x + y;

            const toResultFn = toResult(add);
            const result = toResultFn(5, 10);

            expect(result.isOk()).toBe(true);
            expect(result.unwrap()).toBe(15);
        });

        it('wraps function that throws', () => {
            const iThrow = () => {
                throw new Error('testing');
            };

            const toResultFn = toResult(iThrow);
            const result = toResultFn();

            expect(result.isErr()).toBe(true);
            expect(result.unwrap()).toStrictEqual(new Error('testing'));
        });
    });

    describe('asyncToResult', () => {
        it('wraps promise', async () => {
            const asyncAdd = async (x: number, y: number) => x + y;
            const result = await asyncToResult(asyncAdd)(10, 12);
            expect(result.isOk()).toBe(true);
            expect(result.unwrap()).toBe(22);
        });

        it('wraps rejected promise', async () => {
            const asyncIThrow = async () => {
                throw new Error('testing');
            };
            const result = await asyncToResult(asyncIThrow)();
            expect(result.isErr()).toBe(true);
            expect(result.unwrap()).toStrictEqual(new Error('testing'));
        });
    });

    it('works with piping and currying', () => {
        const add = curryPipe(toResult((x: number, y: number) => x + y));
        const result = pipe(add($, $), add($, 10), add($, 8))(5, 5) as Result<number, Error>;
        expect(result.isOk()).toBe(true);
        expect(result.unwrap()).toStrictEqual(28);
    });
});
