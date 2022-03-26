type FnsType<T> = [...((...params: any[]) => any)[], (...params: any[]) => T];

const stepHandler = (accumulator, fn) => {
    const response = fn(...accumulator);
    if (response instanceof Promise) {
        return Promise.resolve(response).then((result) => [result]);
    }
    return [response];
};

export const pipe =
    <T>(...fns: FnsType<T>) =>
    (...args): T => {
        const pipeHandler =
            (index: number) =>
            (accumulator: any[] = []): T => {
                if (index >= fns.length) {
                    return accumulator[0] as T;
                }
                const fn = fns[index];
                const response = stepHandler(accumulator, fn);
                if (response instanceof Promise) {
                    return response.then(pipeHandler(index + 1)) as unknown as T;
                }
                return pipeHandler(index + 1)(response);
            };

        return pipeHandler(0)(args);
    };
