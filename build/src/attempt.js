"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attempt = void 0;
function attempt(callback) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            var callbackResponse = callback.apply(void 0, args);
            if (callbackResponse instanceof Promise) {
                return callbackResponse
                    .then(function (val) { return [val, undefined]; })
                    .catch(function (error) { return [undefined, error]; });
            }
            return [callbackResponse, undefined];
        }
        catch (error) {
            return [undefined, error];
        }
    };
}
exports.attempt = attempt;
