"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingOnly = exports.examineAndNormalizePluginOptions = exports.isCustomGroupSeparator = void 0;
const semver_1 = __importDefault(require("semver"));
const constants_1 = require("../constants");
const get_experimental_parser_plugins_1 = require("./get-experimental-parser-plugins");
function normalizeImportOrderOption(importOrder) {
    if (importOrder == null) {
        importOrder = [];
    }
    importOrder = [...importOrder]; // Clone the array so we can splice it
    // If we have a separator in the first slot, we need to inject our required words after it.
    const hasLeadingSeparator = importOrder.length > 0 && isCustomGroupSeparator(importOrder[0]);
    const spliceIndex = hasLeadingSeparator ? 1 : 0;
    // THIRD_PARTY_MODULES_SPECIAL_WORD is magic because "everything not matched by other groups goes here"
    // So it must always be present.
    if (!importOrder.includes(constants_1.THIRD_PARTY_MODULES_SPECIAL_WORD)) {
        importOrder.splice(spliceIndex, 0, constants_1.THIRD_PARTY_MODULES_SPECIAL_WORD);
    }
    // Opinionated Decision: NodeJS Builtin modules should always be separate from third party modules
    // Users may want to add their own separators around them or insert other modules above them though
    if (!(importOrder.includes(constants_1.BUILTIN_MODULES_SPECIAL_WORD) ||
        importOrder.includes(constants_1.BUILTIN_MODULES_REGEX_STR))) {
        importOrder.splice(spliceIndex, 0, constants_1.BUILTIN_MODULES_SPECIAL_WORD);
    }
    importOrder = importOrder.map((g) => g === constants_1.BUILTIN_MODULES_SPECIAL_WORD ? constants_1.BUILTIN_MODULES_REGEX_STR : g);
    return importOrder;
}
/**
 * isCustomGroupSeparator checks if the provided pattern is intended to be used
 * as an import separator, rather than an actual group of imports.
 */
function isCustomGroupSeparator(pattern) {
    return pattern?.trim() === '';
}
exports.isCustomGroupSeparator = isCustomGroupSeparator;
/**
 * Verifies that our special words that must always be there are present on importOrder
 * Verifies that parser plugins are inferred correctly for certain file extensions.
 *
 * Configures certain behavior flags such as
 *  - when to use certain typescript syntax
 *  - when to inject blank lines after top-of-file comments
 *  - when to inject blank lines around groups / side-effect nodes.
 */
function examineAndNormalizePluginOptions(options) {
    const { importOrderParserPlugins, filepath } = options;
    let { importOrderTypeScriptVersion } = options;
    const isTSSemverValid = semver_1.default.valid(importOrderTypeScriptVersion);
    if (!isTSSemverValid) {
        console.warn(`[@ianvs/prettier-plugin-sort-imports]: The option importOrderTypeScriptVersion is not a valid semver version and will be ignored.`);
        importOrderTypeScriptVersion = '1.0.0';
    }
    const importOrder = normalizeImportOrderOption(options.importOrder);
    // Do not combine type and value imports if `<TYPES>` is specified explicitly
    let importOrderCombineTypeAndValueImports = importOrder.some((group) => group.includes(constants_1.TYPES_SPECIAL_WORD))
        ? false
        : true;
    let plugins = (0, get_experimental_parser_plugins_1.getExperimentalParserPlugins)(importOrderParserPlugins);
    // Do not inject jsx plugin for non-jsx ts files
    if (filepath?.endsWith('.ts')) {
        plugins = plugins.filter((p) => p !== 'jsx');
    }
    // Disable importOrderCombineTypeAndValueImports if typescript is not set to a version that supports it
    if (plugins.includes('typescript') &&
        semver_1.default.lt(importOrderTypeScriptVersion, '4.5.0')) {
        importOrderCombineTypeAndValueImports = false;
    }
    return {
        importOrder,
        importOrderCombineTypeAndValueImports,
        hasAnyCustomGroupSeparatorsInImportOrder: importOrder.some(isCustomGroupSeparator),
        // Now that the regex for <BUILTIN_MODULES> is present, we can check if the user
        // configured a separator before <BUILTIN_MODULES>
        provideGapAfterTopOfFileComments: isCustomGroupSeparator(importOrder[0]),
        plugins,
    };
}
exports.examineAndNormalizePluginOptions = examineAndNormalizePluginOptions;
exports.testingOnly = { normalizeImportOrderOption };
