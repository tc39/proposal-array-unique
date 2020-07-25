# Array deduplication proposal

Stage: 1

ECMAScript proposal for Deduplicating method of Array.

[![NPM](https://nodei.co/npm/array-unique-proposal.png?downloads=true&downloadRank=true&stars=true)][1]

## Motivation

**Deduplication** is one of the most common requirements in Data processing, especially in large Web Apps nowadays.

`[...new Set(array)]` in ECMAScript 6 isn't enough for **Non-primitive values**, and now, we may need a `Array.prototype.unique()`.

## Core features

While `Array.prototype.unique()` invoked with:

1.  no parameter, it'll work as `[...new Set(array)]`;

2.  one **index-key** parameter (`Number`, `String` or `Symbol`), it'll get values from each array element with the key, and then deduplicates the origin array based on these _values_;

3.  one **function** parameter, it'll call this function for each array element, and then deduplicates the origin array based on these _returned values_.

Notice:

-   the **Returned value** is a new array, no mutation happens in the original array
-   **Empty/nullish items** are treated as nullish values

## Typical cases

```JavaScript
[1, 2, 3, 3, 2, 1].unique();  // [1, 2, 3]

const data = [
    { id: 1, uid: 10000 },
    { id: 2, uid: 10000 },
    { id: 3, uid: 10001 }
];

data.unique('uid');
// [
//     { id: 2, uid: 10000 },
//     { id: 3, uid: 10001 }
// ]

data.unique(({ id, uid }) => `${id}-${uid}`);
// [
//     { id: 1, uid: 10000 },
//     { id: 2, uid: 10000 },
//     { id: 3, uid: 10001 }
// ]
```

## Polyfill

[Write in TypeScript](polyfill/index.ts)

## Proposer

-   Author: [@TechQuery](https://github.com/TechQuery)
-   Champion: [@Jack-Works](https://github.com/Jack-Works)

[1]: https://nodei.co/npm/array-unique-proposal/
