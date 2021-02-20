# Array deduplication proposal

ECMAScript proposal for Deduplicating method of Array.

![Proposal Stage-1](https://img.shields.io/badge/Proposal-Stage--1-red)

[![NPM](https://nodei.co/npm/array-unique-proposal.png?downloads=true&downloadRank=true&stars=true)][1]

## Motivation

**Deduplication** is one of the most common requirements in Data processing, especially in large Web Apps nowadays.

`[...new Set(array)]` in ECMAScript 6 isn't enough for **Non-primitive values**, and now, we may need a `Array.prototype.uniqueBy()`.

## Core features

While `Array.prototype.uniqueBy()` invoked with:

1.  no parameter, it'll work as `[...new Set(array)]`;

2.  one **index-key** parameter (`Number`, `String` or `Symbol`), it'll get values from each array element with the key, and then deduplicates the origin array based on these _values_;

3.  one **function** parameter, it'll call this function for each array element, and then deduplicates the origin array based on these _returned values_.

Notice:

-   the **Returned value** is a new array, no mutation happens in the original array
-   **Empty/nullish items** are treated as nullish values
-   `0` & `-0` are treated as the same
-   All `NaN`s are treated as the same

## Typical cases

```JavaScript
[1, 2, 3, 3, 2, 1].uniqueBy();  // [1, 2, 3]

const data = [
    { id: 1, uid: 10000 },
    { id: 2, uid: 10000 },
    { id: 3, uid: 10001 }
];

data.uniqueBy('uid');
// [
//     { id: 1, uid: 10000 },
//     { id: 3, uid: 10001 }
// ]

data.uniqueBy(({ id, uid }) => `${id}-${uid}`);
// [
//     { id: 1, uid: 10000 },
//     { id: 2, uid: 10000 },
//     { id: 3, uid: 10001 }
// ]
```

## Polyfill

A polyfill is available in the [core-js](https://github.com/zloirock/core-js) library. You can find it in the [ECMAScript proposals section](https://github.com/zloirock/core-js#array-deduplication).

[A simple polyfill from the proposal repo write in TypeScript.](polyfill/index.ts)

## Proposer

-   Author: [@TechQuery](https://github.com/TechQuery)
-   Champion: [@Jack-Works](https://github.com/Jack-Works)

[1]: https://nodei.co/npm/array-unique-proposal/
