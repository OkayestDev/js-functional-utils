import func, { setFunctionProxyGlobalConfig, PARAMS, RESPONSE } from '../src/function-proxy';

describe('fnPrxy', () => {
    describe('logging capability', () => {
        describe('works with sync', () => {
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
                setFunctionProxyGlobalConfig({
                    isLog: true,
                });
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
                    ['', PARAMS, [1, 2]],
                    ['', RESPONSE, 3],
                ]);
            });

            it("doesn't log if isLog is set to false", () => {
                setFunctionProxyGlobalConfig({
                    isLog: false,
                });
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

            it('works with partially applied functions', () => {
                setFunctionProxyGlobalConfig({
                    isLog: true,
                });
                const mockLogger = jest.fn();
                const add =
                    (x) =>
                    (y): number =>
                        x + y;
                const fnProxy = func(add, { logger: mockLogger });
                const partial = fnProxy(3);
                const result = partial(4);
                expect(result).toBe(7);
                expect(mockLogger).toHaveBeenCalledTimes(2);
                expect(mockLogger.mock.calls).toEqual([
                    ['add', PARAMS, [3, 4]],
                    ['add', RESPONSE, 7],
                ]);
            });

            // it('works with curried function', () => {
            //     setFunctionProxyGlobalConfig({
            //         isLog: true,
            //     });
            //     const mockLogger = jest.fn();
            //     const add = (x, y) => {
            //         return x + y;
            //     };
            //     const fnProxy = func(add, { isCurry: true, logger: mockLogger });
            //     const curriedAdd = fnProxy(9);
            //     expect(typeof curriedAdd === 'function').toBe(true);
            //     const addResult = curriedAdd(11);
            //     expect(addResult).toBe(20);
            //     expect(mockLogger).toHaveBeenCalledTimes(2);
            //     expect(mockLogger.mock.calls).toEqual([
            //         ['add', PARAMS, [9, 11]],
            //         ['add', RESPONSE, 20],
            //     ]);
            // });
        });

        it('works with async functions', async () => {
            setFunctionProxyGlobalConfig({
                isLog: true,
            });
            const mockLogger = jest.fn();
            const add = func(async (x, y) => x + y, {
                logger: mockLogger,
            });
            const response = await add(1, 2);
            expect(response).toBe(3);
            expect(mockLogger.mock.calls).toEqual([
                ['', PARAMS, [1, 2]],
                ['', RESPONSE, 3],
            ]);
        });

        it('works with partial async function', async () => {
            setFunctionProxyGlobalConfig({
                isLog: true,
            });
            const mockLogger = jest.fn();
            const add = async (x) => async (y) => x + y;
            const proxyAdd = func(add, { logger: mockLogger });
            const partial = await proxyAdd(10);
            expect(typeof partial).toBe('function');
            const sum = await partial(15);
            expect(sum).toBe(25);
            expect(mockLogger.mock.calls).toEqual([
                ['add', PARAMS, [10, 15]],
                ['add', RESPONSE, 25],
            ]);
        });
    });

    // describe('curry capabilities', () => {
    //     it('curries sync function', () => {
    //         setFunctionProxyGlobalConfig({
    //             isCurry: true,
    //         });
    //         const add = (x: number, y: number): number => x + y;
    //         const proxy = func(add);
    //         const step = proxy(1);
    //         expect(typeof step).toBe('function');
    //         const final = step(2);
    //         expect(final).toBe(3);
    //     });
    // });
});
