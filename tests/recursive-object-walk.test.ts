import { recursiveObjectWalk } from '../src/recursive-object-walk';

describe('recursiveObjectWalk', () => {
    test('returns new, walked object', () => {
        const onCheck = (item: any) => {
            return item.name && !item.itemId;
        };

        const onFind = (item: any) => {
            item.itemId = 'here';
        };

        const obj = {
            Pottery: [
                {
                    name: 'test',
                    inputs: [
                        {
                            name: 'test2',
                        },
                    ],
                },
            ],
        };

        const expected = {
            Pottery: [
                {
                    itemId: 'here',
                    name: 'test',
                    inputs: [
                        {
                            itemId: 'here',
                            name: 'test2',
                        },
                    ],
                },
            ],
        };

        const response = recursiveObjectWalk(onCheck, onFind, obj);
        expect(response).toStrictEqual(expected);
    });
});
