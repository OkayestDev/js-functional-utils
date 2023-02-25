"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setValue = void 0;
var curry_1 = require("./curry");
exports.setValue = (0, curry_1.curry)(function (obj, key, value) {
    var _a;
    return __assign(__assign({}, obj), (_a = {}, _a[key] = value, _a));
});
