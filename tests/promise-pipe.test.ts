import { promisePipe } from '../src/promise-pipe';

describe('promisePipe', () => {
    test('pipes async functions together', async () => {
        const asyncAdd =
            (x) =>
            async (y): Promise<number> =>
                x + y;

        const result = await promisePipe(asyncAdd(2), asyncAdd(3), asyncAdd(4))(5);
        expect(result).toBe(14);
    });
});
