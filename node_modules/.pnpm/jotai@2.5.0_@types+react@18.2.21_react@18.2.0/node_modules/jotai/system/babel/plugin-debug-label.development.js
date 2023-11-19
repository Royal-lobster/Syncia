System.register(['path', '@babel/template'], (function (exports) {
  'use strict';
  var path, _templateBuilder;
  return {
    setters: [function (module) {
      path = module.default;
    }, function (module) {
      _templateBuilder = module.default;
    }],
    execute: (function () {

      exports('default', debugLabelPlugin);

      function isAtom(t, callee, customAtomNames = []) {
        const atomNames = [...atomFunctionNames, ...customAtomNames];
        if (t.isIdentifier(callee) && atomNames.includes(callee.name)) {
          return true;
        }
        if (t.isMemberExpression(callee)) {
          const { property } = callee;
          if (t.isIdentifier(property) && atomNames.includes(property.name)) {
            return true;
          }
        }
        return false;
      }
      const atomFunctionNames = [
        // Core
        "atom",
        "atomFamily",
        "atomWithDefault",
        "atomWithObservable",
        "atomWithReducer",
        "atomWithReset",
        "atomWithStorage",
        "freezeAtom",
        "loadable",
        "selectAtom",
        "splitAtom",
        "unwrap",
        // jotai-xstate
        "atomWithMachine",
        // jotai-immer
        "atomWithImmer",
        // jotai-valtio
        "atomWithProxy",
        // jotai-trpc + jotai-relay
        "atomWithQuery",
        "atomWithMutation",
        "atomWithSubscription",
        // jotai-redux + jotai-zustand
        "atomWithStore",
        // jotai-location
        "atomWithHash",
        "atomWithLocation",
        // jotai-optics
        "focusAtom",
        // jotai-form
        "atomWithValidate",
        "validateAtoms",
        // jotai-cache
        "atomWithCache",
        // jotai-recoil
        "atomWithRecoilValue"
      ];

      const templateBuilder = _templateBuilder.default || _templateBuilder;
      function debugLabelPlugin({ types: t }, options) {
        return {
          visitor: {
            ExportDefaultDeclaration(nodePath, state) {
              const { node } = nodePath;
              if (t.isCallExpression(node.declaration) && isAtom(t, node.declaration.callee, options == null ? void 0 : options.customAtomNames)) {
                const filename = state.filename || "unknown";
                let displayName = path.basename(filename, path.extname(filename));
                if (displayName === "index") {
                  displayName = path.basename(path.dirname(filename));
                }
                const buildExport = templateBuilder(`
          const %%atomIdentifier%% = %%atom%%;
          export default %%atomIdentifier%%
          `);
                const ast = buildExport({
                  atomIdentifier: t.identifier(displayName),
                  atom: node.declaration
                });
                nodePath.replaceWithMultiple(ast);
              }
            },
            VariableDeclarator(path2) {
              if (t.isIdentifier(path2.node.id) && t.isCallExpression(path2.node.init) && isAtom(t, path2.node.init.callee, options == null ? void 0 : options.customAtomNames)) {
                path2.parentPath.insertAfter(
                  t.expressionStatement(
                    t.assignmentExpression(
                      "=",
                      t.memberExpression(
                        t.identifier(path2.node.id.name),
                        t.identifier("debugLabel")
                      ),
                      t.stringLiteral(path2.node.id.name)
                    )
                  )
                );
              }
            }
          }
        };
      }

    })
  };
}));
