import { isArray } from './types';

export const lambdaIt = (args, fn) => (isArray(args) ? () => fn(...args) : () => fn(args));
