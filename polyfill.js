(function () {

    function notEqual(A, B) {  return  A !== B;  }

    /**
     * Return `true` means that A is not equal B
     *
     * @typedef {function(A: *, B: *): Boolean} UniqueComparer
     */

    /**
     * @this {Array} Original array
     *
     * @param {String|Symbol|UniqueComparer} [condition]
     *
     * @return {Array} Deduplicated new array
     */
    function unique(condition) {

        switch (typeof condition) {
            case 'string':
            case 'symbol': {

                var key = condition;

                condition = function (A, B) {  return  A[key] !== B[key];  };
                break;
            }
            case 'function':
                break;
            default:
                condition = notEqual;
        }

        var result = [ ];

        function uniqueWith(item) {

            for (var i = 0, length = result.length >>> 0;  i < length;  i++)
                if (!condition(item, result[i]))  return false;

            return true;
        }

        for (var i = 0, l = this.length >>> 0;  i < l;  i++)
            if ((i === 0)  ||  uniqueWith( this[i] ))
                result.push( this[i] );

        return result;
    }

    if (!(Array.prototype.unique instanceof Function))
        Array.prototype.unique = unique;
})();
