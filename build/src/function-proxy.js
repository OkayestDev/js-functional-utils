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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionProxy = exports.setFunctionProxyGlobalConfig = exports.RESPONSE = exports.PARAMS = void 0;
var curry_1 = require("./curry");
exports.PARAMS = 'PARAMS';
exports.RESPONSE = 'RESPONSE';
var FUNCTION_PROXY_GLOBAL_CONFIG = {
    logger: console.log,
    isLog: false,
    isCurry: false,
};
var setFunctionProxyGlobalConfig = function (config) {
    Object.assign(FUNCTION_PROXY_GLOBAL_CONFIG, config);
};
exports.setFunctionProxyGlobalConfig = setFunctionProxyGlobalConfig;
var isLog = function (config) { return Boolean(config === null || config === void 0 ? void 0 : config.isLog); };
var handleLog = function (config) { return function (functionName, prefix, logItem) {
    if (isLog(config)) {
        Promise.resolve(logItem).then(function (resolvedLogItem) {
            var _a;
            (_a = config === null || config === void 0 ? void 0 : config.logger) === null || _a === void 0 ? void 0 : _a.call(config, functionName, prefix, resolvedLogItem);
        });
    }
}; };
var applyConfigModifications = function (fn, config) {
    if (config === null || config === void 0 ? void 0 : config.isCurry) {
        return (0, curry_1.curry)(fn);
    }
    return fn;
};
var mergeGlobalAndPassedConfig = function (passedConfig) { return (__assign(__assign({}, FUNCTION_PROXY_GLOBAL_CONFIG), passedConfig)); };
var handleFunctionProxy = function (modifiedFn, originalFunctionName, config, additionalLogParams) {
    if (additionalLogParams === void 0) { additionalLogParams = []; }
    var funcProxyHandler = {
        apply: function (targetFn, _, args) {
            var logger = handleLog(config);
            var handler = function (response) {
                if (typeof response === 'function') {
                    return handleFunctionProxy(response, originalFunctionName, config, __spreadArray(__spreadArray([], additionalLogParams, true), args, true));
                }
                if (response instanceof Promise) {
                    return Promise.resolve(response).then(handler);
                }
                logger(originalFunctionName, exports.PARAMS, __spreadArray(__spreadArray([], additionalLogParams, true), args, true));
                logger(originalFunctionName, exports.RESPONSE, response);
                return response;
            };
            var response = targetFn.apply(void 0, args);
            return handler(response);
        },
    };
    return new Proxy(modifiedFn, funcProxyHandler);
};
var functionProxy = function (fn, config) {
    var allConfig = mergeGlobalAndPassedConfig(config);
    var modifiedFn = applyConfigModifications(fn, allConfig);
    return handleFunctionProxy(modifiedFn, fn.name, allConfig);
};
exports.functionProxy = functionProxy;
exports.default = exports.functionProxy;
