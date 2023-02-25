"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberWithCommas = void 0;
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
    return "".concat(parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','), ".").concat(parts[1].substring(0, 2));
};
exports.numberWithCommas = numberWithCommas;
