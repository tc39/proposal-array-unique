import '.';

describe('Array.prototype.uniqueBy()', () => {
    it('should return new Array', () => {
        const origin = [];

        expect(origin.uniqueBy()).not.toBe(origin);
    });

    it('should compare items using "!==" while 0 parameter passed in', () => {
        expect([1, 2, 3, 3, 2, 1].uniqueBy()).toEqual([1, 2, 3]);
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
        expect(origin.uniqueBy('uid')).toEqual([
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

        expect(origin.uniqueBy(symbol)).toEqual([
            {
                id: 1,
                uid: 10000
            },
            {
                id: 2,
                uid: 10000,
                [symbol]: 'example'
            }
        ]);
    });

    it('should compare items using "!==" by Returned values of a Custom callback', () => {
        expect(origin.uniqueBy(item => `${item.uid}${item[symbol]}`)).toEqual(
            origin
        );
    });

    it('should treat an empty/nullish item as a nullish value', () => {
        expect([1, , 2, undefined, null, 1].uniqueBy()).toEqual([1, , 2, null]);

        expect(
            [{ id: 1 }, , { id: 2 }, undefined, null, { id: 1 }].uniqueBy('id')
        ).toEqual([{ id: 1 }, , { id: 2 }, null]);
    });

    it('should treat 0 & -0 as the same', () => {
        expect([0, -0].uniqueBy()).toEqual([0]);

        expect([{ count: 0 }, { count: -0 }].uniqueBy('count')).toEqual([
            { count: 0 }
        ]);
    });

    it('should treat all NaNs as the same', () => {
        expect([NaN, NaN].uniqueBy()).toEqual([NaN]);

        expect([{ count: NaN }, { count: NaN }].uniqueBy('count')).toEqual([
            { count: NaN }
        ]);
    });
});
