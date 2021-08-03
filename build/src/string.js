"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = exports.convertToSentenceCase = void 0;
var convertToSentenceCase = function (camelCase) {
    return camelCase
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .trim();
};
exports.convertToSentenceCase = convertToSentenceCase;
var isValidEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
exports.isValidEmail = isValidEmail;
