"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectNewlinesRegex = exports.forceANewlineUsingACommentStatement = exports.newLineNode = exports.TYPES_SPECIAL_WORD = exports.THIRD_PARTY_MODULES_SPECIAL_WORD = exports.BUILTIN_MODULES_SPECIAL_WORD = exports.BUILTIN_MODULES_REGEX_STR = exports.mergeableImportFlavors = exports.importFlavorIgnore = exports.importFlavorSideEffect = exports.importFlavorType = exports.importFlavorValue = exports.chunkTypeOther = exports.chunkTypeUnsortable = exports.newLineCharacters = exports.jsx = exports.typescript = exports.flow = void 0;
const module_1 = require("module");
const types_1 = require("@babel/types");
exports.flow = 'flow';
exports.typescript = 'typescript';
exports.jsx = 'jsx';
exports.newLineCharacters = '\n\n';
exports.chunkTypeUnsortable = 'unsortable';
exports.chunkTypeOther = 'other';
/** Value imports (including top-level default imports) - import {Thing} from ... or import Thing from ... */
exports.importFlavorValue = 'value';
/** import type {} from ...  */
exports.importFlavorType = 'type';
exports.importFlavorSideEffect = 'side-effect';
exports.importFlavorIgnore = 'prettier-ignore';
exports.mergeableImportFlavors = [
    exports.importFlavorValue,
    exports.importFlavorType,
];
exports.BUILTIN_MODULES_REGEX_STR = `^(?:node:)?(?:${module_1.builtinModules.join('|')})$`;
exports.BUILTIN_MODULES_SPECIAL_WORD = '<BUILTIN_MODULES>';
/**
 * Used to mark not otherwise matched imports should be placed
 */
exports.THIRD_PARTY_MODULES_SPECIAL_WORD = '<THIRD_PARTY_MODULES>';
exports.TYPES_SPECIAL_WORD = '<TYPES>';
const PRETTIER_PLUGIN_SORT_IMPORTS_NEW_LINE = 'PRETTIER_PLUGIN_SORT_IMPORTS_NEW_LINE';
/** Use this to force a newline at top-level scope (good for newlines generated between import blocks) */
exports.newLineNode = (0, types_1.expressionStatement)((0, types_1.stringLiteral)(PRETTIER_PLUGIN_SORT_IMPORTS_NEW_LINE));
/** Use this if you want to force a newline, but you're attaching to leading/inner/trailing Comments */
const forceANewlineUsingACommentStatement = () => ({
    type: 'CommentLine',
    value: 'PRETTIER_PLUGIN_SORT_IMPORTS_NEWLINE_COMMENT',
    start: -1,
    end: -1,
    loc: { start: { line: -1, column: -1 }, end: { line: -1, column: -1 } },
});
exports.forceANewlineUsingACommentStatement = forceANewlineUsingACommentStatement;
exports.injectNewlinesRegex = /("PRETTIER_PLUGIN_SORT_IMPORTS_NEW_LINE";|\/\/PRETTIER_PLUGIN_SORT_IMPORTS_NEWLINE_COMMENT)/gi;
