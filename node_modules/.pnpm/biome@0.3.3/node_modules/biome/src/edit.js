import editor from 'editor';
import path from 'path';
import {biomeFolderName} from './constants';

export default function edit(project) {
  let biomeProject = path.join(biomeFolderName(), `${project}.json`);
  editor(biomeProject, code => {
    console.log("Finished with code", code);
  });
}
