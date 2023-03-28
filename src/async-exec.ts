import { exec, ExecException, ExecOptions } from 'child_process';

const GetCommandId = () => Math.floor(Math.random() * Date.now());

const log =
    (isLog) =>
    (...args) =>
        isLog && console.log(...args);

const getTerminal = () => {
    if (process.platform.includes('win')) {
        return { shell: 'powershell.exe' };
    }
    return {};
};

export const asyncExec = async (
    command: string,
    isReplaceNewlines = true,
    isLog = true,
    additionalOptions: ExecOptions = {}
): Promise<string | ExecException> => {
    const logger = log(isLog);
    const commandId = GetCommandId();
    logger(commandId, 'async-exec request', command);
    return new Promise((resolve, reject) => {
        exec(command, { ...getTerminal(), ...additionalOptions }, (error, stdout) => {
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
