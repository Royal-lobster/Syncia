import fs from 'fs-promise';
import Promise from 'bluebird';
import path from 'path';

import {getEnv} from './manager';
import startShell from './startShell';
import {biomeFolderName} from './constants';

export default function add(project, variables) {
  return getEnv(project).then(([vars, project]) => {
    // add all values
    variables.forEach(([name, value]) => {
      name = name.trim();
      vars[name] = value;
      console.log(`Exported ${name}="${value}" inside ${project}...`);
    });

    // write to config
    let biomeProject = path.join(biomeFolderName(), `${project}.json`);
    return fs.writeFile(biomeProject, JSON.stringify(vars, null, 2));
  });
}
