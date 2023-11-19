import fs from 'fs-promise';
import Promise from 'bluebird';
import path from 'path';
import untildify from 'untildify';
import inquirer from 'inquirer-promise';
import request from 'request-promise';

import {biomeLocalName, biomeFolderName} from './constants';

// given a template url, return user-populated data.
export default function fetchTemplate(data) {
  if (data && Object.keys(data).length >= 0) {
    let keys = Object.keys(data);
    return inquirer.prompt(keys.map(key => {
      let value = data[key];
      return {
        type: "input",
        message: `Enter a value for ${key}`,
        name: key,
        default: value,
      };
    }));
  } else {
    console.error("The passed template URL doesn't return JSON. Learn more about template URLs at https://github.com/1egoman/biome/blob/master/resources/templateURL.md");
    return;
  }
}

export default function init(project, template) {
  let biomeFile = path.join(process.cwd(), biomeLocalName());

  // step 0: Read the Biomefile and see if there's a template
  return fs.readJSON(biomeFile).catch(error => {
    return {}; // No biomefile
  }).then(biomefile => {
    project = biomefile.name || project;

    if (!project || project.length === 0) {
      console.error("Project names need to be at least 1 character long.");
      throw new Error("Project names need to be at least 1 character long.");
    }

    if (template || typeof biomefile.template === "string") {
      // a template url
      return request(template || biomefile.template).then(JSON.parse).then(fetchTemplate);
    } else if (biomefile.template) {
      return fetchTemplate(biomefile.template);
    } else {
      // no template
      return Promise.resolve({});
    }
  }).then(data => {
    // step 1: write stuff to local Biomefile
    return Promise.all([data,
      fs.writeFile(
        biomeFile,
        JSON.stringify({
          name: project,
          template,
        }, null, 2)
      ),
    ]);
  }).then(([data, file]) => {
    // step 2: write creds file in the ~/.biome folder
    let biomeProject = path.join(biomeFolderName(), `${project}.json`);
    return fs.writeFile(biomeProject, JSON.stringify(data, null, 2));
  }).then(f => project);
}
