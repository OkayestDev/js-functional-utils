import { curry } from './curry';

export const lambdaIt = curry((fn, ...args) => () => fn(...args));
