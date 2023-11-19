import path from 'path';
import fs from 'fs-promise';
import {biomeFolderName} from './constants';

// code to run before the app to set up the filesystem
export default function preflight() {
  // create a ~/.biome folder
  return fs.stat(biomeFolderName()).then(exists => {
    return true;
  }).catch(err => {
    return fs.mkdirp(biomeFolderName());
  });
}

