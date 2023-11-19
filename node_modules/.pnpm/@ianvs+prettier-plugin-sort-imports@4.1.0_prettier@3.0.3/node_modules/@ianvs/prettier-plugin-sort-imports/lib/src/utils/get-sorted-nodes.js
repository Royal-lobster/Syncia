"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortedNodes = void 0;
const constants_1 = require("../constants");
const adjust_comments_on_sorted_nodes_1 = require("./adjust-comments-on-sorted-nodes");
const explode_type_and_value_specifiers_1 = require("./explode-type-and-value-specifiers");
const get_chunk_type_of_node_1 = require("./get-chunk-type-of-node");
const get_sorted_nodes_by_import_order_1 = require("./get-sorted-nodes-by-import-order");
const merge_nodes_with_matching_flavors_1 = require("./merge-nodes-with-matching-flavors");
/**
 * This function returns the given nodes, sorted in the order as indicated by
 * the importOrder array. The plugin considers these import nodes as local
 * import declarations
 *
 * In addition, this method preserves the relative order of side effect imports
 * and non side effect imports. A side effect import is an ImportDeclaration
 * without any import specifiers. It does this by splitting the import nodes at
 * each side effect node, then sorting only the non side effect import nodes
 * between the side effect nodes according to the given options.
 * @param nodes All import nodes that should be sorted.
 * @param options Options to influence the behavior of the sorting algorithm.
 *
 * @returns A sorted array of the remaining import nodes
 */
const getSortedNodes = (nodes, options) => {
    const { importOrder, importOrderCombineTypeAndValueImports, hasAnyCustomGroupSeparatorsInImportOrder, provideGapAfterTopOfFileComments, } = options;
    // Split nodes at each boundary between a side-effect node and a
    // non-side-effect node, keeping both types of nodes together.
    const splitBySideEffectNodes = nodes.reduce((chunks, node) => {
        const type = (0, get_chunk_type_of_node_1.getChunkTypeOfNode)(node);
        const last = chunks[chunks.length - 1];
        if (last === undefined || last.type !== type) {
            chunks.push({ type, nodes: [node] });
        }
        else {
            last.nodes.push(node);
        }
        return chunks;
    }, []);
    const finalNodes = [];
    // Sort each chunk of side-effect and non-side-effect nodes
    for (const chunk of splitBySideEffectNodes) {
        // do not sort side effect nodes
        if (chunk.type === constants_1.chunkTypeUnsortable) {
            // If users use custom separators, add newlines around the side effect node
            if (hasAnyCustomGroupSeparatorsInImportOrder) {
                // Add newline before chunk if it has no leading comment #ConditionalNewLineAfterSideEffectWithSeparatorsGivenLeadingComment
                if (!chunk.nodes[0].leadingComments?.length) {
                    finalNodes.push(constants_1.newLineNode);
                }
                finalNodes.push(...chunk.nodes, constants_1.newLineNode);
            }
            else {
                finalNodes.push(...chunk.nodes);
            }
        }
        else {
            let nodes = (0, merge_nodes_with_matching_flavors_1.mergeNodesWithMatchingImportFlavors)(chunk.nodes, {
                importOrderCombineTypeAndValueImports,
            });
            // If type ordering is specified explicitly, we need to break apart type and value specifiers
            if (importOrder.some((group) => group.includes(constants_1.TYPES_SPECIAL_WORD))) {
                nodes = (0, explode_type_and_value_specifiers_1.explodeTypeAndValueSpecifiers)(nodes);
            }
            // sort non-side effect nodes
            const sorted = (0, get_sorted_nodes_by_import_order_1.getSortedNodesByImportOrder)(nodes, options);
            finalNodes.push(...sorted);
        }
    }
    if (finalNodes.length > 0) {
        finalNodes.push(constants_1.newLineNode);
    }
    // Adjust the comments on the sorted nodes to match the original comments
    return (0, adjust_comments_on_sorted_nodes_1.adjustCommentsOnSortedNodes)(nodes, finalNodes, {
        provideGapAfterTopOfFileComments,
    });
};
exports.getSortedNodes = getSortedNodes;
