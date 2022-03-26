"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIterable = exports.isObject = void 0;
var isArray = Array.isArray;
var isObject = function (obj) {
    return typeof obj === 'object' && obj !== null && !isArray(obj);
};
exports.isObject = isObject;
var isIterable = function (obj) { return isArray(obj) || exports.isObject(obj); };
exports.isIterable = isIterable;
