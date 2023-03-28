"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.curryPipe = exports.$ = void 0;
exports.$ = Symbol('$');
var updateArgs = function (args, more) {
    for (var i = 0; i < args.length; i++) {
        if (args[i] === exports.$) {
            args[i] = more.shift();
        }
    }
    return __spreadArray(__spreadArray([], args, true), more, true);
};
var curryPipe = function (fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length >= fn.length && !args.includes(exports.$)) {
            return fn.apply(void 0, args);
        }
        return function () {
            var more = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                more[_i] = arguments[_i];
            }
            var newArgs = updateArgs(args, more);
            return (0, exports.curryPipe)(fn).apply(void 0, newArgs);
        };
    };
};
exports.curryPipe = curryPipe;
