import assert from 'assert';
import fs from 'fs';
import path from 'path';
import add from '../src/add';
import sinon from 'sinon';
import untildify from 'untildify';
import mockFs from 'mock-fs';

import mockCleanSlate from './helpers/mockCleanState';

describe("Add", function() {
  beforeEach(function() {
    mockCleanSlate();
  });
  afterEach(function() {
    mockFs.restore();
  });

  it("should create new variables", function() {
    // (cwd contains a Biomefile that references project `project`)
    return add(undefined, [
      ["FOO", "bar"],
      ["BAZ", "Hello world"],
    ]).then(out => {
      let file = untildify(path.join("~", ".biome", "project.json"));
      assert.deepEqual(
        JSON.parse(fs.readFileSync(file)),
        {FOO: 'bar', BAZ: 'Hello world'}
      );
    });
  });
  it("should create new variables specifying a project", function() {
    return add("project", [
      ["FOO", "bar"],
      ["BAZ", "Hello world"],
    ]).then(out => {
      let file = untildify(path.join("~", ".biome", "project.json"));
      assert.deepEqual(
        JSON.parse(fs.readFileSync(file)),
        {FOO: 'bar', BAZ: 'Hello world'}
      );
    });
  });
});
