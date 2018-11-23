import './polyfill';


describe('Array.prototype.unique()',  () => {

    it('should return new Array',  () => {

        const origin = [ ];

        origin.unique().should.not.be.equal( origin );
    });

    it(
        'should compare items using "!==" while 0 parameter passed in',
        ()  =>  [1, 2, 3, 3, 2, 1].unique().should.be.eql([1, 2, 3])
    );

    const symbol = Symbol.for('test');

    const origin = [
        {
            id:   1,
            uid:  10000,
        },
        {
            id:        2,
            uid:       10000,
            [symbol]:  'example'
        },
        {
            id:        3,
            uid:       10001,
            [symbol]:  'example'
        }
    ];

    it('should compare items using "!==" by a String or Symbol key',  () => {

        origin.unique('uid').should.be.eql([
            {
                id:   1,
                uid:  10000,
            },
            {
                id:   3,
                uid:  10001,
            }
        ]);

        origin.unique( symbol ).should.be.eql([
            {
                id:   1,
                uid:  10000,
            },
            {
                id:        2,
                uid:       10000,
                [symbol]:  'example'
            }
        ]);
    });

    it(
        'should reserve an item while the Custom callback return `true`',
        ()  =>  origin.unique(
            (A, B) => ((A.uid !== B.uid) || (A[symbol] !== B[symbol]))
        ).should.be.eql(
            origin
        )
    );
});
