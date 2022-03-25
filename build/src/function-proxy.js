"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIsLog = exports.RESPONSE = exports.PARAMS = void 0;
exports.PARAMS = 'PARAMS';
exports.RESPONSE = 'RESPONSE`';
var isLog = function () { return process.env.FUNC_IS_LOG === 'true'; };
var setIsLog = function (isLog) {
    process.env.FUNC_IS_LOG = String(isLog);
};
exports.setIsLog = setIsLog;
var DEFAULT_CONFIG = Object.freeze({
    logger: console.log,
});
var handleLog = function (config) { return function (prefix, logItem) {
    if (isLog()) {
        Promise.resolve(logItem).then(function (resolvedLogItem) {
            config.logger(prefix, resolvedLogItem);
        });
    }
}; };
var funcProxyHandler = function (config) { return ({
    apply: function (targetFn, _, args) {
        var logger = handleLog(config);
        logger(exports.PARAMS, args);
        var response = targetFn.apply(void 0, args);
        logger(exports.RESPONSE, response);
        return response;
    },
}); };
var func = function (fn, config) {
    if (config === void 0) { config = DEFAULT_CONFIG; }
    return new Proxy(fn, funcProxyHandler(config));
};
exports.default = func;
