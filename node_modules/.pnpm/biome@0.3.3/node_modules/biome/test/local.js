import assert from 'assert';
import mockFs from 'mock-fs';
import fs from 'fs';
import {getProjectMetadata} from '../src/local';

import mockCleanSlate from './helpers/mockCleanState';

describe("local.getProjectMetadata", function() {
  beforeEach(function() {
    process.env.BIOME_FOLDER_NAME = "~/.biome";
    process.env.BIOME_LOCAL_NAME = "Biomefile";
    mockCleanSlate({HELLO: "world"});
  });
  afterEach(function() {
    mockFs.restore();
  });

  it("should get local metadata in Biomefile", function() {
    getProjectMetadata().then(all => {
      assert.deepEqual(all, {name: "project"});
    });
  });
});
