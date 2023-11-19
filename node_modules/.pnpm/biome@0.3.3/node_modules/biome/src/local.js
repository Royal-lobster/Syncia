import fs from 'fs-promise';
import Promise from 'bluebird';
import path from 'path';

import {biomeLocalName} from './constants';

// get the project metadata (name) of the project in the cwd,
// or if specified, a custom directory.
export function getProjectMetadata(project, cwd=process.cwd()) {
  let biomeFile = path.join(cwd, biomeLocalName());
  return fs.readJson(biomeFile);
}
