"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greaterThan = exports.lessThan = exports.getPercentageChange = exports.isNumberBetweenInclusive = exports.areNumbersWithinPercentage = exports.updateAverage = exports.computeAverage = void 0;
var computeAverage = function (values, hasMisses, missValue) {
    if (hasMisses === void 0) { hasMisses = true; }
    if (missValue === void 0) { missValue = null; }
    var hits = 0;
    var sum = 0;
    values.forEach(function (value) {
        if (!hasMisses || value !== missValue) {
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
var updateAverage = function (average, newValue, newCount) {
    return (average * (newCount - 1) + newValue) / newCount;
};
exports.updateAverage = updateAverage;
var DEFAULT_PERCENTAGE_CHECK = 0.01;
var areNumbersWithinPercentage = function (numberOne, numberTwo, percentage) {
    if (percentage === void 0) { percentage = DEFAULT_PERCENTAGE_CHECK; }
    return Math.abs(numberOne - numberTwo) / numberTwo <= percentage;
};
exports.areNumbersWithinPercentage = areNumbersWithinPercentage;
var isNumberBetweenInclusive = function (between1, between2, check) {
    var min = Math.min(between1, between2);
    var max = Math.max(between1, between2);
    return min <= check && check <= max;
};
exports.isNumberBetweenInclusive = isNumberBetweenInclusive;
var getPercentageChange = function (numerator, denominator) {
    return ((numerator - denominator) / denominator) * 100;
};
exports.getPercentageChange = getPercentageChange;
var lessThan = function (value, compareTo) { return value < compareTo; };
exports.lessThan = lessThan;
var greaterThan = function (value, compareTo) { return value > compareTo; };
exports.greaterThan = greaterThan;
