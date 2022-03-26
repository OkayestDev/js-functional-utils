"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.curryObj = exports.curry = void 0;
var object_1 = require("./object");
var string_1 = require("./string");
var curry = function (fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length >= fn.length) {
            return fn.apply(void 0, args);
        }
        return function () {
            var more = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                more[_i] = arguments[_i];
            }
            return exports.curry(fn).apply(void 0, __spreadArray(__spreadArray([], args), more));
        };
    };
};
exports.curry = curry;
var curryObj = function (fn) { return function (args) {
    var baseObj = string_1.parseFunctionsObjectParams(fn);
    return object_1.areValuesAllNot(__assign(__assign({}, baseObj), args))
        ? fn(args)
        : function (more) { return exports.curryObj(fn)(__assign(__assign({}, args), more)); };
}; };
exports.curryObj = curryObj;
