"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grab = void 0;
var grab = function (key) {
    return function (obj) {
        return obj[key];
    };
};
exports.grab = grab;
