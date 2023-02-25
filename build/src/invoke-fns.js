"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeFns = void 0;
var invokeFns = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return fns.map(function (fn) { return fn.apply(void 0, params); });
    };
};
exports.invokeFns = invokeFns;
