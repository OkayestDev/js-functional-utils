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
exports.recursiveObjectWalk = void 0;
var types_1 = require("./types");
var getInitValue = function (obj) { return (Array.isArray(obj) ? [] : {}); };
var recursiveObjectWalk = function (onCheck, onFind, obj) {
    var getValue = function (value) {
        if ((0, types_1.isIterable)(value)) {
            return (0, exports.recursiveObjectWalk)(onCheck, onFind, value);
        }
        return value;
    };
    if (onCheck(obj)) {
        onFind(obj);
    }
    return Object.entries(obj).reduce(function (acc, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        if (Array.isArray(acc)) {
            acc[key] = getValue(value);
            return acc;
        }
        return __assign(__assign({}, acc), (_b = {}, _b[key] = getValue(value), _b));
    }, getInitValue(obj));
};
exports.recursiveObjectWalk = recursiveObjectWalk;
