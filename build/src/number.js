"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeAverage = exports.numberWithCommas = void 0;
var numberWithCommas = function (number, isAllowEmpty) {
    if (isAllowEmpty === void 0) { isAllowEmpty = false; }
    if (!number) {
        return isAllowEmpty ? '' : '0';
    }
    var numberString = number.toString();
    var parts = numberString.split('.');
    if (parts.length === 1) {
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "." + parts[1].substring(0, 2);
};
exports.numberWithCommas = numberWithCommas;
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
