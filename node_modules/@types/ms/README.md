# Installation
> `npm install --save @types/ms`

# Summary
This package contains type definitions for ms (https://github.com/zeit/ms).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/ms.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/ms/index.d.ts)
````ts
/**
 * Short/Long format for `value`.
 *
 * @param {Number} value
 * @param {{long: boolean}} options
 * @return {String}
 */
declare function ms(value: number, options?: { long: boolean }): string;

/**
 * Parse the given `value` and return milliseconds.
 *
 * @param {String} value
 * @return {Number}
 */
declare function ms(value: string): number;

export = ms;

````

### Additional Details
 * Last updated: Wed, 18 Oct 2023 05:47:08 GMT
 * Dependencies: none

# Credits
These definitions were written by [Zhiyuan Wang](https://github.com/danny8002).
