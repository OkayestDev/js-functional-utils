import { recursiveDirectoryWalk } from './src/file';

const exportAllCallback = (file) => {
    const exports = require(file);
    module.exports = {
        ...module.exports,
        ...exports,
    };
};

recursiveDirectoryWalk(`${__dirname}/src`, exportAllCallback);
