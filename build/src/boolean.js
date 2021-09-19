"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equalAny = exports.andChain = exports.orChain = void 0;
var getEvaluated = function (evaluator, value) {
    if (typeof evaluator === 'function') {
        return evaluator(value);
    }
    return evaluator;
};
var orChain = function () {
    var evaluators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        evaluators[_i] = arguments[_i];
    }
    return function (value) {
        for (var i = 0; i < evaluators.length; i++) {
            var result = getEvaluated(evaluators[i], value);
            if (result) {
                return true;
            }
        }
        return false;
    };
};
exports.orChain = orChain;
var andChain = function () {
    var evaluators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        evaluators[_i] = arguments[_i];
    }
    return function (value) {
        var result = true;
        for (var i = 0; i < evaluators.length; i++) {
            result = result && getEvaluated(evaluators[i], value);
            if (!result) {
                return false;
            }
        }
        return result;
    };
};
exports.andChain = andChain;
var equalAny = function (value, checks) {
    return checks.reduce(function (acc, checked) { return acc || value === checked; }, false);
};
exports.equalAny = equalAny;
