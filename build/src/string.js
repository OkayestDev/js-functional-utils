"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyString = exports.parseFunctionsObjectParams = exports.isValidEmail = exports.convertToTitleCase = exports.convertToSentenceCase = void 0;
var array_1 = require("./array");
var boolean_1 = require("./boolean");
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
var parseFunctionsObjectParams = function (fn) {
    var str = fn.toString();
    var parts = str.split(',');
    var baseObj = {};
    parts.forEach(function (value) {
        var varName = (0, array_1.peek)(value.split(';')[0].replace(';', '').split('.')).trim();
        baseObj[varName] = undefined;
    });
    return baseObj;
};
exports.parseFunctionsObjectParams = parseFunctionsObjectParams;
var isEmptyString = function (str) { return (0, boolean_1.equalAny)(str, [undefined, null, '']); };
exports.isEmptyString = isEmptyString;
