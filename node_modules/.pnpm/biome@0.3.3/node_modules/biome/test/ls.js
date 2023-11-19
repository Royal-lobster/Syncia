import assert from 'assert';
import fs from 'fs-promise';
import ls from '../src/ls';
import untildify from 'untildify';
import sinon from 'sinon';
import chalk from 'chalk';

describe("ls", function() {
  beforeEach(function() {
    process.env.BIOME_FOLDER_NAME = "~/.biome";
    process.env.BIOME_LOCAL_NAME = "Biomefile";
    sinon.stub(fs, "readdir").resolves(["foo.json", "bar.json", "baz.json"])
    sinon.spy(console, "info");
  });
  afterEach(function() {
    console.info.restore();
    fs.readdir.restore();
  });

  it("should list all projects", function() {
    delete process.env.BIOME_PROJECT;
    return ls().then(out => {
      assert.deepEqual(console.info.args, [
        [`(for help, run ${chalk.green("biome --help")})`],
        [`(use ${chalk.green("biome init [project]")} to create a new project)`],
        [`(use ${chalk.green("biome use <name>")} to activate)`],
        [ 'All biomes:' ],
        [ ' ', 'foo' ],
        [ ' ', 'bar' ],
        [ ' ', 'baz' ],
      ]);
    });
  });
  it("should indicate an active project", function() {
    process.env.BIOME_PROJECT = "foo";
    return ls().then(out => {
      assert.deepEqual(console.info.args, [
        [`(for help, run ${chalk.green("biome --help")})`],
        [`(use ${chalk.green("biome init [project]")} to create a new project)`],
        [`(use ${chalk.green("biome use <name>")} to activate)`],
        [ 'All biomes:' ],
        [ chalk.red('*'), 'foo' ],
        [ ' ', 'bar' ],
        [ ' ', 'baz' ],
      ]);
    });
  });
});
