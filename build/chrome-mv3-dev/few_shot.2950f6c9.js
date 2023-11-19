(function(define){var __define; typeof define === "function" && (__define=define,define=null);
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"9GEmg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Prompt template that contains few-shot examples.
 * @augments BasePromptTemplate
 * @augments FewShotPromptTemplateInput
 */ parcelHelpers.export(exports, "FewShotPromptTemplate", ()=>FewShotPromptTemplate);
var _baseJs = require("./base.js");
var _templateJs = require("./template.js");
var _promptJs = require("./prompt.js");
class FewShotPromptTemplate extends (0, _baseJs.BaseStringPromptTemplate) {
    constructor(input){
        super(input);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "examples", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "exampleSelector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "examplePrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "suffix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "exampleSeparator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "\n\n"
        });
        Object.defineProperty(this, "prefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "templateFormat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "f-string"
        });
        Object.defineProperty(this, "validateTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.assign(this, input);
        if (this.examples !== undefined && this.exampleSelector !== undefined) throw new Error("Only one of 'examples' and 'example_selector' should be provided");
        if (this.examples === undefined && this.exampleSelector === undefined) throw new Error("One of 'examples' and 'example_selector' should be provided");
        if (this.validateTemplate) {
            let totalInputVariables = this.inputVariables;
            if (this.partialVariables) totalInputVariables = totalInputVariables.concat(Object.keys(this.partialVariables));
            (0, _templateJs.checkValidTemplate)(this.prefix + this.suffix, this.templateFormat, totalInputVariables);
        }
    }
    _getPromptType() {
        return "few_shot";
    }
    async getExamples(inputVariables) {
        if (this.examples !== undefined) return this.examples;
        if (this.exampleSelector !== undefined) return this.exampleSelector.selectExamples(inputVariables);
        throw new Error("One of 'examples' and 'example_selector' should be provided");
    }
    async partial(values) {
        const newInputVariables = this.inputVariables.filter((iv)=>!(iv in values));
        const newPartialVariables = {
            ...this.partialVariables ?? {},
            ...values
        };
        const promptDict = {
            ...this,
            inputVariables: newInputVariables,
            partialVariables: newPartialVariables
        };
        return new FewShotPromptTemplate(promptDict);
    }
    /**
     * Formats the prompt with the given values.
     * @param values The values to format the prompt with.
     * @returns A promise that resolves to a string representing the formatted prompt.
     */ async format(values) {
        const allValues = await this.mergePartialAndUserVariables(values);
        const examples = await this.getExamples(allValues);
        const exampleStrings = await Promise.all(examples.map((example)=>this.examplePrompt.format(example)));
        const template = [
            this.prefix,
            ...exampleStrings,
            this.suffix
        ].join(this.exampleSeparator);
        return (0, _templateJs.renderTemplate)(template, this.templateFormat, allValues);
    }
    serialize() {
        if (this.exampleSelector || !this.examples) throw new Error("Serializing an example selector is not currently supported");
        if (this.outputParser !== undefined) throw new Error("Serializing an output parser is not currently supported");
        return {
            _type: this._getPromptType(),
            input_variables: this.inputVariables,
            example_prompt: this.examplePrompt.serialize(),
            example_separator: this.exampleSeparator,
            suffix: this.suffix,
            prefix: this.prefix,
            template_format: this.templateFormat,
            examples: this.examples
        };
    }
    static async deserialize(data) {
        const { example_prompt } = data;
        if (!example_prompt) throw new Error("Missing example prompt");
        const examplePrompt = await (0, _promptJs.PromptTemplate).deserialize(example_prompt);
        let examples;
        if (Array.isArray(data.examples)) examples = data.examples;
        else throw new Error("Invalid examples format. Only list or string are supported.");
        return new FewShotPromptTemplate({
            inputVariables: data.input_variables,
            examplePrompt,
            examples,
            exampleSeparator: data.example_separator,
            prefix: data.prefix,
            suffix: data.suffix,
            templateFormat: data.template_format
        });
    }
}

},{"./base.js":"1X18e","./template.js":"58AXt","./prompt.js":"a0rUj","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}]},[], null, "parcelRequire5833")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNyQjtZQUNBO1lBQ0Esa0JBQWtCLEtBQUs7WUFDdkIsUUFBUSxLQUFLO1lBQ2IsUUFBUSxLQUFLO1lBQ2IsZ0JBQWdCLEtBQUs7UUFDekI7SUFDSjtBQUNKIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvLnBucG0vbGFuZ2NoYWluQDAuMC4xNTFfYXhpb3NAMS42LjAvbm9kZV9tb2R1bGVzL2xhbmdjaGFpbi9kaXN0L3Byb21wdHMvZmV3X3Nob3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVN0cmluZ1Byb21wdFRlbXBsYXRlLCB9IGZyb20gXCIuL2Jhc2UuanNcIjtcbmltcG9ydCB7IGNoZWNrVmFsaWRUZW1wbGF0ZSwgcmVuZGVyVGVtcGxhdGUsIH0gZnJvbSBcIi4vdGVtcGxhdGUuanNcIjtcbmltcG9ydCB7IFByb21wdFRlbXBsYXRlIH0gZnJvbSBcIi4vcHJvbXB0LmpzXCI7XG4vKipcbiAqIFByb21wdCB0ZW1wbGF0ZSB0aGF0IGNvbnRhaW5zIGZldy1zaG90IGV4YW1wbGVzLlxuICogQGF1Z21lbnRzIEJhc2VQcm9tcHRUZW1wbGF0ZVxuICogQGF1Z21lbnRzIEZld1Nob3RQcm9tcHRUZW1wbGF0ZUlucHV0XG4gKi9cbmV4cG9ydCBjbGFzcyBGZXdTaG90UHJvbXB0VGVtcGxhdGUgZXh0ZW5kcyBCYXNlU3RyaW5nUHJvbXB0VGVtcGxhdGUge1xuICAgIGNvbnN0cnVjdG9yKGlucHV0KSB7XG4gICAgICAgIHN1cGVyKGlucHV0KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibGNfc2VyaWFsaXphYmxlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZXhhbXBsZXNcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZXhhbXBsZVNlbGVjdG9yXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImV4YW1wbGVQcm9tcHRcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwic3VmZml4XCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBcIlwiXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJleGFtcGxlU2VwYXJhdG9yXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBcIlxcblxcblwiXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJwcmVmaXhcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IFwiXCJcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInRlbXBsYXRlRm9ybWF0XCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBcImYtc3RyaW5nXCJcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInZhbGlkYXRlVGVtcGxhdGVcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5wdXQpO1xuICAgICAgICBpZiAodGhpcy5leGFtcGxlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuZXhhbXBsZVNlbGVjdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgb25lIG9mICdleGFtcGxlcycgYW5kICdleGFtcGxlX3NlbGVjdG9yJyBzaG91bGQgYmUgcHJvdmlkZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZXhhbXBsZXMgPT09IHVuZGVmaW5lZCAmJiB0aGlzLmV4YW1wbGVTZWxlY3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmUgb2YgJ2V4YW1wbGVzJyBhbmQgJ2V4YW1wbGVfc2VsZWN0b3InIHNob3VsZCBiZSBwcm92aWRlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVRlbXBsYXRlKSB7XG4gICAgICAgICAgICBsZXQgdG90YWxJbnB1dFZhcmlhYmxlcyA9IHRoaXMuaW5wdXRWYXJpYWJsZXM7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJ0aWFsVmFyaWFibGVzKSB7XG4gICAgICAgICAgICAgICAgdG90YWxJbnB1dFZhcmlhYmxlcyA9IHRvdGFsSW5wdXRWYXJpYWJsZXMuY29uY2F0KE9iamVjdC5rZXlzKHRoaXMucGFydGlhbFZhcmlhYmxlcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hlY2tWYWxpZFRlbXBsYXRlKHRoaXMucHJlZml4ICsgdGhpcy5zdWZmaXgsIHRoaXMudGVtcGxhdGVGb3JtYXQsIHRvdGFsSW5wdXRWYXJpYWJsZXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRQcm9tcHRUeXBlKCkge1xuICAgICAgICByZXR1cm4gXCJmZXdfc2hvdFwiO1xuICAgIH1cbiAgICBhc3luYyBnZXRFeGFtcGxlcyhpbnB1dFZhcmlhYmxlcykge1xuICAgICAgICBpZiAodGhpcy5leGFtcGxlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGFtcGxlcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5leGFtcGxlU2VsZWN0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhhbXBsZVNlbGVjdG9yLnNlbGVjdEV4YW1wbGVzKGlucHV0VmFyaWFibGVzKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmUgb2YgJ2V4YW1wbGVzJyBhbmQgJ2V4YW1wbGVfc2VsZWN0b3InIHNob3VsZCBiZSBwcm92aWRlZFwiKTtcbiAgICB9XG4gICAgYXN5bmMgcGFydGlhbCh2YWx1ZXMpIHtcbiAgICAgICAgY29uc3QgbmV3SW5wdXRWYXJpYWJsZXMgPSB0aGlzLmlucHV0VmFyaWFibGVzLmZpbHRlcigoaXYpID0+ICEoaXYgaW4gdmFsdWVzKSk7XG4gICAgICAgIGNvbnN0IG5ld1BhcnRpYWxWYXJpYWJsZXMgPSB7XG4gICAgICAgICAgICAuLi4odGhpcy5wYXJ0aWFsVmFyaWFibGVzID8/IHt9KSxcbiAgICAgICAgICAgIC4uLnZhbHVlcyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcHJvbXB0RGljdCA9IHtcbiAgICAgICAgICAgIC4uLnRoaXMsXG4gICAgICAgICAgICBpbnB1dFZhcmlhYmxlczogbmV3SW5wdXRWYXJpYWJsZXMsXG4gICAgICAgICAgICBwYXJ0aWFsVmFyaWFibGVzOiBuZXdQYXJ0aWFsVmFyaWFibGVzLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IEZld1Nob3RQcm9tcHRUZW1wbGF0ZShwcm9tcHREaWN0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRm9ybWF0cyB0aGUgcHJvbXB0IHdpdGggdGhlIGdpdmVuIHZhbHVlcy5cbiAgICAgKiBAcGFyYW0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gZm9ybWF0IHRoZSBwcm9tcHQgd2l0aC5cbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGZvcm1hdHRlZCBwcm9tcHQuXG4gICAgICovXG4gICAgYXN5bmMgZm9ybWF0KHZhbHVlcykge1xuICAgICAgICBjb25zdCBhbGxWYWx1ZXMgPSBhd2FpdCB0aGlzLm1lcmdlUGFydGlhbEFuZFVzZXJWYXJpYWJsZXModmFsdWVzKTtcbiAgICAgICAgY29uc3QgZXhhbXBsZXMgPSBhd2FpdCB0aGlzLmdldEV4YW1wbGVzKGFsbFZhbHVlcyk7XG4gICAgICAgIGNvbnN0IGV4YW1wbGVTdHJpbmdzID0gYXdhaXQgUHJvbWlzZS5hbGwoZXhhbXBsZXMubWFwKChleGFtcGxlKSA9PiB0aGlzLmV4YW1wbGVQcm9tcHQuZm9ybWF0KGV4YW1wbGUpKSk7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gW3RoaXMucHJlZml4LCAuLi5leGFtcGxlU3RyaW5ncywgdGhpcy5zdWZmaXhdLmpvaW4odGhpcy5leGFtcGxlU2VwYXJhdG9yKTtcbiAgICAgICAgcmV0dXJuIHJlbmRlclRlbXBsYXRlKHRlbXBsYXRlLCB0aGlzLnRlbXBsYXRlRm9ybWF0LCBhbGxWYWx1ZXMpO1xuICAgIH1cbiAgICBzZXJpYWxpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLmV4YW1wbGVTZWxlY3RvciB8fCAhdGhpcy5leGFtcGxlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VyaWFsaXppbmcgYW4gZXhhbXBsZSBzZWxlY3RvciBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vdXRwdXRQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VyaWFsaXppbmcgYW4gb3V0cHV0IHBhcnNlciBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgX3R5cGU6IHRoaXMuX2dldFByb21wdFR5cGUoKSxcbiAgICAgICAgICAgIGlucHV0X3ZhcmlhYmxlczogdGhpcy5pbnB1dFZhcmlhYmxlcyxcbiAgICAgICAgICAgIGV4YW1wbGVfcHJvbXB0OiB0aGlzLmV4YW1wbGVQcm9tcHQuc2VyaWFsaXplKCksXG4gICAgICAgICAgICBleGFtcGxlX3NlcGFyYXRvcjogdGhpcy5leGFtcGxlU2VwYXJhdG9yLFxuICAgICAgICAgICAgc3VmZml4OiB0aGlzLnN1ZmZpeCxcbiAgICAgICAgICAgIHByZWZpeDogdGhpcy5wcmVmaXgsXG4gICAgICAgICAgICB0ZW1wbGF0ZV9mb3JtYXQ6IHRoaXMudGVtcGxhdGVGb3JtYXQsXG4gICAgICAgICAgICBleGFtcGxlczogdGhpcy5leGFtcGxlcyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGFzeW5jIGRlc2VyaWFsaXplKGRhdGEpIHtcbiAgICAgICAgY29uc3QgeyBleGFtcGxlX3Byb21wdCB9ID0gZGF0YTtcbiAgICAgICAgaWYgKCFleGFtcGxlX3Byb21wdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBleGFtcGxlIHByb21wdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBleGFtcGxlUHJvbXB0ID0gYXdhaXQgUHJvbXB0VGVtcGxhdGUuZGVzZXJpYWxpemUoZXhhbXBsZV9wcm9tcHQpO1xuICAgICAgICBsZXQgZXhhbXBsZXM7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEuZXhhbXBsZXMpKSB7XG4gICAgICAgICAgICBleGFtcGxlcyA9IGRhdGEuZXhhbXBsZXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGV4YW1wbGVzIGZvcm1hdC4gT25seSBsaXN0IG9yIHN0cmluZyBhcmUgc3VwcG9ydGVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEZld1Nob3RQcm9tcHRUZW1wbGF0ZSh7XG4gICAgICAgICAgICBpbnB1dFZhcmlhYmxlczogZGF0YS5pbnB1dF92YXJpYWJsZXMsXG4gICAgICAgICAgICBleGFtcGxlUHJvbXB0LFxuICAgICAgICAgICAgZXhhbXBsZXMsXG4gICAgICAgICAgICBleGFtcGxlU2VwYXJhdG9yOiBkYXRhLmV4YW1wbGVfc2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJlZml4OiBkYXRhLnByZWZpeCxcbiAgICAgICAgICAgIHN1ZmZpeDogZGF0YS5zdWZmaXgsXG4gICAgICAgICAgICB0ZW1wbGF0ZUZvcm1hdDogZGF0YS50ZW1wbGF0ZV9mb3JtYXQsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJmZXdfc2hvdC4yOTUwZjZjOS5qcy5tYXAifQ==
 globalThis.define=__define;  })(globalThis.define);