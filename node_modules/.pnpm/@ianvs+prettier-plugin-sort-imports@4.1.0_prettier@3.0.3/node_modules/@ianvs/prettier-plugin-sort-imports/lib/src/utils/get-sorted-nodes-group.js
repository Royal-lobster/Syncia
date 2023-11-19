"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortedNodesGroup = void 0;
const natural_sort_1 = require("../natural-sort");
const getSortedNodesGroup = (imports) => {
    return imports.sort((a, b) => (0, natural_sort_1.naturalSort)(a.source.value, b.source.value));
};
exports.getSortedNodesGroup = getSortedNodesGroup;
