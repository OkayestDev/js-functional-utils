"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaIt = void 0;
var types_1 = require("./types");
var lambdaIt = function (args, fn) { return (types_1.isArray(args) ? function () { return fn.apply(void 0, args); } : function () { return fn(args); }); };
exports.lambdaIt = lambdaIt;
