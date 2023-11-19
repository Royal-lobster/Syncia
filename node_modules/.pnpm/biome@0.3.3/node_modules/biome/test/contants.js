import assert from 'assert';
import * as constants from '../src/constants';
import untildify from 'untildify';
import path from 'path';

describe("Contants", function() {
  beforeEach(function() {
    // reset env variables
    delete process.env.BIOME_LOCAL_FILE;
    delete process.env.BIOME_FOLDER_NAME;
  });

  it("should return the default Biomefile name", function() {
    assert.equal(constants.biomeLocalName(), 'Biomefile');
  });
  it("should return a custom Biomefile name", function() {
    process.env.BIOME_LOCAL_NAME = "biome name";
    assert.equal(constants.biomeLocalName(), 'biome name');
  });

  it("should return the default .biome folder name", function() {
    assert.equal(constants.biomeFolderName(), untildify('~/.biome'));
  });
  it("should return a custom .biome folder naem", function() {
    process.env.BIOME_FOLDER_NAME = "/folder";
    assert.equal(constants.biomeFolderName(), '/folder');
  });
});
