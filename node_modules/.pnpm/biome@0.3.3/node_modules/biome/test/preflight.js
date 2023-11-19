import assert from 'assert';
import mockFs from 'mock-fs';
import fs from 'fs-promise';
import preflight from '../src/preflight';
import untildify from 'untildify';

describe("preflight", function() {
  beforeEach(function() {
    process.env.BIOME_FOLDER_NAME = "~/.biome";
    process.env.BIOME_LOCAL_NAME = "Biomefile";
    mockFs({});
  });
  afterEach(function() {
    mockFs.restore();
  });

  it("should create ~/.biome if it doesn't exist", function() {
    return preflight().then(vars => {
      return fs.stat(untildify("~/.biome"));
    }).then(stat => {
      assert(stat.ctime instanceof Date);
    });
  });
});
