"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecifierType = exports.Priority = exports.ExportsCondition = exports.BundleBehaviorNames = exports.BundleBehavior = void 0;
const SpecifierType = {
  esm: 0,
  commonjs: 1,
  url: 2,
  custom: 3
};
exports.SpecifierType = SpecifierType;
const Priority = {
  sync: 0,
  parallel: 1,
  lazy: 2
};

// Must match package_json.rs in node-resolver-rs.
exports.Priority = Priority;
const ExportsCondition = {
  import: 1 << 0,
  require: 1 << 1,
  module: 1 << 2,
  style: 1 << 12,
  sass: 1 << 13,
  less: 1 << 14,
  stylus: 1 << 15
};
exports.ExportsCondition = ExportsCondition;
const BundleBehavior = {
  inline: 0,
  isolated: 1
};
exports.BundleBehavior = BundleBehavior;
const BundleBehaviorNames = Object.keys(BundleBehavior);

// Asset group nodes are essentially used as placeholders for the results of an asset request
exports.BundleBehaviorNames = BundleBehaviorNames;