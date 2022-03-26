"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIsLog = exports.setGlobalConfig = exports.RESPONSE = exports.PARAMS = void 0;
var curry_1 = require("./curry");
exports.PARAMS = 'PARAMS';
exports.RESPONSE = 'RESPONSE';
var GLOBAL_CONFIG = {
    logger: console.log,
};
var setGlobalConfig = function (config) {
    Object.assign(GLOBAL_CONFIG, config);
};
exports.setGlobalConfig = setGlobalConfig;
var isLog = function () { return process.env.FUNC_IS_LOG === 'true'; };
var setIsLog = function (isLog) {
    process.env.FUNC_IS_LOG = String(isLog);
};
exports.setIsLog = setIsLog;
var handleLog = function (config) { return function (prefix, logItem) {
    if (isLog()) {
        Promise.resolve(logItem).then(function (resolvedLogItem) {
            var _a;
            (_a = config === null || config === void 0 ? void 0 : config.logger) === null || _a === void 0 ? void 0 : _a.call(config, prefix, resolvedLogItem);
        });
    }
}; };
var applyConfigModifications = function (fn, config) {
    if (config === null || config === void 0 ? void 0 : config.isCurry) {
        return curry_1.curry(fn);
    }
    if (config === null || config === void 0 ? void 0 : config.isObjectCurry) {
        return curry_1.curryObj(fn);
    }
    return fn;
};
var funcProxyHandler = function (config, additionalLogParams) {
    if (additionalLogParams === void 0) { additionalLogParams = []; }
    return ({
        apply: function (targetFn, _, args) {
            var logger = handleLog(config);
            var handler = function (response) {
                if (typeof response === 'function') {
                    return func(response, config, __spreadArray(__spreadArray([], additionalLogParams), args));
                }
                if (response instanceof Promise) {
                    return Promise.resolve(response).then(handler);
                }
                logger(exports.PARAMS, __spreadArray(__spreadArray([], additionalLogParams), args));
                logger(exports.RESPONSE, response);
                return response;
            };
            var response = targetFn.apply(void 0, args);
            return handler(response);
        },
    });
};
var func = function (fn, config, additionalLogParams) {
    if (additionalLogParams === void 0) { additionalLogParams = []; }
    var modifiedFn = applyConfigModifications(fn, config);
    return new Proxy(modifiedFn, funcProxyHandler(config, additionalLogParams));
};
exports.default = func;
