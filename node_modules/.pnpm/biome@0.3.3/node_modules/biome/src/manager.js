import fs from 'fs-promise';
import Promise from 'bluebird';
import path from 'path';
import home from 'user-home';

import {biomeFolderName} from './constants';
import {getProjectMetadata} from './local';

// get the project metadata (name) of the project in the cwd,
// or if specified, a custom directory.
export function findVariablesFor(project) {
  console.info(`Sourcing variables for ${project}...`);
  let biomeProject = path.join(biomeFolderName(), `${project}.json`);
  return fs.readJson(biomeProject).then(vars => {
    if (vars.$include) {
      // find all subprojects, and include them
      return Promise.all(vars.$include.map(getEnv))
      .then(subProjects => {
        subProjects = subProjects.map(i => i[0]); // extract just the values
        let combinedVars = Object.assign.apply(this, subProjects);
        delete vars.$include;
        return {...vars, ...combinedVars};
      });
    } else {
      // no including of others
      return vars;
    }
  })
}

// given a project, return the associated environment vars
export function getEnv(project) {
  if (project) {
    // return the env variables directly for the project
    return Promise.all([findVariablesFor(project), project]);
  } else {
    // look for a local project
    return getProjectMetadata(project).then(meta => { // get local Biomefile
      console.info(`Found Biomefile for ${meta.name}...`);
      return Promise.all([findVariablesFor(meta.name), meta.name]);
    });
  }
}
