"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIterable = exports.isObject = exports.isArray = void 0;
exports.isArray = Array.isArray;
var isObject = function (obj) {
    return typeof obj === 'object' && obj !== null && !exports.isArray(obj);
};
exports.isObject = isObject;
var isIterable = function (obj) { return exports.isArray(obj) || exports.isObject(obj); };
exports.isIterable = isIterable;
