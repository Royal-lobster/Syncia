"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChunkTypeOfNode = void 0;
const constants_1 = require("../constants");
const has_ignore_next_node_1 = require("./has-ignore-next-node");
/**
 * Classifies an import declarations according to its properties, the
 * surrounding comments and possibly the plugin's settings.
 *
 * Nodes are only sorted within the same chunk, but different chunks keep
 * their relative order. This is used, e.g., to keep the order of side-effect
 * imports.
 *
 * The classification is done as follows:
 * - If the node is a side-effect node (i.e. provides no symbols to the module
 * scope), classify the node as `unsortable`.
 * - Otherwise, if the node is preceded by a comment exactly equal (up to
 * leading and trailing spaces) the string `prettier-ignore`, classify the node
 * as `unsortable`.
 * - Otherwise, classify the node as `sortable`.
 * @param node An import declaration node to classify.
 * @returns The type of the chunk into which the node should be put.
 */
const getChunkTypeOfNode = (node) => {
    const hasNoImportedSymbols = node.specifiers.length === 0;
    return (0, has_ignore_next_node_1.hasIgnoreNextNode)(node.leadingComments) || hasNoImportedSymbols
        ? constants_1.chunkTypeUnsortable
        : constants_1.chunkTypeOther;
};
exports.getChunkTypeOfNode = getChunkTypeOfNode;
