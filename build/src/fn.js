"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn = exports.$ = void 0;
var curry_pipe_1 = require("./curry-pipe");
var result_monad_1 = require("./result-monad");
var curry_pipe_2 = require("./curry-pipe");
Object.defineProperty(exports, "$", { enumerable: true, get: function () { return curry_pipe_2.$; } });
var handleFnProxy = function (modifiedFn, fnName) {
    var proxy = {
        apply: function (targetFn, _, args) {
            var handler = function (response) {
                if (typeof response === 'function') {
                    return handleFnProxy(response, fnName);
                }
                if (response instanceof Promise) {
                    return Promise.resolve(response).then(handler);
                }
                console.log(fnName, 'PARAMS', args);
                console.log(fnName, 'RESPONSE', response);
                return response;
            };
            var response = targetFn.apply(void 0, args);
            return handler(response);
        },
    };
    return new Proxy(modifiedFn, proxy);
};
var applyWrappers = function (fn) {
    return (0, curry_pipe_1.curryPipe)((0, result_monad_1.toResult)(fn));
};
var fn = function (fn) {
    var modifiedFn = applyWrappers(fn);
    return handleFnProxy(modifiedFn, fn.name);
};
exports.fn = fn;
