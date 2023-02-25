"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursiveDirectoryWalk = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var recursiveDirectoryWalk = function (directory, callback) {
    var files = fs_1.default.readdirSync(directory);
    files.forEach(function (file) {
        var dir = path_1.default.join(directory, file);
        var stat = fs_1.default.lstatSync(dir);
        if (stat.isDirectory()) {
            return (0, exports.recursiveDirectoryWalk)(dir, callback);
        }
        callback(dir);
    });
};
exports.recursiveDirectoryWalk = recursiveDirectoryWalk;
