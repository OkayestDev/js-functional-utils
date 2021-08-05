"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxMinOfObjectArray = exports.peek = void 0;
var peek = function (array) { return array[array.length - 1]; };
exports.peek = peek;
var getMaxMinOfObjectArray = function (array, lowKey, highKey) {
    var min = Infinity;
    var max = -1;
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
