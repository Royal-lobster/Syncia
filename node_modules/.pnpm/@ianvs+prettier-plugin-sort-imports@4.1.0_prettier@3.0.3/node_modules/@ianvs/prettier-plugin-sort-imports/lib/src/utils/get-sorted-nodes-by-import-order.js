"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortedNodesByImportOrder = void 0;
const constants_1 = require("../constants");
const get_import_nodes_matched_group_1 = require("./get-import-nodes-matched-group");
const get_sorted_import_specifiers_1 = require("./get-sorted-import-specifiers");
const get_sorted_nodes_group_1 = require("./get-sorted-nodes-group");
const normalize_plugin_options_1 = require("./normalize-plugin-options");
/**
 * This function returns the given nodes, sorted in the order as indicated by
 * the importOrder array from the given options.
 * The plugin considers these import nodes as local import declarations.
 * @param originalNodes A subset (of all import nodes) that should be sorted.
 * @param options Options to influence the behavior of the sorting algorithm.
 */
const getSortedNodesByImportOrder = (originalNodes, { importOrder }) => {
    if (process.env.NODE_ENV === 'test' &&
        JSON.stringify(importOrder) !==
            JSON.stringify(normalize_plugin_options_1.testingOnly.normalizeImportOrderOption(importOrder))) {
        throw new Error('API Misuse: getSortedNodesByImportOrder::importOrder option already should be normalized.');
    }
    const finalNodes = [];
    const importOrderGroups = importOrder.reduce((groups, regexp) => 
    // Don't create a new group for explicit import separators
    (0, normalize_plugin_options_1.isCustomGroupSeparator)(regexp)
        ? groups
        : {
            ...groups,
            [regexp]: [],
        }, {});
    // Select just the SPECIAL WORDS and the matchers
    const sanitizedImportOrder = importOrder.filter((group) => !(0, normalize_plugin_options_1.isCustomGroupSeparator)(group) &&
        group !== constants_1.THIRD_PARTY_MODULES_SPECIAL_WORD);
    // Assign import nodes into import order groups
    for (const node of originalNodes) {
        const matchedGroup = (0, get_import_nodes_matched_group_1.getImportNodesMatchedGroup)(node, sanitizedImportOrder);
        importOrderGroups[matchedGroup].push(node);
    }
    for (const group of importOrder) {
        // If it's a custom separator, all we need to do is add a newline
        if ((0, normalize_plugin_options_1.isCustomGroupSeparator)(group)) {
            const lastNode = finalNodes[finalNodes.length - 1];
            // Avoid empty new line if first group is empty
            if (!lastNode) {
                continue;
            }
            // Don't add multiple newlines
            if (isNodeANewline(lastNode)) {
                continue;
            }
            finalNodes.push(constants_1.newLineNode);
            continue;
        }
        const groupNodes = importOrderGroups[group];
        if (groupNodes.length === 0)
            continue;
        const sortedInsideGroup = (0, get_sorted_nodes_group_1.getSortedNodesGroup)(groupNodes);
        // Sort the import specifiers
        sortedInsideGroup.forEach((node) => (0, get_sorted_import_specifiers_1.getSortedImportSpecifiers)(node));
        finalNodes.push(...sortedInsideGroup);
    }
    return finalNodes;
};
exports.getSortedNodesByImportOrder = getSortedNodesByImportOrder;
function isNodeANewline(node) {
    return node.type === 'ExpressionStatement';
}
