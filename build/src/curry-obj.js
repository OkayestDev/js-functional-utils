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
Object.defineProperty(exports, "__esModule", { value: true });
exports.curryObj = void 0;
var object_1 = require("./object");
var string_1 = require("./string");
var curryObj = function (fn) { return function (args) {
    var baseObj = (0, string_1.parseFunctionsObjectParams)(fn);
    return (0, object_1.areValuesAllNot)(__assign(__assign({}, baseObj), args))
        ? fn(args)
        : function (more) { return (0, exports.curryObj)(fn)(__assign(__assign({}, args), more)); };
}; };
exports.curryObj = curryObj;
