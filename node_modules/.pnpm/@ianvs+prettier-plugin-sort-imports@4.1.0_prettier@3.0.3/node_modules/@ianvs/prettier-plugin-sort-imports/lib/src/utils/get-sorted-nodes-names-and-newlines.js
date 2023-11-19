"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortedNodesNamesAndNewlines = void 0;
/**
 * Test helper, to verify sort order and newline placement
 */
const getSortedNodesNamesAndNewlines = (imports) => imports
    .filter((i) => i.type === 'ImportDeclaration' ||
    i.type === 'ExpressionStatement')
    .map((i) => {
    if (i.type === 'ImportDeclaration') {
        return i.source.value;
    }
    else {
        return '';
    }
});
exports.getSortedNodesNamesAndNewlines = getSortedNodesNamesAndNewlines;
