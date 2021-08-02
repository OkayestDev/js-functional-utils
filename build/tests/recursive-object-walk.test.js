"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recursive_object_walk_1 = require("../src/recursive-object-walk");
describe('recursiveObjectWalk', function () {
    test('returns new, walked object', function () {
        var onCheck = function (item) {
            return item.name && !item.itemId;
        };
        var onFind = function (item) {
            item.itemId = 'here';
        };
        var obj = {
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
        var expected = {
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
        var response = recursive_object_walk_1.recursiveObjectWalk(onCheck, onFind, obj);
        expect(response).toStrictEqual(expected);
    });
});
