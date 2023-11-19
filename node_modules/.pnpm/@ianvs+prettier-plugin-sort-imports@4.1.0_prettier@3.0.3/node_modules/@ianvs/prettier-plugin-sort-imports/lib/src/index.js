"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsers = exports.options = void 0;
const parser_babel_1 = require("prettier/parser-babel");
const parser_flow_1 = require("prettier/parser-flow");
const parser_html_1 = require("prettier/parser-html");
const parser_typescript_1 = require("prettier/parser-typescript");
const constants_1 = require("./constants");
const default_1 = require("./preprocessors/default");
const vue_1 = require("./preprocessors/vue");
exports.options = {
    importOrder: {
        type: 'path',
        category: 'Global',
        array: true,
        default: [
            {
                value: [
                    constants_1.BUILTIN_MODULES_SPECIAL_WORD,
                    constants_1.THIRD_PARTY_MODULES_SPECIAL_WORD,
                    '^[.]', // relative imports
                ],
            },
        ],
        description: 'Provide an order to sort imports. [node.js built-ins are always first]',
    },
    importOrderParserPlugins: {
        type: 'path',
        category: 'Global',
        array: true,
        // By default, we add ts and jsx as parsers but if users define something
        // we take that option
        default: [{ value: ['typescript', 'jsx'] }],
        description: 'Provide a list of plugins for special syntax',
    },
    importOrderTypeScriptVersion: {
        type: 'string',
        category: 'Global',
        default: '1.0.0',
        description: 'Version of TypeScript in use in the project.  Determines some output syntax when using TypeScript.',
    },
};
exports.parsers = {
    babel: {
        ...parser_babel_1.parsers.babel,
        preprocess: default_1.defaultPreprocessor,
    },
    'babel-ts': {
        ...parser_babel_1.parsers['babel-ts'],
        preprocess: default_1.defaultPreprocessor,
    },
    flow: {
        ...parser_flow_1.parsers.flow,
        preprocess: default_1.defaultPreprocessor,
    },
    typescript: {
        ...parser_typescript_1.parsers.typescript,
        preprocess: default_1.defaultPreprocessor,
    },
    vue: {
        ...parser_html_1.parsers.vue,
        preprocess: vue_1.vuePreprocessor,
    },
};
