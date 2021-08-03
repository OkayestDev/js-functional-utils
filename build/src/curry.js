"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry = void 0;
var curry = function (fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.length >= fn.length ? fn.apply(void 0, args) : function () {
            var more = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                more[_i] = arguments[_i];
            }
            return exports.curry(fn).apply(void 0, __spreadArray(__spreadArray([], args), more));
        };
    };
};
exports.curry = curry;
