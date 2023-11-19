interface IdOpts {
    /** Number of adjectives given to object/subject */
    adjectives?: number;
    /** Creates subject in id sentence */
    subject?: boolean;
    /** Creates verb in id sentence */
    verb?: boolean;
    /** Creates object in id sentence */
    object?: boolean;
    /** Creates number of given length at end of id sentence */
    numberSuffix?: number;
    /** Creates id of given length at end of id sentence */
    idSuffix?: number;
    /** Delimiter to be used in id sentence */
    delimiter?: string;
    /** Capitalize each word in sentence */
    capitalize?: boolean;
}
/** Returns id in format "noun" (e.g. "narwhal"), ≈ 10^2 permutations, 10 max length */
export declare function createNounId(opts?: IdOpts): string;
/** Returns id in format "adj+noun" (e.g. "hungry-hippo"), ≈ 10^5 permutations, 19 max length */
export declare function createNameId(opts?: IdOpts): string;
/** Returns id in format "adj+adj+noun" (e.g. "hungry-hippo"), ≈ 10^6 permutations, 28 max length */
export declare function createLongNameId(opts?: IdOpts): string;
/** Returns id in format "adj+noun+id" (e.g. "dull-dugong-QkCHmf"), ≈ 10^14 permutations, 26 max length */
export declare function createUniqueNameId(opts?: IdOpts): string;
/** Returns id in format "verb+adj+noun" (e.g. "find-pretty-sheep"), ≈ 10^6 permutations, 28 max length */
export declare function createQuestId(opts?: IdOpts): string;
/** Returns id in format "adj+noun+verb+adj+noun" (e.g. "eloquent-beaver-quote-unknown-dinosaur"), ≈ 10^10 permutations, 48 max length */
export declare function createStoryId(opts?: IdOpts): string;
/** Returns id in format "adj+adj+noun+verb+adj+adj+noun" (e.g. "wicked-evil-eel-help-horrible-pretty-hamster"), ≈ 10^14 permutations,
 * 64 max length */
export declare function createLongStoryId(opts?: IdOpts): string;
/** Returns number of given length, = length^10-length^9 permutations */
export declare function createNumberId(length: number): string;
/** Returns id of given length, = 40^x permutations */
export declare function createId(length: number): string;
/** Returns customized id based on given options */
export declare function createCustomId(opts?: IdOpts): string;
export {};
