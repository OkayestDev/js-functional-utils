"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifIt = void 0;
var curry_1 = require("./curry");
exports.ifIt = curry_1.curry(function (evaluator, fn, value) {
    var evaluated = typeof evaluator === 'function' ? evaluator(value) : evaluator;
    return Boolean(evaluated) ? fn(value) : value;
});
