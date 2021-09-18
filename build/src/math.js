"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPercentageChange = exports.isNumberBetween = exports.areNumbersWithinPercentage = exports.computeAverage = void 0;
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
var DEFAULT_PERCENTAGE_CHECK = 0.01;
var areNumbersWithinPercentage = function (numberOne, numberTwo, percentage) {
    if (percentage === void 0) { percentage = DEFAULT_PERCENTAGE_CHECK; }
    return Math.abs(numberOne - numberTwo) / numberTwo <= percentage;
};
exports.areNumbersWithinPercentage = areNumbersWithinPercentage;
var isNumberBetween = function (between1, between2, check) {
    var min = Math.min(between1, between2);
    var max = Math.max(between1, between2);
    return min <= check && check <= max;
};
exports.isNumberBetween = isNumberBetween;
var getPercentageChange = function (numerator, denominator) {
    return ((numerator - denominator) / denominator) * 100;
};
exports.getPercentageChange = getPercentageChange;
