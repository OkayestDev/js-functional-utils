"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = exports.convertToTitleCase = exports.convertToSentenceCase = void 0;
var convertToSentenceCase = function (camelCase) {
    return camelCase
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .trim();
};
exports.convertToSentenceCase = convertToSentenceCase;
var convertToTitleCase = function (camelCase) {
    return camelCase
        .replace(/([A-Z])/g, ' $1')
        .split(' ')
        .map(function (str) { return str.charAt(0).toUpperCase() + str.substring(1); })
        .join(' ')
        .trim();
};
exports.convertToTitleCase = convertToTitleCase;
var isValidEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
exports.isValidEmail = isValidEmail;
