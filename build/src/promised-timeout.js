"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisedTimeout = void 0;
var promisedTimeout = function (callback, ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            callback();
            resolve(true);
        }, ms);
    });
};
exports.promisedTimeout = promisedTimeout;
