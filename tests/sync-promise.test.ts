import { syncPromise } from '../src/sync-promise';

describe('syncPromise', () => {
    const promiseFunction = async () =>
        new Promise((resolve) =>
            setTimeout(() => {
                return resolve('howdy');
            }, 500)
        );

    it('de asyncs promises', () => {
        const result = syncPromise(promiseFunction());
        expect(result).toBe('howdy');
    });
});
