"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetGraphBuilder = void 0;
exports.default = createAssetGraphRequest;
function _assert() {
  const data = _interopRequireDefault(require("assert"));
  _assert = function () {
    return data;
  };
  return data;
}
function _nullthrows() {
  const data = _interopRequireDefault(require("nullthrows"));
  _nullthrows = function () {
    return data;
  };
  return data;
}
function _utils() {
  const data = require("@parcel/utils");
  _utils = function () {
    return data;
  };
  return data;
}
function _hash() {
  const data = require("@parcel/hash");
  _hash = function () {
    return data;
  };
  return data;
}
function _diagnostic() {
  const data = _interopRequireDefault(require("@parcel/diagnostic"));
  _diagnostic = function () {
    return data;
  };
  return data;
}
var _types = require("../types");
var _AssetGraph = _interopRequireDefault(require("../AssetGraph"));
var _constants = require("../constants");
var _EntryRequest = _interopRequireDefault(require("./EntryRequest"));
var _TargetRequest = _interopRequireDefault(require("./TargetRequest"));
var _AssetRequest = _interopRequireDefault(require("./AssetRequest"));
var _PathRequest = _interopRequireDefault(require("./PathRequest"));
var _dumpGraphToGraphViz = _interopRequireDefault(require("../dumpGraphToGraphViz"));
var _SymbolPropagation = require("../SymbolPropagation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function createAssetGraphRequest(input) {
  return {
    type: 'asset_graph_request',
    id: input.name,
    run: async input => {
      let prevResult = await input.api.getPreviousResult();
      let builder = new AssetGraphBuilder(input, prevResult);
      let assetGraphRequest = await await builder.build();

      // early break for incremental bundling if production or flag is off;
      if (!input.options.shouldBundleIncrementally || input.options.mode === 'production') {
        assetGraphRequest.assetGraph.safeToIncrementallyBundle = false;
      }
      return assetGraphRequest;
    },
    input
  };
}
const typesWithRequests = new Set(['entry_specifier', 'entry_file', 'dependency', 'asset_group']);
class AssetGraphBuilder {
  assetRequests = [];
  constructor({
    input,
    api,
    options
  }, prevResult) {
    var _prevResult$assetGrap, _prevResult$assetGrou, _prevResult$previousS, _prevResult$changedAs, _prevResult$changedAs2, _JSON$stringify;
    let {
      entries,
      assetGroups,
      optionsRef,
      name,
      requestedAssetIds,
      shouldBuildLazily
    } = input;
    let assetGraph = (_prevResult$assetGrap = prevResult === null || prevResult === void 0 ? void 0 : prevResult.assetGraph) !== null && _prevResult$assetGrap !== void 0 ? _prevResult$assetGrap : new _AssetGraph.default();
    assetGraph.safeToIncrementallyBundle = true;
    assetGraph.setRootConnections({
      entries,
      assetGroups
    });
    this.assetGroupsWithRemovedParents = (_prevResult$assetGrou = prevResult === null || prevResult === void 0 ? void 0 : prevResult.assetGroupsWithRemovedParents) !== null && _prevResult$assetGrou !== void 0 ? _prevResult$assetGrou : new Set();
    this.previousSymbolPropagationErrors = (_prevResult$previousS = prevResult === null || prevResult === void 0 ? void 0 : prevResult.previousSymbolPropagationErrors) !== null && _prevResult$previousS !== void 0 ? _prevResult$previousS : new Map();
    this.changedAssets = (_prevResult$changedAs = prevResult === null || prevResult === void 0 ? void 0 : prevResult.changedAssets) !== null && _prevResult$changedAs !== void 0 ? _prevResult$changedAs : new Map();
    this.changedAssetsPropagation = (_prevResult$changedAs2 = prevResult === null || prevResult === void 0 ? void 0 : prevResult.changedAssetsPropagation) !== null && _prevResult$changedAs2 !== void 0 ? _prevResult$changedAs2 : new Set();
    this.assetGraph = assetGraph;
    this.optionsRef = optionsRef;
    this.options = options;
    this.api = api;
    this.name = name;
    this.requestedAssetIds = requestedAssetIds !== null && requestedAssetIds !== void 0 ? requestedAssetIds : new Set();
    this.shouldBuildLazily = shouldBuildLazily !== null && shouldBuildLazily !== void 0 ? shouldBuildLazily : false;
    this.cacheKey = (0, _hash().hashString)(`${_constants.PARCEL_VERSION}${name}${(_JSON$stringify = JSON.stringify(entries)) !== null && _JSON$stringify !== void 0 ? _JSON$stringify : ''}${options.mode}`);
    this.isSingleChangeRebuild = api.getInvalidSubRequests().filter(req => req.type === 'asset_request').length === 1;
    this.queue = new (_utils().PromiseQueue)();
    assetGraph.onNodeRemoved = nodeId => {
      this.assetGroupsWithRemovedParents.delete(nodeId);

      // This needs to mark all connected nodes that doesn't become orphaned
      // due to replaceNodesConnectedTo to make sure that the symbols of
      // nodes from which at least one parent was removed are updated.
      let node = (0, _nullthrows().default)(assetGraph.getNode(nodeId));
      if (assetGraph.isOrphanedNode(nodeId) && node.type === 'dependency') {
        let children = assetGraph.getNodeIdsConnectedFrom(nodeId);
        for (let child of children) {
          let childNode = (0, _nullthrows().default)(assetGraph.getNode(child));
          (0, _assert().default)(childNode.type === 'asset_group' || childNode.type === 'asset');
          childNode.usedSymbolsDownDirty = true;
          this.assetGroupsWithRemovedParents.add(child);
        }
      }
    };
  }
  async build() {
    let errors = [];
    let rootNodeId = (0, _nullthrows().default)(this.assetGraph.rootNodeId, 'A root node is required to traverse');
    let visited = new Set([rootNodeId]);
    const visit = nodeId => {
      if (errors.length > 0) {
        return;
      }
      if (this.shouldSkipRequest(nodeId)) {
        visitChildren(nodeId);
      } else {
        // ? do we need to visit children inside of the promise that is queued?
        this.queueCorrespondingRequest(nodeId, errors).then(() => visitChildren(nodeId));
      }
    };
    const visitChildren = nodeId => {
      for (let childNodeId of this.assetGraph.getNodeIdsConnectedFrom(nodeId)) {
        let child = (0, _nullthrows().default)(this.assetGraph.getNode(childNodeId));
        if ((!visited.has(childNodeId) || child.hasDeferred) && this.shouldVisitChild(nodeId, childNodeId)) {
          visited.add(childNodeId);
          visit(childNodeId);
        }
      }
    };
    visit(rootNodeId);
    await this.queue.run();
    if (errors.length) {
      this.api.storeResult({
        assetGraph: this.assetGraph,
        changedAssets: this.changedAssets,
        changedAssetsPropagation: this.changedAssetsPropagation,
        assetGroupsWithRemovedParents: this.assetGroupsWithRemovedParents,
        previousSymbolPropagationErrors: undefined,
        assetRequests: []
      }, this.cacheKey);

      // TODO: eventually support multiple errors since requests could reject in parallel
      throw errors[0];
    }
    if (this.assetGraph.nodes.size > 1) {
      await (0, _dumpGraphToGraphViz.default)(this.assetGraph, 'AssetGraph_' + this.name + '_before_prop');
      try {
        let errors = (0, _SymbolPropagation.propagateSymbols)({
          options: this.options,
          assetGraph: this.assetGraph,
          changedAssetsPropagation: this.changedAssetsPropagation,
          assetGroupsWithRemovedParents: this.assetGroupsWithRemovedParents,
          previousErrors: this.previousSymbolPropagationErrors
        });
        this.changedAssetsPropagation.clear();
        if (errors.size > 0) {
          this.api.storeResult({
            assetGraph: this.assetGraph,
            changedAssets: this.changedAssets,
            changedAssetsPropagation: this.changedAssetsPropagation,
            assetGroupsWithRemovedParents: this.assetGroupsWithRemovedParents,
            previousSymbolPropagationErrors: errors,
            assetRequests: []
          }, this.cacheKey);

          // Just throw the first error. Since errors can bubble (e.g. reexporting a reexported symbol also fails),
          // determining which failing export is the root cause is nontrivial (because of circular dependencies).
          throw new (_diagnostic().default)({
            diagnostic: [...errors.values()][0]
          });
        }
      } catch (e) {
        await (0, _dumpGraphToGraphViz.default)(this.assetGraph, 'AssetGraph_' + this.name + '_failed');
        throw e;
      }
    }
    await (0, _dumpGraphToGraphViz.default)(this.assetGraph, 'AssetGraph_' + this.name);
    this.api.storeResult({
      assetGraph: this.assetGraph,
      changedAssets: new Map(),
      changedAssetsPropagation: this.changedAssetsPropagation,
      assetGroupsWithRemovedParents: undefined,
      previousSymbolPropagationErrors: undefined,
      assetRequests: []
    }, this.cacheKey);
    return {
      assetGraph: this.assetGraph,
      changedAssets: this.changedAssets,
      changedAssetsPropagation: this.changedAssetsPropagation,
      assetGroupsWithRemovedParents: undefined,
      previousSymbolPropagationErrors: undefined,
      assetRequests: this.assetRequests
    };
  }
  shouldVisitChild(nodeId, childNodeId) {
    if (this.shouldBuildLazily) {
      let node = (0, _nullthrows().default)(this.assetGraph.getNode(nodeId));
      let childNode = (0, _nullthrows().default)(this.assetGraph.getNode(childNodeId));
      if (node.type === 'asset' && childNode.type === 'dependency') {
        if (this.requestedAssetIds.has(node.value.id)) {
          node.requested = true;
        } else if (!node.requested) {
          let isAsyncChild = this.assetGraph.getIncomingDependencies(node.value).every(dep => dep.isEntry || dep.priority !== _types.Priority.sync);
          if (isAsyncChild) {
            node.requested = false;
          } else {
            delete node.requested;
          }
        }
        let previouslyDeferred = childNode.deferred;
        childNode.deferred = node.requested === false;
        if (!previouslyDeferred && childNode.deferred) {
          this.assetGraph.markParentsWithHasDeferred(childNodeId);
        } else if (previouslyDeferred && !childNode.deferred) {
          this.assetGraph.unmarkParentsWithHasDeferred(childNodeId);
        }
        return !childNode.deferred;
      }
    }
    return this.assetGraph.shouldVisitChild(nodeId, childNodeId);
  }
  shouldSkipRequest(nodeId) {
    let node = (0, _nullthrows().default)(this.assetGraph.getNode(nodeId));
    return node.complete === true || !typesWithRequests.has(node.type) || node.correspondingRequest != null && this.api.canSkipSubrequest(node.correspondingRequest);
  }
  queueCorrespondingRequest(nodeId, errors) {
    let promise;
    let node = (0, _nullthrows().default)(this.assetGraph.getNode(nodeId));
    switch (node.type) {
      case 'entry_specifier':
        promise = this.runEntryRequest(node.value);
        break;
      case 'entry_file':
        promise = this.runTargetRequest(node.value);
        break;
      case 'dependency':
        promise = this.runPathRequest(node.value);
        break;
      case 'asset_group':
        promise = this.runAssetRequest(node.value);
        break;
      default:
        throw new Error(`Can not queue corresponding request of node with type ${node.type}`);
    }
    return this.queue.add(() => promise.then(null, error => errors.push(error)));
  }
  async runEntryRequest(input) {
    let prevEntries = this.assetGraph.safeToIncrementallyBundle ? this.assetGraph.getEntryAssets().map(asset => asset.id).sort() : [];
    let request = (0, _EntryRequest.default)(input);
    let result = await this.api.runRequest(request, {
      force: true
    });
    this.assetGraph.resolveEntry(request.input, result.entries, request.id);
    if (this.assetGraph.safeToIncrementallyBundle) {
      let currentEntries = this.assetGraph.getEntryAssets().map(asset => asset.id).sort();
      let didEntriesChange = prevEntries.length !== currentEntries.length || prevEntries.every((entryId, index) => entryId === currentEntries[index]);
      if (didEntriesChange) {
        this.assetGraph.safeToIncrementallyBundle = false;
      }
    }
  }
  async runTargetRequest(input) {
    let request = (0, _TargetRequest.default)(input);
    let targets = await this.api.runRequest(request, {
      force: true
    });
    this.assetGraph.resolveTargets(request.input, targets, request.id);
  }
  async runPathRequest(input) {
    let request = (0, _PathRequest.default)({
      dependency: input,
      name: this.name
    });
    let result = await this.api.runRequest(request, {
      force: true
    });
    this.assetGraph.resolveDependency(input, result, request.id);
  }
  async runAssetRequest(input) {
    this.assetRequests.push(input);
    let request = (0, _AssetRequest.default)({
      ...input,
      name: this.name,
      optionsRef: this.optionsRef,
      isSingleChangeRebuild: this.isSingleChangeRebuild
    });
    let assets = await this.api.runRequest(request, {
      force: true
    });
    if (assets != null) {
      for (let asset of assets) {
        if (this.assetGraph.safeToIncrementallyBundle) {
          let otherAsset = this.assetGraph.getNodeByContentKey(asset.id);
          if (otherAsset != null) {
            (0, _assert().default)(otherAsset.type === 'asset');
            if (!this._areDependenciesEqualForAssets(asset, otherAsset.value)) {
              this.assetGraph.safeToIncrementallyBundle = false;
            }
          } else {
            // adding a new entry or dependency
            this.assetGraph.safeToIncrementallyBundle = false;
          }
        }
        this.changedAssets.set(asset.id, asset);
        this.changedAssetsPropagation.add(asset.id);
      }
      this.assetGraph.resolveAssetGroup(input, assets, request.id);
    } else {
      this.assetGraph.safeToIncrementallyBundle = false;
    }
    this.isSingleChangeRebuild = false;
  }

  /**
   * Used for incremental bundling of modified assets
   */
  _areDependenciesEqualForAssets(asset, otherAsset) {
    let assetDependencies = Array.from(asset === null || asset === void 0 ? void 0 : asset.dependencies.keys()).sort();
    let otherAssetDependencies = Array.from(otherAsset === null || otherAsset === void 0 ? void 0 : otherAsset.dependencies.keys()).sort();
    if (assetDependencies.length !== otherAssetDependencies.length) {
      return false;
    }
    return assetDependencies.every((key, index) => {
      var _asset$dependencies$g, _asset$dependencies$g2, _otherAsset$dependenc, _otherAsset$dependenc2;
      if (key !== otherAssetDependencies[index]) {
        return false;
      }
      return (0, _utils().setEqual)(new Set(asset === null || asset === void 0 ? void 0 : (_asset$dependencies$g = asset.dependencies.get(key)) === null || _asset$dependencies$g === void 0 ? void 0 : (_asset$dependencies$g2 = _asset$dependencies$g.symbols) === null || _asset$dependencies$g2 === void 0 ? void 0 : _asset$dependencies$g2.keys()), new Set(otherAsset === null || otherAsset === void 0 ? void 0 : (_otherAsset$dependenc = otherAsset.dependencies.get(key)) === null || _otherAsset$dependenc === void 0 ? void 0 : (_otherAsset$dependenc2 = _otherAsset$dependenc.symbols) === null || _otherAsset$dependenc2 === void 0 ? void 0 : _otherAsset$dependenc2.keys()));
    });
  }
}
exports.AssetGraphBuilder = AssetGraphBuilder;