"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIgnoreNextNode = exports.hasIgnoreNextNode = void 0;
/**
 * Detects if `// prettier-ignore` is present in the provided array of comments.
 */
const hasIgnoreNextNode = (comments) => (comments ?? []).some(exports.isIgnoreNextNode);
exports.hasIgnoreNextNode = hasIgnoreNextNode;
const isIgnoreNextNode = (comment) => comment.value.trim() === 'prettier-ignore';
exports.isIgnoreNextNode = isIgnoreNextNode;
