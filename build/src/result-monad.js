"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = exports.fromResult = exports.fromResults = exports.toResult = void 0;
var toResult = function (callback) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var unwrapped = (0, exports.fromResults)(args);
        var result = new Result();
        try {
            var callbackResponse = callback.apply(void 0, unwrapped);
            if (callbackResponse instanceof Promise) {
                return callbackResponse
                    .then(function (val) { return result.ok(val); })
                    .catch(function (error) { return result.err(error); });
            }
            return result.ok(callbackResponse);
        }
        catch (error) {
            return result.err(error);
        }
    };
};
exports.toResult = toResult;
var fromResults = function (vals) { return vals.map(exports.fromResult); };
exports.fromResults = fromResults;
var fromResult = function (val) {
    return val instanceof Result ? val.unwrap() : val;
};
exports.fromResult = fromResult;
var Result = /** @class */ (function () {
    function Result() {
        this.okayed = false;
        this.errored = false;
    }
    Result.prototype.ok = function (val) {
        this.okayed = true;
        this.okVal = val;
        return this;
    };
    Result.prototype.err = function (val) {
        this.errored = true;
        this.errVal = val;
        return this;
    };
    Result.prototype.isOk = function () {
        return this.okayed;
    };
    Result.prototype.isErr = function () {
        return this.errored;
    };
    Result.prototype.unwrap = function () {
        if (this.errored) {
            return this.errVal;
        }
        return this.okVal;
    };
    return Result;
}());
exports.Result = Result;
