"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCommentsFromNodes = void 0;
const getAllCommentsFromNodes = (nodes) => nodes.reduce((acc, node) => {
    if (Array.isArray(node.leadingComments) &&
        node.leadingComments.length > 0) {
        acc = [...acc, ...node.leadingComments];
    }
    if (Array.isArray(node.innerComments) &&
        node.innerComments.length > 0) {
        acc = [...acc, ...node.innerComments];
    }
    if (Array.isArray(node.trailingComments) &&
        node.trailingComments.length > 0) {
        acc = [...acc, ...node.trailingComments];
    }
    if (node.type === 'ImportDeclaration') {
        acc = [...acc, ...(0, exports.getAllCommentsFromNodes)(node.specifiers)];
    }
    return acc;
}, []);
exports.getAllCommentsFromNodes = getAllCommentsFromNodes;
