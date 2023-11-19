import fs from 'fs-promise';
import {spawnSync} from 'child_process';
import home from 'user-home';

export default function startShell(project, sourceVars={}) {
  // set identifying variable
  process.env.BIOME_SHELL = true;
  process.env.BIOME_PROJECT = project;

  // source any custom variables
  for (let variable in sourceVars) {
    process.env[variable] = sourceVars[variable];
  }

  // start the shell
  if (process.env.SHELL) {
    console.info("This is a biome generated shell.");
    console.info("All variables from the", project, "project have been sourced for you.");
    spawnSync(process.env.SHELL, ['-i'], {stdio: 'inherit'});
  } else {
    console.log("Please put the location of your shell in $SHELL.");
  }
}
