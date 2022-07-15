"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
var Option = /** @class */ (function () {
    function Option(value) {
        this.value = value;
    }
    Option.prototype.run = function (fn) {
        if (this.value === undefined) {
            return Option.from(undefined);
        }
        var result = fn(this.value);
        return Option.from(result);
    };
    Option.prototype.get = function () {
        return this.value;
    };
    Option.from = function (value) {
        return new Option(value);
    };
    return Option;
}());
exports.Option = Option;
