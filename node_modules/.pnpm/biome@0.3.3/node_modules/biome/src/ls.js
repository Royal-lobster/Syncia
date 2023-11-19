import fs from 'fs-promise';
import Promise from 'bluebird';
import path from 'path';
import chalk from 'chalk';

import {biomeFolderName} from './constants';

export default function ls() {
  return fs.readdir(biomeFolderName()).then(files => {
    console.info(`(for help, run ${chalk.green("biome --help")})`);
    console.info(`(use ${chalk.green("biome init [project]")} to create a new project)`);
    console.info(`(use ${chalk.green("biome use <name>")} to activate)`);
    console.info("All biomes:");
    files.forEach(file => {
      let name = file.replace(/\.json$/, '');
      console.info(
        process.env.BIOME_PROJECT && process.env.BIOME_PROJECT.trim() === name.trim() ?
          chalk.red('*') :
          ' ',
        name
      );
    });
  });
}
