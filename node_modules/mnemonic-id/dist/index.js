"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomId = exports.createId = exports.createNumberId = exports.createLongStoryId = exports.createStoryId = exports.createQuestId = exports.createUniqueNameId = exports.createLongNameId = exports.createNameId = exports.createNounId = void 0;
const verbs_1 = __importDefault(require("./words/verbs"));
const noun_1 = __importDefault(require("./words/noun"));
const adjectives_1 = __importDefault(require("./words/adjectives"));
/** Returns id in format "noun" (e.g. "narwhal"), ≈ 10^2 permutations, 10 max length */
function createNounId(opts = {}) {
    return createCustomId(Object.assign({ subject: true }, opts));
}
exports.createNounId = createNounId;
/** Returns id in format "adj+noun" (e.g. "hungry-hippo"), ≈ 10^5 permutations, 19 max length */
function createNameId(opts = {}) {
    return createCustomId(Object.assign({ adjectives: 1, subject: true }, opts));
}
exports.createNameId = createNameId;
/** Returns id in format "adj+adj+noun" (e.g. "hungry-hippo"), ≈ 10^6 permutations, 28 max length */
function createLongNameId(opts) {
    return createCustomId(Object.assign({ adjectives: 2, subject: true }, opts));
}
exports.createLongNameId = createLongNameId;
/** Returns id in format "adj+noun+id" (e.g. "dull-dugong-QkCHmf"), ≈ 10^14 permutations, 26 max length */
function createUniqueNameId(opts = {}) {
    return createNameId(Object.assign({ idSuffix: 6 }, opts));
}
exports.createUniqueNameId = createUniqueNameId;
/** Returns id in format "verb+adj+noun" (e.g. "find-pretty-sheep"), ≈ 10^6 permutations, 28 max length */
function createQuestId(opts = {}) {
    return createCustomId(Object.assign({ adjectives: 1, verb: true, object: true }, opts));
}
exports.createQuestId = createQuestId;
/** Returns id in format "adj+noun+verb+adj+noun" (e.g. "eloquent-beaver-quote-unknown-dinosaur"), ≈ 10^10 permutations, 48 max length */
function createStoryId(opts = {}) {
    return createCustomId(Object.assign({ adjectives: 1, subject: true, verb: true, object: true }, opts));
}
exports.createStoryId = createStoryId;
/** Returns id in format "adj+adj+noun+verb+adj+adj+noun" (e.g. "wicked-evil-eel-help-horrible-pretty-hamster"), ≈ 10^14 permutations,
 * 64 max length */
function createLongStoryId(opts = {}) {
    return createStoryId(Object.assign({ adjectives: 2 }, opts));
}
exports.createLongStoryId = createLongStoryId;
/** Returns number of given length, = length^10-length^9 permutations */
function createNumberId(length) {
    const choices = '0123456789';
    let out = '';
    if (length > 0) {
        out += choices[randomInt(1, choices.length)];
    }
    for (let i = 1; i < length; i += 1) {
        out += choices[randomInt(0, choices.length)];
    }
    return out;
}
exports.createNumberId = createNumberId;
/** Returns id of given length, = 40^x permutations */
function createId(length) {
    const choices = 'ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789';
    let out = '';
    for (let i = 0; i < length; i += 1) {
        out += choices[randomInt(0, choices.length)];
    }
    return out;
}
exports.createId = createId;
/** Returns customized id based on given options */
function createCustomId(opts = {}) {
    opts = Object.assign({ adjectives: 0, subject: false, verb: false, object: false, delimiter: '-', numberSuffix: 0, idSuffix: 0 }, opts);
    let parts = [];
    if (opts.subject) {
        if (opts.adjectives) {
            for (let i = 0; i < opts.adjectives; i += 1) {
                parts.push(randomFromList(adjectives_1.default));
            }
        }
        parts.push(randomFromList(noun_1.default));
    }
    if (opts.verb) {
        parts.push(randomFromList(verbs_1.default));
    }
    if (opts.object) {
        parts.push(createCustomId({
            adjectives: opts.adjectives,
            subject: true,
            delimiter: opts.delimiter,
            capitalize: opts.capitalize,
        }));
    }
    if (opts.numberSuffix) {
        const id = createNumberId(opts.numberSuffix);
        parts.push(id);
    }
    if (opts.idSuffix) {
        const id = createId(opts.idSuffix);
        parts.push(id);
    }
    if (opts.capitalize) {
        parts = parts.map(capitalize);
    }
    return parts.join(opts.delimiter);
}
exports.createCustomId = createCustomId;
function randomFromList(list) {
    return list[randomInt(0, list.length)];
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
//# sourceMappingURL=index.js.map