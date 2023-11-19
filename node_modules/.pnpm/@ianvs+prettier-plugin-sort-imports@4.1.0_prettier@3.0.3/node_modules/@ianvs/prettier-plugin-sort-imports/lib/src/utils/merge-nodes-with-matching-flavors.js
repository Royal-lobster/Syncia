"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeNodesWithMatchingImportFlavors = void 0;
const assert_1 = __importDefault(require("assert"));
const constants_1 = require("../constants");
const get_import_flavor_of_node_1 = require("./get-import-flavor-of-node");
function isMergeableFlavor(flavor) {
    return constants_1.mergeableImportFlavors.includes(flavor);
}
/**
 * Builds an object map of import declarations which can be merged together,
 * grouped by whether they are type or value import declarations.
 */
function selectMergeableNodesByImportFlavor(nodes) {
    return nodes.reduce((groups, node) => {
        const flavor = (0, get_import_flavor_of_node_1.getImportFlavorOfNode)(node);
        if (isMergeableFlavor(flavor)) {
            groups[flavor].push(node);
        }
        return groups;
    }, {
        [constants_1.importFlavorValue]: [],
        [constants_1.importFlavorType]: [],
    });
}
/**
 * Returns the "source" (i.e. module name or path) of an import declaration
 *
 * e.g.: `import foo from "./foo";` -- "./foo" is the source.
 */
function selectNodeImportSource(node) {
    return node.source.value;
}
/** e.g. import * as Namespace from "someModule" */
function nodeIsImportNamespaceSpecifier(node) {
    return node.type === 'ImportNamespaceSpecifier';
}
/**
 * Default type or value import
 *
 * e.g.
 * import Default from "someModule"
 * import type Default from "someModule"
 */
function nodeIsImportDefaultSpecifier(node) {
    return node.type === 'ImportDefaultSpecifier';
}
function nodeIsImportSpecifier(node) {
    return node.type === 'ImportSpecifier';
}
function convertImportSpecifierToType(node) {
    (0, assert_1.default)(node.importKind === 'value' ||
        node.importKind === 'type' ||
        // importKind can be null when using Flow
        node.importKind === null);
    node.importKind = 'type';
}
/** Pushes an `import type` expression into `import { type …}` */
function convertTypeImportToValueImport(node) {
    (0, assert_1.default)(node.importKind === 'type');
    node.importKind = 'value';
    node.specifiers
        .filter(nodeIsImportSpecifier)
        .forEach(convertImportSpecifierToType);
}
/** Return false if the merge will produce an invalid result */
function mergeIsSafe(nodeToKeep, nodeToForget) {
    if (nodeToKeep.specifiers.some(nodeIsImportNamespaceSpecifier) ||
        nodeToForget.specifiers.some(nodeIsImportNamespaceSpecifier)) {
        // An `import * as Foo` namespace specifier cannot be merged
        //   with other import expressions.
        return false;
    }
    if (nodeToKeep.specifiers.some(nodeIsImportDefaultSpecifier) &&
        nodeToForget.specifiers.some(nodeIsImportDefaultSpecifier)) {
        // Two `import Foo from` specifiers cannot be merged trivially.
        // -- Notice: this is *not* import {default as Foo1, default as Foo2} -- that's legal!
        //
        // Future work could convert `import Foo1 from 'a'; import Foo2 from 'a';
        //  into `import {default as Foo1, default as Foo2} from 'a';`
        // But since this runs the risk of making code longer, this won't be in v1.
        return false;
    }
    if ((nodeToKeep.importKind === 'type' &&
        nodeToKeep.specifiers.some(nodeIsImportDefaultSpecifier)) ||
        (nodeToForget.importKind === 'type' &&
            nodeToForget.specifiers.some(nodeIsImportDefaultSpecifier))) {
        // Cannot merge default type imports (.e.g. import type React from 'react')
        return false;
    }
    return true;
}
/**
 * Mutates the modeToKeep, adding the import specifiers and comments from the nodeToForget.
 *
 * @returns (node to keep if we should delete the other node | null to keep everything)
 */
function mergeNodes(nodeToKeep, nodeToForget) {
    if (!mergeIsSafe(nodeToKeep, nodeToForget)) {
        return null;
    }
    if (nodeToKeep.importKind === 'type' &&
        nodeToForget.importKind === 'value') {
        convertTypeImportToValueImport(nodeToKeep);
    }
    else if (nodeToKeep.importKind === 'value' &&
        nodeToForget.importKind === 'type') {
        convertTypeImportToValueImport(nodeToForget);
    }
    nodeToKeep.specifiers.push(...nodeToForget.specifiers);
    // These mutations don't update the line numbers, and that's crucial for moving things around.
    // To get updated line-numbers you would need to re-parse the code after these changes are rendered!
    nodeToKeep.leadingComments = [
        ...(nodeToKeep.leadingComments || []),
        ...(nodeToForget.leadingComments || []),
    ];
    nodeToKeep.innerComments = [
        ...(nodeToKeep.innerComments || []),
        ...(nodeToForget.innerComments || []),
    ];
    nodeToKeep.trailingComments = [
        ...(nodeToKeep.trailingComments || []),
        ...(nodeToForget.trailingComments || []),
    ];
    return nodeToKeep;
}
/**
 * Modifies context, deleteContext,
 * case A: context has no node for an import source, then it's assigned.
 * case B: context has a node for an import source, then it's merged, and old node is added to deleteContext.
 */
function mutateContextAndMerge({ context, nodesToDelete, insertableNode, }) {
    const source = selectNodeImportSource(insertableNode);
    const existing = context[source];
    if (existing) {
        // Check if the existing is after the new one in the code.
        // If so, we reverse the keep/delete so that the first node is kept.
        // Important for top-of-file comment formatting.
        if (existing.start &&
            insertableNode.start &&
            existing.start > insertableNode.start) {
            const merged = mergeNodes(insertableNode, existing);
            if (merged) {
                nodesToDelete.push(existing);
                context[source] = merged;
            }
        }
        else {
            if (mergeNodes(existing, insertableNode)) {
                nodesToDelete.push(insertableNode);
            }
        }
    }
    else {
        context[source] = insertableNode;
    }
}
/**
 * Accepts an array of nodes from a given chunk, and merges candidates that have a matching import-flavor
 *
 * In other words each group will be merged if they have the same source:
 * - `import type` expressions from the same source
 * - `import Name, {a, b}` from the same source
 *
 * `import type {Foo}` expressions won't be converted into `import {type Foo}` or vice versa
 */
const mergeNodesWithMatchingImportFlavors = (input, { importOrderCombineTypeAndValueImports }) => {
    const nodesToDelete = [];
    let context = {};
    const groups = selectMergeableNodesByImportFlavor(input);
    for (const groupKey of constants_1.mergeableImportFlavors) {
        if (!importOrderCombineTypeAndValueImports) {
            // Reset in loop to avoid unintended merge across variants
            context = {};
        }
        const group = groups[groupKey];
        for (const insertableNode of group) {
            mutateContextAndMerge({
                context,
                nodesToDelete,
                insertableNode,
            });
        }
    }
    return input.filter((n) => !nodesToDelete.includes(n));
};
exports.mergeNodesWithMatchingImportFlavors = mergeNodesWithMatchingImportFlavors;
