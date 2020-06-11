import '.';

describe('Array.prototype.unique()', () => {
    it('should return new Array', () => {
        const origin = [];

        expect(origin.unique()).not.toBe(origin);
    });

    it('should compare items using "!==" while 0 parameter passed in', () => {
        expect([1, 2, 3, 3, 2, 1].unique()).toEqual([1, 2, 3]);
    });

    const symbol = Symbol.for('test');

    const origin = [
        {
            id: 1,
            uid: 10000
        },
        {
            id: 2,
            uid: 10000,
            [symbol]: 'example'
        },
        {
            id: 3,
            uid: 10001,
            [symbol]: 'example'
        }
    ];

    it('should compare items using "!==" by a String or Symbol key', () => {
        expect(origin.unique('uid')).toEqual([
            {
                id: 2,
                uid: 10000,
                [symbol]: 'example'
            },
            {
                id: 3,
                uid: 10001,
                [symbol]: 'example'
            }
        ]);

        expect(origin.unique(symbol)).toEqual([
            {
                id: 1,
                uid: 10000
            },
            {
                id: 3,
                uid: 10001,
                [symbol]: 'example'
            }
        ]);
    });

    it('should reserve an item while the Custom callback return `true`', () => {
        expect(origin.unique(item => `${item.uid}${item[symbol]}`)).toEqual(
            origin
        );
    });
});
