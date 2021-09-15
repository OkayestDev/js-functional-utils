import { recursiveDirectoryWalk } from '../src/file';

describe('file', () => {
    test('recursively walks through a directory', () => {
        const testDir = `${__dirname}/../tests`;
        const tests: string[] = [];
        const callback = (file) => tests.push(file);
        recursiveDirectoryWalk(testDir, callback);

        expect(tests.length).toBeTruthy();
        expect(tests.every((value) => value.includes('.test')));
    });
});
