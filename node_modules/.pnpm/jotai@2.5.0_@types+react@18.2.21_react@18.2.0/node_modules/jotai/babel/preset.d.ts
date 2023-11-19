import babel from '@babel/core';
import { PluginOptions } from './utils';
export default function jotaiPreset(_: typeof babel, options?: PluginOptions): {
    plugins: babel.PluginItem[];
};
