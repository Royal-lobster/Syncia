"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportFlavorOfNode = void 0;
const constants_1 = require("../constants");
const has_ignore_next_node_1 = require("./has-ignore-next-node");
/**
 * Classifies nodes by import-flavor, primarily informing whether the node is a candidate for merging
 *
 * @param node
 * @returns the flavor of the import node
 */
const getImportFlavorOfNode = (node) => {
    if ((0, has_ignore_next_node_1.hasIgnoreNextNode)(node.leadingComments)) {
        return constants_1.importFlavorIgnore;
    }
    if (node.specifiers.length === 0) {
        return constants_1.importFlavorSideEffect;
    }
    if (node.importKind === 'type') {
        return constants_1.importFlavorType;
    }
    return constants_1.importFlavorValue;
};
exports.getImportFlavorOfNode = getImportFlavorOfNode;
