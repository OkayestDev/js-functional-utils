"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnIt = void 0;
var returnIt = function (value) {
    return function () {
        return value;
    };
};
exports.returnIt = returnIt;
