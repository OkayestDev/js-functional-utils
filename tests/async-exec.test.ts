import { asyncExec } from '../src/async-exec';

describe('asyncExec', () => {
    it('returns string cli response', async () => {
        const response = await asyncExec('echo hello');
        expect(typeof response).toBe('string');
        expect(response).toBe('hello');
    });

    it('rejects unknown command', async () => {
        const response = await asyncExec('hooblahh').catch((error) => error);
        expect(response.message.includes('Command failed')).toBeTruthy();
    });
});
