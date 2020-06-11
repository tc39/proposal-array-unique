# Array deduplication proposal

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

## Technical details

-   [Function signature](polyfill/index.ts#L6)

-   [Typical cases](polyfill/index.spec.ts)

## Proposer

[@TechQuery](https://github.com/TechQuery)

[1]: https://nodei.co/npm/array-unique-proposal/
