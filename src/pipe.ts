export const pipe =
    (...fns) =>
    (...args) =>
        fns.reduce((acc, fn) => [fn(...acc)], args)[0];
