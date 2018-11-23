# Array deduplication proposal

ECMAScript proposal for Deduplicating method of Array.


## Motivation

Sorting and deduplication are the most common requirements in data processing, especially in large Web Apps nowadays.

We've already gotten `Array.prototype.sort()` in ECMAScript 1, and now, we may need a `Array.prototype.unique()`.


## Technical details

 - [Function signature](polyfill.js#L11)

 - [Typical cases](test.js)


## Proposer

[@TechQuery](https://github.com/TechQuery)
