/**
 * @typedef {import('mdast').Content} Content
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast-util-find-and-replace').ReplaceFunction} ReplaceFunction
 */

/**
 * @typedef {Content | Root} Node
 */

import {findAndReplace} from 'mdast-util-find-and-replace'

/**
 * Turn normal line endings into hard breaks.
 *
 * @param {Node} tree
 *   Tree to change.
 * @returns {void}
 *   Nothing.
 */
export function newlineToBreak(tree) {
  findAndReplace(tree, /\r?\n|\r/g, replace)
}

/**
 * Replace line endings.
 *
 * @type {ReplaceFunction}
 */
function replace() {
  return {type: 'break'}
}
