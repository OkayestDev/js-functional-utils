"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyArray = exports.isMinOfObjectArray = exports.isMaxOfObjectArray = exports.getMaxMinOfObjectArray = exports.fromEnd = exports.peek = void 0;
var boolean_1 = require("./boolean");
var peek = function (array) { return array[array.length - 1]; };
exports.peek = peek;
var fromEnd = function (array, fromEndOffset) {
    return array[array.length - fromEndOffset];
};
exports.fromEnd = fromEnd;
var getMaxMinOfObjectArray = function (array, lowKey, highKey) {
    var min = Infinity;
    var max = -Infinity;
    array.forEach(function (value) {
        var _a = value, _b = lowKey, low = _a[_b], _c = highKey, high = _a[_c];
        if (low < min) {
            min = low;
        }
        if (high > max) {
            max = high;
        }
    });
    return {
        max: max,
        min: min,
    };
};
exports.getMaxMinOfObjectArray = getMaxMinOfObjectArray;
var isMaxOfObjectArray = function (array, index, highKey) {
    var _a = array[index], _b = highKey, max = _a[_b];
    for (var i = 0; i < array.length; i++) {
        var _c = array[i], _d = highKey, currentValue = _c[_d];
        if (i !== index && currentValue > max) {
            return false;
        }
    }
    return true;
};
exports.isMaxOfObjectArray = isMaxOfObjectArray;
var isMinOfObjectArray = function (array, index, lowKey) {
    var _a = array[index], _b = lowKey, min = _a[_b];
    for (var i = 0; i < array.length; i++) {
        var _c = array[i], _d = lowKey, currentValue = _c[_d];
        if (i !== index && currentValue < min) {
            return false;
        }
    }
    return true;
};
exports.isMinOfObjectArray = isMinOfObjectArray;
var isEmptyArray = function (array) {
    return (0, boolean_1.equalAny)(array, [undefined, null]) || array.length === 0;
};
exports.isEmptyArray = isEmptyArray;
