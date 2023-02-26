/**
 * Last entry of tuple `T`
 */
export type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never;

/**
 * First entry of tuple `T`
 */
export type Tail<T extends any[]> = ((...args: T) => any) extends (_: any, ...tail: infer TT) => any
    ? TT
    : [];

/**
 * If tuple `T` has type Tail
 */
export type HasTail<T extends any[]> = T extends [] | [any] ? false : true;

/**
 * Returns last entry of tuple `T`
 */
export type Last<T extends any[]> = {
    0: Last<Tail<T>>;
    1: Head<T>;
}[HasTail<T> extends true ? 0 : 1];

/**
 * Returns length of tuple `T`
 */
export type Length<T extends any[]> = T['length'];

/**
 * Add type `E` to beginning of tuple `T`
 */
export type Prepend<E, T extends any[]> = ((head: E, ...args: T) => any) extends (
    ...args: infer U
) => any
    ? U
    : T;

/**
 * Returns index of an iterator
 */
export type Position<I extends any[]> = Length<I>;

/**
 * +1 to an iterators position
 */
export type Next<I extends any[]> = Prepend<any, I>;

/**
 * -1 to an iterators position
 */
export type Previous<I extends any[]> = Tail<I>;

/**
 * Creates iterator at position Index, starting from another iterators From
 */
export type Iterator<Index extends number = 0, From extends any[] = [], I extends any[] = []> = {
    0: Iterator<Index, Next<From>, Next<I>>;
    1: From;
}[Position<I> extends Index ? 1 : 0];

/**
 * Cast to X only if `X` extends `Y`, else return `Y`
 */
export type SafeCast<X, Y> = X extends Y ? X : Y;

/**
 * Reverse order of tuple `T`, returning tuple `R`
 */
export type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
    0: Reverse<T, Prepend<T[Position<I>], R>, Next<I>>;
    1: R;
}[Position<I> extends Length<T> ? 1 : 0];

/**
 * Merge tuple `T1` with tuple `T2`
 */
type Concat<T> = T extends [infer A, ...infer Rest]
    ? A extends any[]
        ? [...A, ...Concat<Rest>]
        : A
    : T;

/**
 * Adds type `E` to end of tuple `T`
 */
export type Append<E, T extends any[]> = Concat<[T, E]>;

/**
 * Drops `N` entries from tuple `T`
 * Bound to depth of 32
 */
export type CurryDroppedPassedArgs<N extends number, T extends any[], I extends any[] = []> = {
    0: CurryDroppedPassedArgs<N, Tail<T>, Prepend<any, I>>;
    1: T;
}[Length<I> extends N ? 1 : Length<I> extends 32 ? 1 : 0];

/**
 * Matches any function
 */
export type AnyFunction = (...args: any[]) => any;

/**
 * Recursive inner curry type
 */
export type InnerCurry<F extends AnyFunction, Args extends any[]> = <
    More extends CurryDroppedPassedArgs<Length<Args>, SubParams<F>>
>(
    ...more: More
) => Length<Concat<[Args, More]>> extends Length<Parameters<F>>
    ? ReturnType<F>
    : InnerCurry<F, Concat<[Args, More]>>;

/**
 * Sub array of params from `AnyFunction` `F`
 */
export type SubParams<F extends AnyFunction> = Partial<Parameters<F>> extends any[]
    ? Partial<Parameters<F>>
    : any[];

/**
 * Strong typed curry utility function
 */
export type Curry = <F extends AnyFunction>(
    fn: F
) => <Args extends SubParams<F>>(...args: Args) => InnerCurry<F, Args>;

/**
 * Filters array T by type U
 */
export type FilteredTypeArray<Arr extends any[], OmitTypes> = {
    [K in keyof Arr]: Arr[K] extends OmitTypes ? never : Arr[K];
}[number][];

/**
 * Creates a tuple of type T and length N
 */
export type Tuple<T, N extends number> = N extends N
    ? number extends N
        ? T[]
        : _TupleOf<T, N, []>
    : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
    ? R
    : _TupleOf<T, N, [T, ...R]>;
