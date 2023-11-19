import fs from 'fs';
import path from 'path';
import mockFs from 'mock-fs';
import untildify from 'untildify';

// Mock biomefile and .biome folder
export default function mockCleanSlate(variables={}, more={}) {
  let home = untildify('~/');
  return mockFs({
    [home]: {
      '.biome': {
        'project.json': JSON.stringify(variables),
        ...more,
      },
    },
    [process.cwd()]: {
      'Biomefile': JSON.stringify({name: "project"}),
    },
  }, {createCwd: false});
}

// no files
export function mockEmptyState(inCwd={}, inHome={}) {
  let home = untildify('~/');
  return mockFs({
    [home]: {
      '.biome': {},
      ...inHome,
    },
    [process.cwd()]: {...inCwd},
  }, {createCwd: false});
}
