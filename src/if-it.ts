import { curry } from './curry';

type Evaluator = ((...args) => boolean) | any;

export const ifIt = curry((evaluator, fn: Function, value: any) => {
    const evaluated = typeof evaluator === 'function' ? evaluator(value) : evaluator;
    return Boolean(evaluated) ? fn(value) : value;
});
