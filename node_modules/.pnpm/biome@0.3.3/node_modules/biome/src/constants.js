import path from 'path';
import untildify from 'untildify';

// The file that is in each individual project. Defaults to Biomefile.
export function biomeLocalName() {
  return process.env.BIOME_LOCAL_NAME || 'Biomefile';
}

// The folder that contains all the individual configs. Defaults to ~/.biome
export function biomeFolderName() {
  return path.resolve(untildify(process.env.BIOME_FOLDER_NAME || '~/.biome'));
}

