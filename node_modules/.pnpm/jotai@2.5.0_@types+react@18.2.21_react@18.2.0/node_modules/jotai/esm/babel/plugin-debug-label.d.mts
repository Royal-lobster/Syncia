import babel, { PluginObj } from '@babel/core';
import type { PluginOptions } from './utils.mjs';
export default function debugLabelPlugin({ types: t }: typeof babel, options?: PluginOptions): PluginObj;
