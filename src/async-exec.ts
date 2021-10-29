import { exec, ExecException } from 'child_process';
import { v4 } from 'uuid';

const log =
    (isLog) =>
    (...args) =>
        isLog && console.log(...args);

export const asyncExec = async (
    command: string,
    isReplaceNewlines = true,
    isLog = true
): Promise<string | ExecException> => {
    const logger = log(isLog);
    const commandId = v4();
    logger(commandId, 'async-exec request', command);
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (!error) {
                const response = isReplaceNewlines
                    ? stdout.replace(/\r/g, '').replace(/\n/g, '')
                    : stdout;
                logger(commandId, 'async-exec response', stdout);
                resolve(response);
            } else {
                logger(commandId, 'async-exec error', error);
                reject(error);
            }
        });
    });
};
