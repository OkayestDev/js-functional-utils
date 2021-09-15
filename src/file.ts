import fs from 'fs';
import path from 'path';

type CallbackType = (filepath: string) => any;

export const recursiveDirectoryWalk = (directory: string, callback: CallbackType) => {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
        const dir = path.join(directory, file);
        const stat = fs.lstatSync(dir);

        if (stat.isDirectory()) {
            return recursiveDirectoryWalk(dir, callback);
        }

        callback(dir);
    });
};
