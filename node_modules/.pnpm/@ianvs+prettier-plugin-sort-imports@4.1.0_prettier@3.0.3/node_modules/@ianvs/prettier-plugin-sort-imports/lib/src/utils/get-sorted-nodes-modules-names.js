"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortedNodesModulesNames = void 0;
const getSortedNodesModulesNames = (modules) => modules
    .filter((m) => [
    'ImportSpecifier',
    'ImportDefaultSpecifier',
    'ImportNamespaceSpecifier',
].includes(m.type))
    .map((m) => m.local.name); // TODO: get from specifier
exports.getSortedNodesModulesNames = getSortedNodesModulesNames;
