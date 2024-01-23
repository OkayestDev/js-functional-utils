import { AnyFunction } from './types/utility-types.type';

type AttemptResponse<T extends AnyFunction, G> = ReturnType<T> extends Promise<any>
    ? Promise<[Awaited<G> | undefined, Error | undefined]>
    : [G | undefined, Error | undefined];

export function attempt<T extends AnyFunction, G extends ReturnType<T>>(callback: T) {
    return (...args: Parameters<T>): AttemptResponse<T, G> => {
        try {
            const callbackResponse = callback(...args);

            if (callbackResponse instanceof Promise) {
                return callbackResponse
                    .then((val) => [val, undefined])
                    .catch((error) => [undefined, error]) as AttemptResponse<T, G>;
            }

            return [callbackResponse, undefined] as AttemptResponse<T, G>;
        } catch (error) {
            return [undefined, error as Error] as AttemptResponse<T, G>;
        }
    };
}
