import { AnyFunction } from './types/utility-types.type';

type AttemptResponse<T> = [T | undefined, Error | undefined];

export function attempt<T extends AnyFunction>(callback: T) {
    return (
        ...args: Parameters<T>
    ): AttemptResponse<ReturnType<T>> | Promise<AttemptResponse<ReturnType<T>>> => {
        try {
            const callbackResponse = callback(...args);

            if (callbackResponse instanceof Promise) {
                return callbackResponse
                    .then((val) => [val, undefined])
                    .catch((error) => [undefined, error]) as Promise<
                    AttemptResponse<ReturnType<T>>
                >;
            }

            return [callbackResponse, undefined];
        } catch (error) {
            return [undefined, error as Error];
        }
    };
}
