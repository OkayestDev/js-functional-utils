"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeAverage = void 0;
var computeAverage = function (values) {
    var hits = 0;
    var sum = 0;
    values.forEach(function (value) {
        if (value !== null) {
            sum += value;
            hits++;
        }
    });
    if (hits === 0) {
        return 0;
    }
    return sum / hits;
};
exports.computeAverage = computeAverage;
