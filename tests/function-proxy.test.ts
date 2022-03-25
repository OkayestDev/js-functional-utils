import func, { setIsLog, PARAMS, RESPONSE } from '../src/function-proxy';
import { promisedTimeout } from '../src/promised-timeout';

describe('fnPrxy', () => {
    describe('logging capability', () => {
        describe('works with non-async', () => {
            const promiseResolve = Promise.resolve;

            beforeAll(() => {
                // @ts-ignore
                Promise.resolve = jest.fn((anything) => ({
                    then: (callback) => callback?.call(null, anything),
                }));
            });

            afterAll(() => {
                Promise.resolve = promiseResolve;
            });

            it('logs params and response if log is set to true', async () => {
                setIsLog(true);
                const mockLogger = jest.fn();
                const add = func(
                    (x, y) => {
                        return x + y;
                    },
                    {
                        logger: mockLogger,
                    }
                );
                const result = add(1, 2);
                expect(result).toBe(3);
                expect(mockLogger).toHaveBeenCalledTimes(2);
                expect(mockLogger.mock.calls).toEqual([
                    [PARAMS, [1, 2]],
                    [RESPONSE, 3],
                ]);
            });

            it("doesn't log if log is set to false", () => {
                setIsLog(false);
                const mockLogger = jest.fn();
                const add = func(
                    (x, y) => {
                        return x + y;
                    },
                    {
                        logger: mockLogger,
                    }
                );
                const result = add(1, 2);
                expect(result).toBe(3);
                expect(mockLogger).toHaveBeenCalledTimes(0);
            });
        });

        it('works with async functions', async () => {
            setIsLog(true);
            const mockLogger = jest.fn();
            const add = func(async (x, y) => x + y, {
                logger: mockLogger,
            });
            const response = await add(1, 2);
            expect(response).toBe(3);
            expect(mockLogger.mock.calls).toEqual([
                [PARAMS, [1, 2]],
                [RESPONSE, 3],
            ]);
        });
    });
});
