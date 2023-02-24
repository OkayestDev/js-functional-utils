import { AnyFunction } from './utility-types.type';

const add = (x: number, y: number) => x + y;

type ParameterJoin<T, F extends AnyFunction> = Iterator<0, Parameters<F>, []>;

type mockFnParameters = [number, string];

type extract = ParameterJoin<'_', typeof add>;

export type InnerCurryPipe<F extends AnyFunction> = <A extends Parameters<F>>(...args: A) => any;

export type CurryPipe = <F extends AnyFunction>(fn: F) => InnerCurryPipe<F>;
