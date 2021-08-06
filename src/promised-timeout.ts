export const promisedTimeout = (callback, ms): Promise<Boolean> =>
    new Promise((resolve) => {
        setTimeout(() => {
            callback();
            resolve(true);
        }, ms);
    });
