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
exports.curryPipe = exports._ = void 0;
exports._ = '_';
var updateArgs = function (args, more, curryArg) {
    var newArgs = __spreadArray([], args, true);
    for (var i = 0; i < more.length; i++) {
        var arg = more[i];
        for (var j = 0; j < newArgs.length; j++) {
            if (newArgs[j] === curryArg) {
                newArgs[j] = arg;
            }
        }
    }
    return newArgs;
};
var DEFAULT_OPTIONS = {
    curryArg: exports._,
};
var curryPipe = function (fn, options) {
    if (options === void 0) { options = DEFAULT_OPTIONS; }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var curryArg = options.curryArg;
        if (args.length >= fn.length && !args.includes(curryArg)) {
            return fn.apply(void 0, args);
        }
        return function () {
            var more = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                more[_i] = arguments[_i];
            }
            var newArgs = updateArgs(args, more, curryArg);
            return (0, exports.curryPipe)(fn).apply(void 0, __spreadArray([], newArgs, true));
        };
    };
};
exports.curryPipe = curryPipe;
