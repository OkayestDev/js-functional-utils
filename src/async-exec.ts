import { exec, ExecException } from 'child_process';

const GetCommandId = () => Math.floor(Math.random() * Date.now());

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
    const commandId = GetCommandId();
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
