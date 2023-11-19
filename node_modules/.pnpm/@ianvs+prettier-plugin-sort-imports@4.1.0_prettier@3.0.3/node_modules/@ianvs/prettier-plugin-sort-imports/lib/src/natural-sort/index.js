"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.naturalSort = void 0;
function naturalSort(a, b) {
    const left = typeof a === 'string' ? a : String(a);
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#syntax
    const sortOptions = {
        sensitivity: 'base',
        numeric: true,
        caseFirst: 'lower',
    };
    return left.localeCompare(b, 'en', sortOptions);
}
exports.naturalSort = naturalSort;
