"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
var string_1 = require("./string");
var array_1 = require("./array");
var object_1 = require("./object");
var typeToEmptyCheckMap = {
    String: string_1.isEmptyString,
    Array: array_1.isEmptyArray,
    Object: object_1.isEmptyObject,
};
var isEmpty = function (value) {
    return typeToEmptyCheckMap[value.constructor.name](value);
};
exports.isEmpty = isEmpty;
