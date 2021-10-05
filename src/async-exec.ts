import { exec, ExecException } from 'child_process';

export const asyncExec = async (
    command: string,
    isReplaceNewlines = true
): Promise<string | ExecException> =>
    new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (!error) {
                const response = isReplaceNewlines
                    ? stdout.replace(/\r/g, '').replace(/\n/g, '')
                    : stdout;
                resolve(response);
            } else {
                reject(error);
            }
        });
    });
