"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipe = void 0;
var stepHandler = function (accumulator, fn) {
    var response = fn.apply(void 0, accumulator);
    if (response instanceof Promise) {
        return Promise.resolve(response).then(function (result) { return [result]; });
    }
    return [response];
};
var pipe = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var pipeHandler = function (index) {
            return function (accumulator) {
                if (accumulator === void 0) { accumulator = []; }
                if (index >= fns.length) {
                    return accumulator[0];
                }
                var fn = fns[index];
                var response = stepHandler(accumulator, fn);
                if (response instanceof Promise) {
                    return response.then(pipeHandler(index + 1));
                }
                return pipeHandler(index + 1)(response);
            };
        };
        return pipeHandler(0)(args);
    };
};
exports.pipe = pipe;
