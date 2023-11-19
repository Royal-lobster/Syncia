"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adjustCommentsOnSortedNodes = void 0;
const types_1 = require("@babel/types");
const get_comment_registry_1 = require("./get-comment-registry");
/**
 * Takes the original nodes before sorting and the final nodes after sorting.
 * Adjusts the comments on the final nodes so that they match the comments as
 * they were in the original nodes.
 * @param originalDeclarationNodes A list of nodes in the order as they were originally.
 * @param finalNodes The same set of nodes, but in the final sorting order.
 * @returns A copied and adjusted set of nodes, containing comments
 */
const adjustCommentsOnSortedNodes = (originalDeclarationNodes, finalNodes, options) => {
    const outputNodes = finalNodes.filter((n) => n.type === 'ImportDeclaration');
    if (originalDeclarationNodes.length === 0 || outputNodes.length === 0) {
        // Nothing to do, because there are no ImportDeclarations!
        return [...finalNodes];
    }
    const firstImport = originalDeclarationNodes[0];
    const registry = (0, get_comment_registry_1.getCommentRegistryFromImportDeclarations)({
        outputNodes,
        firstImport,
    });
    // Make a copy of the nodes for easier debugging & remove the existing comments to reattach them
    // (removeComments clones the nodes internally, so we don't need to do that ourselves)
    const finalNodesClone = finalNodes.map((n) => {
        const noDirectCommentsNode = (0, types_1.removeComments)(n);
        if (noDirectCommentsNode.type === 'ImportDeclaration') {
            // Remove comments isn't recursive, so we need to clone/modify the specifiers manually
            noDirectCommentsNode.specifiers = (noDirectCommentsNode.specifiers || []).map((s) => (0, types_1.removeComments)(s));
        }
        return noDirectCommentsNode;
    });
    (0, get_comment_registry_1.attachCommentsToOutputNodes)(registry, finalNodesClone, firstImport, options);
    return finalNodesClone;
};
exports.adjustCommentsOnSortedNodes = adjustCommentsOnSortedNodes;
