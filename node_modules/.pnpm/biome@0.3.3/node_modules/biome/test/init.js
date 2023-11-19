import assert from 'assert';
import mockFs from 'mock-fs';
import fs from 'fs';
import path from 'path';
import init from '../src/init';
import sinon from 'sinon';
import untildify from 'untildify';

import {mockEmptyState} from './helpers/mockCleanState';

describe("Init", function() {
  beforeEach(function() {
    process.env.BIOME_FOLDER_NAME = "~/.biome";
    process.env.BIOME_LOCAL_NAME = "Biomefile";
    mockEmptyState();
  });
  afterEach(function() {
    mockFs.restore();
  });

  it("should create new variables specifying a project", function() {
    return init("project").then(out => {
      // Biomefile
      let file = untildify(path.join(process.cwd(), "Biomefile"));
      assert.deepEqual(
        JSON.parse(fs.readFileSync(file)),
        {name: "project"}
      );

      // .biome/prject-name.json
      file = untildify(path.join("~", ".biome", "project.json"));
      assert.deepEqual(JSON.parse(fs.readFileSync(file)), {});
    });
  });
  describe("with a console.error spy", function() {
    beforeEach(function() {
      sinon.spy(console, 'error');
    });
    afterEach(function() {
      console.error.restore();
    });
    it("should error on empty project name", function() {
      init("");
      assert(console.error.calledOnce);
    });
  });
});

// why isn't this working?
describe.skip("Find project name programatically", function() {
  beforeEach(function() {
    mockEmptyState({"package.json": '{"name": "my-app"}'});
  });
  afterEach(function() {
    mockFs.restore();
  });

  it("should create new variables specifying a project", function() {
    return init().then(out => {
      // Biomefile
      let file = untildify(path.join(process.cwd(), "Biomefile"));
      assert.deepEqual(
        JSON.parse(fs.readFileSync(file)),
        {name: "my-app"}
      );

      // .biome/prject-name.json
      file = untildify(path.join("~", ".biome", "my-app.json"));
      assert.deepEqual(JSON.parse(fs.readFileSync(file)), {});
    });
  });
});
