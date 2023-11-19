// Regexps involved with splitting words in various case formats.
const SPLIT_LOWER_UPPER_RE = /([\p{Ll}\d])(\p{Lu})/gu;
const SPLIT_UPPER_UPPER_RE = /(\p{Lu})([\p{Lu}][\p{Ll}])/gu;
const SPLIT_NUMBER_LOWER_RE = /(\d)(\p{Ll})/gu;
const SPLIT_LETTER_NUMBER_RE = /(\p{L})(\d)/gu;
// Regexp involved with stripping non-word characters from the result.
const DEFAULT_STRIP_REGEXP = /[^\p{L}\d]+/giu;
// The replacement value for splits.
const SPLIT_REPLACE_VALUE = "$1\0$2";
// The default characters to keep after transforming case.
const DEFAULT_PREFIX_CHARACTERS = "";
/**
 * Split any cased input strings into an array of words.
 */
export function split(input, options = {}) {
    const { separateNumbers } = options;
    let result = input.trim();
    result = result
        .replace(SPLIT_LOWER_UPPER_RE, SPLIT_REPLACE_VALUE)
        .replace(SPLIT_UPPER_UPPER_RE, SPLIT_REPLACE_VALUE);
    if (separateNumbers) {
        result = result
            .replace(SPLIT_NUMBER_LOWER_RE, SPLIT_REPLACE_VALUE)
            .replace(SPLIT_LETTER_NUMBER_RE, SPLIT_REPLACE_VALUE);
    }
    result = result.replace(DEFAULT_STRIP_REGEXP, "\0");
    let start = 0;
    let end = result.length;
    // Trim the delimiter from around the output string.
    while (result.charAt(start) === "\0")
        start++;
    if (start === end)
        return [];
    while (result.charAt(end - 1) === "\0")
        end--;
    return result.slice(start, end).split(/\0/g);
}
/**
 * Convert a string to space separated lower case (`foo bar`).
 */
export function noCase(input, options) {
    const prefix = getPrefix(input, options?.prefixCharacters);
    return (prefix +
        split(input, options)
            .map(lowerFactory(options?.locale))
            .join(" "));
}
/**
 * Convert a string to camel case (`fooBar`).
 */
export function camelCase(input, options) {
    const prefix = getPrefix(input, options?.prefixCharacters);
    const lower = lowerFactory(options?.locale);
    const upper = upperFactory(options?.locale);
    const transform = pascalCaseTransformFactory(lower, upper);
    return (prefix +
        split(input, options)
            .map((word, index) => {
            if (index === 0)
                return lower(word);
            return transform(word, index);
        })
            .join(""));
}
/**
 * Convert a string to pascal case (`FooBar`).
 */
export function pascalCase(input, options) {
    const prefix = getPrefix(input, options?.prefixCharacters);
    const lower = lowerFactory(options?.locale);
    const upper = upperFactory(options?.locale);
    return (prefix +
        split(input, options).map(pascalCaseTransformFactory(lower, upper)).join(""));
}
/**
 * Convert a string to pascal snake case (`Foo_Bar`).
 */
export function pascalSnakeCase(input, options) {
    const prefix = getPrefix(input, options?.prefixCharacters);
    const lower = lowerFactory(options?.locale);
    const upper = upperFactory(options?.locale);
    return (prefix +
        split(input, options)
            .map(capitalCaseTransformFactory(lower, upper))
            .join("_"));
}
/**
 * Convert a string to capital case (`Foo Bar`).
 */
export function capitalCase(input, options) {
    const prefix = getPrefix(input, options?.prefixCharacters);
    const lower = lowerFactory(options?.locale);
    const upper = upperFactory(options?.locale);
    return (prefix +
        split(input, options)
            .map(capitalCaseTransformFactory(lower, upper))
            .join(" "));
}
/**
 * Convert a string to constant case (`FOO_BAR`).
 */
export function constantCase(input, options) {
    const prefix = getPrefix(input, options?.prefixCharacters);
    const upper = upperFactory(options?.locale);
    return prefix + split(input, options).map(upper).join("_");
}
/**
 * Convert a string to dot case (`foo.bar`).
 */
export function dotCase(input, options) {
    const prefix = getPrefix(input, options?.prefixCharacters);
    const lower = lowerFactory(options?.locale);
    return prefix + split(input, options).map(lower).join(".");
}
/**
 * Convert a string to kebab case (`foo-bar`).
 */
export function kebabCase(input, options) {
    const prefix = getPrefix(input, options?.prefixCharacters);
    const lower = lowerFactory(options?.locale);
    return prefix + split(input, options).map(lower).join("-");
}
/**
 * Convert a string to path case (`foo/bar`).
 */
export function pathCase(input, options) {
    const prefix = getPrefix(input, options?.prefixCharacters);
    const lower = lowerFactory(options?.locale);
    return prefix + split(input, options).map(lower).join("/");
}
/**
 * Convert a string to path case (`Foo bar`).
 */
export function sentenceCase(input, options) {
    const prefix = getPrefix(input, options?.prefixCharacters);
    const lower = lowerFactory(options?.locale);
    const upper = upperFactory(options?.locale);
    const transform = capitalCaseTransformFactory(lower, upper);
    return (prefix +
        split(input, options)
            .map((word, index) => {
            if (index === 0)
                return transform(word);
            return lower(word);
        })
            .join(" "));
}
/**
 * Convert a string to snake case (`foo_bar`).
 */
export function snakeCase(input, options) {
    const prefix = getPrefix(input, options?.prefixCharacters);
    const lower = lowerFactory(options?.locale);
    return prefix + split(input, options).map(lower).join("_");
}
/**
 * Convert a string to header case (`Foo-Bar`).
 */
export function trainCase(input, options) {
    const prefix = getPrefix(input, options?.prefixCharacters);
    const lower = lowerFactory(options?.locale);
    const upper = upperFactory(options?.locale);
    return (prefix +
        split(input, options)
            .map(capitalCaseTransformFactory(lower, upper))
            .join("-"));
}
function lowerFactory(locale) {
    return locale === false
        ? (input) => input.toLowerCase()
        : (input) => input.toLocaleLowerCase(locale);
}
function upperFactory(locale) {
    return locale === false
        ? (input) => input.toUpperCase()
        : (input) => input.toLocaleUpperCase(locale);
}
function capitalCaseTransformFactory(lower, upper) {
    return (word) => `${upper(word[0])}${lower(word.slice(1))}`;
}
function pascalCaseTransformFactory(lower, upper) {
    return (word, index) => {
        const char0 = word[0];
        const initial = index > 0 && char0 >= "0" && char0 <= "9" ? "_" + char0 : upper(char0);
        return initial + lower(word.slice(1));
    };
}
function getPrefix(input, prefixCharacters = DEFAULT_PREFIX_CHARACTERS) {
    let prefix = "";
    for (let i = 0; i < input.length; i++) {
        const char = input.charAt(i);
        if (prefixCharacters.includes(char)) {
            prefix += char;
        }
        else {
            break;
        }
    }
    return prefix;
}
//# sourceMappingURL=index.js.map