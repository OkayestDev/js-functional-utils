"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipe = void 0;
var pipe = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return fns.reduce(function (acc, fn) { return [fn.apply(void 0, acc)]; }, args)[0];
    };
};
exports.pipe = pipe;
