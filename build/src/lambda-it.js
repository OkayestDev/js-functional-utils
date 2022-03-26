"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaIt = void 0;
var curry_1 = require("./curry");
exports.lambdaIt = curry_1.curry(function (fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function () { return fn.apply(void 0, args); };
});
