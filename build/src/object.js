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
exports.isEmptyObject = exports.conditionallyInstantiate = exports.addToArrayValue = exports.stringArrayToObject = exports.areValuesAllNot = exports.isPopulatedObject = void 0;
var boolean_1 = require("./boolean");
var isPopulatedObject = function (obj) { return Object.keys(obj).length > 0; };
exports.isPopulatedObject = isPopulatedObject;
var areValuesAllNot = function (object, valuesAreNot) {
    if (valuesAreNot === void 0) { valuesAreNot = [undefined]; }
    var values = Object.values(object);
    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        if (valuesAreNot.includes(value)) {
            return false;
        }
    }
    return true;
};
exports.areValuesAllNot = areValuesAllNot;
var stringArrayToObject = function (strings, placeholderValue) {
    if (placeholderValue === void 0) { placeholderValue = undefined; }
    return strings.reduce(function (acc, varName) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[varName] = placeholderValue, _a)));
    }, {});
};
exports.stringArrayToObject = stringArrayToObject;
var addToArrayValue = function (object, key, value) {
    var _a;
    var spread = key in object ? object[key] : [];
    return __assign(__assign({}, object), (_a = {}, _a[key] = __spreadArray(__spreadArray([], spread), [value]), _a));
};
exports.addToArrayValue = addToArrayValue;
var conditionallyInstantiate = function (initialValue) {
    return function (key, object) {
        var _a;
        if (object[key]) {
            return object;
        }
        return __assign(__assign({}, object), (_a = {}, _a[key] = initialValue, _a));
    };
};
exports.conditionallyInstantiate = conditionallyInstantiate;
var isEmptyObject = function (obj) {
    return boolean_1.equalAny(obj, [undefined, null]) || !exports.isPopulatedObject(obj);
};
exports.isEmptyObject = isEmptyObject;
