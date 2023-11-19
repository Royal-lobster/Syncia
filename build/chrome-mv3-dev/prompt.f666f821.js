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
})({"a0rUj":[function(require,module,exports) {
// Default generic "any" values are for backwards compatibility.
// Replace with "string" when we are comfortable with a breaking change.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Schema to represent a basic prompt for an LLM.
 * @augments BasePromptTemplate
 * @augments PromptTemplateInput
 *
 * @example
 * ```ts
 * import { PromptTemplate } from "langchain/prompts";
 *
 * const prompt = new PromptTemplate({
 *   inputVariables: ["foo"],
 *   template: "Say {foo}",
 * });
 * ```
 */ parcelHelpers.export(exports, "PromptTemplate", ()=>PromptTemplate);
var _baseJs = require("./base.js");
var _templateJs = require("./template.js");
class PromptTemplate extends (0, _baseJs.BaseStringPromptTemplate) {
    static lc_name() {
        return "PromptTemplate";
    }
    constructor(input){
        super(input);
        Object.defineProperty(this, "template", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
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
        if (this.validateTemplate) {
            let totalInputVariables = this.inputVariables;
            if (this.partialVariables) totalInputVariables = totalInputVariables.concat(Object.keys(this.partialVariables));
            (0, _templateJs.checkValidTemplate)(this.template, this.templateFormat, totalInputVariables);
        }
    }
    _getPromptType() {
        return "prompt";
    }
    /**
     * Formats the prompt template with the provided values.
     * @param values The values to be used to format the prompt template.
     * @returns A promise that resolves to a string which is the formatted prompt.
     */ async format(values) {
        const allValues = await this.mergePartialAndUserVariables(values);
        return (0, _templateJs.renderTemplate)(this.template, this.templateFormat, allValues);
    }
    /**
     * Take examples in list format with prefix and suffix to create a prompt.
     *
     * Intended to be used a a way to dynamically create a prompt from examples.
     *
     * @param examples - List of examples to use in the prompt.
     * @param suffix - String to go after the list of examples. Should generally set up the user's input.
     * @param inputVariables - A list of variable names the final prompt template will expect
     * @param exampleSeparator - The separator to use in between examples
     * @param prefix - String that should go before any examples. Generally includes examples.
     *
     * @returns The final prompt template generated.
     */ static fromExamples(examples, suffix, inputVariables, exampleSeparator = "\n\n", prefix = "") {
        const template = [
            prefix,
            ...examples,
            suffix
        ].join(exampleSeparator);
        return new PromptTemplate({
            inputVariables,
            template
        });
    }
    /**
     * Load prompt template from a template f-string
     */ static fromTemplate(template, { templateFormat = "f-string", ...rest } = {}) {
        if (templateFormat === "jinja2") throw new Error("jinja2 templates are not currently supported.");
        const names = new Set();
        (0, _templateJs.parseTemplate)(template, templateFormat).forEach((node)=>{
            if (node.type === "variable") names.add(node.name);
        });
        return new PromptTemplate({
            // Rely on extracted types
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            inputVariables: [
                ...names
            ],
            templateFormat,
            template,
            ...rest
        });
    }
    /**
     * Partially applies values to the prompt template.
     * @param values The values to be partially applied to the prompt template.
     * @returns A new instance of PromptTemplate with the partially applied values.
     */ async partial(values) {
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
        return new PromptTemplate(promptDict);
    }
    serialize() {
        if (this.outputParser !== undefined) throw new Error("Cannot serialize a prompt template with an output parser");
        return {
            _type: this._getPromptType(),
            input_variables: this.inputVariables,
            template: this.template,
            template_format: this.templateFormat
        };
    }
    static async deserialize(data) {
        if (!data.template) throw new Error("Prompt template must have a template");
        const res = new PromptTemplate({
            inputVariables: data.input_variables,
            template: data.template,
            templateFormat: data.template_format
        });
        return res;
    }
}

},{"./base.js":"1X18e","./template.js":"58AXt","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"1X18e":[function(require,module,exports) {
// Default generic "any" values are for backwards compatibility.
// Replace with "string" when we are comfortable with a breaking change.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a prompt value as a string. It extends the BasePromptValue
 * class and overrides the toString and toChatMessages methods.
 */ parcelHelpers.export(exports, "StringPromptValue", ()=>StringPromptValue);
/**
 * Base class for prompt templates. Exposes a format method that returns a
 * string prompt given a set of input values.
 */ parcelHelpers.export(exports, "BasePromptTemplate", ()=>BasePromptTemplate);
/**
 * Base class for string prompt templates. It extends the
 * BasePromptTemplate class and overrides the formatPromptValue method to
 * return a StringPromptValue.
 */ parcelHelpers.export(exports, "BaseStringPromptTemplate", ()=>BaseStringPromptTemplate);
/**
 * Base class for example selectors.
 */ parcelHelpers.export(exports, "BaseExampleSelector", ()=>BaseExampleSelector);
var _indexJs = require("../schema/index.js");
var _serializableJs = require("../load/serializable.js");
var _indexJs1 = require("../schema/runnable/index.js");
class StringPromptValue extends (0, _indexJs.BasePromptValue) {
    constructor(value){
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "prompts",
                "base"
            ]
        });
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.value = value;
    }
    toString() {
        return this.value;
    }
    toChatMessages() {
        return [
            new (0, _indexJs.HumanMessage)(this.value)
        ];
    }
}
class BasePromptTemplate extends (0, _indexJs1.Runnable) {
    get lc_attributes() {
        return {
            partialVariables: undefined
        };
    }
    constructor(input){
        super(input);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "prompts",
                this._getPromptType()
            ]
        });
        Object.defineProperty(this, "inputVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "partialVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { inputVariables } = input;
        if (inputVariables.includes("stop")) throw new Error("Cannot have an input variable named 'stop', as it is used internally, please rename.");
        Object.assign(this, input);
    }
    /**
     * Merges partial variables and user variables.
     * @param userVariables The user variables to merge with the partial variables.
     * @returns A Promise that resolves to an object containing the merged variables.
     */ async mergePartialAndUserVariables(userVariables) {
        const partialVariables = this.partialVariables ?? {};
        const partialValues = {};
        for (const [key, value] of Object.entries(partialVariables))if (typeof value === "string") partialValues[key] = value;
        else partialValues[key] = await value();
        const allKwargs = {
            ...partialValues,
            ...userVariables
        };
        return allKwargs;
    }
    /**
     * Invokes the prompt template with the given input and options.
     * @param input The input to invoke the prompt template with.
     * @param options Optional configuration for the callback.
     * @returns A Promise that resolves to the output of the prompt template.
     */ async invoke(input, options) {
        return this._callWithConfig((input)=>this.formatPromptValue(input), input, {
            ...options,
            runType: "prompt"
        });
    }
    /**
     * Return a json-like object representing this prompt template.
     * @deprecated
     */ serialize() {
        throw new Error("Use .toJSON() instead");
    }
    /**
     * @deprecated
     * Load a prompt template from a json-like object describing it.
     *
     * @remarks
     * Deserializing needs to be async because templates (e.g. {@link FewShotPromptTemplate}) can
     * reference remote resources that we read asynchronously with a web
     * request.
     */ static async deserialize(data) {
        switch(data._type){
            case "prompt":
                {
                    const { PromptTemplate } = await require("eebb253d28fc8e85");
                    return PromptTemplate.deserialize(data);
                }
            case undefined:
                {
                    const { PromptTemplate } = await require("eebb253d28fc8e85");
                    return PromptTemplate.deserialize({
                        ...data,
                        _type: "prompt"
                    });
                }
            case "few_shot":
                {
                    const { FewShotPromptTemplate } = await require("adcc742134c24332");
                    return FewShotPromptTemplate.deserialize(data);
                }
            default:
                throw new Error(`Invalid prompt type in config: ${data._type}`);
        }
    }
}
class BaseStringPromptTemplate extends BasePromptTemplate {
    /**
     * Formats the prompt given the input values and returns a formatted
     * prompt value.
     * @param values The input values to format the prompt.
     * @returns A Promise that resolves to a formatted prompt value.
     */ async formatPromptValue(values) {
        const formattedPrompt = await this.format(values);
        return new StringPromptValue(formattedPrompt);
    }
}
class BaseExampleSelector extends (0, _serializableJs.Serializable) {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "prompts",
                "selectors"
            ]
        });
    }
}

},{"../schema/index.js":"d5Hnz","../load/serializable.js":"c7QBM","../schema/runnable/index.js":"93LxA","eebb253d28fc8e85":"eM6b7","adcc742134c24332":"aAn3W","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"d5Hnz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RUN_KEY", ()=>RUN_KEY);
/**
 * Chunk of a single generation. Used for streaming.
 */ parcelHelpers.export(exports, "GenerationChunk", ()=>GenerationChunk);
/**
 * Base class for all types of messages in a conversation. It includes
 * properties like `content`, `name`, and `additional_kwargs`. It also
 * includes methods like `toDict()` and `_getType()`.
 */ parcelHelpers.export(exports, "BaseMessage", ()=>BaseMessage);
/**
 * Represents a chunk of a message, which can be concatenated with other
 * message chunks. It includes a method `_merge_kwargs_dict()` for merging
 * additional keyword arguments from another `BaseMessageChunk` into this
 * one. It also overrides the `__add__()` method to support concatenation
 * of `BaseMessageChunk` instances.
 */ parcelHelpers.export(exports, "BaseMessageChunk", ()=>BaseMessageChunk);
/**
 * Represents a human message in a conversation.
 */ parcelHelpers.export(exports, "HumanMessage", ()=>HumanMessage);
/**
 * Represents a chunk of a human message, which can be concatenated with
 * other human message chunks.
 */ parcelHelpers.export(exports, "HumanMessageChunk", ()=>HumanMessageChunk);
/**
 * Represents an AI message in a conversation.
 */ parcelHelpers.export(exports, "AIMessage", ()=>AIMessage);
/**
 * Represents a chunk of an AI message, which can be concatenated with
 * other AI message chunks.
 */ parcelHelpers.export(exports, "AIMessageChunk", ()=>AIMessageChunk);
/**
 * Represents a system message in a conversation.
 */ parcelHelpers.export(exports, "SystemMessage", ()=>SystemMessage);
/**
 * Represents a chunk of a system message, which can be concatenated with
 * other system message chunks.
 */ parcelHelpers.export(exports, "SystemMessageChunk", ()=>SystemMessageChunk);
parcelHelpers.export(exports, "BaseChatMessage", ()=>BaseChatMessage);
parcelHelpers.export(exports, "HumanChatMessage", ()=>HumanChatMessage);
parcelHelpers.export(exports, "AIChatMessage", ()=>AIChatMessage);
parcelHelpers.export(exports, "SystemChatMessage", ()=>SystemChatMessage);
/**
 * Represents a function message in a conversation.
 */ parcelHelpers.export(exports, "FunctionMessage", ()=>FunctionMessage);
/**
 * Represents a chunk of a function message, which can be concatenated
 * with other function message chunks.
 */ parcelHelpers.export(exports, "FunctionMessageChunk", ()=>FunctionMessageChunk);
/**
 * Represents a chat message in a conversation.
 */ parcelHelpers.export(exports, "ChatMessage", ()=>ChatMessage);
parcelHelpers.export(exports, "isBaseMessage", ()=>isBaseMessage);
parcelHelpers.export(exports, "coerceMessageLikeToMessage", ()=>coerceMessageLikeToMessage);
/**
 * Represents a chunk of a chat message, which can be concatenated with
 * other chat message chunks.
 */ parcelHelpers.export(exports, "ChatMessageChunk", ()=>ChatMessageChunk);
parcelHelpers.export(exports, "ChatGenerationChunk", ()=>ChatGenerationChunk);
/**
 * Base PromptValue class. All prompt values should extend this class.
 */ parcelHelpers.export(exports, "BasePromptValue", ()=>BasePromptValue);
/**
 * Base class for all chat message histories. All chat message histories
 * should extend this class.
 */ parcelHelpers.export(exports, "BaseChatMessageHistory", ()=>BaseChatMessageHistory);
/**
 * Base class for all list chat message histories. All list chat message
 * histories should extend this class.
 */ parcelHelpers.export(exports, "BaseListChatMessageHistory", ()=>BaseListChatMessageHistory);
/**
 * Base class for all caches. All caches should extend this class.
 */ parcelHelpers.export(exports, "BaseCache", ()=>BaseCache);
/**
 * Base class for all file stores. All file stores should extend this
 * class.
 */ parcelHelpers.export(exports, "BaseFileStore", ()=>BaseFileStore);
/**
 * Base class for all entity stores. All entity stores should extend this
 * class.
 */ parcelHelpers.export(exports, "BaseEntityStore", ()=>BaseEntityStore);
/**
 * Abstract class for a document store. All document stores should extend
 * this class.
 */ parcelHelpers.export(exports, "Docstore", ()=>Docstore);
var _serializableJs = require("../load/serializable.js");
const RUN_KEY = "__run";
class GenerationChunk {
    constructor(fields){
        Object.defineProperty(this, "text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "generationInfo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.text = fields.text;
        this.generationInfo = fields.generationInfo;
    }
    concat(chunk) {
        return new GenerationChunk({
            text: this.text + chunk.text,
            generationInfo: {
                ...this.generationInfo,
                ...chunk.generationInfo
            }
        });
    }
}
class BaseMessage extends (0, _serializableJs.Serializable) {
    /**
     * @deprecated
     * Use {@link BaseMessage.content} instead.
     */ get text() {
        return this.content;
    }
    constructor(fields, /** @deprecated */ kwargs){
        if (typeof fields === "string") // eslint-disable-next-line no-param-reassign
        fields = {
            content: fields,
            additional_kwargs: kwargs
        };
        // Make sure the default value for additional_kwargs is passed into super() for serialization
        if (!fields.additional_kwargs) // eslint-disable-next-line no-param-reassign
        fields.additional_kwargs = {};
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "schema"
            ]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /** The text of the message. */ Object.defineProperty(this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** The name of the message sender in a multi-user chat. */ Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** Additional keyword arguments */ Object.defineProperty(this, "additional_kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = fields.name;
        this.content = fields.content;
        this.additional_kwargs = fields.additional_kwargs;
    }
    toDict() {
        return {
            type: this._getType(),
            data: this.toJSON().kwargs
        };
    }
}
class BaseMessageChunk extends BaseMessage {
    static _mergeAdditionalKwargs(left, right) {
        const merged = {
            ...left
        };
        for (const [key, value] of Object.entries(right)){
            if (merged[key] === undefined) merged[key] = value;
            else if (typeof merged[key] !== typeof value) throw new Error(`additional_kwargs[${key}] already exists in the message chunk, but with a different type.`);
            else if (typeof merged[key] === "string") merged[key] = merged[key] + value;
            else if (!Array.isArray(merged[key]) && typeof merged[key] === "object") merged[key] = this._mergeAdditionalKwargs(merged[key], value);
            else throw new Error(`additional_kwargs[${key}] already exists in this message chunk.`);
        }
        return merged;
    }
}
class HumanMessage extends BaseMessage {
    static lc_name() {
        return "HumanMessage";
    }
    _getType() {
        return "human";
    }
}
class HumanMessageChunk extends BaseMessageChunk {
    static lc_name() {
        return "HumanMessageChunk";
    }
    _getType() {
        return "human";
    }
    concat(chunk) {
        return new HumanMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: HumanMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs)
        });
    }
}
class AIMessage extends BaseMessage {
    static lc_name() {
        return "AIMessage";
    }
    _getType() {
        return "ai";
    }
}
class AIMessageChunk extends BaseMessageChunk {
    static lc_name() {
        return "AIMessageChunk";
    }
    _getType() {
        return "ai";
    }
    concat(chunk) {
        return new AIMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: AIMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs)
        });
    }
}
class SystemMessage extends BaseMessage {
    static lc_name() {
        return "SystemMessage";
    }
    _getType() {
        return "system";
    }
}
class SystemMessageChunk extends BaseMessageChunk {
    static lc_name() {
        return "SystemMessageChunk";
    }
    _getType() {
        return "system";
    }
    concat(chunk) {
        return new SystemMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: SystemMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs)
        });
    }
}
const BaseChatMessage = BaseMessage;
const HumanChatMessage = HumanMessage;
const AIChatMessage = AIMessage;
const SystemChatMessage = SystemMessage;
class FunctionMessage extends BaseMessage {
    static lc_name() {
        return "FunctionMessage";
    }
    constructor(fields, /** @deprecated */ name){
        if (typeof fields === "string") // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
        fields = {
            content: fields,
            name: name
        };
        super(fields);
    }
    _getType() {
        return "function";
    }
}
class FunctionMessageChunk extends BaseMessageChunk {
    static lc_name() {
        return "FunctionMessageChunk";
    }
    _getType() {
        return "function";
    }
    concat(chunk) {
        return new FunctionMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: FunctionMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs),
            name: this.name ?? ""
        });
    }
}
class ChatMessage extends BaseMessage {
    static lc_name() {
        return "ChatMessage";
    }
    constructor(fields, role){
        if (typeof fields === "string") // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
        fields = {
            content: fields,
            role: role
        };
        super(fields);
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.role = fields.role;
    }
    _getType() {
        return "generic";
    }
    static isInstance(message) {
        return message._getType() === "generic";
    }
}
function isBaseMessage(messageLike) {
    return typeof messageLike._getType === "function";
}
function coerceMessageLikeToMessage(messageLike) {
    if (typeof messageLike === "string") return new HumanMessage(messageLike);
    else if (isBaseMessage(messageLike)) return messageLike;
    const [type, content] = messageLike;
    if (type === "human" || type === "user") return new HumanMessage({
        content
    });
    else if (type === "ai" || type === "assistant") return new AIMessage({
        content
    });
    else if (type === "system") return new SystemMessage({
        content
    });
    else throw new Error(`Unable to coerce message from array: only human, AI, or system message coercion is currently supported.`);
}
class ChatMessageChunk extends BaseMessageChunk {
    static lc_name() {
        return "ChatMessageChunk";
    }
    constructor(fields, role){
        if (typeof fields === "string") // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
        fields = {
            content: fields,
            role: role
        };
        super(fields);
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.role = fields.role;
    }
    _getType() {
        return "generic";
    }
    concat(chunk) {
        return new ChatMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: ChatMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs),
            role: this.role
        });
    }
}
class ChatGenerationChunk extends GenerationChunk {
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.message = fields.message;
    }
    concat(chunk) {
        return new ChatGenerationChunk({
            text: this.text + chunk.text,
            generationInfo: {
                ...this.generationInfo,
                ...chunk.generationInfo
            },
            message: this.message.concat(chunk.message)
        });
    }
}
class BasePromptValue extends (0, _serializableJs.Serializable) {
}
class BaseChatMessageHistory extends (0, _serializableJs.Serializable) {
}
class BaseListChatMessageHistory extends (0, _serializableJs.Serializable) {
    addUserMessage(message) {
        return this.addMessage(new HumanMessage(message));
    }
    addAIChatMessage(message) {
        return this.addMessage(new AIMessage(message));
    }
}
class BaseCache {
}
class BaseFileStore extends (0, _serializableJs.Serializable) {
}
class BaseEntityStore extends (0, _serializableJs.Serializable) {
}
class Docstore {
}

},{"../load/serializable.js":"c7QBM","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"c7QBM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Get a unique name for the module, rather than parent class implementations.
 * Should not be subclassed, subclass lc_name above instead.
 */ parcelHelpers.export(exports, "get_lc_unique_name", ()=>get_lc_unique_name);
parcelHelpers.export(exports, "Serializable", ()=>Serializable);
var _mapKeysJs = require("./map_keys.js");
function shallowCopy(obj) {
    return Array.isArray(obj) ? [
        ...obj
    ] : {
        ...obj
    };
}
function replaceSecrets(root, secretsMap) {
    const result = shallowCopy(root);
    for (const [path, secretId] of Object.entries(secretsMap)){
        const [last, ...partsReverse] = path.split(".").reverse();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let current = result;
        for (const part of partsReverse.reverse()){
            if (current[part] === undefined) break;
            current[part] = shallowCopy(current[part]);
            current = current[part];
        }
        if (current[last] !== undefined) current[last] = {
            lc: 1,
            type: "secret",
            id: [
                secretId
            ]
        };
    }
    return result;
}
function get_lc_unique_name(// eslint-disable-next-line @typescript-eslint/no-use-before-define
serializableClass) {
    // "super" here would refer to the parent class of Serializable,
    // when we want the parent class of the module actually calling this method.
    const parentClass = Object.getPrototypeOf(serializableClass);
    const lcNameIsSubclassed = typeof serializableClass.lc_name === "function" && (typeof parentClass.lc_name !== "function" || serializableClass.lc_name() !== parentClass.lc_name());
    if (lcNameIsSubclassed) return serializableClass.lc_name();
    else return serializableClass.name;
}
class Serializable {
    /**
     * The name of the serializable. Override to provide an alias or
     * to preserve the serialized module name in minified environments.
     *
     * Implemented as a static method to support loading logic.
     */ static lc_name() {
        return this.name;
    }
    /**
     * The final serialized identifier for the module.
     */ get lc_id() {
        return [
            ...this.lc_namespace,
            get_lc_unique_name(this.constructor)
        ];
    }
    /**
     * A map of secrets, which will be omitted from serialization.
     * Keys are paths to the secret in constructor args, e.g. "foo.bar.baz".
     * Values are the secret ids, which will be used when deserializing.
     */ get lc_secrets() {
        return undefined;
    }
    /**
     * A map of additional attributes to merge with constructor args.
     * Keys are the attribute names, e.g. "foo".
     * Values are the attribute values, which will be serialized.
     * These attributes need to be accepted by the constructor as arguments.
     */ get lc_attributes() {
        return undefined;
    }
    /**
     * A map of aliases for constructor args.
     * Keys are the attribute names, e.g. "foo".
     * Values are the alias that will replace the key in serialization.
     * This is used to eg. make argument names match Python.
     */ get lc_aliases() {
        return undefined;
    }
    constructor(kwargs, ..._args){
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "lc_kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.lc_kwargs = kwargs || {};
    }
    toJSON() {
        if (!this.lc_serializable) return this.toJSONNotImplemented();
        if (// eslint-disable-next-line no-instanceof/no-instanceof
        this.lc_kwargs instanceof Serializable || typeof this.lc_kwargs !== "object" || Array.isArray(this.lc_kwargs)) // We do not support serialization of classes with arg not a POJO
        // I'm aware the check above isn't as strict as it could be
        return this.toJSONNotImplemented();
        const aliases = {};
        const secrets = {};
        const kwargs = Object.keys(this.lc_kwargs).reduce((acc, key)=>{
            acc[key] = key in this ? this[key] : this.lc_kwargs[key];
            return acc;
        }, {});
        // get secrets, attributes and aliases from all superclasses
        for(// eslint-disable-next-line @typescript-eslint/no-this-alias
        let current = Object.getPrototypeOf(this); current; current = Object.getPrototypeOf(current)){
            Object.assign(aliases, Reflect.get(current, "lc_aliases", this));
            Object.assign(secrets, Reflect.get(current, "lc_secrets", this));
            Object.assign(kwargs, Reflect.get(current, "lc_attributes", this));
        }
        // include all secrets used, even if not in kwargs,
        // will be replaced with sentinel value in replaceSecrets
        Object.keys(secrets).forEach((keyPath)=>{
            // eslint-disable-next-line @typescript-eslint/no-this-alias, @typescript-eslint/no-explicit-any
            let read = this;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let write = kwargs;
            const [last, ...partsReverse] = keyPath.split(".").reverse();
            for (const key of partsReverse.reverse()){
                if (!(key in read) || read[key] === undefined) return;
                if (!(key in write) || write[key] === undefined) {
                    if (typeof read[key] === "object" && read[key] != null) write[key] = {};
                    else if (Array.isArray(read[key])) write[key] = [];
                }
                read = read[key];
                write = write[key];
            }
            if (last in read && read[last] !== undefined) write[last] = write[last] || read[last];
        });
        return {
            lc: 1,
            type: "constructor",
            id: this.lc_id,
            kwargs: (0, _mapKeysJs.mapKeys)(Object.keys(secrets).length ? replaceSecrets(kwargs, secrets) : kwargs, (0, _mapKeysJs.keyToJson), aliases)
        };
    }
    toJSONNotImplemented() {
        return {
            lc: 1,
            type: "not_implemented",
            id: this.lc_id
        };
    }
}

},{"./map_keys.js":"75ZoD","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"75ZoD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "keyToJson", ()=>keyToJson);
parcelHelpers.export(exports, "keyFromJson", ()=>keyFromJson);
parcelHelpers.export(exports, "mapKeys", ()=>mapKeys);
var _decamelize = require("decamelize");
var _decamelizeDefault = parcelHelpers.interopDefault(_decamelize);
var _camelcase = require("camelcase");
var _camelcaseDefault = parcelHelpers.interopDefault(_camelcase);
function keyToJson(key, map) {
    return map?.[key] || (0, _decamelizeDefault.default)(key);
}
function keyFromJson(key, map) {
    return map?.[key] || (0, _camelcaseDefault.default)(key);
}
function mapKeys(fields, mapper, map) {
    const mapped = {};
    for(const key in fields)if (Object.hasOwn(fields, key)) mapped[mapper(key, map)] = fields[key];
    return mapped;
}

},{"decamelize":"8CPqG","camelcase":"g5azX","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"8CPqG":[function(require,module,exports) {
"use strict";
module.exports = function(str, sep) {
    if (typeof str !== "string") throw new TypeError("Expected a string");
    sep = typeof sep === "undefined" ? "_" : sep;
    return str.replace(/([a-z\d])([A-Z])/g, "$1" + sep + "$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + sep + "$2").toLowerCase();
};

},{}],"g5azX":[function(require,module,exports) {
"use strict";
const UPPERCASE = /[\p{Lu}]/u;
const LOWERCASE = /[\p{Ll}]/u;
const LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS = /[_.\- ]+/;
const LEADING_SEPARATORS = new RegExp("^" + SEPARATORS.source);
const SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, "gu");
const NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");
const preserveCamelCase = (string, toLowerCase, toUpperCase)=>{
    let isLastCharLower = false;
    let isLastCharUpper = false;
    let isLastLastCharUpper = false;
    for(let i = 0; i < string.length; i++){
        const character = string[i];
        if (isLastCharLower && UPPERCASE.test(character)) {
            string = string.slice(0, i) + "-" + string.slice(i);
            isLastCharLower = false;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = true;
            i++;
        } else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)) {
            string = string.slice(0, i - 1) + "-" + string.slice(i - 1);
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = false;
            isLastCharLower = true;
        } else {
            isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
        }
    }
    return string;
};
const preserveConsecutiveUppercase = (input, toLowerCase)=>{
    LEADING_CAPITAL.lastIndex = 0;
    return input.replace(LEADING_CAPITAL, (m1)=>toLowerCase(m1));
};
const postProcess = (input, toUpperCase)=>{
    SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
    NUMBERS_AND_IDENTIFIER.lastIndex = 0;
    return input.replace(SEPARATORS_AND_IDENTIFIER, (_, identifier)=>toUpperCase(identifier)).replace(NUMBERS_AND_IDENTIFIER, (m)=>toUpperCase(m));
};
const camelCase = (input, options)=>{
    if (!(typeof input === "string" || Array.isArray(input))) throw new TypeError("Expected the input to be `string | string[]`");
    options = {
        pascalCase: false,
        preserveConsecutiveUppercase: false,
        ...options
    };
    if (Array.isArray(input)) input = input.map((x)=>x.trim()).filter((x)=>x.length).join("-");
    else input = input.trim();
    if (input.length === 0) return "";
    const toLowerCase = options.locale === false ? (string)=>string.toLowerCase() : (string)=>string.toLocaleLowerCase(options.locale);
    const toUpperCase = options.locale === false ? (string)=>string.toUpperCase() : (string)=>string.toLocaleUpperCase(options.locale);
    if (input.length === 1) return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
    const hasUpperCase = input !== toLowerCase(input);
    if (hasUpperCase) input = preserveCamelCase(input, toLowerCase, toUpperCase);
    input = input.replace(LEADING_SEPARATORS, "");
    if (options.preserveConsecutiveUppercase) input = preserveConsecutiveUppercase(input, toLowerCase);
    else input = toLowerCase(input);
    if (options.pascalCase) input = toUpperCase(input.charAt(0)) + input.slice(1);
    return postProcess(input, toUpperCase);
};
module.exports = camelCase;
// TODO: Remove this for the next major release
module.exports.default = camelCase;

},{}],"6dfwG":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"93LxA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Runnable", ()=>(0, _baseJs.Runnable));
parcelHelpers.export(exports, "RunnableBinding", ()=>(0, _baseJs.RunnableBinding));
parcelHelpers.export(exports, "RunnableEach", ()=>(0, _baseJs.RunnableEach));
parcelHelpers.export(exports, "RunnableRetry", ()=>(0, _baseJs.RunnableRetry));
parcelHelpers.export(exports, "RunnableSequence", ()=>(0, _baseJs.RunnableSequence));
parcelHelpers.export(exports, "RunnableMap", ()=>(0, _baseJs.RunnableMap));
parcelHelpers.export(exports, "RunnableLambda", ()=>(0, _baseJs.RunnableLambda));
parcelHelpers.export(exports, "RunnableWithFallbacks", ()=>(0, _baseJs.RunnableWithFallbacks));
parcelHelpers.export(exports, "RunnablePassthrough", ()=>(0, _passthroughJs.RunnablePassthrough));
parcelHelpers.export(exports, "RouterRunnable", ()=>(0, _routerJs.RouterRunnable));
parcelHelpers.export(exports, "RunnableBranch", ()=>(0, _branchJs.RunnableBranch));
var _baseJs = require("./base.js");
var _passthroughJs = require("./passthrough.js");
var _routerJs = require("./router.js");
var _branchJs = require("./branch.js");

},{"./base.js":"jLkvK","./passthrough.js":"cRPJs","./router.js":"j69Vr","./branch.js":"hAB1m","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"jLkvK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A Runnable is a generic unit of work that can be invoked, batched, streamed, and/or
 * transformed.
 */ parcelHelpers.export(exports, "Runnable", ()=>Runnable);
/**
 * A runnable that delegates calls to another runnable with a set of kwargs.
 */ parcelHelpers.export(exports, "RunnableBinding", ()=>RunnableBinding);
/**
 * A runnable that delegates calls to another runnable
 * with each element of the input sequence.
 */ parcelHelpers.export(exports, "RunnableEach", ()=>RunnableEach);
/**
 * Base class for runnables that can be retried a
 * specified number of times.
 */ parcelHelpers.export(exports, "RunnableRetry", ()=>RunnableRetry);
/**
 * A sequence of runnables, where the output of each is the input of the next.
 */ parcelHelpers.export(exports, "RunnableSequence", ()=>RunnableSequence);
/**
 * A runnable that runs a mapping of runnables in parallel,
 * and returns a mapping of their outputs.
 */ parcelHelpers.export(exports, "RunnableMap", ()=>RunnableMap);
/**
 * A runnable that runs a callable.
 */ parcelHelpers.export(exports, "RunnableLambda", ()=>RunnableLambda);
/**
 * A Runnable that can fallback to other Runnables if it fails.
 */ parcelHelpers.export(exports, "RunnableWithFallbacks", ()=>RunnableWithFallbacks);
// TODO: Figure out why the compiler needs help eliminating Error as a RunOutput type
parcelHelpers.export(exports, "_coerceToRunnable", ()=>_coerceToRunnable);
var _pRetry = require("p-retry");
var _pRetryDefault = parcelHelpers.interopDefault(_pRetry);
var _managerJs = require("../../callbacks/manager.js");
var _serializableJs = require("../../load/serializable.js");
var _streamJs = require("../../util/stream.js");
var _configJs = require("./config.js");
var _asyncCallerJs = require("../../util/async_caller.js");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _coerceToDict(value, defaultKey) {
    return value && !Array.isArray(value) && typeof value === "object" ? value : {
        [defaultKey]: value
    };
}
class Runnable extends (0, _serializableJs.Serializable) {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "lc_runnable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    /**
     * Bind arguments to a Runnable, returning a new Runnable.
     * @param kwargs
     * @returns A new RunnableBinding that, when invoked, will apply the bound args.
     */ bind(kwargs) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableBinding({
            bound: this,
            kwargs
        });
    }
    /**
     * Return a new Runnable that maps a list of inputs to a list of outputs,
     * by calling invoke() with each input.
     */ map() {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableEach({
            bound: this
        });
    }
    /**
     * Bind arguments to a Runnable, returning a new Runnable.
     * @param kwargs
     * @returns A new RunnableBinding that, when invoked, will apply the bound args.
     */ withRetry(fields) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableRetry({
            bound: this,
            kwargs: {},
            maxAttemptNumber: fields?.stopAfterAttempt,
            ...fields
        });
    }
    /**
     * Create a new runnable from the current one that will try invoking
     * other passed fallback runnables if the initial invocation fails.
     * @param fields.fallbacks Other runnables to call if the runnable errors.
     * @returns A new RunnableWithFallbacks.
     */ withFallbacks(fields) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableWithFallbacks({
            runnable: this,
            fallbacks: fields.fallbacks
        });
    }
    _getOptionsList(options, length = 0) {
        if (Array.isArray(options)) {
            if (options.length !== length) throw new Error(`Passed "options" must be an array with the same length as the inputs, but got ${options.length} options for ${length} inputs`);
            return options;
        }
        return Array.from({
            length
        }, ()=>options);
    }
    async batch(inputs, options, batchOptions) {
        const configList = this._getOptionsList(options ?? {}, inputs.length);
        const caller = new (0, _asyncCallerJs.AsyncCaller)({
            maxConcurrency: batchOptions?.maxConcurrency,
            onFailedAttempt: (e)=>{
                throw e;
            }
        });
        const batchCalls = inputs.map((input, i)=>caller.call(async ()=>{
                try {
                    const result = await this.invoke(input, configList[i]);
                    return result;
                } catch (e) {
                    if (batchOptions?.returnExceptions) return e;
                    throw e;
                }
            }));
        return Promise.all(batchCalls);
    }
    /**
     * Default streaming implementation.
     * Subclasses should override this method if they support streaming output.
     * @param input
     * @param options
     */ async *_streamIterator(input, options) {
        yield this.invoke(input, options);
    }
    /**
     * Stream output in chunks.
     * @param input
     * @param options
     * @returns A readable stream that is also an iterable.
     */ async stream(input, options) {
        return (0, _streamJs.IterableReadableStream).fromAsyncGenerator(this._streamIterator(input, options));
    }
    _separateRunnableConfigFromCallOptions(options = {}) {
        const runnableConfig = {
            callbacks: options.callbacks,
            tags: options.tags,
            metadata: options.metadata
        };
        const callOptions = {
            ...options
        };
        delete callOptions.callbacks;
        delete callOptions.tags;
        delete callOptions.metadata;
        return [
            runnableConfig,
            callOptions
        ];
    }
    async _callWithConfig(func, input, options) {
        const callbackManager_ = await (0, _configJs.getCallbackMangerForConfig)(options);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"), undefined, options?.runType);
        let output;
        try {
            output = await func.bind(this)(input, options, runManager);
        } catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(_coerceToDict(output, "output"));
        return output;
    }
    /**
     * Internal method that handles batching and configuration for a runnable
     * It takes a function, input values, and optional configuration, and
     * returns a promise that resolves to the output values.
     * @param func The function to be executed for each input value.
     * @param input The input values to be processed.
     * @param config Optional configuration for the function execution.
     * @returns A promise that resolves to the output values.
     */ async _batchWithConfig(func, inputs, options, batchOptions) {
        const configs = this._getOptionsList(options ?? {}, inputs.length);
        const callbackManagers = await Promise.all(configs.map((0, _configJs.getCallbackMangerForConfig)));
        const runManagers = await Promise.all(callbackManagers.map((callbackManager, i)=>callbackManager?.handleChainStart(this.toJSON(), _coerceToDict(inputs[i], "input"))));
        let outputs;
        try {
            outputs = await func(inputs, configs, runManagers, batchOptions);
        } catch (e) {
            await Promise.all(runManagers.map((runManager)=>runManager?.handleChainError(e)));
            throw e;
        }
        await Promise.all(runManagers.map((runManager)=>runManager?.handleChainEnd(_coerceToDict(outputs, "output"))));
        return outputs;
    }
    /**
     * Helper method to transform an Iterator of Input values into an Iterator of
     * Output values, with callbacks.
     * Use this to implement `stream()` or `transform()` in Runnable subclasses.
     */ async *_transformStreamWithConfig(inputGenerator, transformer, options) {
        let finalInput;
        let finalInputSupported = true;
        let finalOutput;
        let finalOutputSupported = true;
        const callbackManager_ = await (0, _configJs.getCallbackMangerForConfig)(options);
        let runManager;
        const serializedRepresentation = this.toJSON();
        async function* wrapInputForTracing() {
            for await (const chunk of inputGenerator){
                if (!runManager) // Start the run manager AFTER the iterator starts to preserve
                // tracing order
                runManager = await callbackManager_?.handleChainStart(serializedRepresentation, {
                    input: ""
                }, undefined, options?.runType);
                if (finalInputSupported) {
                    if (finalInput === undefined) finalInput = chunk;
                    else try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        finalInput = finalInput.concat(chunk);
                    } catch  {
                        finalInput = undefined;
                        finalInputSupported = false;
                    }
                }
                yield chunk;
            }
        }
        const wrappedInputGenerator = wrapInputForTracing();
        try {
            const outputIterator = transformer(wrappedInputGenerator, runManager, options);
            for await (const chunk of outputIterator){
                yield chunk;
                if (finalOutputSupported) {
                    if (finalOutput === undefined) finalOutput = chunk;
                    else try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        finalOutput = finalOutput.concat(chunk);
                    } catch  {
                        finalOutput = undefined;
                        finalOutputSupported = false;
                    }
                }
            }
        } catch (e) {
            await runManager?.handleChainError(e, undefined, undefined, undefined, {
                inputs: _coerceToDict(finalInput, "input")
            });
            throw e;
        }
        await runManager?.handleChainEnd(finalOutput ?? {}, undefined, undefined, undefined, {
            inputs: _coerceToDict(finalInput, "input")
        });
    }
    _patchConfig(config = {}, callbackManager) {
        return {
            ...config,
            callbacks: callbackManager
        };
    }
    /**
     * Create a new runnable sequence that runs each individual runnable in series,
     * piping the output of one runnable into another runnable or runnable-like.
     * @param coerceable A runnable, function, or object whose values are functions or runnables.
     * @returns A new runnable sequence.
     */ pipe(coerceable) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableSequence({
            first: this,
            last: _coerceToRunnable(coerceable)
        });
    }
    /**
     * Default implementation of transform, which buffers input and then calls stream.
     * Subclasses should override this method if they can start producing output while
     * input is still being generated.
     * @param generator
     * @param options
     */ async *transform(generator, options) {
        let finalChunk;
        for await (const chunk of generator)if (!finalChunk) finalChunk = chunk;
        else // Make a best effort to gather, for any type that supports concat.
        // This method should throw an error if gathering fails.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        finalChunk = finalChunk.concat(chunk);
        yield* this._streamIterator(finalChunk, options);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isRunnable(thing) {
        return thing.lc_runnable;
    }
}
class RunnableBinding extends Runnable {
    static lc_name() {
        return "RunnableBinding";
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "schema",
                "runnable"
            ]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "bound", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.bound = fields.bound;
        this.kwargs = fields.kwargs;
    }
    bind(kwargs) {
        return new RunnableBinding({
            bound: this.bound,
            kwargs: {
                ...this.kwargs,
                ...kwargs
            }
        });
    }
    async invoke(input, options) {
        return this.bound.invoke(input, {
            ...options,
            ...this.kwargs
        });
    }
    async batch(inputs, options, batchOptions) {
        const mergedOptions = Array.isArray(options) ? options.map((individualOption)=>({
                ...individualOption,
                ...this.kwargs
            })) : {
            ...options,
            ...this.kwargs
        };
        return this.bound.batch(inputs, mergedOptions, batchOptions);
    }
    async *_streamIterator(input, options) {
        yield* this.bound._streamIterator(input, {
            ...options,
            ...this.kwargs
        });
    }
    async stream(input, options) {
        return this.bound.stream(input, {
            ...options,
            ...this.kwargs
        });
    }
    async *transform(// eslint-disable-next-line @typescript-eslint/no-explicit-any
    generator, options) {
        yield* this.bound.transform(generator, options);
    }
    static isRunnableBinding(// eslint-disable-next-line @typescript-eslint/no-explicit-any
    thing) {
        return thing.bound && Runnable.isRunnable(thing.bound);
    }
}
class RunnableEach extends Runnable {
    static lc_name() {
        return "RunnableEach";
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "schema",
                "runnable"
            ]
        });
        Object.defineProperty(this, "bound", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.bound = fields.bound;
    }
    /**
     * Binds the runnable with the specified arguments.
     * @param args The arguments to bind the runnable with.
     * @returns A new instance of the `RunnableEach` class that is bound with the specified arguments.
     */ bind(kwargs) {
        return new RunnableEach({
            bound: this.bound.bind(kwargs)
        });
    }
    /**
     * Invokes the runnable with the specified input and configuration.
     * @param input The input to invoke the runnable with.
     * @param config The configuration to invoke the runnable with.
     * @returns A promise that resolves to the output of the runnable.
     */ async invoke(inputs, config) {
        return this._callWithConfig(this._invoke, inputs, config);
    }
    /**
     * A helper method that is used to invoke the runnable with the specified input and configuration.
     * @param input The input to invoke the runnable with.
     * @param config The configuration to invoke the runnable with.
     * @returns A promise that resolves to the output of the runnable.
     */ async _invoke(inputs, config, runManager) {
        return this.bound.batch(inputs, this._patchConfig(config, runManager?.getChild()));
    }
}
class RunnableRetry extends RunnableBinding {
    static lc_name() {
        return "RunnableRetry";
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "schema",
                "runnable"
            ]
        });
        Object.defineProperty(this, "maxAttemptNumber", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "onFailedAttempt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ()=>{}
        });
        this.maxAttemptNumber = fields.maxAttemptNumber ?? this.maxAttemptNumber;
        this.onFailedAttempt = fields.onFailedAttempt ?? this.onFailedAttempt;
    }
    _patchConfigForRetry(attempt, config, runManager) {
        const tag = attempt > 1 ? `retry:attempt:${attempt}` : undefined;
        return this._patchConfig(config, runManager?.getChild(tag));
    }
    async _invoke(input, config, runManager) {
        return (0, _pRetryDefault.default)((attemptNumber)=>super.invoke(input, this._patchConfigForRetry(attemptNumber, config, runManager)), {
            onFailedAttempt: this.onFailedAttempt,
            retries: Math.max(this.maxAttemptNumber - 1, 0),
            randomize: true
        });
    }
    /**
     * Method that invokes the runnable with the specified input, run manager,
     * and config. It handles the retry logic by catching any errors and
     * recursively invoking itself with the updated config for the next retry
     * attempt.
     * @param input The input for the runnable.
     * @param runManager The run manager for the runnable.
     * @param config The config for the runnable.
     * @returns A promise that resolves to the output of the runnable.
     */ async invoke(input, config) {
        return this._callWithConfig(this._invoke, input, config);
    }
    async _batch(inputs, configs, runManagers, batchOptions) {
        const resultsMap = {};
        try {
            await (0, _pRetryDefault.default)(async (attemptNumber)=>{
                const remainingIndexes = inputs.map((_, i)=>i).filter((i)=>resultsMap[i.toString()] === undefined || // eslint-disable-next-line no-instanceof/no-instanceof
                    resultsMap[i.toString()] instanceof Error);
                const remainingInputs = remainingIndexes.map((i)=>inputs[i]);
                const patchedConfigs = remainingIndexes.map((i)=>this._patchConfigForRetry(attemptNumber, configs?.[i], runManagers?.[i]));
                const results = await super.batch(remainingInputs, patchedConfigs, {
                    ...batchOptions,
                    returnExceptions: true
                });
                let firstException;
                for(let i = 0; i < results.length; i += 1){
                    const result = results[i];
                    const resultMapIndex = remainingIndexes[i];
                    // eslint-disable-next-line no-instanceof/no-instanceof
                    if (result instanceof Error) {
                        if (firstException === undefined) firstException = result;
                    }
                    resultsMap[resultMapIndex.toString()] = result;
                }
                if (firstException) throw firstException;
                return results;
            }, {
                onFailedAttempt: this.onFailedAttempt,
                retries: Math.max(this.maxAttemptNumber - 1, 0),
                randomize: true
            });
        } catch (e) {
            if (batchOptions?.returnExceptions !== true) throw e;
        }
        return Object.keys(resultsMap).sort((a, b)=>parseInt(a, 10) - parseInt(b, 10)).map((key)=>resultsMap[parseInt(key, 10)]);
    }
    async batch(inputs, options, batchOptions) {
        return this._batchWithConfig(this._batch.bind(this), inputs, options, batchOptions);
    }
}
class RunnableSequence extends Runnable {
    static lc_name() {
        return "RunnableSequence";
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "first", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "middle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "last", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "schema",
                "runnable"
            ]
        });
        this.first = fields.first;
        this.middle = fields.middle ?? this.middle;
        this.last = fields.last;
    }
    get steps() {
        return [
            this.first,
            ...this.middle,
            this.last
        ];
    }
    async invoke(input, options) {
        const callbackManager_ = await (0, _configJs.getCallbackMangerForConfig)(options);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"));
        let nextStepInput = input;
        let finalOutput;
        try {
            const initialSteps = [
                this.first,
                ...this.middle
            ];
            for(let i = 0; i < initialSteps.length; i += 1){
                const step = initialSteps[i];
                nextStepInput = await step.invoke(nextStepInput, this._patchConfig(options, runManager?.getChild(`seq:step:${i + 1}`)));
            }
            // TypeScript can't detect that the last output of the sequence returns RunOutput, so call it out of the loop here
            finalOutput = await this.last.invoke(nextStepInput, this._patchConfig(options, runManager?.getChild(`seq:step:${this.steps.length}`)));
        } catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(_coerceToDict(finalOutput, "output"));
        return finalOutput;
    }
    async batch(inputs, options, batchOptions) {
        const configList = this._getOptionsList(options ?? {}, inputs.length);
        const callbackManagers = await Promise.all(configList.map((0, _configJs.getCallbackMangerForConfig)));
        const runManagers = await Promise.all(callbackManagers.map((callbackManager, i)=>callbackManager?.handleChainStart(this.toJSON(), _coerceToDict(inputs[i], "input"))));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let nextStepInputs = inputs;
        let finalOutputs;
        try {
            const initialSteps = [
                this.first,
                ...this.middle
            ];
            for(let i = 0; i < initialSteps.length; i += 1){
                const step = initialSteps[i];
                nextStepInputs = await step.batch(nextStepInputs, runManagers.map((runManager, j)=>this._patchConfig(configList[j], runManager?.getChild(`seq:step:${i + 1}`))), batchOptions);
            }
            finalOutputs = await this.last.batch(nextStepInputs, runManagers.map((runManager)=>this._patchConfig(configList[this.steps.length - 1], runManager?.getChild(`seq:step:${this.steps.length}`))), batchOptions);
        } catch (e) {
            await Promise.all(runManagers.map((runManager)=>runManager?.handleChainError(e)));
            throw e;
        }
        await Promise.all(runManagers.map((runManager, i)=>runManager?.handleChainEnd(_coerceToDict(finalOutputs[i], "output"))));
        return finalOutputs;
    }
    async *_streamIterator(input, options) {
        const callbackManager_ = await (0, _configJs.getCallbackMangerForConfig)(options);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"));
        let nextStepInput = input;
        const steps = [
            this.first,
            ...this.middle,
            this.last
        ];
        // Find the index of the last runnable in the sequence that doesn't have an overridden .transform() method
        // and start streaming from there
        const streamingStartStepIndex = Math.min(steps.length - 1, steps.length - [
            ...steps
        ].reverse().findIndex((step)=>{
            const isDefaultImplementation = step.transform === Runnable.prototype.transform;
            const boundRunnableIsDefaultImplementation = RunnableBinding.isRunnableBinding(step) && step.bound?.transform === Runnable.prototype.transform;
            return isDefaultImplementation || boundRunnableIsDefaultImplementation;
        }) - 1);
        try {
            const invokeSteps = steps.slice(0, streamingStartStepIndex);
            for(let i = 0; i < invokeSteps.length; i += 1){
                const step = invokeSteps[i];
                nextStepInput = await step.invoke(nextStepInput, this._patchConfig(options, runManager?.getChild(`seq:step:${i + 1}`)));
            }
        } catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        let concatSupported = true;
        let finalOutput;
        try {
            let finalGenerator = await steps[streamingStartStepIndex]._streamIterator(nextStepInput, this._patchConfig(options, runManager?.getChild(`seq:step:${streamingStartStepIndex + 1}`)));
            const finalSteps = steps.slice(streamingStartStepIndex + 1);
            for(let i = 0; i < finalSteps.length; i += 1){
                const step = finalSteps[i];
                finalGenerator = await step.transform(finalGenerator, this._patchConfig(options, runManager?.getChild(`seq:step:${streamingStartStepIndex + i + 2}`)));
            }
            for await (const chunk of finalGenerator){
                yield chunk;
                if (concatSupported) {
                    if (finalOutput === undefined) finalOutput = chunk;
                    else try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        finalOutput = finalOutput.concat(chunk);
                    } catch (e) {
                        finalOutput = undefined;
                        concatSupported = false;
                    }
                }
            }
        } catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(_coerceToDict(finalOutput, "output"));
    }
    pipe(coerceable) {
        if (RunnableSequence.isRunnableSequence(coerceable)) return new RunnableSequence({
            first: this.first,
            middle: this.middle.concat([
                this.last,
                coerceable.first,
                ...coerceable.middle
            ]),
            last: coerceable.last
        });
        else return new RunnableSequence({
            first: this.first,
            middle: [
                ...this.middle,
                this.last
            ],
            last: _coerceToRunnable(coerceable)
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isRunnableSequence(thing) {
        return Array.isArray(thing.middle) && Runnable.isRunnable(thing);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static from([first, ...runnables]) {
        return new RunnableSequence({
            first: _coerceToRunnable(first),
            middle: runnables.slice(0, -1).map(_coerceToRunnable),
            last: _coerceToRunnable(runnables[runnables.length - 1])
        });
    }
}
class RunnableMap extends Runnable {
    static lc_name() {
        return "RunnableMap";
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "schema",
                "runnable"
            ]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "steps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.steps = {};
        for (const [key, value] of Object.entries(fields.steps))this.steps[key] = _coerceToRunnable(value);
    }
    async invoke(input, options) {
        const callbackManager_ = await (0, _configJs.getCallbackMangerForConfig)(options);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), {
            input
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const output = {};
        try {
            for (const [key, runnable] of Object.entries(this.steps)){
                const result = await runnable.invoke(input, this._patchConfig(options, runManager?.getChild()));
                output[key] = result;
            }
        } catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(output);
        return output;
    }
}
class RunnableLambda extends Runnable {
    static lc_name() {
        return "RunnableLambda";
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "schema",
                "runnable"
            ]
        });
        Object.defineProperty(this, "func", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.func = fields.func;
    }
    async _invoke(input, config, runManager) {
        let output = await this.func(input);
        if (output && Runnable.isRunnable(output)) output = await output.invoke(input, this._patchConfig(config, runManager?.getChild()));
        return output;
    }
    async invoke(input, options) {
        return this._callWithConfig(this._invoke, input, options);
    }
}
class RunnableWithFallbacks extends Runnable {
    static lc_name() {
        return "RunnableWithFallbacks";
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "schema",
                "runnable"
            ]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "runnable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fallbacks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.runnable = fields.runnable;
        this.fallbacks = fields.fallbacks;
    }
    *runnables() {
        yield this.runnable;
        for (const fallback of this.fallbacks)yield fallback;
    }
    async invoke(input, options) {
        const callbackManager_ = await (0, _managerJs.CallbackManager).configure(options?.callbacks, undefined, options?.tags, undefined, options?.metadata);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"));
        let firstError;
        for (const runnable of this.runnables())try {
            const output = await runnable.invoke(input, this._patchConfig(options, runManager?.getChild()));
            await runManager?.handleChainEnd(_coerceToDict(output, "output"));
            return output;
        } catch (e) {
            if (firstError === undefined) firstError = e;
        }
        if (firstError === undefined) throw new Error("No error stored at end of fallback.");
        await runManager?.handleChainError(firstError);
        throw firstError;
    }
    async batch(inputs, options, batchOptions) {
        if (batchOptions?.returnExceptions) throw new Error("Not implemented.");
        const configList = this._getOptionsList(options ?? {}, inputs.length);
        const callbackManagers = await Promise.all(configList.map((config)=>(0, _managerJs.CallbackManager).configure(config?.callbacks, undefined, config?.tags, undefined, config?.metadata)));
        const runManagers = await Promise.all(callbackManagers.map((callbackManager, i)=>callbackManager?.handleChainStart(this.toJSON(), _coerceToDict(inputs[i], "input"))));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let firstError;
        for (const runnable of this.runnables())try {
            const outputs = await runnable.batch(inputs, runManagers.map((runManager, j)=>this._patchConfig(configList[j], runManager?.getChild())), batchOptions);
            await Promise.all(runManagers.map((runManager, i)=>runManager?.handleChainEnd(_coerceToDict(outputs[i], "output"))));
            return outputs;
        } catch (e) {
            if (firstError === undefined) firstError = e;
        }
        if (!firstError) throw new Error("No error stored at end of fallbacks.");
        await Promise.all(runManagers.map((runManager)=>runManager?.handleChainError(firstError)));
        throw firstError;
    }
}
function _coerceToRunnable(coerceable) {
    if (typeof coerceable === "function") return new RunnableLambda({
        func: coerceable
    });
    else if (Runnable.isRunnable(coerceable)) return coerceable;
    else if (!Array.isArray(coerceable) && typeof coerceable === "object") {
        const runnables = {};
        for (const [key, value] of Object.entries(coerceable))runnables[key] = _coerceToRunnable(value);
        return new RunnableMap({
            steps: runnables
        });
    } else throw new Error(`Expected a Runnable, function or object.\nInstead got an unsupported type.`);
}

},{"p-retry":"kjtQ8","../../callbacks/manager.js":"dAlXr","../../load/serializable.js":"c7QBM","../../util/stream.js":"eIT5W","./config.js":"h8mSt","../../util/async_caller.js":"laXWJ","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"kjtQ8":[function(require,module,exports) {
"use strict";
const retry = require("2a60be5f7ca3401c");
const networkErrorMsgs = [
    "Failed to fetch",
    "NetworkError when attempting to fetch resource.",
    "The Internet connection appears to be offline.",
    "Network request failed" // `cross-fetch`
];
class AbortError extends Error {
    constructor(message){
        super();
        if (message instanceof Error) {
            this.originalError = message;
            ({ message } = message);
        } else {
            this.originalError = new Error(message);
            this.originalError.stack = this.stack;
        }
        this.name = "AbortError";
        this.message = message;
    }
}
const decorateErrorWithCounts = (error, attemptNumber, options)=>{
    // Minus 1 from attemptNumber because the first attempt does not count as a retry
    const retriesLeft = options.retries - (attemptNumber - 1);
    error.attemptNumber = attemptNumber;
    error.retriesLeft = retriesLeft;
    return error;
};
const isNetworkError = (errorMessage)=>networkErrorMsgs.includes(errorMessage);
const pRetry = (input, options)=>new Promise((resolve, reject)=>{
        options = {
            onFailedAttempt: ()=>{},
            retries: 10,
            ...options
        };
        const operation = retry.operation(options);
        operation.attempt(async (attemptNumber)=>{
            try {
                resolve(await input(attemptNumber));
            } catch (error) {
                if (!(error instanceof Error)) {
                    reject(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
                    return;
                }
                if (error instanceof AbortError) {
                    operation.stop();
                    reject(error.originalError);
                } else if (error instanceof TypeError && !isNetworkError(error.message)) {
                    operation.stop();
                    reject(error);
                } else {
                    decorateErrorWithCounts(error, attemptNumber, options);
                    try {
                        await options.onFailedAttempt(error);
                    } catch (error) {
                        reject(error);
                        return;
                    }
                    if (!operation.retry(error)) reject(operation.mainError());
                }
            }
        });
    });
module.exports = pRetry;
// TODO: remove this in the next major version
module.exports.default = pRetry;
module.exports.AbortError = AbortError;

},{"2a60be5f7ca3401c":"cS17w"}],"cS17w":[function(require,module,exports) {
module.exports = require("50b11ffe49b83fdb");

},{"50b11ffe49b83fdb":"f5RFl"}],"f5RFl":[function(require,module,exports) {
var RetryOperation = require("383e94095bc9dc15");
exports.operation = function(options) {
    var timeouts = exports.timeouts(options);
    return new RetryOperation(timeouts, {
        forever: options && (options.forever || options.retries === Infinity),
        unref: options && options.unref,
        maxRetryTime: options && options.maxRetryTime
    });
};
exports.timeouts = function(options) {
    if (options instanceof Array) return [].concat(options);
    var opts = {
        retries: 10,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: Infinity,
        randomize: false
    };
    for(var key in options)opts[key] = options[key];
    if (opts.minTimeout > opts.maxTimeout) throw new Error("minTimeout is greater than maxTimeout");
    var timeouts = [];
    for(var i = 0; i < opts.retries; i++)timeouts.push(this.createTimeout(i, opts));
    if (options && options.forever && !timeouts.length) timeouts.push(this.createTimeout(i, opts));
    // sort the array numerically ascending
    timeouts.sort(function(a, b) {
        return a - b;
    });
    return timeouts;
};
exports.createTimeout = function(attempt, opts) {
    var random = opts.randomize ? Math.random() + 1 : 1;
    var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
    timeout = Math.min(timeout, opts.maxTimeout);
    return timeout;
};
exports.wrap = function(obj, options, methods) {
    if (options instanceof Array) {
        methods = options;
        options = null;
    }
    if (!methods) {
        methods = [];
        for(var key in obj)if (typeof obj[key] === "function") methods.push(key);
    }
    for(var i = 0; i < methods.length; i++){
        var method = methods[i];
        var original = obj[method];
        obj[method] = (function retryWrapper(original) {
            var op = exports.operation(options);
            var args = Array.prototype.slice.call(arguments, 1);
            var callback = args.pop();
            args.push(function(err) {
                if (op.retry(err)) return;
                if (err) arguments[0] = op.mainError();
                callback.apply(this, arguments);
            });
            op.attempt(function() {
                original.apply(obj, args);
            });
        }).bind(obj, original);
        obj[method].options = options;
    }
};

},{"383e94095bc9dc15":"9ZIIi"}],"9ZIIi":[function(require,module,exports) {
function RetryOperation(timeouts, options) {
    // Compatibility for the old (timeouts, retryForever) signature
    if (typeof options === "boolean") options = {
        forever: options
    };
    this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
    this._timeouts = timeouts;
    this._options = options || {};
    this._maxRetryTime = options && options.maxRetryTime || Infinity;
    this._fn = null;
    this._errors = [];
    this._attempts = 1;
    this._operationTimeout = null;
    this._operationTimeoutCb = null;
    this._timeout = null;
    this._operationStart = null;
    this._timer = null;
    if (this._options.forever) this._cachedTimeouts = this._timeouts.slice(0);
}
module.exports = RetryOperation;
RetryOperation.prototype.reset = function() {
    this._attempts = 1;
    this._timeouts = this._originalTimeouts.slice(0);
};
RetryOperation.prototype.stop = function() {
    if (this._timeout) clearTimeout(this._timeout);
    if (this._timer) clearTimeout(this._timer);
    this._timeouts = [];
    this._cachedTimeouts = null;
};
RetryOperation.prototype.retry = function(err) {
    if (this._timeout) clearTimeout(this._timeout);
    if (!err) return false;
    var currentTime = new Date().getTime();
    if (err && currentTime - this._operationStart >= this._maxRetryTime) {
        this._errors.push(err);
        this._errors.unshift(new Error("RetryOperation timeout occurred"));
        return false;
    }
    this._errors.push(err);
    var timeout = this._timeouts.shift();
    if (timeout === undefined) {
        if (this._cachedTimeouts) {
            // retry forever, only keep last error
            this._errors.splice(0, this._errors.length - 1);
            timeout = this._cachedTimeouts.slice(-1);
        } else return false;
    }
    var self = this;
    this._timer = setTimeout(function() {
        self._attempts++;
        if (self._operationTimeoutCb) {
            self._timeout = setTimeout(function() {
                self._operationTimeoutCb(self._attempts);
            }, self._operationTimeout);
            if (self._options.unref) self._timeout.unref();
        }
        self._fn(self._attempts);
    }, timeout);
    if (this._options.unref) this._timer.unref();
    return true;
};
RetryOperation.prototype.attempt = function(fn, timeoutOps) {
    this._fn = fn;
    if (timeoutOps) {
        if (timeoutOps.timeout) this._operationTimeout = timeoutOps.timeout;
        if (timeoutOps.cb) this._operationTimeoutCb = timeoutOps.cb;
    }
    var self = this;
    if (this._operationTimeoutCb) this._timeout = setTimeout(function() {
        self._operationTimeoutCb();
    }, self._operationTimeout);
    this._operationStart = new Date().getTime();
    this._fn(this._attempts);
};
RetryOperation.prototype.try = function(fn) {
    console.log("Using RetryOperation.try() is deprecated");
    this.attempt(fn);
};
RetryOperation.prototype.start = function(fn) {
    console.log("Using RetryOperation.start() is deprecated");
    this.attempt(fn);
};
RetryOperation.prototype.start = RetryOperation.prototype.try;
RetryOperation.prototype.errors = function() {
    return this._errors;
};
RetryOperation.prototype.attempts = function() {
    return this._attempts;
};
RetryOperation.prototype.mainError = function() {
    if (this._errors.length === 0) return null;
    var counts = {};
    var mainError = null;
    var mainErrorCount = 0;
    for(var i = 0; i < this._errors.length; i++){
        var error = this._errors[i];
        var message = error.message;
        var count = (counts[message] || 0) + 1;
        counts[message] = count;
        if (count >= mainErrorCount) {
            mainError = error;
            mainErrorCount = count;
        }
    }
    return mainError;
};

},{}],"dAlXr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "parseCallbackConfigArg", ()=>parseCallbackConfigArg);
/**
 * Manage callbacks from different components of LangChain.
 */ parcelHelpers.export(exports, "BaseCallbackManager", ()=>BaseCallbackManager);
/**
 * Manages callbacks for retriever runs.
 */ parcelHelpers.export(exports, "CallbackManagerForRetrieverRun", ()=>CallbackManagerForRetrieverRun);
parcelHelpers.export(exports, "CallbackManagerForLLMRun", ()=>CallbackManagerForLLMRun);
parcelHelpers.export(exports, "CallbackManagerForChainRun", ()=>CallbackManagerForChainRun);
parcelHelpers.export(exports, "CallbackManagerForToolRun", ()=>CallbackManagerForToolRun);
parcelHelpers.export(exports, "CallbackManager", ()=>CallbackManager);
parcelHelpers.export(exports, "TraceGroup", ()=>TraceGroup);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
parcelHelpers.export(exports, "traceAsGroup", ()=>traceAsGroup);
var _uuid = require("uuid");
var _baseJs = require("./base.js");
var _consoleJs = require("./handlers/console.js");
var _initializeJs = require("./handlers/initialize.js");
var _baseJs1 = require("../memory/base.js");
var _envJs = require("../util/env.js");
var _tracerLangchainJs = require("./handlers/tracer_langchain.js");
var _promisesJs = require("./promises.js");
function parseCallbackConfigArg(arg) {
    if (!arg) return {};
    else if (Array.isArray(arg) || "name" in arg) return {
        callbacks: arg
    };
    else return arg;
}
class BaseCallbackManager {
    setHandler(handler) {
        return this.setHandlers([
            handler
        ]);
    }
}
/**
 * Base class for run manager in LangChain.
 */ class BaseRunManager {
    constructor(runId, handlers, inheritableHandlers, tags, inheritableTags, metadata, inheritableMetadata, _parentRunId){
        Object.defineProperty(this, "runId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: runId
        });
        Object.defineProperty(this, "handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: handlers
        });
        Object.defineProperty(this, "inheritableHandlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: inheritableHandlers
        });
        Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: tags
        });
        Object.defineProperty(this, "inheritableTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: inheritableTags
        });
        Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: metadata
        });
        Object.defineProperty(this, "inheritableMetadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: inheritableMetadata
        });
        Object.defineProperty(this, "_parentRunId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _parentRunId
        });
    }
    async handleText(text) {
        await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                try {
                    await handler.handleText?.(text, this.runId, this._parentRunId, this.tags);
                } catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleText: ${err}`);
                }
            }, handler.awaitHandlers)));
    }
}
class CallbackManagerForRetrieverRun extends BaseRunManager {
    getChild(tag) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const manager = new CallbackManager(this.runId);
        manager.setHandlers(this.inheritableHandlers);
        manager.addTags(this.inheritableTags);
        manager.addMetadata(this.inheritableMetadata);
        if (tag) manager.addTags([
            tag
        ], false);
        return manager;
    }
    async handleRetrieverEnd(documents) {
        await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                if (!handler.ignoreRetriever) try {
                    await handler.handleRetrieverEnd?.(documents, this.runId, this._parentRunId, this.tags);
                } catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleRetriever`);
                }
            }, handler.awaitHandlers)));
    }
    async handleRetrieverError(err) {
        await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                if (!handler.ignoreRetriever) try {
                    await handler.handleRetrieverError?.(err, this.runId, this._parentRunId, this.tags);
                } catch (error) {
                    console.error(`Error in handler ${handler.constructor.name}, handleRetrieverError: ${error}`);
                }
            }, handler.awaitHandlers)));
    }
}
class CallbackManagerForLLMRun extends BaseRunManager {
    async handleLLMNewToken(token, idx, _runId, _parentRunId, _tags, fields) {
        await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                if (!handler.ignoreLLM) try {
                    await handler.handleLLMNewToken?.(token, idx ?? {
                        prompt: 0,
                        completion: 0
                    }, this.runId, this._parentRunId, this.tags, fields);
                } catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleLLMNewToken: ${err}`);
                }
            }, handler.awaitHandlers)));
    }
    async handleLLMError(err) {
        await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                if (!handler.ignoreLLM) try {
                    await handler.handleLLMError?.(err, this.runId, this._parentRunId, this.tags);
                } catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleLLMError: ${err}`);
                }
            }, handler.awaitHandlers)));
    }
    async handleLLMEnd(output) {
        await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                if (!handler.ignoreLLM) try {
                    await handler.handleLLMEnd?.(output, this.runId, this._parentRunId, this.tags);
                } catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleLLMEnd: ${err}`);
                }
            }, handler.awaitHandlers)));
    }
}
class CallbackManagerForChainRun extends BaseRunManager {
    getChild(tag) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const manager = new CallbackManager(this.runId);
        manager.setHandlers(this.inheritableHandlers);
        manager.addTags(this.inheritableTags);
        manager.addMetadata(this.inheritableMetadata);
        if (tag) manager.addTags([
            tag
        ], false);
        return manager;
    }
    async handleChainError(err, _runId, _parentRunId, _tags, kwargs) {
        await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                if (!handler.ignoreChain) try {
                    await handler.handleChainError?.(err, this.runId, this._parentRunId, this.tags, kwargs);
                } catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleChainError: ${err}`);
                }
            }, handler.awaitHandlers)));
    }
    async handleChainEnd(output, _runId, _parentRunId, _tags, kwargs) {
        await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                if (!handler.ignoreChain) try {
                    await handler.handleChainEnd?.(output, this.runId, this._parentRunId, this.tags, kwargs);
                } catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleChainEnd: ${err}`);
                }
            }, handler.awaitHandlers)));
    }
    async handleAgentAction(action) {
        await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                if (!handler.ignoreAgent) try {
                    await handler.handleAgentAction?.(action, this.runId, this._parentRunId, this.tags);
                } catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleAgentAction: ${err}`);
                }
            }, handler.awaitHandlers)));
    }
    async handleAgentEnd(action) {
        await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                if (!handler.ignoreAgent) try {
                    await handler.handleAgentEnd?.(action, this.runId, this._parentRunId, this.tags);
                } catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleAgentEnd: ${err}`);
                }
            }, handler.awaitHandlers)));
    }
}
class CallbackManagerForToolRun extends BaseRunManager {
    getChild(tag) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const manager = new CallbackManager(this.runId);
        manager.setHandlers(this.inheritableHandlers);
        manager.addTags(this.inheritableTags);
        manager.addMetadata(this.inheritableMetadata);
        if (tag) manager.addTags([
            tag
        ], false);
        return manager;
    }
    async handleToolError(err) {
        await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                if (!handler.ignoreAgent) try {
                    await handler.handleToolError?.(err, this.runId, this._parentRunId, this.tags);
                } catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleToolError: ${err}`);
                }
            }, handler.awaitHandlers)));
    }
    async handleToolEnd(output) {
        await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                if (!handler.ignoreAgent) try {
                    await handler.handleToolEnd?.(output, this.runId, this._parentRunId, this.tags);
                } catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleToolEnd: ${err}`);
                }
            }, handler.awaitHandlers)));
    }
}
class CallbackManager extends BaseCallbackManager {
    constructor(parentRunId){
        super();
        Object.defineProperty(this, "handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inheritableHandlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "inheritableTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "inheritableMetadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "callback_manager"
        });
        Object.defineProperty(this, "_parentRunId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.handlers = [];
        this.inheritableHandlers = [];
        this._parentRunId = parentRunId;
    }
    async handleLLMStart(llm, prompts, _runId, _parentRunId, extraParams) {
        return Promise.all(prompts.map(async (prompt)=>{
            const runId = (0, _uuid.v4)();
            await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                    if (!handler.ignoreLLM) try {
                        await handler.handleLLMStart?.(llm, [
                            prompt
                        ], runId, this._parentRunId, extraParams, this.tags, this.metadata);
                    } catch (err) {
                        console.error(`Error in handler ${handler.constructor.name}, handleLLMStart: ${err}`);
                    }
                }, handler.awaitHandlers)));
            return new CallbackManagerForLLMRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
        }));
    }
    async handleChatModelStart(llm, messages, _runId, _parentRunId, extraParams) {
        return Promise.all(messages.map(async (messageGroup)=>{
            const runId = (0, _uuid.v4)();
            await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                    if (!handler.ignoreLLM) try {
                        if (handler.handleChatModelStart) await handler.handleChatModelStart?.(llm, [
                            messageGroup
                        ], runId, this._parentRunId, extraParams, this.tags, this.metadata);
                        else if (handler.handleLLMStart) {
                            const messageString = (0, _baseJs1.getBufferString)(messageGroup);
                            await handler.handleLLMStart?.(llm, [
                                messageString
                            ], runId, this._parentRunId, extraParams, this.tags, this.metadata);
                        }
                    } catch (err) {
                        console.error(`Error in handler ${handler.constructor.name}, handleLLMStart: ${err}`);
                    }
                }, handler.awaitHandlers)));
            return new CallbackManagerForLLMRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
        }));
    }
    async handleChainStart(chain, inputs, runId = (0, _uuid.v4)(), runType) {
        await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                if (!handler.ignoreChain) try {
                    await handler.handleChainStart?.(chain, inputs, runId, this._parentRunId, this.tags, this.metadata, runType);
                } catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleChainStart: ${err}`);
                }
            }, handler.awaitHandlers)));
        return new CallbackManagerForChainRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
    }
    async handleToolStart(tool, input, runId = (0, _uuid.v4)()) {
        await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                if (!handler.ignoreAgent) try {
                    await handler.handleToolStart?.(tool, input, runId, this._parentRunId, this.tags, this.metadata);
                } catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleToolStart: ${err}`);
                }
            }, handler.awaitHandlers)));
        return new CallbackManagerForToolRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
    }
    async handleRetrieverStart(retriever, query, runId = (0, _uuid.v4)(), _parentRunId) {
        await Promise.all(this.handlers.map((handler)=>(0, _promisesJs.consumeCallback)(async ()=>{
                if (!handler.ignoreRetriever) try {
                    await handler.handleRetrieverStart?.(retriever, query, runId, this._parentRunId, this.tags, this.metadata);
                } catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleRetrieverStart: ${err}`);
                }
            }, handler.awaitHandlers)));
        return new CallbackManagerForRetrieverRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
    }
    addHandler(handler, inherit = true) {
        this.handlers.push(handler);
        if (inherit) this.inheritableHandlers.push(handler);
    }
    removeHandler(handler) {
        this.handlers = this.handlers.filter((_handler)=>_handler !== handler);
        this.inheritableHandlers = this.inheritableHandlers.filter((_handler)=>_handler !== handler);
    }
    setHandlers(handlers, inherit = true) {
        this.handlers = [];
        this.inheritableHandlers = [];
        for (const handler of handlers)this.addHandler(handler, inherit);
    }
    addTags(tags, inherit = true) {
        this.removeTags(tags); // Remove duplicates
        this.tags.push(...tags);
        if (inherit) this.inheritableTags.push(...tags);
    }
    removeTags(tags) {
        this.tags = this.tags.filter((tag)=>!tags.includes(tag));
        this.inheritableTags = this.inheritableTags.filter((tag)=>!tags.includes(tag));
    }
    addMetadata(metadata, inherit = true) {
        this.metadata = {
            ...this.metadata,
            ...metadata
        };
        if (inherit) this.inheritableMetadata = {
            ...this.inheritableMetadata,
            ...metadata
        };
    }
    removeMetadata(metadata) {
        for (const key of Object.keys(metadata)){
            delete this.metadata[key];
            delete this.inheritableMetadata[key];
        }
    }
    copy(additionalHandlers = [], inherit = true) {
        const manager = new CallbackManager(this._parentRunId);
        for (const handler of this.handlers){
            const inheritable = this.inheritableHandlers.includes(handler);
            manager.addHandler(handler, inheritable);
        }
        for (const tag of this.tags){
            const inheritable = this.inheritableTags.includes(tag);
            manager.addTags([
                tag
            ], inheritable);
        }
        for (const key of Object.keys(this.metadata)){
            const inheritable = Object.keys(this.inheritableMetadata).includes(key);
            manager.addMetadata({
                [key]: this.metadata[key]
            }, inheritable);
        }
        for (const handler of additionalHandlers){
            if (// Prevent multiple copies of console_callback_handler
            manager.handlers.filter((h)=>h.name === "console_callback_handler").some((h)=>h.name === handler.name)) continue;
            manager.addHandler(handler, inherit);
        }
        return manager;
    }
    static fromHandlers(handlers) {
        class Handler extends (0, _baseJs.BaseCallbackHandler) {
            constructor(){
                super();
                Object.defineProperty(this, "name", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (0, _uuid.v4)()
                });
                Object.assign(this, handlers);
            }
        }
        const manager = new this();
        manager.addHandler(new Handler());
        return manager;
    }
    static async configure(inheritableHandlers, localHandlers, inheritableTags, localTags, inheritableMetadata, localMetadata, options) {
        let callbackManager;
        if (inheritableHandlers || localHandlers) {
            if (Array.isArray(inheritableHandlers) || !inheritableHandlers) {
                callbackManager = new CallbackManager();
                callbackManager.setHandlers(inheritableHandlers?.map(ensureHandler) ?? [], true);
            } else callbackManager = inheritableHandlers;
            callbackManager = callbackManager.copy(Array.isArray(localHandlers) ? localHandlers.map(ensureHandler) : localHandlers?.handlers, false);
        }
        const verboseEnabled = (0, _envJs.getEnvironmentVariable)("LANGCHAIN_VERBOSE") || options?.verbose;
        const tracingV2Enabled = (0, _envJs.getEnvironmentVariable)("LANGCHAIN_TRACING_V2") === "true";
        const tracingEnabled = tracingV2Enabled || ((0, _envJs.getEnvironmentVariable)("LANGCHAIN_TRACING") ?? false);
        if (verboseEnabled || tracingEnabled) {
            if (!callbackManager) callbackManager = new CallbackManager();
            if (verboseEnabled && !callbackManager.handlers.some((handler)=>handler.name === (0, _consoleJs.ConsoleCallbackHandler).prototype.name)) {
                const consoleHandler = new (0, _consoleJs.ConsoleCallbackHandler)();
                callbackManager.addHandler(consoleHandler, true);
            }
            if (tracingEnabled && !callbackManager.handlers.some((handler)=>handler.name === "langchain_tracer")) {
                if (tracingV2Enabled) callbackManager.addHandler(await (0, _initializeJs.getTracingV2CallbackHandler)(), true);
                else {
                    const session = (0, _envJs.getEnvironmentVariable)("LANGCHAIN_PROJECT") && (0, _envJs.getEnvironmentVariable)("LANGCHAIN_SESSION");
                    callbackManager.addHandler(await (0, _initializeJs.getTracingCallbackHandler)(session), true);
                }
            }
        }
        if (inheritableTags || localTags) {
            if (callbackManager) {
                callbackManager.addTags(inheritableTags ?? []);
                callbackManager.addTags(localTags ?? [], false);
            }
        }
        if (inheritableMetadata || localMetadata) {
            if (callbackManager) {
                callbackManager.addMetadata(inheritableMetadata ?? {});
                callbackManager.addMetadata(localMetadata ?? {}, false);
            }
        }
        return callbackManager;
    }
}
function ensureHandler(handler) {
    if ("name" in handler) return handler;
    return (0, _baseJs.BaseCallbackHandler).fromMethods(handler);
}
class TraceGroup {
    constructor(groupName, options){
        Object.defineProperty(this, "groupName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: groupName
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "runManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    async getTraceGroupCallbackManager(group_name, inputs, options) {
        const cb = new (0, _tracerLangchainJs.LangChainTracer)(options);
        const cm = await CallbackManager.configure([
            cb
        ]);
        const runManager = await cm?.handleChainStart({
            lc: 1,
            type: "not_implemented",
            id: [
                "langchain",
                "callbacks",
                "groups",
                group_name
            ]
        }, inputs ?? {});
        if (!runManager) throw new Error("Failed to create run group callback manager.");
        return runManager;
    }
    async start(inputs) {
        if (!this.runManager) this.runManager = await this.getTraceGroupCallbackManager(this.groupName, inputs, this.options);
        return this.runManager.getChild();
    }
    async error(err) {
        if (this.runManager) {
            await this.runManager.handleChainError(err);
            this.runManager = undefined;
        }
    }
    async end(output) {
        if (this.runManager) {
            await this.runManager.handleChainEnd(output ?? {});
            this.runManager = undefined;
        }
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _coerceToDict(value, defaultKey) {
    return value && !Array.isArray(value) && typeof value === "object" ? value : {
        [defaultKey]: value
    };
}
async function traceAsGroup(groupOptions, enclosedCode, ...args) {
    const traceGroup = new TraceGroup(groupOptions.name, groupOptions);
    const callbackManager = await traceGroup.start({
        ...args
    });
    try {
        const result = await enclosedCode(callbackManager, ...args);
        await traceGroup.end(_coerceToDict(result, "output"));
        return result;
    } catch (err) {
        await traceGroup.error(err);
        throw err;
    }
}

},{"uuid":"8JjfD","./base.js":"KRv44","./handlers/console.js":"cBKDS","./handlers/initialize.js":"2dzDT","../memory/base.js":"eXKoO","../util/env.js":"hJTOE","./handlers/tracer_langchain.js":"l5ZEL","./promises.js":"f7PVg","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"8JjfD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "v1", ()=>(0, _v1JsDefault.default));
parcelHelpers.export(exports, "v3", ()=>(0, _v3JsDefault.default));
parcelHelpers.export(exports, "v4", ()=>(0, _v4JsDefault.default));
parcelHelpers.export(exports, "v5", ()=>(0, _v5JsDefault.default));
parcelHelpers.export(exports, "NIL", ()=>(0, _nilJsDefault.default));
parcelHelpers.export(exports, "version", ()=>(0, _versionJsDefault.default));
parcelHelpers.export(exports, "validate", ()=>(0, _validateJsDefault.default));
parcelHelpers.export(exports, "stringify", ()=>(0, _stringifyJsDefault.default));
parcelHelpers.export(exports, "parse", ()=>(0, _parseJsDefault.default));
var _v1Js = require("./v1.js");
var _v1JsDefault = parcelHelpers.interopDefault(_v1Js);
var _v3Js = require("./v3.js");
var _v3JsDefault = parcelHelpers.interopDefault(_v3Js);
var _v4Js = require("./v4.js");
var _v4JsDefault = parcelHelpers.interopDefault(_v4Js);
var _v5Js = require("./v5.js");
var _v5JsDefault = parcelHelpers.interopDefault(_v5Js);
var _nilJs = require("./nil.js");
var _nilJsDefault = parcelHelpers.interopDefault(_nilJs);
var _versionJs = require("./version.js");
var _versionJsDefault = parcelHelpers.interopDefault(_versionJs);
var _validateJs = require("./validate.js");
var _validateJsDefault = parcelHelpers.interopDefault(_validateJs);
var _stringifyJs = require("./stringify.js");
var _stringifyJsDefault = parcelHelpers.interopDefault(_stringifyJs);
var _parseJs = require("./parse.js");
var _parseJsDefault = parcelHelpers.interopDefault(_parseJs);

},{"./v1.js":"BlWO8","./v3.js":"gac7R","./v4.js":"7PvzR","./v5.js":"bTtaZ","./nil.js":"h2iiG","./version.js":"dfjHm","./validate.js":"bjQrB","./stringify.js":"bIieT","./parse.js":"b7UYY","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"BlWO8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rngJs = require("./rng.js");
var _rngJsDefault = parcelHelpers.interopDefault(_rngJs);
var _stringifyJs = require("./stringify.js"); // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;
let _clockseq; // Previous uuid creation time
let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
    let i = buf && offset || 0;
    const b = buf || new Array(16);
    options = options || {};
    let node = options.node || _nodeId;
    let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
    // specified.  We do this lazily to minimize issues related to insufficient
    // system entropy.  See #189
    if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || (0, _rngJsDefault.default))();
        if (node == null) // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
        node = _nodeId = [
            seedBytes[0] | 0x01,
            seedBytes[1],
            seedBytes[2],
            seedBytes[3],
            seedBytes[4],
            seedBytes[5]
        ];
        if (clockseq == null) // Per 4.2.2, randomize (14 bit) clockseq
        clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)
    const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq === undefined) clockseq = clockseq + 1 & 0x3fff;
     // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) nsecs = 0;
     // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000; // `time_low`
    const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff; // `time_mid`
    const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff; // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`
    b[i++] = clockseq & 0xff; // `node`
    for(let n = 0; n < 6; ++n)b[i + n] = node[n];
    return buf || (0, _stringifyJs.unsafeStringify)(b);
}
exports.default = v1;

},{"./rng.js":"7M8TZ","./stringify.js":"bIieT","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"7M8TZ":[function(require,module,exports) {
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>rng);
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
        getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
        if (!getRandomValues) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
    return getRandomValues(rnds8);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"bIieT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "unsafeStringify", ()=>unsafeStringify);
var _validateJs = require("./validate.js");
var _validateJsDefault = parcelHelpers.interopDefault(_validateJs);
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ const byteToHex = [];
for(let i = 0; i < 256; ++i)byteToHex.push((i + 0x100).toString(16).slice(1));
function unsafeStringify(arr, offset = 0) {
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!(0, _validateJsDefault.default)(uuid)) throw TypeError("Stringified UUID is invalid");
    return uuid;
}
exports.default = stringify;

},{"./validate.js":"bjQrB","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"bjQrB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _regexJs = require("./regex.js");
var _regexJsDefault = parcelHelpers.interopDefault(_regexJs);
function validate(uuid) {
    return typeof uuid === "string" && (0, _regexJsDefault.default).test(uuid);
}
exports.default = validate;

},{"./regex.js":"4HFMr","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"4HFMr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"gac7R":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _v35Js = require("./v35.js");
var _v35JsDefault = parcelHelpers.interopDefault(_v35Js);
var _md5Js = require("./md5.js");
var _md5JsDefault = parcelHelpers.interopDefault(_md5Js);
const v3 = (0, _v35JsDefault.default)("v3", 0x30, (0, _md5JsDefault.default));
exports.default = v3;

},{"./v35.js":"fXup9","./md5.js":"6JTcl","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"fXup9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DNS", ()=>DNS);
parcelHelpers.export(exports, "URL", ()=>URL);
parcelHelpers.export(exports, "default", ()=>v35);
var _stringifyJs = require("./stringify.js");
var _parseJs = require("./parse.js");
var _parseJsDefault = parcelHelpers.interopDefault(_parseJs);
function stringToBytes(str) {
    str = unescape(encodeURIComponent(str)); // UTF8 escape
    const bytes = [];
    for(let i = 0; i < str.length; ++i)bytes.push(str.charCodeAt(i));
    return bytes;
}
const DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
const URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function v35(name, version, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
        var _namespace;
        if (typeof value === "string") value = stringToBytes(value);
        if (typeof namespace === "string") namespace = (0, _parseJsDefault.default)(namespace);
        if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
         // Compute hash of namespace and value, Per 4.3
        // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
        // hashfunc([...namespace, ... value])`
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 0x0f | version;
        bytes[8] = bytes[8] & 0x3f | 0x80;
        if (buf) {
            offset = offset || 0;
            for(let i = 0; i < 16; ++i)buf[offset + i] = bytes[i];
            return buf;
        }
        return (0, _stringifyJs.unsafeStringify)(bytes);
    } // Function#name is not settable on some platforms (#270)
    try {
        generateUUID.name = name; // eslint-disable-next-line no-empty
    } catch (err) {} // For CommonJS default export support
    generateUUID.DNS = DNS;
    generateUUID.URL = URL;
    return generateUUID;
}

},{"./stringify.js":"bIieT","./parse.js":"b7UYY","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"b7UYY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _validateJs = require("./validate.js");
var _validateJsDefault = parcelHelpers.interopDefault(_validateJs);
function parse(uuid) {
    if (!(0, _validateJsDefault.default)(uuid)) throw TypeError("Invalid UUID");
    let v;
    const arr = new Uint8Array(16); // Parse ########-....-....-....-............
    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = v >>> 16 & 0xff;
    arr[2] = v >>> 8 & 0xff;
    arr[3] = v & 0xff; // Parse ........-####-....-....-............
    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v & 0xff; // Parse ........-....-####-....-............
    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v & 0xff; // Parse ........-....-....-####-............
    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v & 0xff; // Parse ........-....-....-....-############
    // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
    arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
    arr[11] = v / 0x100000000 & 0xff;
    arr[12] = v >>> 24 & 0xff;
    arr[13] = v >>> 16 & 0xff;
    arr[14] = v >>> 8 & 0xff;
    arr[15] = v & 0xff;
    return arr;
}
exports.default = parse;

},{"./validate.js":"bjQrB","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"6JTcl":[function(require,module,exports) {
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function md5(bytes) {
    if (typeof bytes === "string") {
        const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
        bytes = new Uint8Array(msg.length);
        for(let i = 0; i < msg.length; ++i)bytes[i] = msg.charCodeAt(i);
    }
    return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */ function md5ToHexEncodedArray(input) {
    const output = [];
    const length32 = input.length * 32;
    const hexTab = "0123456789abcdef";
    for(let i = 0; i < length32; i += 8){
        const x = input[i >> 5] >>> i % 32 & 0xff;
        const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
        output.push(hex);
    }
    return output;
}
/**
 * Calculate output length with padding and bit length
 */ function getOutputLength(inputLength8) {
    return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */ function wordsToMd5(x, len) {
    /* append padding */ x[len >> 5] |= 0x80 << len % 32;
    x[getOutputLength(len) - 1] = len;
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;
    for(let i = 0; i < x.length; i += 16){
        const olda = a;
        const oldb = b;
        const oldc = c;
        const oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
    }
    return [
        a,
        b,
        c,
        d
    ];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */ function bytesToWords(input) {
    if (input.length === 0) return [];
    const length8 = input.length * 8;
    const output = new Uint32Array(getOutputLength(length8));
    for(let i = 0; i < length8; i += 8)output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
    return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */ function safeAdd(x, y) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */ function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */ function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
    return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
    return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
exports.default = md5;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"7PvzR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _nativeJs = require("./native.js");
var _nativeJsDefault = parcelHelpers.interopDefault(_nativeJs);
var _rngJs = require("./rng.js");
var _rngJsDefault = parcelHelpers.interopDefault(_rngJs);
var _stringifyJs = require("./stringify.js");
function v4(options, buf, offset) {
    if ((0, _nativeJsDefault.default).randomUUID && !buf && !options) return (0, _nativeJsDefault.default).randomUUID();
    options = options || {};
    const rnds = options.random || (options.rng || (0, _rngJsDefault.default))(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(let i = 0; i < 16; ++i)buf[offset + i] = rnds[i];
        return buf;
    }
    return (0, _stringifyJs.unsafeStringify)(rnds);
}
exports.default = v4;

},{"./native.js":"asJPs","./rng.js":"7M8TZ","./stringify.js":"bIieT","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"asJPs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
exports.default = {
    randomUUID
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"bTtaZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _v35Js = require("./v35.js");
var _v35JsDefault = parcelHelpers.interopDefault(_v35Js);
var _sha1Js = require("./sha1.js");
var _sha1JsDefault = parcelHelpers.interopDefault(_sha1Js);
const v5 = (0, _v35JsDefault.default)("v5", 0x50, (0, _sha1JsDefault.default));
exports.default = v5;

},{"./v35.js":"fXup9","./sha1.js":"aBhWr","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"aBhWr":[function(require,module,exports) {
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function f(s, x, y, z) {
    switch(s){
        case 0:
            return x & y ^ ~x & z;
        case 1:
            return x ^ y ^ z;
        case 2:
            return x & y ^ x & z ^ y & z;
        case 3:
            return x ^ y ^ z;
    }
}
function ROTL(x, n) {
    return x << n | x >>> 32 - n;
}
function sha1(bytes) {
    const K = [
        0x5a827999,
        0x6ed9eba1,
        0x8f1bbcdc,
        0xca62c1d6
    ];
    const H = [
        0x67452301,
        0xefcdab89,
        0x98badcfe,
        0x10325476,
        0xc3d2e1f0
    ];
    if (typeof bytes === "string") {
        const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
        bytes = [];
        for(let i = 0; i < msg.length; ++i)bytes.push(msg.charCodeAt(i));
    } else if (!Array.isArray(bytes)) // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
    bytes.push(0x80);
    const l = bytes.length / 4 + 2;
    const N = Math.ceil(l / 16);
    const M = new Array(N);
    for(let i = 0; i < N; ++i){
        const arr = new Uint32Array(16);
        for(let j = 0; j < 16; ++j)arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
        M[i] = arr;
    }
    M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;
    for(let i = 0; i < N; ++i){
        const W = new Uint32Array(80);
        for(let t = 0; t < 16; ++t)W[t] = M[i][t];
        for(let t = 16; t < 80; ++t)W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
        let a = H[0];
        let b = H[1];
        let c = H[2];
        let d = H[3];
        let e = H[4];
        for(let t = 0; t < 80; ++t){
            const s = Math.floor(t / 20);
            const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
            e = d;
            d = c;
            c = ROTL(b, 30) >>> 0;
            b = a;
            a = T;
        }
        H[0] = H[0] + a >>> 0;
        H[1] = H[1] + b >>> 0;
        H[2] = H[2] + c >>> 0;
        H[3] = H[3] + d >>> 0;
        H[4] = H[4] + e >>> 0;
    }
    return [
        H[0] >> 24 & 0xff,
        H[0] >> 16 & 0xff,
        H[0] >> 8 & 0xff,
        H[0] & 0xff,
        H[1] >> 24 & 0xff,
        H[1] >> 16 & 0xff,
        H[1] >> 8 & 0xff,
        H[1] & 0xff,
        H[2] >> 24 & 0xff,
        H[2] >> 16 & 0xff,
        H[2] >> 8 & 0xff,
        H[2] & 0xff,
        H[3] >> 24 & 0xff,
        H[3] >> 16 & 0xff,
        H[3] >> 8 & 0xff,
        H[3] & 0xff,
        H[4] >> 24 & 0xff,
        H[4] >> 16 & 0xff,
        H[4] >> 8 & 0xff,
        H[4] & 0xff
    ];
}
exports.default = sha1;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"h2iiG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = "00000000-0000-0000-0000-000000000000";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"dfjHm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _validateJs = require("./validate.js");
var _validateJsDefault = parcelHelpers.interopDefault(_validateJs);
function version(uuid) {
    if (!(0, _validateJsDefault.default)(uuid)) throw TypeError("Invalid UUID");
    return parseInt(uuid.slice(14, 15), 16);
}
exports.default = version;

},{"./validate.js":"bjQrB","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"KRv44":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Abstract base class for creating callback handlers in the LangChain
 * framework. It provides a set of optional methods that can be overridden
 * in derived classes to handle various events during the execution of a
 * LangChain application.
 */ parcelHelpers.export(exports, "BaseCallbackHandler", ()=>BaseCallbackHandler);
var _uuid = require("uuid");
var _serializableJs = require("../load/serializable.js");
var process = require("e95cc6dd5cd392d1");
/**
 * Abstract class that provides a set of optional methods that can be
 * overridden in derived classes to handle various events during the
 * execution of a LangChain application.
 */ class BaseCallbackHandlerMethodsClass {
}
class BaseCallbackHandler extends BaseCallbackHandlerMethodsClass {
    get lc_namespace() {
        return [
            "langchain",
            "callbacks",
            this.name
        ];
    }
    get lc_secrets() {
        return undefined;
    }
    get lc_attributes() {
        return undefined;
    }
    get lc_aliases() {
        return undefined;
    }
    /**
     * The name of the serializable. Override to provide an alias or
     * to preserve the serialized module name in minified environments.
     *
     * Implemented as a static method to support loading logic.
     */ static lc_name() {
        return this.name;
    }
    /**
     * The final serialized identifier for the module.
     */ get lc_id() {
        return [
            ...this.lc_namespace,
            (0, _serializableJs.get_lc_unique_name)(this.constructor)
        ];
    }
    constructor(input){
        super();
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "lc_kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ignoreLLM", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "ignoreChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "ignoreAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "ignoreRetriever", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "awaitHandlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: typeof process !== "undefined" ? process.env?.LANGCHAIN_CALLBACKS_BACKGROUND !== "true" : true
        });
        this.lc_kwargs = input || {};
        if (input) {
            this.ignoreLLM = input.ignoreLLM ?? this.ignoreLLM;
            this.ignoreChain = input.ignoreChain ?? this.ignoreChain;
            this.ignoreAgent = input.ignoreAgent ?? this.ignoreAgent;
            this.ignoreRetriever = input.ignoreRetriever ?? this.ignoreRetriever;
        }
    }
    copy() {
        return new this.constructor(this);
    }
    toJSON() {
        return (0, _serializableJs.Serializable).prototype.toJSON.call(this);
    }
    toJSONNotImplemented() {
        return (0, _serializableJs.Serializable).prototype.toJSONNotImplemented.call(this);
    }
    static fromMethods(methods) {
        class Handler extends BaseCallbackHandler {
            constructor(){
                super();
                Object.defineProperty(this, "name", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: _uuid.v4()
                });
                Object.assign(this, methods);
            }
        }
        return new Handler();
    }
}

},{"e95cc6dd5cd392d1":"eZ6Ew","uuid":"8JjfD","../load/serializable.js":"c7QBM","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"eZ6Ew":[function(require,module,exports) {
var q = Object.create;
var p = Object.defineProperty;
var A = Object.getOwnPropertyDescriptor;
var I = Object.getOwnPropertyNames;
var Q = Object.getPrototypeOf, S = Object.prototype.hasOwnProperty;
var N = (e, t)=>()=>(t || e((t = {
            exports: {}
        }).exports, t), t.exports), O = (e, t)=>{
    for(var n in t)p(e, n, {
        get: t[n],
        enumerable: !0
    });
}, m = (e, t, n, w)=>{
    if (t && typeof t == "object" || typeof t == "function") for (let f of I(t))!S.call(e, f) && f !== n && p(e, f, {
        get: ()=>t[f],
        enumerable: !(w = A(t, f)) || w.enumerable
    });
    return e;
}, h = (e, t, n)=>(m(e, t, "default"), n && m(n, t, "default")), y = (e, t, n)=>(n = e != null ? q(Q(e)) : {}, m(t || !e || !e.__esModule ? p(n, "default", {
        value: e,
        enumerable: !0
    }) : n, e)), U = (e)=>m(p({}, "__esModule", {
        value: !0
    }), e);
var v = N((F, E)=>{
    var r = E.exports = {}, i, u;
    function T() {
        throw new Error("setTimeout has not been defined");
    }
    function g() {
        throw new Error("clearTimeout has not been defined");
    }
    (function() {
        try {
            typeof setTimeout == "function" ? i = setTimeout : i = T;
        } catch (e) {
            i = T;
        }
        try {
            typeof clearTimeout == "function" ? u = clearTimeout : u = g;
        } catch (e) {
            u = g;
        }
    })();
    function b(e) {
        if (i === setTimeout) return setTimeout(e, 0);
        if ((i === T || !i) && setTimeout) return i = setTimeout, setTimeout(e, 0);
        try {
            return i(e, 0);
        } catch (t) {
            try {
                return i.call(null, e, 0);
            } catch (n) {
                return i.call(this, e, 0);
            }
        }
    }
    function j(e) {
        if (u === clearTimeout) return clearTimeout(e);
        if ((u === g || !u) && clearTimeout) return u = clearTimeout, clearTimeout(e);
        try {
            return u(e);
        } catch (t) {
            try {
                return u.call(null, e);
            } catch (n) {
                return u.call(this, e);
            }
        }
    }
    var o = [], s = !1, a, d = -1;
    function z() {
        !s || !a || (s = !1, a.length ? o = a.concat(o) : d = -1, o.length && x());
    }
    function x() {
        if (!s) {
            var e = b(z);
            s = !0;
            for(var t = o.length; t;){
                for(a = o, o = []; ++d < t;)a && a[d].run();
                d = -1, t = o.length;
            }
            a = null, s = !1, j(e);
        }
    }
    r.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) for(var n = 1; n < arguments.length; n++)t[n - 1] = arguments[n];
        o.push(new L(e, t)), o.length === 1 && !s && b(x);
    };
    function L(e, t) {
        this.fun = e, this.array = t;
    }
    L.prototype.run = function() {
        this.fun.apply(null, this.array);
    };
    r.title = "browser";
    r.browser = !0;
    r.env = {};
    r.argv = [];
    r.version = "";
    r.versions = {};
    function c() {}
    r.on = c;
    r.addListener = c;
    r.once = c;
    r.off = c;
    r.removeListener = c;
    r.removeAllListeners = c;
    r.emit = c;
    r.prependListener = c;
    r.prependOnceListener = c;
    r.listeners = function(e) {
        return [];
    };
    r.binding = function(e) {
        throw new Error("process.binding is not supported");
    };
    r.cwd = function() {
        return "/";
    };
    r.chdir = function(e) {
        throw new Error("process.chdir is not supported");
    };
    r.umask = function() {
        return 0;
    };
});
var l = {};
O(l, {
    default: ()=>B
});
module.exports = U(l);
var C = y(v());
h(l, y(v()), module.exports);
var B = C.default;

},{}],"cBKDS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A tracer that logs all events to the console. It extends from the
 * `BaseTracer` class and overrides its methods to provide custom logging
 * functionality.
 */ parcelHelpers.export(exports, "ConsoleCallbackHandler", ()=>ConsoleCallbackHandler);
var _ansiStyles = require("ansi-styles");
var _ansiStylesDefault = parcelHelpers.interopDefault(_ansiStyles);
var _tracerJs = require("./tracer.js");
function wrap(style, text) {
    return `${style.open}${text}${style.close}`;
}
function tryJsonStringify(obj, fallback) {
    try {
        return JSON.stringify(obj, null, 2);
    } catch (err) {
        return fallback;
    }
}
function elapsed(run) {
    if (!run.end_time) return "";
    const elapsed = run.end_time - run.start_time;
    if (elapsed < 1000) return `${elapsed}ms`;
    return `${(elapsed / 1000).toFixed(2)}s`;
}
const { color } = (0, _ansiStylesDefault.default);
class ConsoleCallbackHandler extends (0, _tracerJs.BaseTracer) {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "console_callback_handler"
        });
    }
    /**
     * Method used to persist the run. In this case, it simply returns a
     * resolved promise as there's no persistence logic.
     * @param _run The run to persist.
     * @returns A resolved promise.
     */ persistRun(_run) {
        return Promise.resolve();
    }
    // utility methods
    /**
     * Method used to get all the parent runs of a given run.
     * @param run The run whose parents are to be retrieved.
     * @returns An array of parent runs.
     */ getParents(run) {
        const parents = [];
        let currentRun = run;
        while(currentRun.parent_run_id){
            const parent = this.runMap.get(currentRun.parent_run_id);
            if (parent) {
                parents.push(parent);
                currentRun = parent;
            } else break;
        }
        return parents;
    }
    /**
     * Method used to get a string representation of the run's lineage, which
     * is used in logging.
     * @param run The run whose lineage is to be retrieved.
     * @returns A string representation of the run's lineage.
     */ getBreadcrumbs(run) {
        const parents = this.getParents(run).reverse();
        const string = [
            ...parents,
            run
        ].map((parent, i, arr)=>{
            const name = `${parent.execution_order}:${parent.run_type}:${parent.name}`;
            return i === arr.length - 1 ? wrap((0, _ansiStylesDefault.default).bold, name) : name;
        }).join(" > ");
        return wrap(color.grey, string);
    }
    // logging methods
    /**
     * Method used to log the start of a chain run.
     * @param run The chain run that has started.
     * @returns void
     */ onChainStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.green, "[chain/start]")} [${crumbs}] Entering Chain run with input: ${tryJsonStringify(run.inputs, "[inputs]")}`);
    }
    /**
     * Method used to log the end of a chain run.
     * @param run The chain run that has ended.
     * @returns void
     */ onChainEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.cyan, "[chain/end]")} [${crumbs}] [${elapsed(run)}] Exiting Chain run with output: ${tryJsonStringify(run.outputs, "[outputs]")}`);
    }
    /**
     * Method used to log any errors of a chain run.
     * @param run The chain run that has errored.
     * @returns void
     */ onChainError(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.red, "[chain/error]")} [${crumbs}] [${elapsed(run)}] Chain run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
    }
    /**
     * Method used to log the start of an LLM run.
     * @param run The LLM run that has started.
     * @returns void
     */ onLLMStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        const inputs = "prompts" in run.inputs ? {
            prompts: run.inputs.prompts.map((p)=>p.trim())
        } : run.inputs;
        console.log(`${wrap(color.green, "[llm/start]")} [${crumbs}] Entering LLM run with input: ${tryJsonStringify(inputs, "[inputs]")}`);
    }
    /**
     * Method used to log the end of an LLM run.
     * @param run The LLM run that has ended.
     * @returns void
     */ onLLMEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.cyan, "[llm/end]")} [${crumbs}] [${elapsed(run)}] Exiting LLM run with output: ${tryJsonStringify(run.outputs, "[response]")}`);
    }
    /**
     * Method used to log any errors of an LLM run.
     * @param run The LLM run that has errored.
     * @returns void
     */ onLLMError(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.red, "[llm/error]")} [${crumbs}] [${elapsed(run)}] LLM run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
    }
    /**
     * Method used to log the start of a tool run.
     * @param run The tool run that has started.
     * @returns void
     */ onToolStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.green, "[tool/start]")} [${crumbs}] Entering Tool run with input: "${run.inputs.input?.trim()}"`);
    }
    /**
     * Method used to log the end of a tool run.
     * @param run The tool run that has ended.
     * @returns void
     */ onToolEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.cyan, "[tool/end]")} [${crumbs}] [${elapsed(run)}] Exiting Tool run with output: "${run.outputs?.output?.trim()}"`);
    }
    /**
     * Method used to log any errors of a tool run.
     * @param run The tool run that has errored.
     * @returns void
     */ onToolError(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.red, "[tool/error]")} [${crumbs}] [${elapsed(run)}] Tool run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
    }
    /**
     * Method used to log the start of a retriever run.
     * @param run The retriever run that has started.
     * @returns void
     */ onRetrieverStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.green, "[retriever/start]")} [${crumbs}] Entering Retriever run with input: ${tryJsonStringify(run.inputs, "[inputs]")}`);
    }
    /**
     * Method used to log the end of a retriever run.
     * @param run The retriever run that has ended.
     * @returns void
     */ onRetrieverEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.cyan, "[retriever/end]")} [${crumbs}] [${elapsed(run)}] Exiting Retriever run with output: ${tryJsonStringify(run.outputs, "[outputs]")}`);
    }
    /**
     * Method used to log any errors of a retriever run.
     * @param run The retriever run that has errored.
     * @returns void
     */ onRetrieverError(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.red, "[retriever/error]")} [${crumbs}] [${elapsed(run)}] Retriever run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
    }
    /**
     * Method used to log the action selected by the agent.
     * @param run The run in which the agent action occurred.
     * @returns void
     */ onAgentAction(run) {
        const agentRun = run;
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.blue, "[agent/action]")} [${crumbs}] Agent selected action: ${tryJsonStringify(agentRun.actions[agentRun.actions.length - 1], "[action]")}`);
    }
}

},{"ansi-styles":"dhMN0","./tracer.js":"4klw3","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"dhMN0":[function(require,module,exports) {
"use strict";
const ANSI_BACKGROUND_OFFSET = 10;
const wrapAnsi256 = (offset = 0)=>(code)=>`\u001B[${38 + offset};5;${code}m`;
const wrapAnsi16m = (offset = 0)=>(red, green, blue)=>`\u001B[${38 + offset};2;${red};${green};${blue}m`;
function assembleStyles() {
    const codes = new Map();
    const styles = {
        modifier: {
            reset: [
                0,
                0
            ],
            // 21 isn't widely supported and 22 does the same thing
            bold: [
                1,
                22
            ],
            dim: [
                2,
                22
            ],
            italic: [
                3,
                23
            ],
            underline: [
                4,
                24
            ],
            overline: [
                53,
                55
            ],
            inverse: [
                7,
                27
            ],
            hidden: [
                8,
                28
            ],
            strikethrough: [
                9,
                29
            ]
        },
        color: {
            black: [
                30,
                39
            ],
            red: [
                31,
                39
            ],
            green: [
                32,
                39
            ],
            yellow: [
                33,
                39
            ],
            blue: [
                34,
                39
            ],
            magenta: [
                35,
                39
            ],
            cyan: [
                36,
                39
            ],
            white: [
                37,
                39
            ],
            // Bright color
            blackBright: [
                90,
                39
            ],
            redBright: [
                91,
                39
            ],
            greenBright: [
                92,
                39
            ],
            yellowBright: [
                93,
                39
            ],
            blueBright: [
                94,
                39
            ],
            magentaBright: [
                95,
                39
            ],
            cyanBright: [
                96,
                39
            ],
            whiteBright: [
                97,
                39
            ]
        },
        bgColor: {
            bgBlack: [
                40,
                49
            ],
            bgRed: [
                41,
                49
            ],
            bgGreen: [
                42,
                49
            ],
            bgYellow: [
                43,
                49
            ],
            bgBlue: [
                44,
                49
            ],
            bgMagenta: [
                45,
                49
            ],
            bgCyan: [
                46,
                49
            ],
            bgWhite: [
                47,
                49
            ],
            // Bright color
            bgBlackBright: [
                100,
                49
            ],
            bgRedBright: [
                101,
                49
            ],
            bgGreenBright: [
                102,
                49
            ],
            bgYellowBright: [
                103,
                49
            ],
            bgBlueBright: [
                104,
                49
            ],
            bgMagentaBright: [
                105,
                49
            ],
            bgCyanBright: [
                106,
                49
            ],
            bgWhiteBright: [
                107,
                49
            ]
        }
    };
    // Alias bright black as gray (and grey)
    styles.color.gray = styles.color.blackBright;
    styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
    styles.color.grey = styles.color.blackBright;
    styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
    for (const [groupName, group] of Object.entries(styles)){
        for (const [styleName, style] of Object.entries(group)){
            styles[styleName] = {
                open: `\u001B[${style[0]}m`,
                close: `\u001B[${style[1]}m`
            };
            group[styleName] = styles[styleName];
            codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
            value: group,
            enumerable: false
        });
    }
    Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
    });
    styles.color.close = "\x1b[39m";
    styles.bgColor.close = "\x1b[49m";
    styles.color.ansi256 = wrapAnsi256();
    styles.color.ansi16m = wrapAnsi16m();
    styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
    styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
    // From https://github.com/Qix-/color-convert/blob/3f0e0d4e92e235796ccb17f6e85c72094a651f49/conversions.js
    Object.defineProperties(styles, {
        rgbToAnsi256: {
            value: (red, green, blue)=>{
                // We use the extended greyscale palette here, with the exception of
                // black and white. normal palette only has 4 greyscale shades.
                if (red === green && green === blue) {
                    if (red < 8) return 16;
                    if (red > 248) return 231;
                    return Math.round((red - 8) / 247 * 24) + 232;
                }
                return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
            },
            enumerable: false
        },
        hexToRgb: {
            value: (hex)=>{
                const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
                if (!matches) return [
                    0,
                    0,
                    0
                ];
                let { colorString } = matches.groups;
                if (colorString.length === 3) colorString = colorString.split("").map((character)=>character + character).join("");
                const integer = Number.parseInt(colorString, 16);
                return [
                    integer >> 16 & 0xFF,
                    integer >> 8 & 0xFF,
                    integer & 0xFF
                ];
            },
            enumerable: false
        },
        hexToAnsi256: {
            value: (hex)=>styles.rgbToAnsi256(...styles.hexToRgb(hex)),
            enumerable: false
        }
    });
    return styles;
}
// Make the export immutable
Object.defineProperty(module, "exports", {
    enumerable: true,
    get: assembleStyles
});

},{}],"4klw3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BaseTracer", ()=>BaseTracer);
var _baseJs = require("../base.js");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _coerceToDict(value, defaultKey) {
    return value && !Array.isArray(value) && typeof value === "object" ? value : {
        [defaultKey]: value
    };
}
class BaseTracer extends (0, _baseJs.BaseCallbackHandler) {
    constructor(_fields){
        super(...arguments);
        Object.defineProperty(this, "runMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
    }
    copy() {
        return this;
    }
    _addChildRun(parentRun, childRun) {
        parentRun.child_runs.push(childRun);
    }
    _startTrace(run) {
        if (run.parent_run_id !== undefined) {
            const parentRun = this.runMap.get(run.parent_run_id);
            if (parentRun) {
                this._addChildRun(parentRun, run);
                parentRun.child_execution_order = Math.max(parentRun.child_execution_order, run.child_execution_order);
            }
        }
        this.runMap.set(run.id, run);
    }
    async _endTrace(run) {
        const parentRun = run.parent_run_id !== undefined && this.runMap.get(run.parent_run_id);
        if (parentRun) parentRun.child_execution_order = Math.max(parentRun.child_execution_order, run.child_execution_order);
        else await this.persistRun(run);
        this.runMap.delete(run.id);
    }
    _getExecutionOrder(parentRunId) {
        const parentRun = parentRunId !== undefined && this.runMap.get(parentRunId);
        // If a run has no parent then execution order is 1
        if (!parentRun) return 1;
        return parentRun.child_execution_order + 1;
    }
    async handleLLMStart(llm, prompts, runId, parentRunId, extraParams, tags, metadata) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const start_time = Date.now();
        const finalExtraParams = metadata ? {
            ...extraParams,
            metadata
        } : extraParams;
        const run = {
            id: runId,
            name: llm.id[llm.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: llm,
            events: [
                {
                    name: "start",
                    time: new Date(start_time).toISOString()
                }
            ],
            inputs: {
                prompts
            },
            execution_order,
            child_runs: [],
            child_execution_order: execution_order,
            run_type: "llm",
            extra: finalExtraParams ?? {},
            tags: tags || []
        };
        this._startTrace(run);
        await this.onLLMStart?.(run);
    }
    async handleChatModelStart(llm, messages, runId, parentRunId, extraParams, tags, metadata) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const start_time = Date.now();
        const finalExtraParams = metadata ? {
            ...extraParams,
            metadata
        } : extraParams;
        const run = {
            id: runId,
            name: llm.id[llm.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: llm,
            events: [
                {
                    name: "start",
                    time: new Date(start_time).toISOString()
                }
            ],
            inputs: {
                messages
            },
            execution_order,
            child_runs: [],
            child_execution_order: execution_order,
            run_type: "llm",
            extra: finalExtraParams ?? {},
            tags: tags || []
        };
        this._startTrace(run);
        await this.onLLMStart?.(run);
    }
    async handleLLMEnd(output, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "llm") throw new Error("No LLM run to end.");
        run.end_time = Date.now();
        run.outputs = output;
        run.events.push({
            name: "end",
            time: new Date(run.end_time).toISOString()
        });
        await this.onLLMEnd?.(run);
        await this._endTrace(run);
    }
    async handleLLMError(error, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "llm") throw new Error("No LLM run to end.");
        run.end_time = Date.now();
        run.error = error.message;
        run.events.push({
            name: "error",
            time: new Date(run.end_time).toISOString()
        });
        await this.onLLMError?.(run);
        await this._endTrace(run);
    }
    async handleChainStart(chain, inputs, runId, parentRunId, tags, metadata, runType) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const start_time = Date.now();
        const run = {
            id: runId,
            name: chain.id[chain.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: chain,
            events: [
                {
                    name: "start",
                    time: new Date(start_time).toISOString()
                }
            ],
            inputs,
            execution_order,
            child_execution_order: execution_order,
            run_type: runType ?? "chain",
            child_runs: [],
            extra: metadata ? {
                metadata
            } : {},
            tags: tags || []
        };
        this._startTrace(run);
        await this.onChainStart?.(run);
    }
    async handleChainEnd(outputs, runId, _parentRunId, _tags, kwargs) {
        const run = this.runMap.get(runId);
        if (!run) throw new Error("No chain run to end.");
        run.end_time = Date.now();
        run.outputs = _coerceToDict(outputs, "output");
        run.events.push({
            name: "end",
            time: new Date(run.end_time).toISOString()
        });
        if (kwargs?.inputs !== undefined) run.inputs = _coerceToDict(kwargs.inputs, "input");
        await this.onChainEnd?.(run);
        await this._endTrace(run);
    }
    async handleChainError(error, runId, _parentRunId, _tags, kwargs) {
        const run = this.runMap.get(runId);
        if (!run) throw new Error("No chain run to end.");
        run.end_time = Date.now();
        run.error = error.message;
        run.events.push({
            name: "error",
            time: new Date(run.end_time).toISOString()
        });
        if (kwargs?.inputs !== undefined) run.inputs = _coerceToDict(kwargs.inputs, "input");
        await this.onChainError?.(run);
        await this._endTrace(run);
    }
    async handleToolStart(tool, input, runId, parentRunId, tags, metadata) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const start_time = Date.now();
        const run = {
            id: runId,
            name: tool.id[tool.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: tool,
            events: [
                {
                    name: "start",
                    time: new Date(start_time).toISOString()
                }
            ],
            inputs: {
                input
            },
            execution_order,
            child_execution_order: execution_order,
            run_type: "tool",
            child_runs: [],
            extra: metadata ? {
                metadata
            } : {},
            tags: tags || []
        };
        this._startTrace(run);
        await this.onToolStart?.(run);
    }
    async handleToolEnd(output, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "tool") throw new Error("No tool run to end");
        run.end_time = Date.now();
        run.outputs = {
            output
        };
        run.events.push({
            name: "end",
            time: new Date(run.end_time).toISOString()
        });
        await this.onToolEnd?.(run);
        await this._endTrace(run);
    }
    async handleToolError(error, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "tool") throw new Error("No tool run to end");
        run.end_time = Date.now();
        run.error = error.message;
        run.events.push({
            name: "error",
            time: new Date(run.end_time).toISOString()
        });
        await this.onToolError?.(run);
        await this._endTrace(run);
    }
    async handleAgentAction(action, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "chain") return;
        const agentRun = run;
        agentRun.actions = agentRun.actions || [];
        agentRun.actions.push(action);
        agentRun.events.push({
            name: "agent_action",
            time: new Date().toISOString(),
            kwargs: {
                action
            }
        });
        await this.onAgentAction?.(run);
    }
    async handleAgentEnd(action, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "chain") return;
        run.events.push({
            name: "agent_end",
            time: new Date().toISOString(),
            kwargs: {
                action
            }
        });
        await this.onAgentEnd?.(run);
    }
    async handleRetrieverStart(retriever, query, runId, parentRunId, tags, metadata) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const start_time = Date.now();
        const run = {
            id: runId,
            name: retriever.id[retriever.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: retriever,
            events: [
                {
                    name: "start",
                    time: new Date(start_time).toISOString()
                }
            ],
            inputs: {
                query
            },
            execution_order,
            child_execution_order: execution_order,
            run_type: "retriever",
            child_runs: [],
            extra: metadata ? {
                metadata
            } : {},
            tags: tags || []
        };
        this._startTrace(run);
        await this.onRetrieverStart?.(run);
    }
    async handleRetrieverEnd(documents, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "retriever") throw new Error("No retriever run to end");
        run.end_time = Date.now();
        run.outputs = {
            documents
        };
        run.events.push({
            name: "end",
            time: new Date(run.end_time).toISOString()
        });
        await this.onRetrieverEnd?.(run);
        await this._endTrace(run);
    }
    async handleRetrieverError(error, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "retriever") throw new Error("No retriever run to end");
        run.end_time = Date.now();
        run.error = error.message;
        run.events.push({
            name: "error",
            time: new Date(run.end_time).toISOString()
        });
        await this.onRetrieverError?.(run);
        await this._endTrace(run);
    }
    async handleText(text, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "chain") return;
        run.events.push({
            name: "text",
            time: new Date().toISOString(),
            kwargs: {
                text
            }
        });
        await this.onText?.(run);
    }
    async handleLLMNewToken(token, idx, runId, _parentRunId, _tags, fields) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "llm") return;
        run.events.push({
            name: "new_token",
            time: new Date().toISOString(),
            kwargs: {
                token,
                idx,
                chunk: fields?.chunk
            }
        });
        await this.onLLMNewToken?.(run);
    }
}

},{"../base.js":"KRv44","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"2dzDT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Function that returns an instance of `LangChainTracerV1`. If a session
 * is provided, it loads that session into the tracer; otherwise, it loads
 * a default session.
 * @param session Optional session to load into the tracer.
 * @returns An instance of `LangChainTracerV1`.
 */ parcelHelpers.export(exports, "getTracingCallbackHandler", ()=>getTracingCallbackHandler);
/**
 * Function that returns an instance of `LangChainTracer`. It does not
 * load any session data.
 * @returns An instance of `LangChainTracer`.
 */ parcelHelpers.export(exports, "getTracingV2CallbackHandler", ()=>getTracingV2CallbackHandler);
var _tracerLangchainJs = require("./tracer_langchain.js");
var _tracerLangchainV1Js = require("./tracer_langchain_v1.js");
async function getTracingCallbackHandler(session) {
    const tracer = new (0, _tracerLangchainV1Js.LangChainTracerV1)();
    if (session) await tracer.loadSession(session);
    else await tracer.loadDefaultSession();
    return tracer;
}
async function getTracingV2CallbackHandler() {
    return new (0, _tracerLangchainJs.LangChainTracer)();
}

},{"./tracer_langchain.js":"l5ZEL","./tracer_langchain_v1.js":"bBnwl","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"l5ZEL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LangChainTracer", ()=>LangChainTracer);
var _langsmith = require("langsmith");
var _envJs = require("../../util/env.js");
var _tracerJs = require("./tracer.js");
class LangChainTracer extends (0, _tracerJs.BaseTracer) {
    constructor(fields = {}){
        super(fields);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "langchain_tracer"
        });
        Object.defineProperty(this, "projectName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "exampleId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { exampleId, projectName, client } = fields;
        this.projectName = projectName ?? (0, _envJs.getEnvironmentVariable)("LANGCHAIN_PROJECT") ?? (0, _envJs.getEnvironmentVariable)("LANGCHAIN_SESSION");
        this.exampleId = exampleId;
        this.client = client ?? new (0, _langsmith.Client)({});
    }
    async _convertToCreate(run, example_id) {
        return {
            ...run,
            extra: {
                ...run.extra,
                runtime: await (0, _envJs.getRuntimeEnvironment)()
            },
            child_runs: undefined,
            session_name: this.projectName,
            reference_example_id: run.parent_run_id ? undefined : example_id
        };
    }
    async persistRun(_run) {}
    async _persistRunSingle(run) {
        const persistedRun = await this._convertToCreate(run, this.exampleId);
        await this.client.createRun(persistedRun);
    }
    async _updateRunSingle(run) {
        const runUpdate = {
            end_time: run.end_time,
            error: run.error,
            outputs: run.outputs,
            events: run.events,
            inputs: run.inputs
        };
        await this.client.updateRun(run.id, runUpdate);
    }
    async onRetrieverStart(run) {
        await this._persistRunSingle(run);
    }
    async onRetrieverEnd(run) {
        await this._updateRunSingle(run);
    }
    async onRetrieverError(run) {
        await this._updateRunSingle(run);
    }
    async onLLMStart(run) {
        await this._persistRunSingle(run);
    }
    async onLLMEnd(run) {
        await this._updateRunSingle(run);
    }
    async onLLMError(run) {
        await this._updateRunSingle(run);
    }
    async onChainStart(run) {
        await this._persistRunSingle(run);
    }
    async onChainEnd(run) {
        await this._updateRunSingle(run);
    }
    async onChainError(run) {
        await this._updateRunSingle(run);
    }
    async onToolStart(run) {
        await this._persistRunSingle(run);
    }
    async onToolEnd(run) {
        await this._updateRunSingle(run);
    }
    async onToolError(run) {
        await this._updateRunSingle(run);
    }
}

},{"langsmith":"cgNM2","../../util/env.js":"hJTOE","./tracer.js":"4klw3","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"cgNM2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Client", ()=>(0, _clientJs.Client));
parcelHelpers.export(exports, "RunTree", ()=>(0, _runTreesJs.RunTree));
var _clientJs = require("./client.js");
var _runTreesJs = require("./run_trees.js");

},{"./client.js":"aOPeL","./run_trees.js":"jDP2s","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"aOPeL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Client", ()=>Client);
var _uuid = require("uuid");
var _asyncCallerJs = require("./utils/async_caller.js");
var _messagesJs = require("./utils/messages.js");
var _envJs = require("./utils/env.js");
// utility functions
const isLocalhost = (url)=>{
    const strippedUrl = url.replace("http://", "").replace("https://", "");
    const hostname = strippedUrl.split("/")[0].split(":")[0];
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
};
const raiseForStatus = async (response, operation)=>{
    // consume the response body to release the connection
    // https://undici.nodejs.org/#/?id=garbage-collection
    const body = await response.text();
    if (!response.ok) throw new Error(`Failed to ${operation}: ${response.status} ${response.statusText} ${body}`);
};
async function toArray(iterable) {
    const result = [];
    for await (const item of iterable)result.push(item);
    return result;
}
function trimQuotes(str) {
    if (str === undefined) return undefined;
    return str.trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
}
function hideInputs(inputs) {
    if ((0, _envJs.getEnvironmentVariable)("LANGCHAIN_HIDE_INPUTS") === "true") return {};
    return inputs;
}
function hideOutputs(outputs) {
    if ((0, _envJs.getEnvironmentVariable)("LANGCHAIN_HIDE_OUTPUTS") === "true") return {};
    return outputs;
}
function assertUuid(str) {
    if (!_uuid.validate(str)) throw new Error(`Invalid UUID: ${str}`);
}
class Client {
    constructor(config = {}){
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "webUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeout_ms", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_tenantId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        const defaultConfig = Client.getDefaultClientConfig();
        this.apiUrl = trimQuotes(config.apiUrl ?? defaultConfig.apiUrl) ?? "";
        this.apiKey = trimQuotes(config.apiKey ?? defaultConfig.apiKey);
        this.webUrl = trimQuotes(config.webUrl ?? defaultConfig.webUrl);
        this.validateApiKeyIfHosted();
        this.timeout_ms = config.timeout_ms ?? 4000;
        this.caller = new (0, _asyncCallerJs.AsyncCaller)(config.callerOptions ?? {});
    }
    static getDefaultClientConfig() {
        const apiKey = (0, _envJs.getEnvironmentVariable)("LANGCHAIN_API_KEY");
        const apiUrl = (0, _envJs.getEnvironmentVariable)("LANGCHAIN_ENDPOINT") ?? (apiKey ? "https://api.smith.langchain.com" : "http://localhost:1984");
        return {
            apiUrl: apiUrl,
            apiKey: apiKey,
            webUrl: undefined
        };
    }
    validateApiKeyIfHosted() {
        const isLocal = isLocalhost(this.apiUrl);
        if (!isLocal && !this.apiKey) throw new Error("API key must be provided when using hosted LangSmith API");
    }
    getHostUrl() {
        if (this.webUrl) return this.webUrl;
        else if (isLocalhost(this.apiUrl)) {
            this.webUrl = "http://localhost";
            return "http://localhost";
        } else if (this.apiUrl.split(".", 1)[0].includes("dev")) {
            this.webUrl = "https://dev.smith.langchain.com";
            return "https://dev.smith.langchain.com";
        } else {
            this.webUrl = "https://smith.langchain.com";
            return "https://smith.langchain.com";
        }
    }
    get headers() {
        const headers = {};
        if (this.apiKey) headers["x-api-key"] = `${this.apiKey}`;
        return headers;
    }
    async _getResponse(path, queryParams) {
        const paramsString = queryParams?.toString() ?? "";
        const url = `${this.apiUrl}${path}?${paramsString}`;
        const response = await this.caller.call(fetch, url, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        if (!response.ok) throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
        return response;
    }
    async _get(path, queryParams) {
        const response = await this._getResponse(path, queryParams);
        return response.json();
    }
    async *_getPaginated(path, queryParams = new URLSearchParams()) {
        let offset = Number(queryParams.get("offset")) || 0;
        const limit = Number(queryParams.get("limit")) || 100;
        while(true){
            queryParams.set("offset", String(offset));
            queryParams.set("limit", String(limit));
            const url = `${this.apiUrl}${path}?${queryParams}`;
            const response = await this.caller.call(fetch, url, {
                method: "GET",
                headers: this.headers,
                signal: AbortSignal.timeout(this.timeout_ms)
            });
            if (!response.ok) throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
            const items = await response.json();
            if (items.length === 0) break;
            yield items;
            if (items.length < limit) break;
            offset += items.length;
        }
    }
    async createRun(run) {
        const headers = {
            ...this.headers,
            "Content-Type": "application/json"
        };
        const extra = run.extra ?? {};
        const runtimeEnv = await (0, _envJs.getRuntimeEnvironment)();
        const session_name = run.project_name;
        delete run.project_name;
        const runCreate = {
            session_name,
            ...run,
            extra: {
                ...run.extra,
                runtime: {
                    ...runtimeEnv,
                    ...extra.runtime
                }
            }
        };
        runCreate.inputs = hideInputs(runCreate.inputs);
        if (runCreate.outputs) runCreate.outputs = hideOutputs(runCreate.outputs);
        const response = await this.caller.call(fetch, `${this.apiUrl}/runs`, {
            method: "POST",
            headers,
            body: JSON.stringify(runCreate),
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        await raiseForStatus(response, "create run");
    }
    async updateRun(runId, run) {
        assertUuid(runId);
        if (run.inputs) run.inputs = hideInputs(run.inputs);
        if (run.outputs) run.outputs = hideOutputs(run.outputs);
        const headers = {
            ...this.headers,
            "Content-Type": "application/json"
        };
        const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify(run),
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        await raiseForStatus(response, "update run");
    }
    async readRun(runId, { loadChildRuns } = {
        loadChildRuns: false
    }) {
        assertUuid(runId);
        let run = await this._get(`/runs/${runId}`);
        if (loadChildRuns && run.child_run_ids) run = await this._loadChildRuns(run);
        return run;
    }
    async getRunUrl({ runId, run, projectOpts }) {
        if (run !== undefined) {
            let sessionId;
            if (run.session_id) sessionId = run.session_id;
            else if (projectOpts?.projectName) sessionId = (await this.readProject({
                projectName: projectOpts?.projectName
            })).id;
            else if (projectOpts?.projectId) sessionId = projectOpts?.projectId;
            else {
                const project = await this.readProject({
                    projectName: (0, _envJs.getEnvironmentVariable)("LANGCHAIN_PROJECT") || "default"
                });
                sessionId = project.id;
            }
            const tenantId = await this._getTenantId();
            return `${this.getHostUrl()}/o/${tenantId}/projects/p/${sessionId}/r/${run.id}?poll=true`;
        } else if (runId !== undefined) {
            const run_ = await this.readRun(runId);
            if (!run_.app_path) throw new Error(`Run ${runId} has no app_path`);
            const baseUrl = this.getHostUrl();
            return `${baseUrl}${run_.app_path}`;
        } else throw new Error("Must provide either runId or run");
    }
    async _loadChildRuns(run) {
        const childRuns = await toArray(this.listRuns({
            id: run.child_run_ids
        }));
        const treemap = {};
        const runs = {};
        // TODO: make dotted order required when the migration finishes
        childRuns.sort((a, b)=>(a?.dotted_order ?? "").localeCompare(b?.dotted_order ?? ""));
        for (const childRun of childRuns){
            if (childRun.parent_run_id === null || childRun.parent_run_id === undefined) throw new Error(`Child run ${childRun.id} has no parent`);
            if (!(childRun.parent_run_id in treemap)) treemap[childRun.parent_run_id] = [];
            treemap[childRun.parent_run_id].push(childRun);
            runs[childRun.id] = childRun;
        }
        run.child_runs = treemap[run.id] || [];
        for(const runId in treemap)if (runId !== run.id) runs[runId].child_runs = treemap[runId];
        return run;
    }
    async *listRuns({ projectId, projectName, parentRunId, referenceExampleId, startTime, executionOrder, runType, error, id, limit, offset, query, filter }) {
        const queryParams = new URLSearchParams();
        let projectId_ = projectId;
        if (projectName) {
            if (projectId) throw new Error("Only one of projectId or projectName may be given");
            projectId_ = (await this.readProject({
                projectName
            })).id;
        }
        if (projectId_) queryParams.append("session", projectId_);
        if (parentRunId) queryParams.append("parent_run", parentRunId);
        if (referenceExampleId) queryParams.append("reference_example", referenceExampleId);
        if (startTime) queryParams.append("start_time", startTime.toISOString());
        if (executionOrder) queryParams.append("execution_order", executionOrder.toString());
        if (runType) queryParams.append("run_type", runType);
        if (error !== undefined) queryParams.append("error", error.toString());
        if (id !== undefined) for (const id_ of id)queryParams.append("id", id_);
        if (limit !== undefined) queryParams.append("limit", limit.toString());
        if (offset !== undefined) queryParams.append("offset", offset.toString());
        if (query !== undefined) queryParams.append("query", query);
        if (filter !== undefined) queryParams.append("filter", filter);
        for await (const runs of this._getPaginated("/runs", queryParams))yield* runs;
    }
    async shareRun(runId, { shareId } = {}) {
        const data = {
            run_id: runId,
            share_token: shareId || _uuid.v4()
        };
        assertUuid(runId);
        const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}/share`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        const result = await response.json();
        if (result === null || !("share_token" in result)) throw new Error("Invalid response from server");
        return `${this.getHostUrl()}/public/${result["share_token"]}/r`;
    }
    async unshareRun(runId) {
        assertUuid(runId);
        const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}/share`, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        await raiseForStatus(response, "unshare run");
    }
    async readRunSharedLink(runId) {
        assertUuid(runId);
        const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}/share`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        const result = await response.json();
        if (result === null || !("share_token" in result)) return undefined;
        return `${this.getHostUrl()}/public/${result["share_token"]}/r`;
    }
    async listSharedRuns(shareToken, { runIds } = {}) {
        const queryParams = new URLSearchParams({
            share_token: shareToken
        });
        if (runIds !== undefined) for (const runId of runIds)queryParams.append("id", runId);
        assertUuid(shareToken);
        const response = await this.caller.call(fetch, `${this.apiUrl}/public/${shareToken}/runs${queryParams}`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        const runs = await response.json();
        return runs;
    }
    async readDatasetSharedSchema(datasetId, datasetName) {
        if (!datasetId && !datasetName) throw new Error("Either datasetId or datasetName must be given");
        if (!datasetId) {
            const dataset = await this.readDataset({
                datasetName
            });
            datasetId = dataset.id;
        }
        assertUuid(datasetId);
        const response = await this.caller.call(fetch, `${this.apiUrl}/datasets/${datasetId}/share`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        const shareSchema = await response.json();
        shareSchema.url = `${this.getHostUrl()}/public/${shareSchema.share_token}/d`;
        return shareSchema;
    }
    async shareDataset(datasetId, datasetName) {
        if (!datasetId && !datasetName) throw new Error("Either datasetId or datasetName must be given");
        if (!datasetId) {
            const dataset = await this.readDataset({
                datasetName
            });
            datasetId = dataset.id;
        }
        const data = {
            dataset_id: datasetId
        };
        assertUuid(datasetId);
        const response = await this.caller.call(fetch, `${this.apiUrl}/datasets/${datasetId}/share`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        const shareSchema = await response.json();
        shareSchema.url = `${this.getHostUrl()}/public/${shareSchema.share_token}/d`;
        return shareSchema;
    }
    async unshareDataset(datasetId) {
        assertUuid(datasetId);
        const response = await this.caller.call(fetch, `${this.apiUrl}/datasets/${datasetId}/share`, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        await raiseForStatus(response, "unshare dataset");
    }
    async readSharedDataset(shareToken) {
        assertUuid(shareToken);
        const response = await this.caller.call(fetch, `${this.apiUrl}/public/${shareToken}/datasets`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        const dataset = await response.json();
        return dataset;
    }
    async createProject({ projectName, projectExtra, upsert, referenceDatasetId }) {
        const upsert_ = upsert ? `?upsert=true` : "";
        const endpoint = `${this.apiUrl}/sessions${upsert_}`;
        const body = {
            name: projectName
        };
        if (projectExtra !== undefined) body["extra"] = projectExtra;
        if (referenceDatasetId !== undefined) body["reference_dataset_id"] = referenceDatasetId;
        const response = await this.caller.call(fetch, endpoint, {
            method: "POST",
            headers: {
                ...this.headers,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(`Failed to create session ${projectName}: ${response.status} ${response.statusText}`);
        return result;
    }
    async readProject({ projectId, projectName }) {
        let path = "/sessions";
        const params = new URLSearchParams();
        if (projectId !== undefined && projectName !== undefined) throw new Error("Must provide either projectName or projectId, not both");
        else if (projectId !== undefined) {
            assertUuid(projectId);
            path += `/${projectId}`;
        } else if (projectName !== undefined) params.append("name", projectName);
        else throw new Error("Must provide projectName or projectId");
        const response = await this._get(path, params);
        let result;
        if (Array.isArray(response)) {
            if (response.length === 0) throw new Error(`Project[id=${projectId}, name=${projectName}] not found`);
            result = response[0];
        } else result = response;
        return result;
    }
    async _getTenantId() {
        if (this._tenantId !== null) return this._tenantId;
        const queryParams = new URLSearchParams({
            limit: "1"
        });
        for await (const projects of this._getPaginated("/sessions", queryParams)){
            this._tenantId = projects[0].tenant_id;
            return projects[0].tenant_id;
        }
        throw new Error("No projects found to resolve tenant.");
    }
    async *listProjects({ projectIds, name, nameContains, referenceDatasetId, referenceDatasetName, referenceFree } = {}) {
        const params = new URLSearchParams();
        if (projectIds !== undefined) for (const projectId of projectIds)params.append("id", projectId);
        if (name !== undefined) params.append("name", name);
        if (nameContains !== undefined) params.append("name_contains", nameContains);
        if (referenceDatasetId !== undefined) params.append("reference_dataset", referenceDatasetId);
        else if (referenceDatasetName !== undefined) {
            const dataset = await this.readDataset({
                datasetName: referenceDatasetName
            });
            params.append("reference_dataset", dataset.id);
        }
        if (referenceFree !== undefined) params.append("reference_free", referenceFree.toString());
        for await (const projects of this._getPaginated("/sessions", params))yield* projects;
    }
    async deleteProject({ projectId, projectName }) {
        let projectId_;
        if (projectId === undefined && projectName === undefined) throw new Error("Must provide projectName or projectId");
        else if (projectId !== undefined && projectName !== undefined) throw new Error("Must provide either projectName or projectId, not both");
        else if (projectId === undefined) projectId_ = (await this.readProject({
            projectName
        })).id;
        else projectId_ = projectId;
        assertUuid(projectId_);
        const response = await this.caller.call(fetch, `${this.apiUrl}/sessions/${projectId_}`, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        await raiseForStatus(response, `delete session ${projectId_} (${projectName})`);
    }
    async uploadCsv({ csvFile, fileName, inputKeys, outputKeys, description, dataType, name }) {
        const url = `${this.apiUrl}/datasets/upload`;
        const formData = new FormData();
        formData.append("file", csvFile, fileName);
        inputKeys.forEach((key)=>{
            formData.append("input_keys", key);
        });
        outputKeys.forEach((key)=>{
            formData.append("output_keys", key);
        });
        if (description) formData.append("description", description);
        if (dataType) formData.append("data_type", dataType);
        if (name) formData.append("name", name);
        const response = await this.caller.call(fetch, url, {
            method: "POST",
            headers: this.headers,
            body: formData,
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        if (!response.ok) {
            const result = await response.json();
            if (result.detail && result.detail.includes("already exists")) throw new Error(`Dataset ${fileName} already exists`);
            throw new Error(`Failed to upload CSV: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        return result;
    }
    async createDataset(name, { description, dataType } = {}) {
        const body = {
            name,
            description
        };
        if (dataType) body.data_type = dataType;
        const response = await this.caller.call(fetch, `${this.apiUrl}/datasets`, {
            method: "POST",
            headers: {
                ...this.headers,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        if (!response.ok) {
            const result = await response.json();
            if (result.detail && result.detail.includes("already exists")) throw new Error(`Dataset ${name} already exists`);
            throw new Error(`Failed to create dataset ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        return result;
    }
    async readDataset({ datasetId, datasetName }) {
        let path = "/datasets";
        // limit to 1 result
        const params = new URLSearchParams({
            limit: "1"
        });
        if (datasetId !== undefined && datasetName !== undefined) throw new Error("Must provide either datasetName or datasetId, not both");
        else if (datasetId !== undefined) {
            assertUuid(datasetId);
            path += `/${datasetId}`;
        } else if (datasetName !== undefined) params.append("name", datasetName);
        else throw new Error("Must provide datasetName or datasetId");
        const response = await this._get(path, params);
        let result;
        if (Array.isArray(response)) {
            if (response.length === 0) throw new Error(`Dataset[id=${datasetId}, name=${datasetName}] not found`);
            result = response[0];
        } else result = response;
        return result;
    }
    async readDatasetOpenaiFinetuning({ datasetId, datasetName }) {
        const path = "/datasets";
        if (datasetId !== undefined) ;
        else if (datasetName !== undefined) datasetId = (await this.readDataset({
            datasetName
        })).id;
        else throw new Error("Must provide datasetName or datasetId");
        const response = await this._getResponse(`${path}/${datasetId}/openai_ft`);
        const datasetText = await response.text();
        const dataset = datasetText.trim().split("\n").map((line)=>JSON.parse(line));
        return dataset;
    }
    async *listDatasets({ limit = 100, offset = 0, datasetIds, datasetName, datasetNameContains } = {}) {
        const path = "/datasets";
        const params = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString()
        });
        if (datasetIds !== undefined) for (const id_ of datasetIds)params.append("id", id_);
        if (datasetName !== undefined) params.append("name", datasetName);
        if (datasetNameContains !== undefined) params.append("name_contains", datasetNameContains);
        for await (const datasets of this._getPaginated(path, params))yield* datasets;
    }
    async deleteDataset({ datasetId, datasetName }) {
        let path = "/datasets";
        let datasetId_ = datasetId;
        if (datasetId !== undefined && datasetName !== undefined) throw new Error("Must provide either datasetName or datasetId, not both");
        else if (datasetName !== undefined) {
            const dataset = await this.readDataset({
                datasetName
            });
            datasetId_ = dataset.id;
        }
        if (datasetId_ !== undefined) {
            assertUuid(datasetId_);
            path += `/${datasetId_}`;
        } else throw new Error("Must provide datasetName or datasetId");
        const response = await this.caller.call(fetch, this.apiUrl + path, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        if (!response.ok) throw new Error(`Failed to delete ${path}: ${response.status} ${response.statusText}`);
        await response.json();
    }
    async createExample(inputs, outputs, { datasetId, datasetName, createdAt, exampleId }) {
        let datasetId_ = datasetId;
        if (datasetId_ === undefined && datasetName === undefined) throw new Error("Must provide either datasetName or datasetId");
        else if (datasetId_ !== undefined && datasetName !== undefined) throw new Error("Must provide either datasetName or datasetId, not both");
        else if (datasetId_ === undefined) {
            const dataset = await this.readDataset({
                datasetName
            });
            datasetId_ = dataset.id;
        }
        const createdAt_ = createdAt || new Date();
        const data = {
            dataset_id: datasetId_,
            inputs,
            outputs,
            created_at: createdAt_.toISOString(),
            id: exampleId
        };
        const response = await this.caller.call(fetch, `${this.apiUrl}/examples`, {
            method: "POST",
            headers: {
                ...this.headers,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        if (!response.ok) throw new Error(`Failed to create example: ${response.status} ${response.statusText}`);
        const result = await response.json();
        return result;
    }
    async createLLMExample(input, generation, options) {
        return this.createExample({
            input
        }, {
            output: generation
        }, options);
    }
    async createChatExample(input, generations, options) {
        const finalInput = input.map((message)=>{
            if ((0, _messagesJs.isLangChainMessage)(message)) return (0, _messagesJs.convertLangChainMessageToExample)(message);
            return message;
        });
        const finalOutput = (0, _messagesJs.isLangChainMessage)(generations) ? (0, _messagesJs.convertLangChainMessageToExample)(generations) : generations;
        return this.createExample({
            input: finalInput
        }, {
            output: finalOutput
        }, options);
    }
    async readExample(exampleId) {
        assertUuid(exampleId);
        const path = `/examples/${exampleId}`;
        return await this._get(path);
    }
    async *listExamples({ datasetId, datasetName, exampleIds } = {}) {
        let datasetId_;
        if (datasetId !== undefined && datasetName !== undefined) throw new Error("Must provide either datasetName or datasetId, not both");
        else if (datasetId !== undefined) datasetId_ = datasetId;
        else if (datasetName !== undefined) {
            const dataset = await this.readDataset({
                datasetName
            });
            datasetId_ = dataset.id;
        } else throw new Error("Must provide a datasetName or datasetId");
        const params = new URLSearchParams({
            dataset: datasetId_
        });
        if (exampleIds !== undefined) for (const id_ of exampleIds)params.append("id", id_);
        for await (const examples of this._getPaginated("/examples", params))yield* examples;
    }
    async deleteExample(exampleId) {
        assertUuid(exampleId);
        const path = `/examples/${exampleId}`;
        const response = await this.caller.call(fetch, this.apiUrl + path, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        if (!response.ok) throw new Error(`Failed to delete ${path}: ${response.status} ${response.statusText}`);
        await response.json();
    }
    async updateExample(exampleId, update) {
        assertUuid(exampleId);
        const response = await this.caller.call(fetch, `${this.apiUrl}/examples/${exampleId}`, {
            method: "PATCH",
            headers: {
                ...this.headers,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(update),
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        if (!response.ok) throw new Error(`Failed to update example ${exampleId}: ${response.status} ${response.statusText}`);
        const result = await response.json();
        return result;
    }
    async evaluateRun(run, evaluator, { sourceInfo, loadChildRuns } = {
        loadChildRuns: false
    }) {
        let run_;
        if (typeof run === "string") run_ = await this.readRun(run, {
            loadChildRuns
        });
        else if (typeof run === "object" && "id" in run) run_ = run;
        else throw new Error(`Invalid run type: ${typeof run}`);
        let referenceExample = undefined;
        if (run_.reference_example_id !== null && run_.reference_example_id !== undefined) referenceExample = await this.readExample(run_.reference_example_id);
        const feedbackResult = await evaluator.evaluateRun(run_, referenceExample);
        let sourceInfo_ = sourceInfo ?? {};
        if (feedbackResult.evaluatorInfo) sourceInfo_ = {
            ...sourceInfo_,
            ...feedbackResult.evaluatorInfo
        };
        return await this.createFeedback(run_.id, feedbackResult.key, {
            score: feedbackResult.score,
            value: feedbackResult.value,
            comment: feedbackResult.comment,
            correction: feedbackResult.correction,
            sourceInfo: sourceInfo_,
            feedbackSourceType: "model"
        });
    }
    async createFeedback(runId, key, { score, value, correction, comment, sourceInfo, feedbackSourceType = "api", sourceRunId, feedbackId, eager = false }) {
        const feedback_source = {
            type: feedbackSourceType ?? "api",
            metadata: sourceInfo ?? {}
        };
        if (sourceRunId !== undefined && feedback_source?.metadata !== undefined && !feedback_source.metadata["__run"]) feedback_source.metadata["__run"] = {
            run_id: sourceRunId
        };
        if (feedback_source?.metadata !== undefined && feedback_source.metadata["__run"]?.run_id !== undefined) assertUuid(feedback_source.metadata["__run"].run_id);
        const feedback = {
            id: feedbackId ?? _uuid.v4(),
            run_id: runId,
            key,
            score,
            value,
            correction,
            comment,
            feedback_source: feedback_source
        };
        const url = `${this.apiUrl}/feedback` + (eager ? "/eager" : "");
        const response = await this.caller.call(fetch, url, {
            method: "POST",
            headers: {
                ...this.headers,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedback),
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        await raiseForStatus(response, "create feedback");
        return feedback;
    }
    async updateFeedback(feedbackId, { score, value, correction, comment }) {
        const feedbackUpdate = {};
        if (score !== undefined && score !== null) feedbackUpdate["score"] = score;
        if (value !== undefined && value !== null) feedbackUpdate["value"] = value;
        if (correction !== undefined && correction !== null) feedbackUpdate["correction"] = correction;
        if (comment !== undefined && comment !== null) feedbackUpdate["comment"] = comment;
        assertUuid(feedbackId);
        const response = await this.caller.call(fetch, `${this.apiUrl}/feedback/${feedbackId}`, {
            method: "PATCH",
            headers: {
                ...this.headers,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedbackUpdate),
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        await raiseForStatus(response, "update feedback");
    }
    async readFeedback(feedbackId) {
        assertUuid(feedbackId);
        const path = `/feedback/${feedbackId}`;
        const response = await this._get(path);
        return response;
    }
    async deleteFeedback(feedbackId) {
        assertUuid(feedbackId);
        const path = `/feedback/${feedbackId}`;
        const response = await this.caller.call(fetch, this.apiUrl + path, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms)
        });
        if (!response.ok) throw new Error(`Failed to delete ${path}: ${response.status} ${response.statusText}`);
        await response.json();
    }
    async *listFeedback({ runIds, feedbackKeys, feedbackSourceTypes } = {}) {
        const queryParams = new URLSearchParams();
        if (runIds) queryParams.append("run", runIds.join(","));
        if (feedbackKeys) for (const key of feedbackKeys)queryParams.append("key", key);
        if (feedbackSourceTypes) for (const type of feedbackSourceTypes)queryParams.append("source", type);
        for await (const feedbacks of this._getPaginated("/feedback", queryParams))yield* feedbacks;
    }
}

},{"uuid":"8JjfD","./utils/async_caller.js":"7ABGo","./utils/messages.js":"g1bXn","./utils/env.js":"0Uivk","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"7ABGo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A class that can be used to make async calls with concurrency and retry logic.
 *
 * This is useful for making calls to any kind of "expensive" external resource,
 * be it because it's rate-limited, subject to network issues, etc.
 *
 * Concurrent calls are limited by the `maxConcurrency` parameter, which defaults
 * to `Infinity`. This means that by default, all calls will be made in parallel.
 *
 * Retries are limited by the `maxRetries` parameter, which defaults to 6. This
 * means that by default, each call will be retried up to 6 times, with an
 * exponential backoff between each attempt.
 */ parcelHelpers.export(exports, "AsyncCaller", ()=>AsyncCaller);
var _pRetry = require("p-retry");
var _pRetryDefault = parcelHelpers.interopDefault(_pRetry);
var _pQueue = require("p-queue");
var _pQueueDefault = parcelHelpers.interopDefault(_pQueue);
const STATUS_NO_RETRY = [
    400,
    401,
    403,
    404,
    405,
    406,
    407,
    408,
    409
];
class AsyncCaller {
    constructor(params){
        Object.defineProperty(this, "maxConcurrency", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxConcurrency = params.maxConcurrency ?? Infinity;
        this.maxRetries = params.maxRetries ?? 6;
        const PQueue = "default" in (0, _pQueueDefault.default) ? (0, _pQueueDefault.default).default : (0, _pQueueDefault.default);
        this.queue = new PQueue({
            concurrency: this.maxConcurrency
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    call(callable, ...args) {
        return this.queue.add(()=>(0, _pRetryDefault.default)(()=>callable(...args).catch((error)=>{
                    // eslint-disable-next-line no-instanceof/no-instanceof
                    if (error instanceof Error) throw error;
                    else throw new Error(error);
                }), {
                onFailedAttempt (error) {
                    if (error.message.startsWith("Cancel") || error.message.startsWith("TimeoutError") || error.message.startsWith("AbortError")) throw error;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (error?.code === "ECONNABORTED") throw error;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const status = error?.response?.status;
                    if (status && STATUS_NO_RETRY.includes(+status)) throw error;
                },
                retries: this.maxRetries,
                randomize: true
            }), {
            throwOnTimeout: true
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callWithOptions(options, callable, ...args) {
        // Note this doesn't cancel the underlying request,
        // when available prefer to use the signal option of the underlying call
        if (options.signal) return Promise.race([
            this.call(callable, ...args),
            new Promise((_, reject)=>{
                options.signal?.addEventListener("abort", ()=>{
                    reject(new Error("AbortError"));
                });
            })
        ]);
        return this.call(callable, ...args);
    }
    fetch(...args) {
        return this.call(()=>fetch(...args).then((res)=>res.ok ? res : Promise.reject(res)));
    }
}

},{"p-retry":"kjtQ8","p-queue":"kfIXu","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"kfIXu":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const EventEmitter = require("a1a1983badc1e177");
const p_timeout_1 = require("74f66d939e35f61d");
const priority_queue_1 = require("b7c44c45fcf75eb1");
// eslint-disable-next-line @typescript-eslint/no-empty-function
const empty = ()=>{};
const timeoutError = new p_timeout_1.TimeoutError();
/**
Promise queue with concurrency control.
*/ class PQueue extends EventEmitter {
    constructor(options){
        var _a, _b, _c, _d;
        super();
        this._intervalCount = 0;
        this._intervalEnd = 0;
        this._pendingCount = 0;
        this._resolveEmpty = empty;
        this._resolveIdle = empty;
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        options = Object.assign({
            carryoverConcurrencyCount: false,
            intervalCap: Infinity,
            interval: 0,
            concurrency: Infinity,
            autoStart: true,
            queueClass: priority_queue_1.default
        }, options);
        if (!(typeof options.intervalCap === "number" && options.intervalCap >= 1)) throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a = options.intervalCap) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""}\` (${typeof options.intervalCap})`);
        if (options.interval === undefined || !(Number.isFinite(options.interval) && options.interval >= 0)) throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(_d = (_c = options.interval) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""}\` (${typeof options.interval})`);
        this._carryoverConcurrencyCount = options.carryoverConcurrencyCount;
        this._isIntervalIgnored = options.intervalCap === Infinity || options.interval === 0;
        this._intervalCap = options.intervalCap;
        this._interval = options.interval;
        this._queue = new options.queueClass();
        this._queueClass = options.queueClass;
        this.concurrency = options.concurrency;
        this._timeout = options.timeout;
        this._throwOnTimeout = options.throwOnTimeout === true;
        this._isPaused = options.autoStart === false;
    }
    get _doesIntervalAllowAnother() {
        return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
    }
    get _doesConcurrentAllowAnother() {
        return this._pendingCount < this._concurrency;
    }
    _next() {
        this._pendingCount--;
        this._tryToStartAnother();
        this.emit("next");
    }
    _resolvePromises() {
        this._resolveEmpty();
        this._resolveEmpty = empty;
        if (this._pendingCount === 0) {
            this._resolveIdle();
            this._resolveIdle = empty;
            this.emit("idle");
        }
    }
    _onResumeInterval() {
        this._onInterval();
        this._initializeIntervalIfNeeded();
        this._timeoutId = undefined;
    }
    _isIntervalPaused() {
        const now = Date.now();
        if (this._intervalId === undefined) {
            const delay = this._intervalEnd - now;
            if (delay < 0) // Act as the interval was done
            // We don't need to resume it here because it will be resumed on line 160
            this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            else {
                // Act as the interval is pending
                if (this._timeoutId === undefined) this._timeoutId = setTimeout(()=>{
                    this._onResumeInterval();
                }, delay);
                return true;
            }
        }
        return false;
    }
    _tryToStartAnother() {
        if (this._queue.size === 0) {
            // We can clear the interval ("pause")
            // Because we can redo it later ("resume")
            if (this._intervalId) clearInterval(this._intervalId);
            this._intervalId = undefined;
            this._resolvePromises();
            return false;
        }
        if (!this._isPaused) {
            const canInitializeInterval = !this._isIntervalPaused();
            if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                const job = this._queue.dequeue();
                if (!job) return false;
                this.emit("active");
                job();
                if (canInitializeInterval) this._initializeIntervalIfNeeded();
                return true;
            }
        }
        return false;
    }
    _initializeIntervalIfNeeded() {
        if (this._isIntervalIgnored || this._intervalId !== undefined) return;
        this._intervalId = setInterval(()=>{
            this._onInterval();
        }, this._interval);
        this._intervalEnd = Date.now() + this._interval;
    }
    _onInterval() {
        if (this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = undefined;
        }
        this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
        this._processQueue();
    }
    /**
    Executes all queued functions until it reaches the limit.
    */ _processQueue() {
        // eslint-disable-next-line no-empty
        while(this._tryToStartAnother());
    }
    get concurrency() {
        return this._concurrency;
    }
    set concurrency(newConcurrency) {
        if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
        this._concurrency = newConcurrency;
        this._processQueue();
    }
    /**
    Adds a sync or async task to the queue. Always returns a promise.
    */ async add(fn, options = {}) {
        return new Promise((resolve, reject)=>{
            const run = async ()=>{
                this._pendingCount++;
                this._intervalCount++;
                try {
                    const operation = this._timeout === undefined && options.timeout === undefined ? fn() : p_timeout_1.default(Promise.resolve(fn()), options.timeout === undefined ? this._timeout : options.timeout, ()=>{
                        if (options.throwOnTimeout === undefined ? this._throwOnTimeout : options.throwOnTimeout) reject(timeoutError);
                        return undefined;
                    });
                    resolve(await operation);
                } catch (error) {
                    reject(error);
                }
                this._next();
            };
            this._queue.enqueue(run, options);
            this._tryToStartAnother();
            this.emit("add");
        });
    }
    /**
    Same as `.add()`, but accepts an array of sync or async functions.

    @returns A promise that resolves when all functions are resolved.
    */ async addAll(functions, options) {
        return Promise.all(functions.map(async (function_)=>this.add(function_, options)));
    }
    /**
    Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
    */ start() {
        if (!this._isPaused) return this;
        this._isPaused = false;
        this._processQueue();
        return this;
    }
    /**
    Put queue execution on hold.
    */ pause() {
        this._isPaused = true;
    }
    /**
    Clear the queue.
    */ clear() {
        this._queue = new this._queueClass();
    }
    /**
    Can be called multiple times. Useful if you for example add additional items at a later time.

    @returns A promise that settles when the queue becomes empty.
    */ async onEmpty() {
        // Instantly resolve if the queue is empty
        if (this._queue.size === 0) return;
        return new Promise((resolve)=>{
            const existingResolve = this._resolveEmpty;
            this._resolveEmpty = ()=>{
                existingResolve();
                resolve();
            };
        });
    }
    /**
    The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.

    @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
    */ async onIdle() {
        // Instantly resolve if none pending and if nothing else is queued
        if (this._pendingCount === 0 && this._queue.size === 0) return;
        return new Promise((resolve)=>{
            const existingResolve = this._resolveIdle;
            this._resolveIdle = ()=>{
                existingResolve();
                resolve();
            };
        });
    }
    /**
    Size of the queue.
    */ get size() {
        return this._queue.size;
    }
    /**
    Size of the queue, filtered by the given options.

    For example, this can be used to find the number of items remaining in the queue with a specific priority level.
    */ sizeBy(options) {
        // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
        return this._queue.filter(options).length;
    }
    /**
    Number of pending promises.
    */ get pending() {
        return this._pendingCount;
    }
    /**
    Whether the queue is currently paused.
    */ get isPaused() {
        return this._isPaused;
    }
    get timeout() {
        return this._timeout;
    }
    /**
    Set the timeout for future operations.
    */ set timeout(milliseconds) {
        this._timeout = milliseconds;
    }
}
exports.default = PQueue;

},{"a1a1983badc1e177":"ew2H4","74f66d939e35f61d":"kA54Q","b7c44c45fcf75eb1":"20e5X"}],"ew2H4":[function(require,module,exports) {
"use strict";
var has = Object.prototype.hasOwnProperty, prefix = "~";
/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */ function Events() {}
//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
    Events.prototype = Object.create(null);
    //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //
    if (!new Events().__proto__) prefix = false;
}
/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */ function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
}
/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */ function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== "function") throw new TypeError("The listener must be a function");
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
    else emitter._events[evt] = [
        emitter._events[evt],
        listener
    ];
    return emitter;
}
/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */ function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new Events();
    else delete emitter._events[evt];
}
/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */ function EventEmitter() {
    this._events = new Events();
    this._eventsCount = 0;
}
/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */ EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0) return names;
    for(name in events = this._events)if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
    if (Object.getOwnPropertySymbols) return names.concat(Object.getOwnPropertySymbols(events));
    return names;
};
/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */ EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers) return [];
    if (handlers.fn) return [
        handlers.fn
    ];
    for(var i = 0, l = handlers.length, ee = new Array(l); i < l; i++)ee[i] = handlers[i].fn;
    return ee;
};
/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */ EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners) return 0;
    if (listeners.fn) return 1;
    return listeners.length;
};
/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */ EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt]) return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
        switch(len){
            case 1:
                return listeners.fn.call(listeners.context), true;
            case 2:
                return listeners.fn.call(listeners.context, a1), true;
            case 3:
                return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
                return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for(i = 1, args = new Array(len - 1); i < len; i++)args[i - 1] = arguments[i];
        listeners.fn.apply(listeners.context, args);
    } else {
        var length = listeners.length, j;
        for(i = 0; i < length; i++){
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
            switch(len){
                case 1:
                    listeners[i].fn.call(listeners[i].context);
                    break;
                case 2:
                    listeners[i].fn.call(listeners[i].context, a1);
                    break;
                case 3:
                    listeners[i].fn.call(listeners[i].context, a1, a2);
                    break;
                case 4:
                    listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                    break;
                default:
                    if (!args) for(j = 1, args = new Array(len - 1); j < len; j++)args[j - 1] = arguments[j];
                    listeners[i].fn.apply(listeners[i].context, args);
            }
        }
    }
    return true;
};
/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
};
/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
};
/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt]) return this;
    if (!fn) {
        clearEvent(this, evt);
        return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) clearEvent(this, evt);
    } else {
        for(var i = 0, events = [], length = listeners.length; i < length; i++)if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) events.push(listeners[i]);
        //
        // Reset the array, or remove it completely if we have no more listeners.
        //
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
    }
    return this;
};
/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
    } else {
        this._events = new Events();
        this._eventsCount = 0;
    }
    return this;
};
//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;
//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;
module.exports = EventEmitter;

},{}],"kA54Q":[function(require,module,exports) {
"use strict";
const pFinally = require("65684eb8b3ac3af7");
class TimeoutError extends Error {
    constructor(message){
        super(message);
        this.name = "TimeoutError";
    }
}
const pTimeout = (promise, milliseconds, fallback)=>new Promise((resolve, reject)=>{
        if (typeof milliseconds !== "number" || milliseconds < 0) throw new TypeError("Expected `milliseconds` to be a positive number");
        if (milliseconds === Infinity) {
            resolve(promise);
            return;
        }
        const timer = setTimeout(()=>{
            if (typeof fallback === "function") {
                try {
                    resolve(fallback());
                } catch (error) {
                    reject(error);
                }
                return;
            }
            const message = typeof fallback === "string" ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
            const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message);
            if (typeof promise.cancel === "function") promise.cancel();
            reject(timeoutError);
        }, milliseconds);
        // TODO: Use native `finally` keyword when targeting Node.js 10
        pFinally(// eslint-disable-next-line promise/prefer-await-to-then
        promise.then(resolve, reject), ()=>{
            clearTimeout(timer);
        });
    });
module.exports = pTimeout;
// TODO: Remove this for the next major release
module.exports.default = pTimeout;
module.exports.TimeoutError = TimeoutError;

},{"65684eb8b3ac3af7":"34gNr"}],"34gNr":[function(require,module,exports) {
"use strict";
module.exports = (promise, onFinally)=>{
    onFinally = onFinally || (()=>{});
    return promise.then((val)=>new Promise((resolve)=>{
            resolve(onFinally());
        }).then(()=>val), (err)=>new Promise((resolve)=>{
            resolve(onFinally());
        }).then(()=>{
            throw err;
        }));
};

},{}],"20e5X":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const lower_bound_1 = require("f4bb64dc0ca6b39b");
class PriorityQueue {
    constructor(){
        this._queue = [];
    }
    enqueue(run, options) {
        options = Object.assign({
            priority: 0
        }, options);
        const element = {
            priority: options.priority,
            run
        };
        if (this.size && this._queue[this.size - 1].priority >= options.priority) {
            this._queue.push(element);
            return;
        }
        const index = lower_bound_1.default(this._queue, element, (a, b)=>b.priority - a.priority);
        this._queue.splice(index, 0, element);
    }
    dequeue() {
        const item = this._queue.shift();
        return item === null || item === void 0 ? void 0 : item.run;
    }
    filter(options) {
        return this._queue.filter((element)=>element.priority === options.priority).map((element)=>element.run);
    }
    get size() {
        return this._queue.length;
    }
}
exports.default = PriorityQueue;

},{"f4bb64dc0ca6b39b":"2Vbp7"}],"2Vbp7":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
// Port of lower_bound from https://en.cppreference.com/w/cpp/algorithm/lower_bound
// Used to compute insertion index to keep queue sorted after insertion
function lowerBound(array, value, comparator) {
    let first = 0;
    let count = array.length;
    while(count > 0){
        const step = count / 2 | 0;
        let it = first + step;
        if (comparator(array[it], value) <= 0) {
            first = ++it;
            count -= step + 1;
        } else count = step;
    }
    return first;
}
exports.default = lowerBound;

},{}],"g1bXn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isLangChainMessage", ()=>isLangChainMessage);
parcelHelpers.export(exports, "convertLangChainMessageToExample", ()=>convertLangChainMessageToExample);
function isLangChainMessage(message) {
    return typeof message?._getType === "function";
}
function convertLangChainMessageToExample(message) {
    const converted = {
        type: message._getType(),
        data: {
            content: message.content
        }
    };
    // Check for presence of keys in additional_kwargs
    if (message?.additional_kwargs && Object.keys(message.additional_kwargs).length > 0) converted.data.additional_kwargs = {
        ...message.additional_kwargs
    };
    return converted;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"0Uivk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isBrowser", ()=>isBrowser);
parcelHelpers.export(exports, "isWebWorker", ()=>isWebWorker);
parcelHelpers.export(exports, "isJsDom", ()=>isJsDom);
parcelHelpers.export(exports, "isDeno", ()=>isDeno);
parcelHelpers.export(exports, "isNode", ()=>isNode);
parcelHelpers.export(exports, "getEnv", ()=>getEnv);
parcelHelpers.export(exports, "getRuntimeEnvironment", ()=>getRuntimeEnvironment);
/**
 * Retrieves the LangChain-specific environment variables from the current runtime environment.
 * Sensitive keys (containing the word "key") have their values redacted for security.
 *
 * @returns {Record<string, string>}
 *  - A record of LangChain-specific environment variables.
 */ parcelHelpers.export(exports, "getLangChainEnvVars", ()=>getLangChainEnvVars);
/**
 * Retrieves the environment variables from the current runtime environment.
 *
 * This function is designed to operate in a variety of JS environments,
 * including Node.js, Deno, browsers, etc.
 *
 * @returns {Record<string, string> | undefined}
 *  - A record of environment variables if available.
 *  - `undefined` if the environment does not support or allows access to environment variables.
 */ parcelHelpers.export(exports, "getEnvironmentVariables", ()=>getEnvironmentVariables);
parcelHelpers.export(exports, "getEnvironmentVariable", ()=>getEnvironmentVariable);
parcelHelpers.export(exports, "setEnvironmentVariable", ()=>setEnvironmentVariable);
/**
 * Get the Git commit SHA from common environment variables
 * used by different CI/CD platforms.
 * @returns {string | undefined} The Git commit SHA or undefined if not found.
 */ parcelHelpers.export(exports, "getShas", ()=>getShas);
var process = require("55a27373a1a923e9");
const isBrowser = ()=>typeof window !== "undefined" && typeof window.document !== "undefined";
const isWebWorker = ()=>typeof globalThis === "object" && globalThis.constructor && globalThis.constructor.name === "DedicatedWorkerGlobalScope";
const isJsDom = ()=>typeof window !== "undefined" && window.name === "nodejs" || typeof navigator !== "undefined" && (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom"));
const isDeno = ()=>typeof Deno !== "undefined";
const isNode = ()=>typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined" && !isDeno();
const getEnv = ()=>{
    let env;
    if (isBrowser()) env = "browser";
    else if (isNode()) env = "node";
    else if (isWebWorker()) env = "webworker";
    else if (isJsDom()) env = "jsdom";
    else if (isDeno()) env = "deno";
    else env = "other";
    return env;
};
let runtimeEnvironment;
async function getRuntimeEnvironment() {
    if (runtimeEnvironment === undefined) {
        const env = getEnv();
        const releaseEnv = getShas();
        runtimeEnvironment = {
            library: "langsmith",
            runtime: env,
            ...releaseEnv
        };
    }
    return runtimeEnvironment;
}
function getLangChainEnvVars() {
    const allEnvVars = getEnvironmentVariables() || {};
    const envVars = {};
    for (const [key, value] of Object.entries(allEnvVars))if (key.startsWith("LANGCHAIN_") && typeof value === "string") envVars[key] = value;
    for(const key in envVars)if (key.toLowerCase().includes("key") && typeof envVars[key] === "string") {
        const value = envVars[key];
        envVars[key] = value.slice(0, 2) + "*".repeat(value.length - 4) + value.slice(-2);
    }
    return envVars;
}
function getEnvironmentVariables() {
    try {
        // Check for Node.js environment
        // eslint-disable-next-line no-process-env
        if (typeof process !== "undefined" && process.env) // eslint-disable-next-line no-process-env
        Object.entries(process.env).reduce((acc, [key, value])=>{
            acc[key] = String(value);
            return acc;
        }, {});
        // For browsers and other environments, we may not have direct access to env variables
        // Return undefined or any other fallback as required.
        return undefined;
    } catch (e) {
        // Catch any errors that might occur while trying to access environment variables
        return undefined;
    }
}
function getEnvironmentVariable(name) {
    // Certain Deno setups will throw an error if you try to access environment variables
    // https://github.com/hwchase17/langchainjs/issues/1412
    try {
        return typeof process !== "undefined" ? process.env?.[name] : undefined;
    } catch (e) {
        return undefined;
    }
}
function setEnvironmentVariable(name, value) {
    if (typeof process !== "undefined") value;
}
let cachedCommitSHAs;
function getShas() {
    if (cachedCommitSHAs !== undefined) return cachedCommitSHAs;
    const common_release_envs = [
        "VERCEL_GIT_COMMIT_SHA",
        "NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA",
        "COMMIT_REF",
        "RENDER_GIT_COMMIT",
        "CI_COMMIT_SHA",
        "CIRCLE_SHA1",
        "CF_PAGES_COMMIT_SHA",
        "REACT_APP_GIT_SHA",
        "SOURCE_VERSION",
        "GITHUB_SHA",
        "TRAVIS_COMMIT",
        "GIT_COMMIT",
        "BUILD_VCS_NUMBER",
        "bamboo_planRepository_revision",
        "Build.SourceVersion",
        "BITBUCKET_COMMIT",
        "DRONE_COMMIT_SHA",
        "SEMAPHORE_GIT_SHA",
        "BUILDKITE_COMMIT"
    ];
    const shas = {};
    for (const env of common_release_envs){
        const envVar = getEnvironmentVariable(env);
        if (envVar !== undefined) shas[env] = envVar;
    }
    cachedCommitSHAs = shas;
    return shas;
}

},{"55a27373a1a923e9":"eZ6Ew","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"jDP2s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RunTree", ()=>RunTree);
var _uuid = require("uuid");
var _envJs = require("./utils/env.js");
var _clientJs = require("./client.js");
const warnedMessages = {};
function warnOnce(message) {
    if (!warnedMessages[message]) {
        console.warn(message);
        warnedMessages[message] = true;
    }
}
class RunTree {
    constructor(config){
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "run_type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "project_name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "parent_run", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "child_runs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "execution_order", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "child_execution_order", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "start_time", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "end_time", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "extra", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "error", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "serialized", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "reference_example_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "events", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const defaultConfig = RunTree.getDefaultConfig();
        Object.assign(this, {
            ...defaultConfig,
            ...config
        });
    }
    static getDefaultConfig() {
        return {
            id: _uuid.v4(),
            project_name: (0, _envJs.getEnvironmentVariable)("LANGCHAIN_PROJECT") ?? (0, _envJs.getEnvironmentVariable)("LANGCHAIN_SESSION") ?? // TODO: Deprecate
            "default",
            child_runs: [],
            execution_order: 1,
            child_execution_order: 1,
            api_url: (0, _envJs.getEnvironmentVariable)("LANGCHAIN_ENDPOINT") ?? "http://localhost:1984",
            api_key: (0, _envJs.getEnvironmentVariable)("LANGCHAIN_API_KEY"),
            caller_options: {},
            start_time: Date.now(),
            serialized: {},
            inputs: {},
            extra: {},
            client: new (0, _clientJs.Client)({})
        };
    }
    async createChild(config) {
        const child = new RunTree({
            ...config,
            parent_run: this,
            project_name: this.project_name,
            client: this.client,
            execution_order: this.child_execution_order + 1,
            child_execution_order: this.child_execution_order + 1
        });
        this.child_runs.push(child);
        return child;
    }
    async end(outputs, error, endTime = Date.now()) {
        this.outputs = outputs;
        this.error = error;
        this.end_time = endTime;
        if (this.parent_run) this.parent_run.child_execution_order = Math.max(this.parent_run.child_execution_order, this.child_execution_order);
    }
    async _convertToCreate(run, excludeChildRuns = true) {
        const runExtra = run.extra ?? {};
        if (!runExtra.runtime) runExtra.runtime = {};
        const runtimeEnv = await (0, _envJs.getRuntimeEnvironment)();
        for (const [k, v] of Object.entries(runtimeEnv))if (!runExtra.runtime[k]) runExtra.runtime[k] = v;
        let child_runs;
        let parent_run_id;
        if (!excludeChildRuns) {
            child_runs = await Promise.all(run.child_runs.map((child_run)=>this._convertToCreate(child_run, excludeChildRuns)));
            parent_run_id = undefined;
        } else {
            parent_run_id = run.parent_run?.id;
            child_runs = [];
        }
        const persistedRun = {
            id: run.id,
            name: run.name,
            start_time: run.start_time,
            end_time: run.end_time,
            run_type: run.run_type,
            reference_example_id: run.reference_example_id,
            extra: runExtra,
            execution_order: run.execution_order,
            serialized: run.serialized,
            error: run.error,
            inputs: run.inputs,
            outputs: run.outputs,
            session_name: run.project_name,
            child_runs: child_runs,
            parent_run_id: parent_run_id
        };
        return persistedRun;
    }
    async postRun(excludeChildRuns = true) {
        const runCreate = await this._convertToCreate(this, true);
        await this.client.createRun(runCreate);
        if (!excludeChildRuns) {
            warnOnce("Posting with excludeChildRuns=false is deprecated and will be removed in a future version.");
            for (const childRun of this.child_runs)await childRun.postRun(false);
        }
    }
    async patchRun() {
        const runUpdate = {
            end_time: this.end_time,
            error: this.error,
            outputs: this.outputs,
            parent_run_id: this.parent_run?.id,
            reference_example_id: this.reference_example_id,
            extra: this.extra,
            events: this.events
        };
        await this.client.updateRun(this.id, runUpdate);
    }
}

},{"uuid":"8JjfD","./utils/env.js":"0Uivk","./client.js":"aOPeL","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"hJTOE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isBrowser", ()=>isBrowser);
parcelHelpers.export(exports, "isWebWorker", ()=>isWebWorker);
parcelHelpers.export(exports, "isJsDom", ()=>isJsDom);
parcelHelpers.export(exports, "isDeno", ()=>isDeno);
parcelHelpers.export(exports, "isNode", ()=>isNode);
parcelHelpers.export(exports, "getEnv", ()=>getEnv);
parcelHelpers.export(exports, "getRuntimeEnvironment", ()=>getRuntimeEnvironment);
parcelHelpers.export(exports, "getEnvironmentVariable", ()=>getEnvironmentVariable);
var process = require("efe0df06aefae0c2");
const isBrowser = ()=>typeof window !== "undefined" && typeof window.document !== "undefined";
const isWebWorker = ()=>typeof globalThis === "object" && globalThis.constructor && globalThis.constructor.name === "DedicatedWorkerGlobalScope";
const isJsDom = ()=>typeof window !== "undefined" && window.name === "nodejs" || typeof navigator !== "undefined" && (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom"));
const isDeno = ()=>typeof Deno !== "undefined";
const isNode = ()=>typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined" && !isDeno();
const getEnv = ()=>{
    let env;
    if (isBrowser()) env = "browser";
    else if (isNode()) env = "node";
    else if (isWebWorker()) env = "webworker";
    else if (isJsDom()) env = "jsdom";
    else if (isDeno()) env = "deno";
    else env = "other";
    return env;
};
let runtimeEnvironment;
async function getRuntimeEnvironment() {
    if (runtimeEnvironment === undefined) {
        const env = getEnv();
        runtimeEnvironment = {
            library: "langchain-js",
            runtime: env
        };
    }
    return runtimeEnvironment;
}
function getEnvironmentVariable(name) {
    // Certain Deno setups will throw an error if you try to access environment variables
    // https://github.com/hwchase17/langchainjs/issues/1412
    try {
        return typeof process !== "undefined" ? process.env?.[name] : undefined;
    } catch (e) {
        return undefined;
    }
}

},{"efe0df06aefae0c2":"eZ6Ew","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"bBnwl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LangChainTracerV1", ()=>LangChainTracerV1);
var _baseJs = require("../../memory/base.js");
var _envJs = require("../../util/env.js");
var _tracerJs = require("./tracer.js");
class LangChainTracerV1 extends (0, _tracerJs.BaseTracer) {
    constructor(){
        super();
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "langchain_tracer"
        });
        Object.defineProperty(this, "endpoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (0, _envJs.getEnvironmentVariable)("LANGCHAIN_ENDPOINT") || "http://localhost:1984"
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                "Content-Type": "application/json"
            }
        });
        Object.defineProperty(this, "session", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const apiKey = (0, _envJs.getEnvironmentVariable)("LANGCHAIN_API_KEY");
        if (apiKey) this.headers["x-api-key"] = apiKey;
    }
    async newSession(sessionName) {
        const sessionCreate = {
            start_time: Date.now(),
            name: sessionName
        };
        const session = await this.persistSession(sessionCreate);
        this.session = session;
        return session;
    }
    async loadSession(sessionName) {
        const endpoint = `${this.endpoint}/sessions?name=${sessionName}`;
        return this._handleSessionResponse(endpoint);
    }
    async loadDefaultSession() {
        const endpoint = `${this.endpoint}/sessions?name=default`;
        return this._handleSessionResponse(endpoint);
    }
    async convertV2RunToRun(run) {
        const session = this.session ?? await this.loadDefaultSession();
        const serialized = run.serialized;
        let runResult;
        if (run.run_type === "llm") {
            const prompts = run.inputs.prompts ? run.inputs.prompts : run.inputs.messages.map((x)=>(0, _baseJs.getBufferString)(x));
            const llmRun = {
                uuid: run.id,
                start_time: run.start_time,
                end_time: run.end_time,
                execution_order: run.execution_order,
                child_execution_order: run.child_execution_order,
                serialized,
                type: run.run_type,
                session_id: session.id,
                prompts,
                response: run.outputs
            };
            runResult = llmRun;
        } else if (run.run_type === "chain") {
            const child_runs = await Promise.all(run.child_runs.map((child_run)=>this.convertV2RunToRun(child_run)));
            const chainRun = {
                uuid: run.id,
                start_time: run.start_time,
                end_time: run.end_time,
                execution_order: run.execution_order,
                child_execution_order: run.child_execution_order,
                serialized,
                type: run.run_type,
                session_id: session.id,
                inputs: run.inputs,
                outputs: run.outputs,
                child_llm_runs: child_runs.filter((child_run)=>child_run.type === "llm"),
                child_chain_runs: child_runs.filter((child_run)=>child_run.type === "chain"),
                child_tool_runs: child_runs.filter((child_run)=>child_run.type === "tool")
            };
            runResult = chainRun;
        } else if (run.run_type === "tool") {
            const child_runs = await Promise.all(run.child_runs.map((child_run)=>this.convertV2RunToRun(child_run)));
            const toolRun = {
                uuid: run.id,
                start_time: run.start_time,
                end_time: run.end_time,
                execution_order: run.execution_order,
                child_execution_order: run.child_execution_order,
                serialized,
                type: run.run_type,
                session_id: session.id,
                tool_input: run.inputs.input,
                output: run.outputs?.output,
                action: JSON.stringify(serialized),
                child_llm_runs: child_runs.filter((child_run)=>child_run.type === "llm"),
                child_chain_runs: child_runs.filter((child_run)=>child_run.type === "chain"),
                child_tool_runs: child_runs.filter((child_run)=>child_run.type === "tool")
            };
            runResult = toolRun;
        } else throw new Error(`Unknown run type: ${run.run_type}`);
        return runResult;
    }
    async persistRun(run) {
        let endpoint;
        let v1Run;
        if (run.run_type !== undefined) v1Run = await this.convertV2RunToRun(run);
        else v1Run = run;
        if (v1Run.type === "llm") endpoint = `${this.endpoint}/llm-runs`;
        else if (v1Run.type === "chain") endpoint = `${this.endpoint}/chain-runs`;
        else endpoint = `${this.endpoint}/tool-runs`;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(v1Run)
        });
        if (!response.ok) console.error(`Failed to persist run: ${response.status} ${response.statusText}`);
    }
    async persistSession(sessionCreate) {
        const endpoint = `${this.endpoint}/sessions`;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(sessionCreate)
        });
        if (!response.ok) {
            console.error(`Failed to persist session: ${response.status} ${response.statusText}, using default session.`);
            return {
                id: 1,
                ...sessionCreate
            };
        }
        return {
            id: (await response.json()).id,
            ...sessionCreate
        };
    }
    async _handleSessionResponse(endpoint) {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: this.headers
        });
        let tracerSession;
        if (!response.ok) {
            console.error(`Failed to load session: ${response.status} ${response.statusText}`);
            tracerSession = {
                id: 1,
                start_time: Date.now()
            };
            this.session = tracerSession;
            return tracerSession;
        }
        const resp = await response.json();
        if (resp.length === 0) {
            tracerSession = {
                id: 1,
                start_time: Date.now()
            };
            this.session = tracerSession;
            return tracerSession;
        }
        [tracerSession] = resp;
        this.session = tracerSession;
        return tracerSession;
    }
}

},{"../../memory/base.js":"eXKoO","../../util/env.js":"hJTOE","./tracer.js":"4klw3","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"eXKoO":[function(require,module,exports) {
/**
 * Abstract base class for memory in LangChain's Chains. Memory refers to
 * the state in Chains. It can be used to store information about past
 * executions of a Chain and inject that information into the inputs of
 * future executions of the Chain.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BaseMemory", ()=>BaseMemory);
parcelHelpers.export(exports, "getInputValue", ()=>getInputValue);
parcelHelpers.export(exports, "getOutputValue", ()=>getOutputValue);
/**
 * This function is used by memory classes to get a string representation
 * of the chat message history, based on the message content and role.
 */ parcelHelpers.export(exports, "getBufferString", ()=>getBufferString);
/**
 * Function used by memory classes to get the key of the prompt input,
 * excluding any keys that are memory variables or the "stop" key. If
 * there is not exactly one prompt input key, an error is thrown.
 */ parcelHelpers.export(exports, "getPromptInputKey", ()=>getPromptInputKey);
class BaseMemory {
}
const getValue = (values, key)=>{
    if (key !== undefined) return values[key];
    const keys = Object.keys(values);
    if (keys.length === 1) return values[keys[0]];
};
const getInputValue = (inputValues, inputKey)=>{
    const value = getValue(inputValues, inputKey);
    if (!value) {
        const keys = Object.keys(inputValues);
        throw new Error(`input values have ${keys.length} keys, you must specify an input key or pass only 1 key as input`);
    }
    return value;
};
const getOutputValue = (outputValues, outputKey)=>{
    const value = getValue(outputValues, outputKey);
    if (!value) {
        const keys = Object.keys(outputValues);
        throw new Error(`output values have ${keys.length} keys, you must specify an output key or pass only 1 key as output`);
    }
    return value;
};
function getBufferString(messages, humanPrefix = "Human", aiPrefix = "AI") {
    const string_messages = [];
    for (const m of messages){
        let role;
        if (m._getType() === "human") role = humanPrefix;
        else if (m._getType() === "ai") role = aiPrefix;
        else if (m._getType() === "system") role = "System";
        else if (m._getType() === "function") role = "Function";
        else if (m._getType() === "generic") role = m.role;
        else throw new Error(`Got unsupported message type: ${m}`);
        const nameStr = m.name ? `${m.name}, ` : "";
        string_messages.push(`${role}: ${nameStr}${m.content}`);
    }
    return string_messages.join("\n");
}
function getPromptInputKey(inputs, memoryVariables) {
    const promptInputKeys = Object.keys(inputs).filter((key)=>!memoryVariables.includes(key) && key !== "stop");
    if (promptInputKeys.length !== 1) throw new Error(`One input key expected, but got ${promptInputKeys.length}`);
    return promptInputKeys[0];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"f7PVg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Consume a promise, either adding it to the queue or waiting for it to resolve
 * @param promise Promise to consume
 * @param wait Whether to wait for the promise to resolve or resolve immediately
 */ parcelHelpers.export(exports, "consumeCallback", ()=>consumeCallback);
/**
 * Waits for all promises in the queue to resolve. If the queue is
 * undefined, it immediately resolves a promise.
 */ parcelHelpers.export(exports, "awaitAllCallbacks", ()=>awaitAllCallbacks);
var _pQueue = require("p-queue");
var _pQueueDefault = parcelHelpers.interopDefault(_pQueue);
let queue;
/**
 * Creates a queue using the p-queue library. The queue is configured to
 * auto-start and has a concurrency of 1, meaning it will process tasks
 * one at a time.
 */ function createQueue() {
    const PQueue = "default" in (0, _pQueueDefault.default) ? (0, _pQueueDefault.default).default : (0, _pQueueDefault.default);
    return new PQueue({
        autoStart: true,
        concurrency: 1
    });
}
async function consumeCallback(promiseFn, wait) {
    if (wait === true) await promiseFn();
    else {
        if (typeof queue === "undefined") queue = createQueue();
        queue.add(promiseFn);
    }
}
function awaitAllCallbacks() {
    return typeof queue !== "undefined" ? queue.onIdle() : Promise.resolve();
}

},{"p-queue":"kfIXu","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"eIT5W":[function(require,module,exports) {
/*
 * Support async iterator syntax for ReadableStreams in all environments.
 * Source: https://github.com/MattiasBuelens/web-streams-polyfill/pull/122#issuecomment-1627354490
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "readableStreamToAsyncIterable", ()=>readableStreamToAsyncIterable);
parcelHelpers.export(exports, "IterableReadableStream", ()=>IterableReadableStream);
function readableStreamToAsyncIterable(// eslint-disable-next-line @typescript-eslint/no-explicit-any
stream, preventCancel = false) {
    if (stream[Symbol.asyncIterator]) return stream[Symbol.asyncIterator]();
    const reader = stream.getReader();
    return {
        async next () {
            try {
                const result = await reader.read();
                if (result.done) reader.releaseLock(); // release lock when stream becomes closed
                return result;
            } catch (e) {
                reader.releaseLock(); // release lock when stream becomes errored
                throw e;
            }
        },
        async return () {
            if (!preventCancel) {
                const cancelPromise = reader.cancel(); // cancel first, but don't await yet
                reader.releaseLock(); // release lock first
                await cancelPromise; // now await it
            } else reader.releaseLock();
            return {
                done: true,
                value: undefined
            };
        },
        [Symbol.asyncIterator] () {
            return this;
        }
    };
}
class IterableReadableStream extends ReadableStream {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "reader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    ensureReader() {
        if (!this.reader) this.reader = this.getReader();
    }
    async next() {
        this.ensureReader();
        try {
            const result = await this.reader.read();
            if (result.done) this.reader.releaseLock(); // release lock when stream becomes closed
            return result;
        } catch (e) {
            this.reader.releaseLock(); // release lock when stream becomes errored
            throw e;
        }
    }
    async return() {
        this.ensureReader();
        const cancelPromise = this.reader.cancel(); // cancel first, but don't await yet
        this.reader.releaseLock(); // release lock first
        await cancelPromise; // now await it
        return {
            done: true,
            value: undefined
        };
    }
    [Symbol.asyncIterator]() {
        return this;
    }
    static fromReadableStream(stream) {
        // From https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams#reading_the_stream
        const reader = stream.getReader();
        return new IterableReadableStream({
            start (controller) {
                return pump();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                function pump() {
                    return reader.read().then(({ done, value })=>{
                        // When no more data needs to be consumed, close the stream
                        if (done) {
                            controller.close();
                            return;
                        }
                        // Enqueue the next data chunk into our target stream
                        controller.enqueue(value);
                        return pump();
                    });
                }
            }
        });
    }
    static fromAsyncGenerator(generator) {
        return new IterableReadableStream({
            async pull (controller) {
                const { value, done } = await generator.next();
                if (done) controller.close();
                else if (value) controller.enqueue(value);
            }
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"h8mSt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getCallbackMangerForConfig", ()=>getCallbackMangerForConfig);
var _managerJs = require("../../callbacks/manager.js");
async function getCallbackMangerForConfig(config) {
    return (0, _managerJs.CallbackManager).configure(config?.callbacks, undefined, config?.tags, undefined, config?.metadata);
}

},{"../../callbacks/manager.js":"dAlXr","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"laXWJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A class that can be used to make async calls with concurrency and retry logic.
 *
 * This is useful for making calls to any kind of "expensive" external resource,
 * be it because it's rate-limited, subject to network issues, etc.
 *
 * Concurrent calls are limited by the `maxConcurrency` parameter, which defaults
 * to `Infinity`. This means that by default, all calls will be made in parallel.
 *
 * Retries are limited by the `maxRetries` parameter, which defaults to 6. This
 * means that by default, each call will be retried up to 6 times, with an
 * exponential backoff between each attempt.
 */ parcelHelpers.export(exports, "AsyncCaller", ()=>AsyncCaller);
var _pRetry = require("p-retry");
var _pRetryDefault = parcelHelpers.interopDefault(_pRetry);
var _pQueue = require("p-queue");
var _pQueueDefault = parcelHelpers.interopDefault(_pQueue);
const STATUS_NO_RETRY = [
    400,
    401,
    402,
    403,
    404,
    405,
    406,
    407,
    408,
    409
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultFailedAttemptHandler = (error)=>{
    if (error.message.startsWith("Cancel") || error.message.startsWith("TimeoutError") || error.name === "TimeoutError" || error.message.startsWith("AbortError") || error.name === "AbortError") throw error;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error?.code === "ECONNABORTED") throw error;
    const status = // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?.response?.status ?? error?.status;
    if (status && STATUS_NO_RETRY.includes(+status)) throw error;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error?.error?.code === "insufficient_quota") {
        const err = new Error(error?.message);
        err.name = "InsufficientQuotaError";
        throw err;
    }
};
class AsyncCaller {
    constructor(params){
        Object.defineProperty(this, "maxConcurrency", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onFailedAttempt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxConcurrency = params.maxConcurrency ?? Infinity;
        this.maxRetries = params.maxRetries ?? 6;
        this.onFailedAttempt = params.onFailedAttempt ?? defaultFailedAttemptHandler;
        const PQueue = "default" in (0, _pQueueDefault.default) ? (0, _pQueueDefault.default).default : (0, _pQueueDefault.default);
        this.queue = new PQueue({
            concurrency: this.maxConcurrency
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    call(callable, ...args) {
        return this.queue.add(()=>(0, _pRetryDefault.default)(()=>callable(...args).catch((error)=>{
                    // eslint-disable-next-line no-instanceof/no-instanceof
                    if (error instanceof Error) throw error;
                    else throw new Error(error);
                }), {
                onFailedAttempt: this.onFailedAttempt,
                retries: this.maxRetries,
                randomize: true
            }), {
            throwOnTimeout: true
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callWithOptions(options, callable, ...args) {
        // Note this doesn't cancel the underlying request,
        // when available prefer to use the signal option of the underlying call
        if (options.signal) return Promise.race([
            this.call(callable, ...args),
            new Promise((_, reject)=>{
                options.signal?.addEventListener("abort", ()=>{
                    reject(new Error("AbortError"));
                });
            })
        ]);
        return this.call(callable, ...args);
    }
    fetch(...args) {
        return this.call(()=>fetch(...args).then((res)=>res.ok ? res : Promise.reject(res)));
    }
}

},{"p-retry":"kjtQ8","p-queue":"kfIXu","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"cRPJs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A runnable that passes through the input.
 */ parcelHelpers.export(exports, "RunnablePassthrough", ()=>RunnablePassthrough);
var _baseJs = require("./base.js");
class RunnablePassthrough extends (0, _baseJs.Runnable) {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "schema",
                "runnable"
            ]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    static lc_name() {
        return "RunnablePassthrough";
    }
    async invoke(input, options) {
        return this._callWithConfig((input)=>Promise.resolve(input), input, options);
    }
}

},{"./base.js":"jLkvK","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"j69Vr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A runnable that routes to a set of runnables based on Input['key'].
 * Returns the output of the selected runnable.
 */ parcelHelpers.export(exports, "RouterRunnable", ()=>RouterRunnable);
var _baseJs = require("./base.js");
class RouterRunnable extends (0, _baseJs.Runnable) {
    static lc_name() {
        return "RouterRunnable";
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "schema",
                "runnable"
            ]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "runnables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.runnables = fields.runnables;
    }
    async invoke(input, options) {
        const { key, input: actualInput } = input;
        const runnable = this.runnables[key];
        if (runnable === undefined) throw new Error(`No runnable associated with key "${key}".`);
        return runnable.invoke(actualInput, options);
    }
    async batch(inputs, options, batchOptions) {
        const keys = inputs.map((input)=>input.key);
        const actualInputs = inputs.map((input)=>input.input);
        const missingKey = keys.find((key)=>this.runnables[key] === undefined);
        if (missingKey !== undefined) throw new Error(`One or more keys do not have a corresponding runnable.`);
        const runnables = keys.map((key)=>this.runnables[key]);
        const optionsList = this._getOptionsList(options ?? {}, inputs.length);
        const batchSize = batchOptions?.maxConcurrency && batchOptions.maxConcurrency > 0 ? batchOptions?.maxConcurrency : inputs.length;
        const batchResults = [];
        for(let i = 0; i < actualInputs.length; i += batchSize){
            const batchPromises = actualInputs.slice(i, i + batchSize).map((actualInput, i)=>runnables[i].invoke(actualInput, optionsList[i]));
            const batchResult = await Promise.all(batchPromises);
            batchResults.push(batchResult);
        }
        return batchResults.flat();
    }
    async stream(input, options) {
        const { key, input: actualInput } = input;
        const runnable = this.runnables[key];
        if (runnable === undefined) throw new Error(`No runnable associated with key "${key}".`);
        return runnable.stream(actualInput, options);
    }
}

},{"./base.js":"jLkvK","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"hAB1m":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class that represents a runnable branch. The RunnableBranch is
 * initialized with an array of branches and a default branch. When invoked,
 * it evaluates the condition of each branch in order and executes the
 * corresponding branch if the condition is true. If none of the conditions
 * are true, it executes the default branch.
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
parcelHelpers.export(exports, "RunnableBranch", ()=>RunnableBranch);
var _baseJs = require("./base.js");
class RunnableBranch extends (0, _baseJs.Runnable) {
    static lc_name() {
        return "RunnableBranch";
    }
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "runnable",
                "branch"
            ]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "default", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "branches", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.branches = fields.branches;
        this.default = fields.default;
    }
    /**
     * Convenience method for instantiating a RunnableBranch from
     * RunnableLikes (objects, functions, or Runnables).
     *
     * Each item in the input except for the last one should be a
     * tuple with two items. The first is a "condition" RunnableLike that
     * returns "true" if the second RunnableLike in the tuple should run.
     *
     * The final item in the input should be a RunnableLike that acts as a
     * default branch if no other branches match.
     *
     * @example
     * ```ts
     * import { RunnableBranch } from "langchain/schema/runnable";
     *
     * const branch = RunnableBranch.from([
     *   [(x: number) => x > 0, (x: number) => x + 1],
     *   [(x: number) => x < 0, (x: number) => x - 1],
     *   (x: number) => x
     * ]);
     * ```
     * @param branches An array where the every item except the last is a tuple of [condition, runnable]
     *   pairs. The last item is a default runnable which is invoked if no other condition matches.
     * @returns A new RunnableBranch.
     */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static from(branches) {
        if (branches.length < 1) throw new Error("RunnableBranch requires at least one branch");
        const branchLikes = branches.slice(0, -1);
        const coercedBranches = branchLikes.map(([condition, runnable])=>[
                (0, _baseJs._coerceToRunnable)(condition),
                (0, _baseJs._coerceToRunnable)(runnable)
            ]);
        const defaultBranch = (0, _baseJs._coerceToRunnable)(branches[branches.length - 1]);
        return new this({
            branches: coercedBranches,
            default: defaultBranch
        });
    }
    async _invoke(input, config, runManager) {
        let result;
        for(let i = 0; i < this.branches.length; i += 1){
            const [condition, branchRunnable] = this.branches[i];
            const conditionValue = await condition.invoke(input, this._patchConfig(config, runManager?.getChild(`condition:${i + 1}`)));
            if (conditionValue) {
                result = await branchRunnable.invoke(input, this._patchConfig(config, runManager?.getChild(`branch:${i + 1}`)));
                break;
            }
        }
        if (!result) result = await this.default.invoke(input, this._patchConfig(config, runManager?.getChild("default")));
        return result;
    }
    async invoke(input, config = {}) {
        return this._callWithConfig(this._invoke, input, config);
    }
}

},{"./base.js":"jLkvK","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"eM6b7":[function(require,module,exports) {
module.exports = require("1b027e24dbcbd2ee")(require("ab21590aa6b6e9c7").getBundleURL("eCB0M") + "prompt.f666f821.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("a0rUj"));

},{"1b027e24dbcbd2ee":"4bOe1","ab21590aa6b6e9c7":"k1NHF"}],"4bOe1":[function(require,module,exports) {
"use strict";
var cacheLoader = require("18ee47ea23acab77");
module.exports = cacheLoader(function(bundle) {
    return new Promise(function(resolve, reject) {
        // Don't insert the same script twice (e.g. if it was already in the HTML)
        var existingScripts = document.getElementsByTagName("script");
        if ([].concat(existingScripts).some(function isCurrentBundle(script) {
            return script.src === bundle;
        })) {
            resolve();
            return;
        }
        var preloadLink = document.createElement("link");
        preloadLink.href = bundle;
        preloadLink.rel = "preload";
        preloadLink.as = "script";
        document.head.appendChild(preloadLink);
        var script = document.createElement("script");
        script.async = true;
        script.type = "text/javascript";
        script.src = bundle;
        script.onerror = function(e) {
            var error = new TypeError("Failed to fetch dynamically imported module: ".concat(bundle, ". Error: ").concat(e.message));
            script.onerror = script.onload = null;
            script.remove();
            reject(error);
        };
        script.onload = function() {
            script.onerror = script.onload = null;
            resolve();
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    });
});

},{"18ee47ea23acab77":"bokW6"}],"bokW6":[function(require,module,exports) {
"use strict";
var cachedBundles = {};
var cachedPreloads = {};
var cachedPrefetches = {};
function getCache(type) {
    switch(type){
        case "preload":
            return cachedPreloads;
        case "prefetch":
            return cachedPrefetches;
        default:
            return cachedBundles;
    }
}
module.exports = function(loader, type) {
    return function(bundle) {
        var cache = getCache(type);
        if (cache[bundle]) return cache[bundle];
        return cache[bundle] = loader.apply(null, arguments).catch(function(e) {
            delete cache[bundle];
            throw e;
        });
    };
};

},{}],"k1NHF":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"aAn3W":[function(require,module,exports) {
module.exports = Promise.all([
    require("dbe4b7c1f89144b9")(require("6be07a6af3a990c6").getBundleURL("eCB0M") + "prompt.f666f821.js" + "?" + Date.now()).catch((err)=>{
        delete module.bundle.cache[module.id];
        throw err;
    }),
    require("dbe4b7c1f89144b9")(require("6be07a6af3a990c6").getBundleURL("eCB0M") + "few_shot.2950f6c9.js" + "?" + Date.now()).catch((err)=>{
        delete module.bundle.cache[module.id];
        throw err;
    })
]).then(()=>module.bundle.root("9GEmg"));

},{"dbe4b7c1f89144b9":"4bOe1","6be07a6af3a990c6":"k1NHF"}],"58AXt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "parseFString", ()=>parseFString);
parcelHelpers.export(exports, "interpolateFString", ()=>interpolateFString);
parcelHelpers.export(exports, "DEFAULT_FORMATTER_MAPPING", ()=>DEFAULT_FORMATTER_MAPPING);
parcelHelpers.export(exports, "DEFAULT_PARSER_MAPPING", ()=>DEFAULT_PARSER_MAPPING);
parcelHelpers.export(exports, "renderTemplate", ()=>renderTemplate);
parcelHelpers.export(exports, "parseTemplate", ()=>parseTemplate);
parcelHelpers.export(exports, "checkValidTemplate", ()=>checkValidTemplate);
const parseFString = (template)=>{
    // Core logic replicated from internals of pythons built in Formatter class.
    // https://github.com/python/cpython/blob/135ec7cefbaffd516b77362ad2b2ad1025af462e/Objects/stringlib/unicode_format.h#L700-L706
    const chars = template.split("");
    const nodes = [];
    const nextBracket = (bracket, start)=>{
        for(let i = start; i < chars.length; i += 1){
            if (bracket.includes(chars[i])) return i;
        }
        return -1;
    };
    let i = 0;
    while(i < chars.length){
        if (chars[i] === "{" && i + 1 < chars.length && chars[i + 1] === "{") {
            nodes.push({
                type: "literal",
                text: "{"
            });
            i += 2;
        } else if (chars[i] === "}" && i + 1 < chars.length && chars[i + 1] === "}") {
            nodes.push({
                type: "literal",
                text: "}"
            });
            i += 2;
        } else if (chars[i] === "{") {
            const j = nextBracket("}", i);
            if (j < 0) throw new Error("Unclosed '{' in template.");
            nodes.push({
                type: "variable",
                name: chars.slice(i + 1, j).join("")
            });
            i = j + 1;
        } else if (chars[i] === "}") throw new Error("Single '}' in template.");
        else {
            const next = nextBracket("{}", i);
            const text = (next < 0 ? chars.slice(i) : chars.slice(i, next)).join("");
            nodes.push({
                type: "literal",
                text
            });
            i = next < 0 ? chars.length : next;
        }
    }
    return nodes;
};
const interpolateFString = (template, values)=>parseFString(template).reduce((res, node)=>{
        if (node.type === "variable") {
            if (node.name in values) return res + values[node.name];
            throw new Error(`Missing value for input ${node.name}`);
        }
        return res + node.text;
    }, "");
const DEFAULT_FORMATTER_MAPPING = {
    "f-string": interpolateFString,
    jinja2: (_, __)=>""
};
const DEFAULT_PARSER_MAPPING = {
    "f-string": parseFString,
    jinja2: (_)=>[]
};
const renderTemplate = (template, templateFormat, inputValues)=>DEFAULT_FORMATTER_MAPPING[templateFormat](template, inputValues);
const parseTemplate = (template, templateFormat)=>DEFAULT_PARSER_MAPPING[templateFormat](template);
const checkValidTemplate = (template, templateFormat, inputVariables)=>{
    if (!(templateFormat in DEFAULT_FORMATTER_MAPPING)) {
        const validFormats = Object.keys(DEFAULT_FORMATTER_MAPPING);
        throw new Error(`Invalid template format. Got \`${templateFormat}\`;
                         should be one of ${validFormats}`);
    }
    try {
        const dummyInputs = inputVariables.reduce((acc, v)=>{
            acc[v] = "foo";
            return acc;
        }, {});
        renderTemplate(template, templateFormat, dummyInputs);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e) {
        throw new Error(`Invalid prompt schema: ${e.message}`);
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}]},[], null, "parcelRequire5833")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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USxLQUFLLEdBQUk7UUFDckMsTUFBTSxPQUFPO1FBQ2IsTUFBTSxPQUFPO1FBQ2IsTUFBTSxPQUFPO1FBQ2IsTUFBTSxPQUFPO1FBQ2IsSUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHO1FBQy9CLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJO1FBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJO1FBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJO1FBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHO1FBQ25DLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJO1FBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJO1FBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJO1FBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHO1FBQ25DLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJO1FBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxJQUFJO1FBQ3JDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxJQUFJO1FBQ3JDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHO1FBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxJQUFJO1FBQ3JDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxJQUFJO1FBQ3JDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxJQUFJO1FBQ3JDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHO1FBQ25DLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHO1FBQ25DLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxJQUFJO1FBQ3JDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSTtRQUNoQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRztRQUNuQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRztRQUNwQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsSUFBSTtRQUNyQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSTtRQUNwQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRztRQUNuQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRztRQUNwQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSTtRQUNwQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSTtRQUNwQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRztRQUNwQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRztRQUNuQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSTtRQUNwQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsSUFBSTtRQUNyQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRztRQUNuQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSTtRQUNwQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsSUFBSTtRQUNyQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsSUFBSTtRQUNyQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRztRQUNuQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSTtRQUNwQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSTtRQUNwQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsSUFBSTtRQUNyQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRztRQUNwQyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUk7UUFDaEMsSUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLElBQUk7UUFDcEMsSUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLElBQUk7UUFDcEMsSUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUc7UUFDbkMsSUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLElBQUk7UUFDckMsSUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLElBQUk7UUFDckMsSUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLElBQUk7UUFDcEMsSUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHO1FBQy9CLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJO1FBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxJQUFJO1FBQ3JDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJO1FBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHO1FBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJ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QU0sSUFBSSxZQUFZO1FBRTVCLElBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsRUFDeEIsR0FBRyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRSxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtRQUdySSxDQUFDLENBQUMsRUFBRSxHQUFHO0lBQ1Q7SUFFQSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQSxNQUFNLFNBQVMsQ0FBQSxJQUFLLElBQUksS0FBSyxJQUFJLEdBQUc7SUFDcEQsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRyxLQUFLLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUc7SUFDdEMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUEsTUFBTSxTQUFTLENBQUEsSUFBSyxJQUFJO0lBRXhDLElBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsRUFBRztRQUMxQixNQUFNLElBQUksSUFBSSxZQUFZO1FBRTFCLElBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsRUFDeEIsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFHaEIsSUFBSyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxFQUN6QixDQUFDLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO1FBRzNELElBQUksSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNaLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNaLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNaLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNaLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRTtRQUVaLElBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsRUFBRztZQUMzQixNQUFNLElBQUksS0FBSyxNQUFNLElBQUk7WUFDekIsTUFBTSxJQUFJLEtBQUssR0FBRyxLQUFLLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSztZQUMzRCxJQUFJO1lBQ0osSUFBSTtZQUNKLElBQUksS0FBSyxHQUFHLFFBQVE7WUFDcEIsSUFBSTtZQUNKLElBQUk7UUFDTjtRQUVBLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFNO1FBQ3BCLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFNO1FBQ3BCLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFNO1FBQ3BCLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFNO1FBQ3BCLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFNO0lBQ3RCO0lBRUEsT0FBTztRQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksS0FBSztRQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksS0FBSztRQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSTtRQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUc7UUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUs7UUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUs7UUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUk7UUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHO1FBQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxLQUFLO1FBQU0sQ0FBQyxD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QUFLLElBQUksRUFBQyxHQUFFO1lBQUU7UUFBQztJQUFDO0lBQUMsU0FBUyxFQUFFLENBQUM7UUFBRSxJQUFHLE1BQUksY0FBYSxPQUFPLGFBQWE7UUFBRyxJQUFHLEFBQUMsQ0FBQSxNQUFJLEtBQUcsQ0FBQyxDQUFBLEtBQUksY0FBYSxPQUFPLElBQUUsY0FBYSxhQUFhO1FBQUcsSUFBRztZQUFDLE9BQU8sRUFBRTtRQUFFLEVBQUMsT0FBTSxHQUFFO1lBQUMsSUFBRztnQkFBQyxPQUFPLEVBQUUsS0FBSyxNQUFLO1lBQUUsRUFBQyxPQUFNLEdBQUU7Z0JBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFDO1lBQUU7UUFBQztJQUFDO0lBQUMsSUFBSSxJQUFFLEVBQUUsRUFBQyxJQUFFLENBQUMsR0FBRSxHQUFFLElBQUU7SUFBRyxTQUFTO1FBQUksQ0FBQyxLQUFHLENBQUMsS0FBSSxDQUFBLElBQUUsQ0FBQyxHQUFFLEVBQUUsU0FBTyxJQUFFLEVBQUUsT0FBTyxLQUFHLElBQUUsSUFBRyxFQUFFLFVBQVEsR0FBRTtJQUFFO0lBQUMsU0FBUztRQUFJLElBQUcsQ0FBQyxHQUFFO1lBQUMsSUFBSSxJQUFFLEVBQUU7WUFBRyxJQUFFLENBQUM7WUFBRSxJQUFJLElBQUksSUFBRSxFQUFFLFFBQU8sR0FBRztnQkFBQyxJQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsRUFBQyxFQUFFLElBQUUsR0FBRyxLQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQU0sSUFBRSxJQUFHLElBQUUsRUFBRTtZQUFNO1lBQUMsSUFBRSxNQUFLLElBQUUsQ0FBQyxHQUFFLEVBQUU7UUFBRTtJQUFDO0lBQUMsRUFBRSxXQUFTLFNBQVMsQ0FBQztRQUFFLElBQUksSUFBRSxJQUFJLE1BQU0sVUFBVSxTQUFPO1FBQUcsSUFBRyxVQUFVLFNBQU8sR0FBRSxJQUFJLElBQUksSUFBRSxHQUFFLElBQUUsVUFBVSxRQUFPLElBQUksQ0FBQyxDQUFDLElBQUUsRUFBRSxHQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQUMsRUFBRSxLQUFLLElB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bkAwLjAuMTUxX2F4aW9zQDEuNi4wL25vZGVfbW9kdWxlcy9sYW5nY2hhaW4vZGlzdC9wcm9tcHRzL3Byb21wdC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9sYW5nY2hhaW5AMC4wLjE1MV9heGlvc0AxLjYuMC9ub2RlX21vZHVsZXMvbGFuZ2NoYWluL2Rpc3QvcHJvbXB0cy9iYXNlLmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL2xhbmdjaGFpbkAwLjAuMTUxX2F4aW9zQDEuNi4wL25vZGVfbW9kdWxlcy9sYW5nY2hhaW4vZGlzdC9zY2hlbWEvaW5kZXguanMiLCJub2RlX21vZHVsZXMvLnBucG0vbGFuZ2NoYWluQDAuMC4xNTFfYXhpb3NAMS42LjAvbm9kZV9tb2R1bGVzL2xhbmdjaGFpbi9kaXN0L2xvYWQvc2VyaWFsaXphYmxlLmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL2xhbmdjaGFpbkAwLjAuMTUxX2F4aW9zQDEuNi4wL25vZGVfbW9kdWxlcy9sYW5nY2hhaW4vZGlzdC9sb2FkL21hcF9rZXlzLmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL2RlY2FtZWxpemVAMS4yLjAvbm9kZV9tb2R1bGVzL2RlY2FtZWxpemUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvLnBucG0vY2FtZWxjYXNlQDYuMy4wL25vZGVfbW9kdWxlcy9jYW1lbGNhc2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvLnBucG0vQHBhcmNlbCt0cmFuc2Zvcm1lci1qc0AyLjkuM19AcGFyY2VsK2NvcmVAMi45LjMvbm9kZV9tb2R1bGVzL0BwYXJjZWwvdHJhbnNmb3JtZXItanMvc3JjL2VzbW9kdWxlLWhlbHBlcnMuanMiLCJub2RlX21vZHVsZXMvLnBucG0vbGFuZ2NoYWluQDAuMC4xNTFfYXhpb3NAMS42LjAvbm9kZV9tb2R1bGVzL2xhbmdjaGFpbi9kaXN0L3NjaGVtYS9ydW5uYWJsZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9sYW5nY2hhaW5AMC4wLjE1MV9heGlvc0AxLjYuMC9ub2RlX21vZHVsZXMvbGFuZ2NoYWluL2Rpc3Qvc2NoZW1hL3J1bm5hYmxlL2Jhc2UuanMiLCJub2RlX21vZHVsZXMvLnBucG0vcC1yZXRyeUA0LjYuMi9ub2RlX21vZHVsZXMvcC1yZXRyeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9yZXRyeUAwLjEzLjEvbm9kZV9tb2R1bGVzL3JldHJ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL3JldHJ5QDAuMTMuMS9ub2RlX21vZHVsZXMvcmV0cnkvbGliL3JldHJ5LmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL3JldHJ5QDAuMTMuMS9ub2RlX21vZHVsZXMvcmV0cnkvbGliL3JldHJ5X29wZXJhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9sYW5nY2hhaW5AMC4wLjE1MV9heGlvc0AxLjYuMC9ub2RlX21vZHVsZXMvbGFuZ2NoYWluL2Rpc3QvY2FsbGJhY2tzL21hbmFnZXIuanMiLCJub2RlX21vZHVsZXMvLnBucG0vdXVpZEA5LjAuMS9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL3V1aWRAOS4wLjEvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92MS5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS91dWlkQDkuMC4xL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL3V1aWRAOS4wLjEvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJub2RlX21vZHVsZXMvLnBucG0vdXVpZEA5LjAuMS9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL3V1aWRAOS4wLjEvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS91dWlkQDkuMC4xL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjMuanMiLCJub2RlX21vZHVsZXMvLnBucG0vdXVpZEA5LjAuMS9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3YzNS5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS91dWlkQDkuMC4xL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcGFyc2UuanMiLCJub2RlX21vZHVsZXMvLnBucG0vdXVpZEA5LjAuMS9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL21kNS5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS91dWlkQDkuMC4xL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJub2RlX21vZHVsZXMvLnBucG0vdXVpZEA5LjAuMS9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS91dWlkQDkuMC4xL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjUuanMiLCJub2RlX21vZHVsZXMvLnBucG0vdXVpZEA5LjAuMS9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3NoYTEuanMiLCJub2RlX21vZHVsZXMvLnBucG0vdXVpZEA5LjAuMS9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25pbC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS91dWlkQDkuMC4xL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmVyc2lvbi5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9sYW5nY2hhaW5AMC4wLjE1MV9heGlvc0AxLjYuMC9ub2RlX21vZHVsZXMvbGFuZ2NoYWluL2Rpc3QvY2FsbGJhY2tzL2Jhc2UuanMiLCJub2RlX21vZHVsZXMvLnBucG0vQHBsYXNtb2hxK3BhcmNlbC1yZXNvbHZlckAwLjEzLjEvbm9kZV9tb2R1bGVzL0BwbGFzbW9ocS9wYXJjZWwtcmVzb2x2ZXIvZGlzdC9wb2x5ZmlsbHMvcHJvY2Vzcy5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9sYW5nY2hhaW5AMC4wLjE1MV9heGlvc0AxLjYuMC9ub2RlX21vZHVsZXMvbGFuZ2NoYWluL2Rpc3QvY2FsbGJhY2tzL2hhbmRsZXJzL2NvbnNvbGUuanMiLCJub2RlX21vZHVsZXMvLnBucG0vYW5zaS1zdHlsZXNANS4yLjAvbm9kZV9tb2R1bGVzL2Fuc2ktc3R5bGVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL2xhbmdjaGFpbkAwLjAuMTUxX2F4aW9zQDEuNi4wL25vZGVfbW9kdWxlcy9sYW5nY2hhaW4vZGlzdC9jYWxsYmFja3MvaGFuZGxlcnMvdHJhY2VyLmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL2xhbmdjaGFpbkAwLjAuMTUxX2F4aW9zQDEuNi4wL25vZGVfbW9kdWxlcy9sYW5nY2hhaW4vZGlzdC9jYWxsYmFja3MvaGFuZGxlcnMvaW5pdGlhbGl6ZS5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9sYW5nY2hhaW5AMC4wLjE1MV9heGlvc0AxLjYuMC9ub2RlX21vZHVsZXMvbGFuZ2NoYWluL2Rpc3QvY2FsbGJhY2tzL2hhbmRsZXJzL3RyYWNlcl9sYW5nY2hhaW4uanMiLCJub2RlX21vZHVsZXMvLnBucG0vbGFuZ3NtaXRoQDAuMC40OC9ub2RlX21vZHVsZXMvbGFuZ3NtaXRoL2Rpc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvLnBucG0vbGFuZ3NtaXRoQDAuMC40OC9ub2RlX21vZHVsZXMvbGFuZ3NtaXRoL2Rpc3QvY2xpZW50LmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL2xhbmdzbWl0aEAwLjAuNDgvbm9kZV9tb2R1bGVzL2xhbmdzbWl0aC9kaXN0L3V0aWxzL2FzeW5jX2NhbGxlci5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9wLXF1ZXVlQDYuNi4yL25vZGVfbW9kdWxlcy9wLXF1ZXVlL2Rpc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvLnBucG0vZXZlbnRlbWl0dGVyM0A0LjAuNy9ub2RlX21vZHVsZXMvZXZlbnRlbWl0dGVyMy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9wLXRpbWVvdXRAMy4yLjAvbm9kZV9tb2R1bGVzL3AtdGltZW91dC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9wLWZpbmFsbHlAMS4wLjAvbm9kZV9tb2R1bGVzL3AtZmluYWxseS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9wLXF1ZXVlQDYuNi4yL25vZGVfbW9kdWxlcy9wLXF1ZXVlL2Rpc3QvcHJpb3JpdHktcXVldWUuanMiLCJub2RlX21vZHVsZXMvLnBucG0vcC1xdWV1ZUA2LjYuMi9ub2RlX21vZHVsZXMvcC1xdWV1ZS9kaXN0L2xvd2VyLWJvdW5kLmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL2xhbmdzbWl0aEAwLjAuNDgvbm9kZV9tb2R1bGVzL2xhbmdzbWl0aC9kaXN0L3V0aWxzL21lc3NhZ2VzLmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL2xhbmdzbWl0aEAwLjAuNDgvbm9kZV9tb2R1bGVzL2xhbmdzbWl0aC9kaXN0L3V0aWxzL2Vudi5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9sYW5nc21pdGhAMC4wLjQ4L25vZGVfbW9kdWxlcy9sYW5nc21pdGgvZGlzdC9ydW5fdHJlZXMuanMiLCJub2RlX21vZHVsZXMvLnBucG0vbGFuZ2NoYWluQDAuMC4xNTFfYXhpb3NAMS42LjAvbm9kZV9tb2R1bGVzL2xhbmdjaGFpbi9kaXN0L3V0aWwvZW52LmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL2xhbmdjaGFpbkAwLjAuMTUxX2F4aW9zQDEuNi4wL25vZGVfbW9kdWxlcy9sYW5nY2hhaW4vZGlzdC9jYWxsYmFja3MvaGFuZGxlcnMvdHJhY2VyX2xhbmdjaGFpbl92MS5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9sYW5nY2hhaW5AMC4wLjE1MV9heGlvc0AxLjYuMC9ub2RlX21vZHVsZXMvbGFuZ2NoYWluL2Rpc3QvbWVtb3J5L2Jhc2UuanMiLCJub2RlX21vZHVsZXMvLnBucG0vbGFuZ2NoYWluQDAuMC4xNTFfYXhpb3NAMS42LjAvbm9kZV9tb2R1bGVzL2xhbmdjaGFpbi9kaXN0L2NhbGxiYWNrcy9wcm9taXNlcy5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9sYW5nY2hhaW5AMC4wLjE1MV9heGlvc0AxLjYuMC9ub2RlX21vZHVsZXMvbGFuZ2NoYWluL2Rpc3QvdXRpbC9zdHJlYW0uanMiLCJub2RlX21vZHVsZXMvLnBucG0vbGFuZ2NoYWluQDAuMC4xNTFfYXhpb3NAMS42LjAvbm9kZV9tb2R1bGVzL2xhbmdjaGFpbi9kaXN0L3NjaGVtYS9ydW5uYWJsZS9jb25maWcuanMiLCJub2RlX21vZHVsZXMvLnBucG0vbGFuZ2NoYWluQDAuMC4xNTFfYXhpb3NAMS42LjAvbm9kZV9tb2R1bGVzL2xhbmdjaGFpbi9kaXN0L3V0aWwvYXN5bmNfY2FsbGVyLmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL2xhbmdjaGFpbkAwLjAuMTUxX2F4aW9zQDEuNi4wL25vZGVfbW9kdWxlcy9sYW5nY2hhaW4vZGlzdC9zY2hlbWEvcnVubmFibGUvcGFzc3Rocm91Z2guanMiLCJub2RlX21vZHVsZXMvLnBucG0vbGFuZ2NoYWluQDAuMC4xNTFfYXhpb3NAMS42LjAvbm9kZV9tb2R1bGVzL2xhbmdjaGFpbi9kaXN0L3NjaGVtYS9ydW5uYWJsZS9yb3V0ZXIuanMiLCJub2RlX21vZHVsZXMvLnBucG0vbGFuZ2NoYWluQDAuMC4xNTFfYXhpb3NAMS42LjAvbm9kZV9tb2R1bGVzL2xhbmdjaGFpbi9kaXN0L3NjaGVtYS9ydW5uYWJsZS9icmFuY2guanMiLCJub2RlX21vZHVsZXMvLnBucG0vQHBhcmNlbCtydW50aW1lLWpzQDIuOS4zX0BwYXJjZWwrY29yZUAyLjkuMy9ub2RlX21vZHVsZXMvQHBhcmNlbC9ydW50aW1lLWpzL2xpYi9ydW50aW1lLWIzMWJkZGE5N2Q5YzFhODYuanMiLCJub2RlX21vZHVsZXMvLnBucG0vQHBhcmNlbCtydW50aW1lLWpzQDIuOS4zX0BwYXJjZWwrY29yZUAyLjkuMy9ub2RlX21vZHVsZXMvQHBhcmNlbC9ydW50aW1lLWpzL2xpYi9oZWxwZXJzL2Jyb3dzZXIvanMtbG9hZGVyLmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL0BwYXJjZWwrcnVudGltZS1qc0AyLjkuM19AcGFyY2VsK2NvcmVAMi45LjMvbm9kZV9tb2R1bGVzL0BwYXJjZWwvcnVudGltZS1qcy9saWIvaGVscGVycy9jYWNoZUxvYWRlci5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3J1bnRpbWUtanNAMi45LjNfQHBhcmNlbCtjb3JlQDIuOS4zL25vZGVfbW9kdWxlcy9AcGFyY2VsL3J1bnRpbWUtanMvbGliL2hlbHBlcnMvYnVuZGxlLXVybC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3J1bnRpbWUtanNAMi45LjNfQHBhcmNlbCtjb3JlQDIuOS4zL25vZGVfbW9kdWxlcy9AcGFyY2VsL3J1bnRpbWUtanMvbGliL3J1bnRpbWUtNzUwYzg2ODQwYzJkNzEwMS5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9sYW5nY2hhaW5AMC4wLjE1MV9heGlvc0AxLjYuMC9ub2RlX21vZHVsZXMvbGFuZ2NoYWluL2Rpc3QvcHJvbXB0cy90ZW1wbGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZWZhdWx0IGdlbmVyaWMgXCJhbnlcIiB2YWx1ZXMgYXJlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbi8vIFJlcGxhY2Ugd2l0aCBcInN0cmluZ1wiIHdoZW4gd2UgYXJlIGNvbWZvcnRhYmxlIHdpdGggYSBicmVha2luZyBjaGFuZ2UuXG5pbXBvcnQgeyBCYXNlU3RyaW5nUHJvbXB0VGVtcGxhdGUsIH0gZnJvbSBcIi4vYmFzZS5qc1wiO1xuaW1wb3J0IHsgY2hlY2tWYWxpZFRlbXBsYXRlLCBwYXJzZVRlbXBsYXRlLCByZW5kZXJUZW1wbGF0ZSwgfSBmcm9tIFwiLi90ZW1wbGF0ZS5qc1wiO1xuLyoqXG4gKiBTY2hlbWEgdG8gcmVwcmVzZW50IGEgYmFzaWMgcHJvbXB0IGZvciBhbiBMTE0uXG4gKiBAYXVnbWVudHMgQmFzZVByb21wdFRlbXBsYXRlXG4gKiBAYXVnbWVudHMgUHJvbXB0VGVtcGxhdGVJbnB1dFxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgUHJvbXB0VGVtcGxhdGUgfSBmcm9tIFwibGFuZ2NoYWluL3Byb21wdHNcIjtcbiAqXG4gKiBjb25zdCBwcm9tcHQgPSBuZXcgUHJvbXB0VGVtcGxhdGUoe1xuICogICBpbnB1dFZhcmlhYmxlczogW1wiZm9vXCJdLFxuICogICB0ZW1wbGF0ZTogXCJTYXkge2Zvb31cIixcbiAqIH0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9tcHRUZW1wbGF0ZSBleHRlbmRzIEJhc2VTdHJpbmdQcm9tcHRUZW1wbGF0ZSB7XG4gICAgc3RhdGljIGxjX25hbWUoKSB7XG4gICAgICAgIHJldHVybiBcIlByb21wdFRlbXBsYXRlXCI7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGlucHV0KSB7XG4gICAgICAgIHN1cGVyKGlucHV0KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwidGVtcGxhdGVcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwidGVtcGxhdGVGb3JtYXRcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IFwiZi1zdHJpbmdcIlxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwidmFsaWRhdGVUZW1wbGF0ZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbnB1dCk7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlVGVtcGxhdGUpIHtcbiAgICAgICAgICAgIGxldCB0b3RhbElucHV0VmFyaWFibGVzID0gdGhpcy5pbnB1dFZhcmlhYmxlcztcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnRpYWxWYXJpYWJsZXMpIHtcbiAgICAgICAgICAgICAgICB0b3RhbElucHV0VmFyaWFibGVzID0gdG90YWxJbnB1dFZhcmlhYmxlcy5jb25jYXQoT2JqZWN0LmtleXModGhpcy5wYXJ0aWFsVmFyaWFibGVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGVja1ZhbGlkVGVtcGxhdGUodGhpcy50ZW1wbGF0ZSwgdGhpcy50ZW1wbGF0ZUZvcm1hdCwgdG90YWxJbnB1dFZhcmlhYmxlcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldFByb21wdFR5cGUoKSB7XG4gICAgICAgIHJldHVybiBcInByb21wdFwiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGb3JtYXRzIHRoZSBwcm9tcHQgdGVtcGxhdGUgd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBiZSB1c2VkIHRvIGZvcm1hdCB0aGUgcHJvbXB0IHRlbXBsYXRlLlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgc3RyaW5nIHdoaWNoIGlzIHRoZSBmb3JtYXR0ZWQgcHJvbXB0LlxuICAgICAqL1xuICAgIGFzeW5jIGZvcm1hdCh2YWx1ZXMpIHtcbiAgICAgICAgY29uc3QgYWxsVmFsdWVzID0gYXdhaXQgdGhpcy5tZXJnZVBhcnRpYWxBbmRVc2VyVmFyaWFibGVzKHZhbHVlcyk7XG4gICAgICAgIHJldHVybiByZW5kZXJUZW1wbGF0ZSh0aGlzLnRlbXBsYXRlLCB0aGlzLnRlbXBsYXRlRm9ybWF0LCBhbGxWYWx1ZXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUYWtlIGV4YW1wbGVzIGluIGxpc3QgZm9ybWF0IHdpdGggcHJlZml4IGFuZCBzdWZmaXggdG8gY3JlYXRlIGEgcHJvbXB0LlxuICAgICAqXG4gICAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBhIGEgd2F5IHRvIGR5bmFtaWNhbGx5IGNyZWF0ZSBhIHByb21wdCBmcm9tIGV4YW1wbGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGV4YW1wbGVzIC0gTGlzdCBvZiBleGFtcGxlcyB0byB1c2UgaW4gdGhlIHByb21wdC5cbiAgICAgKiBAcGFyYW0gc3VmZml4IC0gU3RyaW5nIHRvIGdvIGFmdGVyIHRoZSBsaXN0IG9mIGV4YW1wbGVzLiBTaG91bGQgZ2VuZXJhbGx5IHNldCB1cCB0aGUgdXNlcidzIGlucHV0LlxuICAgICAqIEBwYXJhbSBpbnB1dFZhcmlhYmxlcyAtIEEgbGlzdCBvZiB2YXJpYWJsZSBuYW1lcyB0aGUgZmluYWwgcHJvbXB0IHRlbXBsYXRlIHdpbGwgZXhwZWN0XG4gICAgICogQHBhcmFtIGV4YW1wbGVTZXBhcmF0b3IgLSBUaGUgc2VwYXJhdG9yIHRvIHVzZSBpbiBiZXR3ZWVuIGV4YW1wbGVzXG4gICAgICogQHBhcmFtIHByZWZpeCAtIFN0cmluZyB0aGF0IHNob3VsZCBnbyBiZWZvcmUgYW55IGV4YW1wbGVzLiBHZW5lcmFsbHkgaW5jbHVkZXMgZXhhbXBsZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgZmluYWwgcHJvbXB0IHRlbXBsYXRlIGdlbmVyYXRlZC5cbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbUV4YW1wbGVzKGV4YW1wbGVzLCBzdWZmaXgsIGlucHV0VmFyaWFibGVzLCBleGFtcGxlU2VwYXJhdG9yID0gXCJcXG5cXG5cIiwgcHJlZml4ID0gXCJcIikge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IFtwcmVmaXgsIC4uLmV4YW1wbGVzLCBzdWZmaXhdLmpvaW4oZXhhbXBsZVNlcGFyYXRvcik7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbXB0VGVtcGxhdGUoe1xuICAgICAgICAgICAgaW5wdXRWYXJpYWJsZXMsXG4gICAgICAgICAgICB0ZW1wbGF0ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvYWQgcHJvbXB0IHRlbXBsYXRlIGZyb20gYSB0ZW1wbGF0ZSBmLXN0cmluZ1xuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tVGVtcGxhdGUodGVtcGxhdGUsIHsgdGVtcGxhdGVGb3JtYXQgPSBcImYtc3RyaW5nXCIsIC4uLnJlc3QgfSA9IHt9KSB7XG4gICAgICAgIGlmICh0ZW1wbGF0ZUZvcm1hdCA9PT0gXCJqaW5qYTJcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiamluamEyIHRlbXBsYXRlcyBhcmUgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hbWVzID0gbmV3IFNldCgpO1xuICAgICAgICBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0ZW1wbGF0ZUZvcm1hdCkuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gXCJ2YXJpYWJsZVwiKSB7XG4gICAgICAgICAgICAgICAgbmFtZXMuYWRkKG5vZGUubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb21wdFRlbXBsYXRlKHtcbiAgICAgICAgICAgIC8vIFJlbHkgb24gZXh0cmFjdGVkIHR5cGVzXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgaW5wdXRWYXJpYWJsZXM6IFsuLi5uYW1lc10sXG4gICAgICAgICAgICB0ZW1wbGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIHRlbXBsYXRlLFxuICAgICAgICAgICAgLi4ucmVzdCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhcnRpYWxseSBhcHBsaWVzIHZhbHVlcyB0byB0aGUgcHJvbXB0IHRlbXBsYXRlLlxuICAgICAqIEBwYXJhbSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBiZSBwYXJ0aWFsbHkgYXBwbGllZCB0byB0aGUgcHJvbXB0IHRlbXBsYXRlLlxuICAgICAqIEByZXR1cm5zIEEgbmV3IGluc3RhbmNlIG9mIFByb21wdFRlbXBsYXRlIHdpdGggdGhlIHBhcnRpYWxseSBhcHBsaWVkIHZhbHVlcy5cbiAgICAgKi9cbiAgICBhc3luYyBwYXJ0aWFsKHZhbHVlcykge1xuICAgICAgICBjb25zdCBuZXdJbnB1dFZhcmlhYmxlcyA9IHRoaXMuaW5wdXRWYXJpYWJsZXMuZmlsdGVyKChpdikgPT4gIShpdiBpbiB2YWx1ZXMpKTtcbiAgICAgICAgY29uc3QgbmV3UGFydGlhbFZhcmlhYmxlcyA9IHtcbiAgICAgICAgICAgIC4uLih0aGlzLnBhcnRpYWxWYXJpYWJsZXMgPz8ge30pLFxuICAgICAgICAgICAgLi4udmFsdWVzLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBwcm9tcHREaWN0ID0ge1xuICAgICAgICAgICAgLi4udGhpcyxcbiAgICAgICAgICAgIGlucHV0VmFyaWFibGVzOiBuZXdJbnB1dFZhcmlhYmxlcyxcbiAgICAgICAgICAgIHBhcnRpYWxWYXJpYWJsZXM6IG5ld1BhcnRpYWxWYXJpYWJsZXMsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgUHJvbXB0VGVtcGxhdGUocHJvbXB0RGljdCk7XG4gICAgfVxuICAgIHNlcmlhbGl6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMub3V0cHV0UGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzZXJpYWxpemUgYSBwcm9tcHQgdGVtcGxhdGUgd2l0aCBhbiBvdXRwdXQgcGFyc2VyXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBfdHlwZTogdGhpcy5fZ2V0UHJvbXB0VHlwZSgpLFxuICAgICAgICAgICAgaW5wdXRfdmFyaWFibGVzOiB0aGlzLmlucHV0VmFyaWFibGVzLFxuICAgICAgICAgICAgdGVtcGxhdGU6IHRoaXMudGVtcGxhdGUsXG4gICAgICAgICAgICB0ZW1wbGF0ZV9mb3JtYXQ6IHRoaXMudGVtcGxhdGVGb3JtYXQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXRpYyBhc3luYyBkZXNlcmlhbGl6ZShkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YS50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUHJvbXB0IHRlbXBsYXRlIG11c3QgaGF2ZSBhIHRlbXBsYXRlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcyA9IG5ldyBQcm9tcHRUZW1wbGF0ZSh7XG4gICAgICAgICAgICBpbnB1dFZhcmlhYmxlczogZGF0YS5pbnB1dF92YXJpYWJsZXMsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogZGF0YS50ZW1wbGF0ZSxcbiAgICAgICAgICAgIHRlbXBsYXRlRm9ybWF0OiBkYXRhLnRlbXBsYXRlX2Zvcm1hdCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxufVxuIiwiLy8gRGVmYXVsdCBnZW5lcmljIFwiYW55XCIgdmFsdWVzIGFyZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4vLyBSZXBsYWNlIHdpdGggXCJzdHJpbmdcIiB3aGVuIHdlIGFyZSBjb21mb3J0YWJsZSB3aXRoIGEgYnJlYWtpbmcgY2hhbmdlLlxuaW1wb3J0IHsgQmFzZVByb21wdFZhbHVlLCBIdW1hbk1lc3NhZ2UsIH0gZnJvbSBcIi4uL3NjaGVtYS9pbmRleC5qc1wiO1xuaW1wb3J0IHsgU2VyaWFsaXphYmxlIH0gZnJvbSBcIi4uL2xvYWQvc2VyaWFsaXphYmxlLmpzXCI7XG5pbXBvcnQgeyBSdW5uYWJsZSB9IGZyb20gXCIuLi9zY2hlbWEvcnVubmFibGUvaW5kZXguanNcIjtcbi8qKlxuICogUmVwcmVzZW50cyBhIHByb21wdCB2YWx1ZSBhcyBhIHN0cmluZy4gSXQgZXh0ZW5kcyB0aGUgQmFzZVByb21wdFZhbHVlXG4gKiBjbGFzcyBhbmQgb3ZlcnJpZGVzIHRoZSB0b1N0cmluZyBhbmQgdG9DaGF0TWVzc2FnZXMgbWV0aG9kcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0cmluZ1Byb21wdFZhbHVlIGV4dGVuZHMgQmFzZVByb21wdFZhbHVlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJsY19uYW1lc3BhY2VcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IFtcImxhbmdjaGFpblwiLCBcInByb21wdHNcIiwgXCJiYXNlXCJdXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG4gICAgdG9DaGF0TWVzc2FnZXMoKSB7XG4gICAgICAgIHJldHVybiBbbmV3IEh1bWFuTWVzc2FnZSh0aGlzLnZhbHVlKV07XG4gICAgfVxufVxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBwcm9tcHQgdGVtcGxhdGVzLiBFeHBvc2VzIGEgZm9ybWF0IG1ldGhvZCB0aGF0IHJldHVybnMgYVxuICogc3RyaW5nIHByb21wdCBnaXZlbiBhIHNldCBvZiBpbnB1dCB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXNlUHJvbXB0VGVtcGxhdGUgZXh0ZW5kcyBSdW5uYWJsZSB7XG4gICAgZ2V0IGxjX2F0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXJ0aWFsVmFyaWFibGVzOiB1bmRlZmluZWQsIC8vIHB5dGhvbiBkb2Vzbid0IHN1cHBvcnQgdGhpcyB5ZXRcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoaW5wdXQpIHtcbiAgICAgICAgc3VwZXIoaW5wdXQpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJsY19zZXJpYWxpemFibGVcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImxjX25hbWVzcGFjZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogW1wibGFuZ2NoYWluXCIsIFwicHJvbXB0c1wiLCB0aGlzLl9nZXRQcm9tcHRUeXBlKCldXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJpbnB1dFZhcmlhYmxlc1wiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJvdXRwdXRQYXJzZXJcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwicGFydGlhbFZhcmlhYmxlc1wiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB7IGlucHV0VmFyaWFibGVzIH0gPSBpbnB1dDtcbiAgICAgICAgaWYgKGlucHV0VmFyaWFibGVzLmluY2x1ZGVzKFwic3RvcFwiKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGhhdmUgYW4gaW5wdXQgdmFyaWFibGUgbmFtZWQgJ3N0b3AnLCBhcyBpdCBpcyB1c2VkIGludGVybmFsbHksIHBsZWFzZSByZW5hbWUuXCIpO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5wdXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXJnZXMgcGFydGlhbCB2YXJpYWJsZXMgYW5kIHVzZXIgdmFyaWFibGVzLlxuICAgICAqIEBwYXJhbSB1c2VyVmFyaWFibGVzIFRoZSB1c2VyIHZhcmlhYmxlcyB0byBtZXJnZSB3aXRoIHRoZSBwYXJ0aWFsIHZhcmlhYmxlcy5cbiAgICAgKiBAcmV0dXJucyBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgbWVyZ2VkIHZhcmlhYmxlcy5cbiAgICAgKi9cbiAgICBhc3luYyBtZXJnZVBhcnRpYWxBbmRVc2VyVmFyaWFibGVzKHVzZXJWYXJpYWJsZXMpIHtcbiAgICAgICAgY29uc3QgcGFydGlhbFZhcmlhYmxlcyA9IHRoaXMucGFydGlhbFZhcmlhYmxlcyA/PyB7fTtcbiAgICAgICAgY29uc3QgcGFydGlhbFZhbHVlcyA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhwYXJ0aWFsVmFyaWFibGVzKSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIHBhcnRpYWxWYWx1ZXNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbFZhbHVlc1trZXldID0gYXdhaXQgdmFsdWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbGxLd2FyZ3MgPSB7XG4gICAgICAgICAgICAuLi5wYXJ0aWFsVmFsdWVzLFxuICAgICAgICAgICAgLi4udXNlclZhcmlhYmxlcyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGFsbEt3YXJncztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW52b2tlcyB0aGUgcHJvbXB0IHRlbXBsYXRlIHdpdGggdGhlIGdpdmVuIGlucHV0IGFuZCBvcHRpb25zLlxuICAgICAqIEBwYXJhbSBpbnB1dCBUaGUgaW5wdXQgdG8gaW52b2tlIHRoZSBwcm9tcHQgdGVtcGxhdGUgd2l0aC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25hbCBjb25maWd1cmF0aW9uIGZvciB0aGUgY2FsbGJhY2suXG4gICAgICogQHJldHVybnMgQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIG91dHB1dCBvZiB0aGUgcHJvbXB0IHRlbXBsYXRlLlxuICAgICAqL1xuICAgIGFzeW5jIGludm9rZShpbnB1dCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FsbFdpdGhDb25maWcoKGlucHV0KSA9PiB0aGlzLmZvcm1hdFByb21wdFZhbHVlKGlucHV0KSwgaW5wdXQsIHsgLi4ub3B0aW9ucywgcnVuVHlwZTogXCJwcm9tcHRcIiB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEganNvbi1saWtlIG9iamVjdCByZXByZXNlbnRpbmcgdGhpcyBwcm9tcHQgdGVtcGxhdGUuXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKi9cbiAgICBzZXJpYWxpemUoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZSAudG9KU09OKCkgaW5zdGVhZFwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKiBMb2FkIGEgcHJvbXB0IHRlbXBsYXRlIGZyb20gYSBqc29uLWxpa2Ugb2JqZWN0IGRlc2NyaWJpbmcgaXQuXG4gICAgICpcbiAgICAgKiBAcmVtYXJrc1xuICAgICAqIERlc2VyaWFsaXppbmcgbmVlZHMgdG8gYmUgYXN5bmMgYmVjYXVzZSB0ZW1wbGF0ZXMgKGUuZy4ge0BsaW5rIEZld1Nob3RQcm9tcHRUZW1wbGF0ZX0pIGNhblxuICAgICAqIHJlZmVyZW5jZSByZW1vdGUgcmVzb3VyY2VzIHRoYXQgd2UgcmVhZCBhc3luY2hyb25vdXNseSB3aXRoIGEgd2ViXG4gICAgICogcmVxdWVzdC5cbiAgICAgKi9cbiAgICBzdGF0aWMgYXN5bmMgZGVzZXJpYWxpemUoZGF0YSkge1xuICAgICAgICBzd2l0Y2ggKGRhdGEuX3R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJwcm9tcHRcIjoge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgUHJvbXB0VGVtcGxhdGUgfSA9IGF3YWl0IGltcG9ydChcIi4vcHJvbXB0LmpzXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9tcHRUZW1wbGF0ZS5kZXNlcmlhbGl6ZShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgdW5kZWZpbmVkOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBQcm9tcHRUZW1wbGF0ZSB9ID0gYXdhaXQgaW1wb3J0KFwiLi9wcm9tcHQuanNcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21wdFRlbXBsYXRlLmRlc2VyaWFsaXplKHsgLi4uZGF0YSwgX3R5cGU6IFwicHJvbXB0XCIgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwiZmV3X3Nob3RcIjoge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgRmV3U2hvdFByb21wdFRlbXBsYXRlIH0gPSBhd2FpdCBpbXBvcnQoXCIuL2Zld19zaG90LmpzXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBGZXdTaG90UHJvbXB0VGVtcGxhdGUuZGVzZXJpYWxpemUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwcm9tcHQgdHlwZSBpbiBjb25maWc6ICR7ZGF0YS5fdHlwZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogQmFzZSBjbGFzcyBmb3Igc3RyaW5nIHByb21wdCB0ZW1wbGF0ZXMuIEl0IGV4dGVuZHMgdGhlXG4gKiBCYXNlUHJvbXB0VGVtcGxhdGUgY2xhc3MgYW5kIG92ZXJyaWRlcyB0aGUgZm9ybWF0UHJvbXB0VmFsdWUgbWV0aG9kIHRvXG4gKiByZXR1cm4gYSBTdHJpbmdQcm9tcHRWYWx1ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEJhc2VTdHJpbmdQcm9tcHRUZW1wbGF0ZSBleHRlbmRzIEJhc2VQcm9tcHRUZW1wbGF0ZSB7XG4gICAgLyoqXG4gICAgICogRm9ybWF0cyB0aGUgcHJvbXB0IGdpdmVuIHRoZSBpbnB1dCB2YWx1ZXMgYW5kIHJldHVybnMgYSBmb3JtYXR0ZWRcbiAgICAgKiBwcm9tcHQgdmFsdWUuXG4gICAgICogQHBhcmFtIHZhbHVlcyBUaGUgaW5wdXQgdmFsdWVzIHRvIGZvcm1hdCB0aGUgcHJvbXB0LlxuICAgICAqIEByZXR1cm5zIEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgZm9ybWF0dGVkIHByb21wdCB2YWx1ZS5cbiAgICAgKi9cbiAgICBhc3luYyBmb3JtYXRQcm9tcHRWYWx1ZSh2YWx1ZXMpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkUHJvbXB0ID0gYXdhaXQgdGhpcy5mb3JtYXQodmFsdWVzKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTdHJpbmdQcm9tcHRWYWx1ZShmb3JtYXR0ZWRQcm9tcHQpO1xuICAgIH1cbn1cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgZXhhbXBsZSBzZWxlY3RvcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXNlRXhhbXBsZVNlbGVjdG9yIGV4dGVuZHMgU2VyaWFsaXphYmxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibGNfbmFtZXNwYWNlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBbXCJsYW5nY2hhaW5cIiwgXCJwcm9tcHRzXCIsIFwic2VsZWN0b3JzXCJdXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFNlcmlhbGl6YWJsZSB9IGZyb20gXCIuLi9sb2FkL3NlcmlhbGl6YWJsZS5qc1wiO1xuZXhwb3J0IGNvbnN0IFJVTl9LRVkgPSBcIl9fcnVuXCI7XG4vKipcbiAqIENodW5rIG9mIGEgc2luZ2xlIGdlbmVyYXRpb24uIFVzZWQgZm9yIHN0cmVhbWluZy5cbiAqL1xuZXhwb3J0IGNsYXNzIEdlbmVyYXRpb25DaHVuayB7XG4gICAgY29uc3RydWN0b3IoZmllbGRzKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInRleHRcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZ2VuZXJhdGlvbkluZm9cIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50ZXh0ID0gZmllbGRzLnRleHQ7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGlvbkluZm8gPSBmaWVsZHMuZ2VuZXJhdGlvbkluZm87XG4gICAgfVxuICAgIGNvbmNhdChjaHVuaykge1xuICAgICAgICByZXR1cm4gbmV3IEdlbmVyYXRpb25DaHVuayh7XG4gICAgICAgICAgICB0ZXh0OiB0aGlzLnRleHQgKyBjaHVuay50ZXh0LFxuICAgICAgICAgICAgZ2VuZXJhdGlvbkluZm86IHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmdlbmVyYXRpb25JbmZvLFxuICAgICAgICAgICAgICAgIC4uLmNodW5rLmdlbmVyYXRpb25JbmZvLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBhbGwgdHlwZXMgb2YgbWVzc2FnZXMgaW4gYSBjb252ZXJzYXRpb24uIEl0IGluY2x1ZGVzXG4gKiBwcm9wZXJ0aWVzIGxpa2UgYGNvbnRlbnRgLCBgbmFtZWAsIGFuZCBgYWRkaXRpb25hbF9rd2FyZ3NgLiBJdCBhbHNvXG4gKiBpbmNsdWRlcyBtZXRob2RzIGxpa2UgYHRvRGljdCgpYCBhbmQgYF9nZXRUeXBlKClgLlxuICovXG5leHBvcnQgY2xhc3MgQmFzZU1lc3NhZ2UgZXh0ZW5kcyBTZXJpYWxpemFibGUge1xuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICogVXNlIHtAbGluayBCYXNlTWVzc2FnZS5jb250ZW50fSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGdldCB0ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50O1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihmaWVsZHMsIFxuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIGt3YXJncykge1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgICBmaWVsZHMgPSB7IGNvbnRlbnQ6IGZpZWxkcywgYWRkaXRpb25hbF9rd2FyZ3M6IGt3YXJncyB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgZGVmYXVsdCB2YWx1ZSBmb3IgYWRkaXRpb25hbF9rd2FyZ3MgaXMgcGFzc2VkIGludG8gc3VwZXIoKSBmb3Igc2VyaWFsaXphdGlvblxuICAgICAgICBpZiAoIWZpZWxkcy5hZGRpdGlvbmFsX2t3YXJncykge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgICBmaWVsZHMuYWRkaXRpb25hbF9rd2FyZ3MgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlcihmaWVsZHMpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJsY19uYW1lc3BhY2VcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IFtcImxhbmdjaGFpblwiLCBcInNjaGVtYVwiXVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibGNfc2VyaWFsaXphYmxlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICAvKiogVGhlIHRleHQgb2YgdGhlIG1lc3NhZ2UuICovXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImNvbnRlbnRcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgLyoqIFRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlIHNlbmRlciBpbiBhIG11bHRpLXVzZXIgY2hhdC4gKi9cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibmFtZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICAvKiogQWRkaXRpb25hbCBrZXl3b3JkIGFyZ3VtZW50cyAqL1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJhZGRpdGlvbmFsX2t3YXJnc1wiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5hbWUgPSBmaWVsZHMubmFtZTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gZmllbGRzLmNvbnRlbnQ7XG4gICAgICAgIHRoaXMuYWRkaXRpb25hbF9rd2FyZ3MgPSBmaWVsZHMuYWRkaXRpb25hbF9rd2FyZ3M7XG4gICAgfVxuICAgIHRvRGljdCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IHRoaXMuX2dldFR5cGUoKSxcbiAgICAgICAgICAgIGRhdGE6IHRoaXMudG9KU09OKClcbiAgICAgICAgICAgICAgICAua3dhcmdzLFxuICAgICAgICB9O1xuICAgIH1cbn1cbi8qKlxuICogUmVwcmVzZW50cyBhIGNodW5rIG9mIGEgbWVzc2FnZSwgd2hpY2ggY2FuIGJlIGNvbmNhdGVuYXRlZCB3aXRoIG90aGVyXG4gKiBtZXNzYWdlIGNodW5rcy4gSXQgaW5jbHVkZXMgYSBtZXRob2QgYF9tZXJnZV9rd2FyZ3NfZGljdCgpYCBmb3IgbWVyZ2luZ1xuICogYWRkaXRpb25hbCBrZXl3b3JkIGFyZ3VtZW50cyBmcm9tIGFub3RoZXIgYEJhc2VNZXNzYWdlQ2h1bmtgIGludG8gdGhpc1xuICogb25lLiBJdCBhbHNvIG92ZXJyaWRlcyB0aGUgYF9fYWRkX18oKWAgbWV0aG9kIHRvIHN1cHBvcnQgY29uY2F0ZW5hdGlvblxuICogb2YgYEJhc2VNZXNzYWdlQ2h1bmtgIGluc3RhbmNlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEJhc2VNZXNzYWdlQ2h1bmsgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgc3RhdGljIF9tZXJnZUFkZGl0aW9uYWxLd2FyZ3MobGVmdCwgcmlnaHQpIHtcbiAgICAgICAgY29uc3QgbWVyZ2VkID0geyAuLi5sZWZ0IH07XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHJpZ2h0KSkge1xuICAgICAgICAgICAgaWYgKG1lcmdlZFtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG1lcmdlZFtrZXldICE9PSB0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGFkZGl0aW9uYWxfa3dhcmdzWyR7a2V5fV0gYWxyZWFkeSBleGlzdHMgaW4gdGhlIG1lc3NhZ2UgY2h1bmssIGJ1dCB3aXRoIGEgZGlmZmVyZW50IHR5cGUuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgbWVyZ2VkW2tleV0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRba2V5XSA9IG1lcmdlZFtrZXldICsgdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghQXJyYXkuaXNBcnJheShtZXJnZWRba2V5XSkgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgbWVyZ2VkW2tleV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRba2V5XSA9IHRoaXMuX21lcmdlQWRkaXRpb25hbEt3YXJncyhtZXJnZWRba2V5XSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBhZGRpdGlvbmFsX2t3YXJnc1ske2tleX1dIGFscmVhZHkgZXhpc3RzIGluIHRoaXMgbWVzc2FnZSBjaHVuay5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVyZ2VkO1xuICAgIH1cbn1cbi8qKlxuICogUmVwcmVzZW50cyBhIGh1bWFuIG1lc3NhZ2UgaW4gYSBjb252ZXJzYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBIdW1hbk1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgc3RhdGljIGxjX25hbWUoKSB7XG4gICAgICAgIHJldHVybiBcIkh1bWFuTWVzc2FnZVwiO1xuICAgIH1cbiAgICBfZ2V0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIFwiaHVtYW5cIjtcbiAgICB9XG59XG4vKipcbiAqIFJlcHJlc2VudHMgYSBjaHVuayBvZiBhIGh1bWFuIG1lc3NhZ2UsIHdoaWNoIGNhbiBiZSBjb25jYXRlbmF0ZWQgd2l0aFxuICogb3RoZXIgaHVtYW4gbWVzc2FnZSBjaHVua3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBIdW1hbk1lc3NhZ2VDaHVuayBleHRlbmRzIEJhc2VNZXNzYWdlQ2h1bmsge1xuICAgIHN0YXRpYyBsY19uYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJIdW1hbk1lc3NhZ2VDaHVua1wiO1xuICAgIH1cbiAgICBfZ2V0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIFwiaHVtYW5cIjtcbiAgICB9XG4gICAgY29uY2F0KGNodW5rKSB7XG4gICAgICAgIHJldHVybiBuZXcgSHVtYW5NZXNzYWdlQ2h1bmsoe1xuICAgICAgICAgICAgY29udGVudDogdGhpcy5jb250ZW50ICsgY2h1bmsuY29udGVudCxcbiAgICAgICAgICAgIGFkZGl0aW9uYWxfa3dhcmdzOiBIdW1hbk1lc3NhZ2VDaHVuay5fbWVyZ2VBZGRpdGlvbmFsS3dhcmdzKHRoaXMuYWRkaXRpb25hbF9rd2FyZ3MsIGNodW5rLmFkZGl0aW9uYWxfa3dhcmdzKSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEFJIG1lc3NhZ2UgaW4gYSBjb252ZXJzYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBBSU1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgc3RhdGljIGxjX25hbWUoKSB7XG4gICAgICAgIHJldHVybiBcIkFJTWVzc2FnZVwiO1xuICAgIH1cbiAgICBfZ2V0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIFwiYWlcIjtcbiAgICB9XG59XG4vKipcbiAqIFJlcHJlc2VudHMgYSBjaHVuayBvZiBhbiBBSSBtZXNzYWdlLCB3aGljaCBjYW4gYmUgY29uY2F0ZW5hdGVkIHdpdGhcbiAqIG90aGVyIEFJIG1lc3NhZ2UgY2h1bmtzLlxuICovXG5leHBvcnQgY2xhc3MgQUlNZXNzYWdlQ2h1bmsgZXh0ZW5kcyBCYXNlTWVzc2FnZUNodW5rIHtcbiAgICBzdGF0aWMgbGNfbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwiQUlNZXNzYWdlQ2h1bmtcIjtcbiAgICB9XG4gICAgX2dldFR5cGUoKSB7XG4gICAgICAgIHJldHVybiBcImFpXCI7XG4gICAgfVxuICAgIGNvbmNhdChjaHVuaykge1xuICAgICAgICByZXR1cm4gbmV3IEFJTWVzc2FnZUNodW5rKHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMuY29udGVudCArIGNodW5rLmNvbnRlbnQsXG4gICAgICAgICAgICBhZGRpdGlvbmFsX2t3YXJnczogQUlNZXNzYWdlQ2h1bmsuX21lcmdlQWRkaXRpb25hbEt3YXJncyh0aGlzLmFkZGl0aW9uYWxfa3dhcmdzLCBjaHVuay5hZGRpdGlvbmFsX2t3YXJncyksXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogUmVwcmVzZW50cyBhIHN5c3RlbSBtZXNzYWdlIGluIGEgY29udmVyc2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgU3lzdGVtTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBzdGF0aWMgbGNfbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwiU3lzdGVtTWVzc2FnZVwiO1xuICAgIH1cbiAgICBfZ2V0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIFwic3lzdGVtXCI7XG4gICAgfVxufVxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY2h1bmsgb2YgYSBzeXN0ZW0gbWVzc2FnZSwgd2hpY2ggY2FuIGJlIGNvbmNhdGVuYXRlZCB3aXRoXG4gKiBvdGhlciBzeXN0ZW0gbWVzc2FnZSBjaHVua3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBTeXN0ZW1NZXNzYWdlQ2h1bmsgZXh0ZW5kcyBCYXNlTWVzc2FnZUNodW5rIHtcbiAgICBzdGF0aWMgbGNfbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwiU3lzdGVtTWVzc2FnZUNodW5rXCI7XG4gICAgfVxuICAgIF9nZXRUeXBlKCkge1xuICAgICAgICByZXR1cm4gXCJzeXN0ZW1cIjtcbiAgICB9XG4gICAgY29uY2F0KGNodW5rKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3lzdGVtTWVzc2FnZUNodW5rKHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMuY29udGVudCArIGNodW5rLmNvbnRlbnQsXG4gICAgICAgICAgICBhZGRpdGlvbmFsX2t3YXJnczogU3lzdGVtTWVzc2FnZUNodW5rLl9tZXJnZUFkZGl0aW9uYWxLd2FyZ3ModGhpcy5hZGRpdGlvbmFsX2t3YXJncywgY2h1bmsuYWRkaXRpb25hbF9rd2FyZ3MpLFxuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKiBVc2Uge0BsaW5rIEJhc2VNZXNzYWdlfSBpbnN0ZWFkLlxuICovXG5leHBvcnQgY29uc3QgQmFzZUNoYXRNZXNzYWdlID0gQmFzZU1lc3NhZ2U7XG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKiBVc2Uge0BsaW5rIEh1bWFuTWVzc2FnZX0gaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGNvbnN0IEh1bWFuQ2hhdE1lc3NhZ2UgPSBIdW1hbk1lc3NhZ2U7XG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKiBVc2Uge0BsaW5rIEFJTWVzc2FnZX0gaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGNvbnN0IEFJQ2hhdE1lc3NhZ2UgPSBBSU1lc3NhZ2U7XG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKiBVc2Uge0BsaW5rIFN5c3RlbU1lc3NhZ2V9IGluc3RlYWQuXG4gKi9cbmV4cG9ydCBjb25zdCBTeXN0ZW1DaGF0TWVzc2FnZSA9IFN5c3RlbU1lc3NhZ2U7XG4vKipcbiAqIFJlcHJlc2VudHMgYSBmdW5jdGlvbiBtZXNzYWdlIGluIGEgY29udmVyc2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgRnVuY3Rpb25NZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIHN0YXRpYyBsY19uYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJGdW5jdGlvbk1lc3NhZ2VcIjtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoZmllbGRzLCBcbiAgICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgICBuYW1lKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZmllbGRzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ24sIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgIGZpZWxkcyA9IHsgY29udGVudDogZmllbGRzLCBuYW1lOiBuYW1lIH07XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIoZmllbGRzKTtcbiAgICB9XG4gICAgX2dldFR5cGUoKSB7XG4gICAgICAgIHJldHVybiBcImZ1bmN0aW9uXCI7XG4gICAgfVxufVxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY2h1bmsgb2YgYSBmdW5jdGlvbiBtZXNzYWdlLCB3aGljaCBjYW4gYmUgY29uY2F0ZW5hdGVkXG4gKiB3aXRoIG90aGVyIGZ1bmN0aW9uIG1lc3NhZ2UgY2h1bmtzLlxuICovXG5leHBvcnQgY2xhc3MgRnVuY3Rpb25NZXNzYWdlQ2h1bmsgZXh0ZW5kcyBCYXNlTWVzc2FnZUNodW5rIHtcbiAgICBzdGF0aWMgbGNfbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwiRnVuY3Rpb25NZXNzYWdlQ2h1bmtcIjtcbiAgICB9XG4gICAgX2dldFR5cGUoKSB7XG4gICAgICAgIHJldHVybiBcImZ1bmN0aW9uXCI7XG4gICAgfVxuICAgIGNvbmNhdChjaHVuaykge1xuICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uTWVzc2FnZUNodW5rKHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMuY29udGVudCArIGNodW5rLmNvbnRlbnQsXG4gICAgICAgICAgICBhZGRpdGlvbmFsX2t3YXJnczogRnVuY3Rpb25NZXNzYWdlQ2h1bmsuX21lcmdlQWRkaXRpb25hbEt3YXJncyh0aGlzLmFkZGl0aW9uYWxfa3dhcmdzLCBjaHVuay5hZGRpdGlvbmFsX2t3YXJncyksXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUgPz8gXCJcIixcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY2hhdCBtZXNzYWdlIGluIGEgY29udmVyc2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgQ2hhdE1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgc3RhdGljIGxjX25hbWUoKSB7XG4gICAgICAgIHJldHVybiBcIkNoYXRNZXNzYWdlXCI7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGZpZWxkcywgcm9sZSkge1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICBmaWVsZHMgPSB7IGNvbnRlbnQ6IGZpZWxkcywgcm9sZTogcm9sZSB9O1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInJvbGVcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yb2xlID0gZmllbGRzLnJvbGU7XG4gICAgfVxuICAgIF9nZXRUeXBlKCkge1xuICAgICAgICByZXR1cm4gXCJnZW5lcmljXCI7XG4gICAgfVxuICAgIHN0YXRpYyBpc0luc3RhbmNlKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuX2dldFR5cGUoKSA9PT0gXCJnZW5lcmljXCI7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFzZU1lc3NhZ2UobWVzc2FnZUxpa2UpIHtcbiAgICByZXR1cm4gdHlwZW9mIG1lc3NhZ2VMaWtlLl9nZXRUeXBlID09PSBcImZ1bmN0aW9uXCI7XG59XG5leHBvcnQgZnVuY3Rpb24gY29lcmNlTWVzc2FnZUxpa2VUb01lc3NhZ2UobWVzc2FnZUxpa2UpIHtcbiAgICBpZiAodHlwZW9mIG1lc3NhZ2VMaWtlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBuZXcgSHVtYW5NZXNzYWdlKG1lc3NhZ2VMaWtlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNCYXNlTWVzc2FnZShtZXNzYWdlTGlrZSkpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VMaWtlO1xuICAgIH1cbiAgICBjb25zdCBbdHlwZSwgY29udGVudF0gPSBtZXNzYWdlTGlrZTtcbiAgICBpZiAodHlwZSA9PT0gXCJodW1hblwiIHx8IHR5cGUgPT09IFwidXNlclwiKSB7XG4gICAgICAgIHJldHVybiBuZXcgSHVtYW5NZXNzYWdlKHsgY29udGVudCB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gXCJhaVwiIHx8IHR5cGUgPT09IFwiYXNzaXN0YW50XCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBSU1lc3NhZ2UoeyBjb250ZW50IH0pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSBcInN5c3RlbVwiKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3lzdGVtTWVzc2FnZSh7IGNvbnRlbnQgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBjb2VyY2UgbWVzc2FnZSBmcm9tIGFycmF5OiBvbmx5IGh1bWFuLCBBSSwgb3Igc3lzdGVtIG1lc3NhZ2UgY29lcmNpb24gaXMgY3VycmVudGx5IHN1cHBvcnRlZC5gKTtcbiAgICB9XG59XG4vKipcbiAqIFJlcHJlc2VudHMgYSBjaHVuayBvZiBhIGNoYXQgbWVzc2FnZSwgd2hpY2ggY2FuIGJlIGNvbmNhdGVuYXRlZCB3aXRoXG4gKiBvdGhlciBjaGF0IG1lc3NhZ2UgY2h1bmtzLlxuICovXG5leHBvcnQgY2xhc3MgQ2hhdE1lc3NhZ2VDaHVuayBleHRlbmRzIEJhc2VNZXNzYWdlQ2h1bmsge1xuICAgIHN0YXRpYyBsY19uYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJDaGF0TWVzc2FnZUNodW5rXCI7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGZpZWxkcywgcm9sZSkge1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICBmaWVsZHMgPSB7IGNvbnRlbnQ6IGZpZWxkcywgcm9sZTogcm9sZSB9O1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInJvbGVcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yb2xlID0gZmllbGRzLnJvbGU7XG4gICAgfVxuICAgIF9nZXRUeXBlKCkge1xuICAgICAgICByZXR1cm4gXCJnZW5lcmljXCI7XG4gICAgfVxuICAgIGNvbmNhdChjaHVuaykge1xuICAgICAgICByZXR1cm4gbmV3IENoYXRNZXNzYWdlQ2h1bmsoe1xuICAgICAgICAgICAgY29udGVudDogdGhpcy5jb250ZW50ICsgY2h1bmsuY29udGVudCxcbiAgICAgICAgICAgIGFkZGl0aW9uYWxfa3dhcmdzOiBDaGF0TWVzc2FnZUNodW5rLl9tZXJnZUFkZGl0aW9uYWxLd2FyZ3ModGhpcy5hZGRpdGlvbmFsX2t3YXJncywgY2h1bmsuYWRkaXRpb25hbF9rd2FyZ3MpLFxuICAgICAgICAgICAgcm9sZTogdGhpcy5yb2xlLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQ2hhdEdlbmVyYXRpb25DaHVuayBleHRlbmRzIEdlbmVyYXRpb25DaHVuayB7XG4gICAgY29uc3RydWN0b3IoZmllbGRzKSB7XG4gICAgICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm1lc3NhZ2VcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZmllbGRzLm1lc3NhZ2U7XG4gICAgfVxuICAgIGNvbmNhdChjaHVuaykge1xuICAgICAgICByZXR1cm4gbmV3IENoYXRHZW5lcmF0aW9uQ2h1bmsoe1xuICAgICAgICAgICAgdGV4dDogdGhpcy50ZXh0ICsgY2h1bmsudGV4dCxcbiAgICAgICAgICAgIGdlbmVyYXRpb25JbmZvOiB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5nZW5lcmF0aW9uSW5mbyxcbiAgICAgICAgICAgICAgICAuLi5jaHVuay5nZW5lcmF0aW9uSW5mbyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UuY29uY2F0KGNodW5rLm1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIEJhc2UgUHJvbXB0VmFsdWUgY2xhc3MuIEFsbCBwcm9tcHQgdmFsdWVzIHNob3VsZCBleHRlbmQgdGhpcyBjbGFzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEJhc2VQcm9tcHRWYWx1ZSBleHRlbmRzIFNlcmlhbGl6YWJsZSB7XG59XG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGFsbCBjaGF0IG1lc3NhZ2UgaGlzdG9yaWVzLiBBbGwgY2hhdCBtZXNzYWdlIGhpc3Rvcmllc1xuICogc2hvdWxkIGV4dGVuZCB0aGlzIGNsYXNzLlxuICovXG5leHBvcnQgY2xhc3MgQmFzZUNoYXRNZXNzYWdlSGlzdG9yeSBleHRlbmRzIFNlcmlhbGl6YWJsZSB7XG59XG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGFsbCBsaXN0IGNoYXQgbWVzc2FnZSBoaXN0b3JpZXMuIEFsbCBsaXN0IGNoYXQgbWVzc2FnZVxuICogaGlzdG9yaWVzIHNob3VsZCBleHRlbmQgdGhpcyBjbGFzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEJhc2VMaXN0Q2hhdE1lc3NhZ2VIaXN0b3J5IGV4dGVuZHMgU2VyaWFsaXphYmxlIHtcbiAgICBhZGRVc2VyTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZE1lc3NhZ2UobmV3IEh1bWFuTWVzc2FnZShtZXNzYWdlKSk7XG4gICAgfVxuICAgIGFkZEFJQ2hhdE1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRNZXNzYWdlKG5ldyBBSU1lc3NhZ2UobWVzc2FnZSkpO1xuICAgIH1cbn1cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgYWxsIGNhY2hlcy4gQWxsIGNhY2hlcyBzaG91bGQgZXh0ZW5kIHRoaXMgY2xhc3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXNlQ2FjaGUge1xufVxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBhbGwgZmlsZSBzdG9yZXMuIEFsbCBmaWxlIHN0b3JlcyBzaG91bGQgZXh0ZW5kIHRoaXNcbiAqIGNsYXNzLlxuICovXG5leHBvcnQgY2xhc3MgQmFzZUZpbGVTdG9yZSBleHRlbmRzIFNlcmlhbGl6YWJsZSB7XG59XG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGFsbCBlbnRpdHkgc3RvcmVzLiBBbGwgZW50aXR5IHN0b3JlcyBzaG91bGQgZXh0ZW5kIHRoaXNcbiAqIGNsYXNzLlxuICovXG5leHBvcnQgY2xhc3MgQmFzZUVudGl0eVN0b3JlIGV4dGVuZHMgU2VyaWFsaXphYmxlIHtcbn1cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgZm9yIGEgZG9jdW1lbnQgc3RvcmUuIEFsbCBkb2N1bWVudCBzdG9yZXMgc2hvdWxkIGV4dGVuZFxuICogdGhpcyBjbGFzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIERvY3N0b3JlIHtcbn1cbiIsImltcG9ydCB7IGtleVRvSnNvbiwgbWFwS2V5cyB9IGZyb20gXCIuL21hcF9rZXlzLmpzXCI7XG5mdW5jdGlvbiBzaGFsbG93Q29weShvYmopIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopID8gWy4uLm9ial0gOiB7IC4uLm9iaiB9O1xufVxuZnVuY3Rpb24gcmVwbGFjZVNlY3JldHMocm9vdCwgc2VjcmV0c01hcCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHNoYWxsb3dDb3B5KHJvb3QpO1xuICAgIGZvciAoY29uc3QgW3BhdGgsIHNlY3JldElkXSBvZiBPYmplY3QuZW50cmllcyhzZWNyZXRzTWFwKSkge1xuICAgICAgICBjb25zdCBbbGFzdCwgLi4ucGFydHNSZXZlcnNlXSA9IHBhdGguc3BsaXQoXCIuXCIpLnJldmVyc2UoKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgbGV0IGN1cnJlbnQgPSByZXN1bHQ7XG4gICAgICAgIGZvciAoY29uc3QgcGFydCBvZiBwYXJ0c1JldmVyc2UucmV2ZXJzZSgpKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFtwYXJ0XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50W3BhcnRdID0gc2hhbGxvd0NvcHkoY3VycmVudFtwYXJ0XSk7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwYXJ0XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudFtsYXN0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjdXJyZW50W2xhc3RdID0ge1xuICAgICAgICAgICAgICAgIGxjOiAxLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwic2VjcmV0XCIsXG4gICAgICAgICAgICAgICAgaWQ6IFtzZWNyZXRJZF0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEdldCBhIHVuaXF1ZSBuYW1lIGZvciB0aGUgbW9kdWxlLCByYXRoZXIgdGhhbiBwYXJlbnQgY2xhc3MgaW1wbGVtZW50YXRpb25zLlxuICogU2hvdWxkIG5vdCBiZSBzdWJjbGFzc2VkLCBzdWJjbGFzcyBsY19uYW1lIGFib3ZlIGluc3RlYWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRfbGNfdW5pcXVlX25hbWUoXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVzZS1iZWZvcmUtZGVmaW5lXG5zZXJpYWxpemFibGVDbGFzcykge1xuICAgIC8vIFwic3VwZXJcIiBoZXJlIHdvdWxkIHJlZmVyIHRvIHRoZSBwYXJlbnQgY2xhc3Mgb2YgU2VyaWFsaXphYmxlLFxuICAgIC8vIHdoZW4gd2Ugd2FudCB0aGUgcGFyZW50IGNsYXNzIG9mIHRoZSBtb2R1bGUgYWN0dWFsbHkgY2FsbGluZyB0aGlzIG1ldGhvZC5cbiAgICBjb25zdCBwYXJlbnRDbGFzcyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzZXJpYWxpemFibGVDbGFzcyk7XG4gICAgY29uc3QgbGNOYW1lSXNTdWJjbGFzc2VkID0gdHlwZW9mIHNlcmlhbGl6YWJsZUNsYXNzLmxjX25hbWUgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAodHlwZW9mIHBhcmVudENsYXNzLmxjX25hbWUgIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlQ2xhc3MubGNfbmFtZSgpICE9PSBwYXJlbnRDbGFzcy5sY19uYW1lKCkpO1xuICAgIGlmIChsY05hbWVJc1N1YmNsYXNzZWQpIHtcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6YWJsZUNsYXNzLmxjX25hbWUoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzZXJpYWxpemFibGVDbGFzcy5uYW1lO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBTZXJpYWxpemFibGUge1xuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBzZXJpYWxpemFibGUuIE92ZXJyaWRlIHRvIHByb3ZpZGUgYW4gYWxpYXMgb3JcbiAgICAgKiB0byBwcmVzZXJ2ZSB0aGUgc2VyaWFsaXplZCBtb2R1bGUgbmFtZSBpbiBtaW5pZmllZCBlbnZpcm9ubWVudHMuXG4gICAgICpcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBhIHN0YXRpYyBtZXRob2QgdG8gc3VwcG9ydCBsb2FkaW5nIGxvZ2ljLlxuICAgICAqL1xuICAgIHN0YXRpYyBsY19uYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZmluYWwgc2VyaWFsaXplZCBpZGVudGlmaWVyIGZvciB0aGUgbW9kdWxlLlxuICAgICAqL1xuICAgIGdldCBsY19pZCgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIC4uLnRoaXMubGNfbmFtZXNwYWNlLFxuICAgICAgICAgICAgZ2V0X2xjX3VuaXF1ZV9uYW1lKHRoaXMuY29uc3RydWN0b3IpLFxuICAgICAgICBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIG1hcCBvZiBzZWNyZXRzLCB3aGljaCB3aWxsIGJlIG9taXR0ZWQgZnJvbSBzZXJpYWxpemF0aW9uLlxuICAgICAqIEtleXMgYXJlIHBhdGhzIHRvIHRoZSBzZWNyZXQgaW4gY29uc3RydWN0b3IgYXJncywgZS5nLiBcImZvby5iYXIuYmF6XCIuXG4gICAgICogVmFsdWVzIGFyZSB0aGUgc2VjcmV0IGlkcywgd2hpY2ggd2lsbCBiZSB1c2VkIHdoZW4gZGVzZXJpYWxpemluZy5cbiAgICAgKi9cbiAgICBnZXQgbGNfc2VjcmV0cygpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBtYXAgb2YgYWRkaXRpb25hbCBhdHRyaWJ1dGVzIHRvIG1lcmdlIHdpdGggY29uc3RydWN0b3IgYXJncy5cbiAgICAgKiBLZXlzIGFyZSB0aGUgYXR0cmlidXRlIG5hbWVzLCBlLmcuIFwiZm9vXCIuXG4gICAgICogVmFsdWVzIGFyZSB0aGUgYXR0cmlidXRlIHZhbHVlcywgd2hpY2ggd2lsbCBiZSBzZXJpYWxpemVkLlxuICAgICAqIFRoZXNlIGF0dHJpYnV0ZXMgbmVlZCB0byBiZSBhY2NlcHRlZCBieSB0aGUgY29uc3RydWN0b3IgYXMgYXJndW1lbnRzLlxuICAgICAqL1xuICAgIGdldCBsY19hdHRyaWJ1dGVzKCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIG1hcCBvZiBhbGlhc2VzIGZvciBjb25zdHJ1Y3RvciBhcmdzLlxuICAgICAqIEtleXMgYXJlIHRoZSBhdHRyaWJ1dGUgbmFtZXMsIGUuZy4gXCJmb29cIi5cbiAgICAgKiBWYWx1ZXMgYXJlIHRoZSBhbGlhcyB0aGF0IHdpbGwgcmVwbGFjZSB0aGUga2V5IGluIHNlcmlhbGl6YXRpb24uXG4gICAgICogVGhpcyBpcyB1c2VkIHRvIGVnLiBtYWtlIGFyZ3VtZW50IG5hbWVzIG1hdGNoIFB5dGhvbi5cbiAgICAgKi9cbiAgICBnZXQgbGNfYWxpYXNlcygpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3RydWN0b3Ioa3dhcmdzLCAuLi5fYXJncykge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJsY19zZXJpYWxpemFibGVcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJsY19rd2FyZ3NcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5sY19rd2FyZ3MgPSBrd2FyZ3MgfHwge307XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxjX3NlcmlhbGl6YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9KU09OTm90SW1wbGVtZW50ZWQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1pbnN0YW5jZW9mL25vLWluc3RhbmNlb2ZcbiAgICAgICAgdGhpcy5sY19rd2FyZ3MgaW5zdGFuY2VvZiBTZXJpYWxpemFibGUgfHxcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmxjX2t3YXJncyAhPT0gXCJvYmplY3RcIiB8fFxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheSh0aGlzLmxjX2t3YXJncykpIHtcbiAgICAgICAgICAgIC8vIFdlIGRvIG5vdCBzdXBwb3J0IHNlcmlhbGl6YXRpb24gb2YgY2xhc3NlcyB3aXRoIGFyZyBub3QgYSBQT0pPXG4gICAgICAgICAgICAvLyBJJ20gYXdhcmUgdGhlIGNoZWNrIGFib3ZlIGlzbid0IGFzIHN0cmljdCBhcyBpdCBjb3VsZCBiZVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9KU09OTm90SW1wbGVtZW50ZWQoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbGlhc2VzID0ge307XG4gICAgICAgIGNvbnN0IHNlY3JldHMgPSB7fTtcbiAgICAgICAgY29uc3Qga3dhcmdzID0gT2JqZWN0LmtleXModGhpcy5sY19rd2FyZ3MpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGFjY1trZXldID0ga2V5IGluIHRoaXMgPyB0aGlzW2tleV0gOiB0aGlzLmxjX2t3YXJnc1trZXldO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgICAgICAvLyBnZXQgc2VjcmV0cywgYXR0cmlidXRlcyBhbmQgYWxpYXNlcyBmcm9tIGFsbCBzdXBlcmNsYXNzZXNcbiAgICAgICAgZm9yIChcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXG4gICAgICAgIGxldCBjdXJyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpOyBjdXJyZW50OyBjdXJyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGN1cnJlbnQpKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGFsaWFzZXMsIFJlZmxlY3QuZ2V0KGN1cnJlbnQsIFwibGNfYWxpYXNlc1wiLCB0aGlzKSk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHNlY3JldHMsIFJlZmxlY3QuZ2V0KGN1cnJlbnQsIFwibGNfc2VjcmV0c1wiLCB0aGlzKSk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGt3YXJncywgUmVmbGVjdC5nZXQoY3VycmVudCwgXCJsY19hdHRyaWJ1dGVzXCIsIHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpbmNsdWRlIGFsbCBzZWNyZXRzIHVzZWQsIGV2ZW4gaWYgbm90IGluIGt3YXJncyxcbiAgICAgICAgLy8gd2lsbCBiZSByZXBsYWNlZCB3aXRoIHNlbnRpbmVsIHZhbHVlIGluIHJlcGxhY2VTZWNyZXRzXG4gICAgICAgIE9iamVjdC5rZXlzKHNlY3JldHMpLmZvckVhY2goKGtleVBhdGgpID0+IHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcywgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgbGV0IHJlYWQgPSB0aGlzO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIGxldCB3cml0ZSA9IGt3YXJncztcbiAgICAgICAgICAgIGNvbnN0IFtsYXN0LCAuLi5wYXJ0c1JldmVyc2VdID0ga2V5UGF0aC5zcGxpdChcIi5cIikucmV2ZXJzZSgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgcGFydHNSZXZlcnNlLnJldmVyc2UoKSkge1xuICAgICAgICAgICAgICAgIGlmICghKGtleSBpbiByZWFkKSB8fCByZWFkW2tleV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmICghKGtleSBpbiB3cml0ZSkgfHwgd3JpdGVba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVhZFtrZXldID09PSBcIm9iamVjdFwiICYmIHJlYWRba2V5XSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZVtrZXldID0ge307XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZWFkW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZVtrZXldID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVhZCA9IHJlYWRba2V5XTtcbiAgICAgICAgICAgICAgICB3cml0ZSA9IHdyaXRlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGFzdCBpbiByZWFkICYmIHJlYWRbbGFzdF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHdyaXRlW2xhc3RdID0gd3JpdGVbbGFzdF0gfHwgcmVhZFtsYXN0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsYzogMSxcbiAgICAgICAgICAgIHR5cGU6IFwiY29uc3RydWN0b3JcIixcbiAgICAgICAgICAgIGlkOiB0aGlzLmxjX2lkLFxuICAgICAgICAgICAga3dhcmdzOiBtYXBLZXlzKE9iamVjdC5rZXlzKHNlY3JldHMpLmxlbmd0aCA/IHJlcGxhY2VTZWNyZXRzKGt3YXJncywgc2VjcmV0cykgOiBrd2FyZ3MsIGtleVRvSnNvbiwgYWxpYXNlcyksXG4gICAgICAgIH07XG4gICAgfVxuICAgIHRvSlNPTk5vdEltcGxlbWVudGVkKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGM6IDEsXG4gICAgICAgICAgICB0eXBlOiBcIm5vdF9pbXBsZW1lbnRlZFwiLFxuICAgICAgICAgICAgaWQ6IHRoaXMubGNfaWQsXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiaW1wb3J0IHNuYWtlQ2FzZSBmcm9tIFwiZGVjYW1lbGl6ZVwiO1xuaW1wb3J0IGNhbWVsQ2FzZSBmcm9tIFwiY2FtZWxjYXNlXCI7XG5leHBvcnQgZnVuY3Rpb24ga2V5VG9Kc29uKGtleSwgbWFwKSB7XG4gICAgcmV0dXJuIG1hcD8uW2tleV0gfHwgc25ha2VDYXNlKGtleSk7XG59XG5leHBvcnQgZnVuY3Rpb24ga2V5RnJvbUpzb24oa2V5LCBtYXApIHtcbiAgICByZXR1cm4gbWFwPy5ba2V5XSB8fCBjYW1lbENhc2Uoa2V5KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBtYXBLZXlzKGZpZWxkcywgbWFwcGVyLCBtYXApIHtcbiAgICBjb25zdCBtYXBwZWQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBmaWVsZHMpIHtcbiAgICAgICAgaWYgKE9iamVjdC5oYXNPd24oZmllbGRzLCBrZXkpKSB7XG4gICAgICAgICAgICBtYXBwZWRbbWFwcGVyKGtleSwgbWFwKV0gPSBmaWVsZHNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFwcGVkO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyLCBzZXApIHtcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcblx0fVxuXG5cdHNlcCA9IHR5cGVvZiBzZXAgPT09ICd1bmRlZmluZWQnID8gJ18nIDogc2VwO1xuXG5cdHJldHVybiBzdHJcblx0XHQucmVwbGFjZSgvKFthLXpcXGRdKShbQS1aXSkvZywgJyQxJyArIHNlcCArICckMicpXG5cdFx0LnJlcGxhY2UoLyhbQS1aXSspKFtBLVpdW2EtelxcZF0rKS9nLCAnJDEnICsgc2VwICsgJyQyJylcblx0XHQudG9Mb3dlckNhc2UoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFVQUEVSQ0FTRSA9IC9bXFxwe0x1fV0vdTtcbmNvbnN0IExPV0VSQ0FTRSA9IC9bXFxwe0xsfV0vdTtcbmNvbnN0IExFQURJTkdfQ0FQSVRBTCA9IC9eW1xccHtMdX1dKD8hW1xccHtMdX1dKS9ndTtcbmNvbnN0IElERU5USUZJRVIgPSAvKFtcXHB7QWxwaGF9XFxwe059X118JCkvdTtcbmNvbnN0IFNFUEFSQVRPUlMgPSAvW18uXFwtIF0rLztcblxuY29uc3QgTEVBRElOR19TRVBBUkFUT1JTID0gbmV3IFJlZ0V4cCgnXicgKyBTRVBBUkFUT1JTLnNvdXJjZSk7XG5jb25zdCBTRVBBUkFUT1JTX0FORF9JREVOVElGSUVSID0gbmV3IFJlZ0V4cChTRVBBUkFUT1JTLnNvdXJjZSArIElERU5USUZJRVIuc291cmNlLCAnZ3UnKTtcbmNvbnN0IE5VTUJFUlNfQU5EX0lERU5USUZJRVIgPSBuZXcgUmVnRXhwKCdcXFxcZCsnICsgSURFTlRJRklFUi5zb3VyY2UsICdndScpO1xuXG5jb25zdCBwcmVzZXJ2ZUNhbWVsQ2FzZSA9IChzdHJpbmcsIHRvTG93ZXJDYXNlLCB0b1VwcGVyQ2FzZSkgPT4ge1xuXHRsZXQgaXNMYXN0Q2hhckxvd2VyID0gZmFsc2U7XG5cdGxldCBpc0xhc3RDaGFyVXBwZXIgPSBmYWxzZTtcblx0bGV0IGlzTGFzdExhc3RDaGFyVXBwZXIgPSBmYWxzZTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IGNoYXJhY3RlciA9IHN0cmluZ1tpXTtcblxuXHRcdGlmIChpc0xhc3RDaGFyTG93ZXIgJiYgVVBQRVJDQVNFLnRlc3QoY2hhcmFjdGVyKSkge1xuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnNsaWNlKDAsIGkpICsgJy0nICsgc3RyaW5nLnNsaWNlKGkpO1xuXHRcdFx0aXNMYXN0Q2hhckxvd2VyID0gZmFsc2U7XG5cdFx0XHRpc0xhc3RMYXN0Q2hhclVwcGVyID0gaXNMYXN0Q2hhclVwcGVyO1xuXHRcdFx0aXNMYXN0Q2hhclVwcGVyID0gdHJ1ZTtcblx0XHRcdGkrKztcblx0XHR9IGVsc2UgaWYgKGlzTGFzdENoYXJVcHBlciAmJiBpc0xhc3RMYXN0Q2hhclVwcGVyICYmIExPV0VSQ0FTRS50ZXN0KGNoYXJhY3RlcikpIHtcblx0XHRcdHN0cmluZyA9IHN0cmluZy5zbGljZSgwLCBpIC0gMSkgKyAnLScgKyBzdHJpbmcuc2xpY2UoaSAtIDEpO1xuXHRcdFx0aXNMYXN0TGFzdENoYXJVcHBlciA9IGlzTGFzdENoYXJVcHBlcjtcblx0XHRcdGlzTGFzdENoYXJVcHBlciA9IGZhbHNlO1xuXHRcdFx0aXNMYXN0Q2hhckxvd2VyID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aXNMYXN0Q2hhckxvd2VyID0gdG9Mb3dlckNhc2UoY2hhcmFjdGVyKSA9PT0gY2hhcmFjdGVyICYmIHRvVXBwZXJDYXNlKGNoYXJhY3RlcikgIT09IGNoYXJhY3Rlcjtcblx0XHRcdGlzTGFzdExhc3RDaGFyVXBwZXIgPSBpc0xhc3RDaGFyVXBwZXI7XG5cdFx0XHRpc0xhc3RDaGFyVXBwZXIgPSB0b1VwcGVyQ2FzZShjaGFyYWN0ZXIpID09PSBjaGFyYWN0ZXIgJiYgdG9Mb3dlckNhc2UoY2hhcmFjdGVyKSAhPT0gY2hhcmFjdGVyO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59O1xuXG5jb25zdCBwcmVzZXJ2ZUNvbnNlY3V0aXZlVXBwZXJjYXNlID0gKGlucHV0LCB0b0xvd2VyQ2FzZSkgPT4ge1xuXHRMRUFESU5HX0NBUElUQUwubGFzdEluZGV4ID0gMDtcblxuXHRyZXR1cm4gaW5wdXQucmVwbGFjZShMRUFESU5HX0NBUElUQUwsIG0xID0+IHRvTG93ZXJDYXNlKG0xKSk7XG59O1xuXG5jb25zdCBwb3N0UHJvY2VzcyA9IChpbnB1dCwgdG9VcHBlckNhc2UpID0+IHtcblx0U0VQQVJBVE9SU19BTkRfSURFTlRJRklFUi5sYXN0SW5kZXggPSAwO1xuXHROVU1CRVJTX0FORF9JREVOVElGSUVSLmxhc3RJbmRleCA9IDA7XG5cblx0cmV0dXJuIGlucHV0LnJlcGxhY2UoU0VQQVJBVE9SU19BTkRfSURFTlRJRklFUiwgKF8sIGlkZW50aWZpZXIpID0+IHRvVXBwZXJDYXNlKGlkZW50aWZpZXIpKVxuXHRcdC5yZXBsYWNlKE5VTUJFUlNfQU5EX0lERU5USUZJRVIsIG0gPT4gdG9VcHBlckNhc2UobSkpO1xufTtcblxuY29uc3QgY2FtZWxDYXNlID0gKGlucHV0LCBvcHRpb25zKSA9PiB7XG5cdGlmICghKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgfHwgQXJyYXkuaXNBcnJheShpbnB1dCkpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIGlucHV0IHRvIGJlIGBzdHJpbmcgfCBzdHJpbmdbXWAnKTtcblx0fVxuXG5cdG9wdGlvbnMgPSB7XG5cdFx0cGFzY2FsQ2FzZTogZmFsc2UsXG5cdFx0cHJlc2VydmVDb25zZWN1dGl2ZVVwcGVyY2FzZTogZmFsc2UsXG5cdFx0Li4ub3B0aW9uc1xuXHR9O1xuXG5cdGlmIChBcnJheS5pc0FycmF5KGlucHV0KSkge1xuXHRcdGlucHV0ID0gaW5wdXQubWFwKHggPT4geC50cmltKCkpXG5cdFx0XHQuZmlsdGVyKHggPT4geC5sZW5ndGgpXG5cdFx0XHQuam9pbignLScpO1xuXHR9IGVsc2Uge1xuXHRcdGlucHV0ID0gaW5wdXQudHJpbSgpO1xuXHR9XG5cblx0aWYgKGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdGNvbnN0IHRvTG93ZXJDYXNlID0gb3B0aW9ucy5sb2NhbGUgPT09IGZhbHNlID9cblx0XHRzdHJpbmcgPT4gc3RyaW5nLnRvTG93ZXJDYXNlKCkgOlxuXHRcdHN0cmluZyA9PiBzdHJpbmcudG9Mb2NhbGVMb3dlckNhc2Uob3B0aW9ucy5sb2NhbGUpO1xuXHRjb25zdCB0b1VwcGVyQ2FzZSA9IG9wdGlvbnMubG9jYWxlID09PSBmYWxzZSA/XG5cdFx0c3RyaW5nID0+IHN0cmluZy50b1VwcGVyQ2FzZSgpIDpcblx0XHRzdHJpbmcgPT4gc3RyaW5nLnRvTG9jYWxlVXBwZXJDYXNlKG9wdGlvbnMubG9jYWxlKTtcblxuXHRpZiAoaW5wdXQubGVuZ3RoID09PSAxKSB7XG5cdFx0cmV0dXJuIG9wdGlvbnMucGFzY2FsQ2FzZSA/IHRvVXBwZXJDYXNlKGlucHV0KSA6IHRvTG93ZXJDYXNlKGlucHV0KTtcblx0fVxuXG5cdGNvbnN0IGhhc1VwcGVyQ2FzZSA9IGlucHV0ICE9PSB0b0xvd2VyQ2FzZShpbnB1dCk7XG5cblx0aWYgKGhhc1VwcGVyQ2FzZSkge1xuXHRcdGlucHV0ID0gcHJlc2VydmVDYW1lbENhc2UoaW5wdXQsIHRvTG93ZXJDYXNlLCB0b1VwcGVyQ2FzZSk7XG5cdH1cblxuXHRpbnB1dCA9IGlucHV0LnJlcGxhY2UoTEVBRElOR19TRVBBUkFUT1JTLCAnJyk7XG5cblx0aWYgKG9wdGlvbnMucHJlc2VydmVDb25zZWN1dGl2ZVVwcGVyY2FzZSkge1xuXHRcdGlucHV0ID0gcHJlc2VydmVDb25zZWN1dGl2ZVVwcGVyY2FzZShpbnB1dCwgdG9Mb3dlckNhc2UpO1xuXHR9IGVsc2Uge1xuXHRcdGlucHV0ID0gdG9Mb3dlckNhc2UoaW5wdXQpO1xuXHR9XG5cblx0aWYgKG9wdGlvbnMucGFzY2FsQ2FzZSkge1xuXHRcdGlucHV0ID0gdG9VcHBlckNhc2UoaW5wdXQuY2hhckF0KDApKSArIGlucHV0LnNsaWNlKDEpO1xuXHR9XG5cblx0cmV0dXJuIHBvc3RQcm9jZXNzKGlucHV0LCB0b1VwcGVyQ2FzZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNhbWVsQ2FzZTtcbi8vIFRPRE86IFJlbW92ZSB0aGlzIGZvciB0aGUgbmV4dCBtYWpvciByZWxlYXNlXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gY2FtZWxDYXNlO1xuIiwiZXhwb3J0cy5pbnRlcm9wRGVmYXVsdCA9IGZ1bmN0aW9uIChhKSB7XG4gIHJldHVybiBhICYmIGEuX19lc01vZHVsZSA/IGEgOiB7ZGVmYXVsdDogYX07XG59O1xuXG5leHBvcnRzLmRlZmluZUludGVyb3BGbGFnID0gZnVuY3Rpb24gKGEpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSk7XG59O1xuXG5leHBvcnRzLmV4cG9ydEFsbCA9IGZ1bmN0aW9uIChzb3VyY2UsIGRlc3QpIHtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5ID09PSAnZGVmYXVsdCcgfHwga2V5ID09PSAnX19lc01vZHVsZScgfHwgZGVzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGtleSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc291cmNlW2tleV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmV4cG9ydHMuZXhwb3J0ID0gZnVuY3Rpb24gKGRlc3QsIGRlc3ROYW1lLCBnZXQpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGRlc3ROYW1lLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGdldCxcbiAgfSk7XG59O1xuIiwiZXhwb3J0IHsgUnVubmFibGUsIFJ1bm5hYmxlQmluZGluZywgUnVubmFibGVFYWNoLCBSdW5uYWJsZVJldHJ5LCBSdW5uYWJsZVNlcXVlbmNlLCBSdW5uYWJsZU1hcCwgUnVubmFibGVMYW1iZGEsIFJ1bm5hYmxlV2l0aEZhbGxiYWNrcywgfSBmcm9tIFwiLi9iYXNlLmpzXCI7XG5leHBvcnQgeyBSdW5uYWJsZVBhc3N0aHJvdWdoIH0gZnJvbSBcIi4vcGFzc3Rocm91Z2guanNcIjtcbmV4cG9ydCB7IFJvdXRlclJ1bm5hYmxlIH0gZnJvbSBcIi4vcm91dGVyLmpzXCI7XG5leHBvcnQgeyBSdW5uYWJsZUJyYW5jaCB9IGZyb20gXCIuL2JyYW5jaC5qc1wiO1xuIiwiaW1wb3J0IHBSZXRyeSBmcm9tIFwicC1yZXRyeVwiO1xuaW1wb3J0IHsgQ2FsbGJhY2tNYW5hZ2VyLCB9IGZyb20gXCIuLi8uLi9jYWxsYmFja3MvbWFuYWdlci5qc1wiO1xuaW1wb3J0IHsgU2VyaWFsaXphYmxlIH0gZnJvbSBcIi4uLy4uL2xvYWQvc2VyaWFsaXphYmxlLmpzXCI7XG5pbXBvcnQgeyBJdGVyYWJsZVJlYWRhYmxlU3RyZWFtIH0gZnJvbSBcIi4uLy4uL3V0aWwvc3RyZWFtLmpzXCI7XG5pbXBvcnQgeyBnZXRDYWxsYmFja01hbmdlckZvckNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZy5qc1wiO1xuaW1wb3J0IHsgQXN5bmNDYWxsZXIgfSBmcm9tIFwiLi4vLi4vdXRpbC9hc3luY19jYWxsZXIuanNcIjtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5mdW5jdGlvbiBfY29lcmNlVG9EaWN0KHZhbHVlLCBkZWZhdWx0S2V5KSB7XG4gICAgcmV0dXJuIHZhbHVlICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCJcbiAgICAgICAgPyB2YWx1ZVxuICAgICAgICA6IHsgW2RlZmF1bHRLZXldOiB2YWx1ZSB9O1xufVxuLyoqXG4gKiBBIFJ1bm5hYmxlIGlzIGEgZ2VuZXJpYyB1bml0IG9mIHdvcmsgdGhhdCBjYW4gYmUgaW52b2tlZCwgYmF0Y2hlZCwgc3RyZWFtZWQsIGFuZC9vclxuICogdHJhbnNmb3JtZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBSdW5uYWJsZSBleHRlbmRzIFNlcmlhbGl6YWJsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImxjX3J1bm5hYmxlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCaW5kIGFyZ3VtZW50cyB0byBhIFJ1bm5hYmxlLCByZXR1cm5pbmcgYSBuZXcgUnVubmFibGUuXG4gICAgICogQHBhcmFtIGt3YXJnc1xuICAgICAqIEByZXR1cm5zIEEgbmV3IFJ1bm5hYmxlQmluZGluZyB0aGF0LCB3aGVuIGludm9rZWQsIHdpbGwgYXBwbHkgdGhlIGJvdW5kIGFyZ3MuXG4gICAgICovXG4gICAgYmluZChrd2FyZ3MpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11c2UtYmVmb3JlLWRlZmluZVxuICAgICAgICByZXR1cm4gbmV3IFJ1bm5hYmxlQmluZGluZyh7IGJvdW5kOiB0aGlzLCBrd2FyZ3MgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIG5ldyBSdW5uYWJsZSB0aGF0IG1hcHMgYSBsaXN0IG9mIGlucHV0cyB0byBhIGxpc3Qgb2Ygb3V0cHV0cyxcbiAgICAgKiBieSBjYWxsaW5nIGludm9rZSgpIHdpdGggZWFjaCBpbnB1dC5cbiAgICAgKi9cbiAgICBtYXAoKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICAgICAgcmV0dXJuIG5ldyBSdW5uYWJsZUVhY2goeyBib3VuZDogdGhpcyB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQmluZCBhcmd1bWVudHMgdG8gYSBSdW5uYWJsZSwgcmV0dXJuaW5nIGEgbmV3IFJ1bm5hYmxlLlxuICAgICAqIEBwYXJhbSBrd2FyZ3NcbiAgICAgKiBAcmV0dXJucyBBIG5ldyBSdW5uYWJsZUJpbmRpbmcgdGhhdCwgd2hlbiBpbnZva2VkLCB3aWxsIGFwcGx5IHRoZSBib3VuZCBhcmdzLlxuICAgICAqL1xuICAgIHdpdGhSZXRyeShmaWVsZHMpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11c2UtYmVmb3JlLWRlZmluZVxuICAgICAgICByZXR1cm4gbmV3IFJ1bm5hYmxlUmV0cnkoe1xuICAgICAgICAgICAgYm91bmQ6IHRoaXMsXG4gICAgICAgICAgICBrd2FyZ3M6IHt9LFxuICAgICAgICAgICAgbWF4QXR0ZW1wdE51bWJlcjogZmllbGRzPy5zdG9wQWZ0ZXJBdHRlbXB0LFxuICAgICAgICAgICAgLi4uZmllbGRzLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHJ1bm5hYmxlIGZyb20gdGhlIGN1cnJlbnQgb25lIHRoYXQgd2lsbCB0cnkgaW52b2tpbmdcbiAgICAgKiBvdGhlciBwYXNzZWQgZmFsbGJhY2sgcnVubmFibGVzIGlmIHRoZSBpbml0aWFsIGludm9jYXRpb24gZmFpbHMuXG4gICAgICogQHBhcmFtIGZpZWxkcy5mYWxsYmFja3MgT3RoZXIgcnVubmFibGVzIHRvIGNhbGwgaWYgdGhlIHJ1bm5hYmxlIGVycm9ycy5cbiAgICAgKiBAcmV0dXJucyBBIG5ldyBSdW5uYWJsZVdpdGhGYWxsYmFja3MuXG4gICAgICovXG4gICAgd2l0aEZhbGxiYWNrcyhmaWVsZHMpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11c2UtYmVmb3JlLWRlZmluZVxuICAgICAgICByZXR1cm4gbmV3IFJ1bm5hYmxlV2l0aEZhbGxiYWNrcyh7XG4gICAgICAgICAgICBydW5uYWJsZTogdGhpcyxcbiAgICAgICAgICAgIGZhbGxiYWNrczogZmllbGRzLmZhbGxiYWNrcyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9nZXRPcHRpb25zTGlzdChvcHRpb25zLCBsZW5ndGggPSAwKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggIT09IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUGFzc2VkIFwib3B0aW9uc1wiIG11c3QgYmUgYW4gYXJyYXkgd2l0aCB0aGUgc2FtZSBsZW5ndGggYXMgdGhlIGlucHV0cywgYnV0IGdvdCAke29wdGlvbnMubGVuZ3RofSBvcHRpb25zIGZvciAke2xlbmd0aH0gaW5wdXRzYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aCB9LCAoKSA9PiBvcHRpb25zKTtcbiAgICB9XG4gICAgYXN5bmMgYmF0Y2goaW5wdXRzLCBvcHRpb25zLCBiYXRjaE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgY29uZmlnTGlzdCA9IHRoaXMuX2dldE9wdGlvbnNMaXN0KG9wdGlvbnMgPz8ge30sIGlucHV0cy5sZW5ndGgpO1xuICAgICAgICBjb25zdCBjYWxsZXIgPSBuZXcgQXN5bmNDYWxsZXIoe1xuICAgICAgICAgICAgbWF4Q29uY3VycmVuY3k6IGJhdGNoT3B0aW9ucz8ubWF4Q29uY3VycmVuY3ksXG4gICAgICAgICAgICBvbkZhaWxlZEF0dGVtcHQ6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBiYXRjaENhbGxzID0gaW5wdXRzLm1hcCgoaW5wdXQsIGkpID0+IGNhbGxlci5jYWxsKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5pbnZva2UoaW5wdXQsIGNvbmZpZ0xpc3RbaV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChiYXRjaE9wdGlvbnM/LnJldHVybkV4Y2VwdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGJhdGNoQ2FsbHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHN0cmVhbWluZyBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKiBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCBpZiB0aGV5IHN1cHBvcnQgc3RyZWFtaW5nIG91dHB1dC5cbiAgICAgKiBAcGFyYW0gaW5wdXRcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqL1xuICAgIGFzeW5jICpfc3RyZWFtSXRlcmF0b3IoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICAgICAgeWllbGQgdGhpcy5pbnZva2UoaW5wdXQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdHJlYW0gb3V0cHV0IGluIGNodW5rcy5cbiAgICAgKiBAcGFyYW0gaW5wdXRcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIEEgcmVhZGFibGUgc3RyZWFtIHRoYXQgaXMgYWxzbyBhbiBpdGVyYWJsZS5cbiAgICAgKi9cbiAgICBhc3luYyBzdHJlYW0oaW5wdXQsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIEl0ZXJhYmxlUmVhZGFibGVTdHJlYW0uZnJvbUFzeW5jR2VuZXJhdG9yKHRoaXMuX3N0cmVhbUl0ZXJhdG9yKGlucHV0LCBvcHRpb25zKSk7XG4gICAgfVxuICAgIF9zZXBhcmF0ZVJ1bm5hYmxlQ29uZmlnRnJvbUNhbGxPcHRpb25zKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCBydW5uYWJsZUNvbmZpZyA9IHtcbiAgICAgICAgICAgIGNhbGxiYWNrczogb3B0aW9ucy5jYWxsYmFja3MsXG4gICAgICAgICAgICB0YWdzOiBvcHRpb25zLnRhZ3MsXG4gICAgICAgICAgICBtZXRhZGF0YTogb3B0aW9ucy5tZXRhZGF0YSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2FsbE9wdGlvbnMgPSB7IC4uLm9wdGlvbnMgfTtcbiAgICAgICAgZGVsZXRlIGNhbGxPcHRpb25zLmNhbGxiYWNrcztcbiAgICAgICAgZGVsZXRlIGNhbGxPcHRpb25zLnRhZ3M7XG4gICAgICAgIGRlbGV0ZSBjYWxsT3B0aW9ucy5tZXRhZGF0YTtcbiAgICAgICAgcmV0dXJuIFtydW5uYWJsZUNvbmZpZywgY2FsbE9wdGlvbnNdO1xuICAgIH1cbiAgICBhc3luYyBfY2FsbFdpdGhDb25maWcoZnVuYywgaW5wdXQsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tNYW5hZ2VyXyA9IGF3YWl0IGdldENhbGxiYWNrTWFuZ2VyRm9yQ29uZmlnKG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBydW5NYW5hZ2VyID0gYXdhaXQgY2FsbGJhY2tNYW5hZ2VyXz8uaGFuZGxlQ2hhaW5TdGFydCh0aGlzLnRvSlNPTigpLCBfY29lcmNlVG9EaWN0KGlucHV0LCBcImlucHV0XCIpLCB1bmRlZmluZWQsIG9wdGlvbnM/LnJ1blR5cGUpO1xuICAgICAgICBsZXQgb3V0cHV0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgb3V0cHV0ID0gYXdhaXQgZnVuYy5iaW5kKHRoaXMpKGlucHV0LCBvcHRpb25zLCBydW5NYW5hZ2VyKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYXdhaXQgcnVuTWFuYWdlcj8uaGFuZGxlQ2hhaW5FcnJvcihlKTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgcnVuTWFuYWdlcj8uaGFuZGxlQ2hhaW5FbmQoX2NvZXJjZVRvRGljdChvdXRwdXQsIFwib3V0cHV0XCIpKTtcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIHRoYXQgaGFuZGxlcyBiYXRjaGluZyBhbmQgY29uZmlndXJhdGlvbiBmb3IgYSBydW5uYWJsZVxuICAgICAqIEl0IHRha2VzIGEgZnVuY3Rpb24sIGlucHV0IHZhbHVlcywgYW5kIG9wdGlvbmFsIGNvbmZpZ3VyYXRpb24sIGFuZFxuICAgICAqIHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIG91dHB1dCB2YWx1ZXMuXG4gICAgICogQHBhcmFtIGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGZvciBlYWNoIGlucHV0IHZhbHVlLlxuICAgICAqIEBwYXJhbSBpbnB1dCBUaGUgaW5wdXQgdmFsdWVzIHRvIGJlIHByb2Nlc3NlZC5cbiAgICAgKiBAcGFyYW0gY29uZmlnIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBmdW5jdGlvbiBleGVjdXRpb24uXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIG91dHB1dCB2YWx1ZXMuXG4gICAgICovXG4gICAgYXN5bmMgX2JhdGNoV2l0aENvbmZpZyhmdW5jLCBpbnB1dHMsIG9wdGlvbnMsIGJhdGNoT3B0aW9ucykge1xuICAgICAgICBjb25zdCBjb25maWdzID0gdGhpcy5fZ2V0T3B0aW9uc0xpc3QoKG9wdGlvbnMgPz8ge30pLCBpbnB1dHMubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tNYW5hZ2VycyA9IGF3YWl0IFByb21pc2UuYWxsKGNvbmZpZ3MubWFwKGdldENhbGxiYWNrTWFuZ2VyRm9yQ29uZmlnKSk7XG4gICAgICAgIGNvbnN0IHJ1bk1hbmFnZXJzID0gYXdhaXQgUHJvbWlzZS5hbGwoY2FsbGJhY2tNYW5hZ2Vycy5tYXAoKGNhbGxiYWNrTWFuYWdlciwgaSkgPT4gY2FsbGJhY2tNYW5hZ2VyPy5oYW5kbGVDaGFpblN0YXJ0KHRoaXMudG9KU09OKCksIF9jb2VyY2VUb0RpY3QoaW5wdXRzW2ldLCBcImlucHV0XCIpKSkpO1xuICAgICAgICBsZXQgb3V0cHV0cztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG91dHB1dHMgPSBhd2FpdCBmdW5jKGlucHV0cywgY29uZmlncywgcnVuTWFuYWdlcnMsIGJhdGNoT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHJ1bk1hbmFnZXJzLm1hcCgocnVuTWFuYWdlcikgPT4gcnVuTWFuYWdlcj8uaGFuZGxlQ2hhaW5FcnJvcihlKSkpO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChydW5NYW5hZ2Vycy5tYXAoKHJ1bk1hbmFnZXIpID0+IHJ1bk1hbmFnZXI/LmhhbmRsZUNoYWluRW5kKF9jb2VyY2VUb0RpY3Qob3V0cHV0cywgXCJvdXRwdXRcIikpKSk7XG4gICAgICAgIHJldHVybiBvdXRwdXRzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgbWV0aG9kIHRvIHRyYW5zZm9ybSBhbiBJdGVyYXRvciBvZiBJbnB1dCB2YWx1ZXMgaW50byBhbiBJdGVyYXRvciBvZlxuICAgICAqIE91dHB1dCB2YWx1ZXMsIHdpdGggY2FsbGJhY2tzLlxuICAgICAqIFVzZSB0aGlzIHRvIGltcGxlbWVudCBgc3RyZWFtKClgIG9yIGB0cmFuc2Zvcm0oKWAgaW4gUnVubmFibGUgc3ViY2xhc3Nlcy5cbiAgICAgKi9cbiAgICBhc3luYyAqX3RyYW5zZm9ybVN0cmVhbVdpdGhDb25maWcoaW5wdXRHZW5lcmF0b3IsIHRyYW5zZm9ybWVyLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBmaW5hbElucHV0O1xuICAgICAgICBsZXQgZmluYWxJbnB1dFN1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgIGxldCBmaW5hbE91dHB1dDtcbiAgICAgICAgbGV0IGZpbmFsT3V0cHV0U3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tNYW5hZ2VyXyA9IGF3YWl0IGdldENhbGxiYWNrTWFuZ2VyRm9yQ29uZmlnKG9wdGlvbnMpO1xuICAgICAgICBsZXQgcnVuTWFuYWdlcjtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZFJlcHJlc2VudGF0aW9uID0gdGhpcy50b0pTT04oKTtcbiAgICAgICAgYXN5bmMgZnVuY3Rpb24qIHdyYXBJbnB1dEZvclRyYWNpbmcoKSB7XG4gICAgICAgICAgICBmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIGlucHV0R2VuZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFydW5NYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFN0YXJ0IHRoZSBydW4gbWFuYWdlciBBRlRFUiB0aGUgaXRlcmF0b3Igc3RhcnRzIHRvIHByZXNlcnZlXG4gICAgICAgICAgICAgICAgICAgIC8vIHRyYWNpbmcgb3JkZXJcbiAgICAgICAgICAgICAgICAgICAgcnVuTWFuYWdlciA9IGF3YWl0IGNhbGxiYWNrTWFuYWdlcl8/LmhhbmRsZUNoYWluU3RhcnQoc2VyaWFsaXplZFJlcHJlc2VudGF0aW9uLCB7IGlucHV0OiBcIlwiIH0sIHVuZGVmaW5lZCwgb3B0aW9ucz8ucnVuVHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmaW5hbElucHV0U3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbElucHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsSW5wdXQgPSBjaHVuaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbElucHV0ID0gZmluYWxJbnB1dC5jb25jYXQoY2h1bmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsSW5wdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxJbnB1dFN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHlpZWxkIGNodW5rO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHdyYXBwZWRJbnB1dEdlbmVyYXRvciA9IHdyYXBJbnB1dEZvclRyYWNpbmcoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG91dHB1dEl0ZXJhdG9yID0gdHJhbnNmb3JtZXIod3JhcHBlZElucHV0R2VuZXJhdG9yLCBydW5NYW5hZ2VyLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2Ygb3V0cHV0SXRlcmF0b3IpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBjaHVuaztcbiAgICAgICAgICAgICAgICBpZiAoZmluYWxPdXRwdXRTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsT3V0cHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsT3V0cHV0ID0gY2h1bms7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxPdXRwdXQgPSBmaW5hbE91dHB1dC5jb25jYXQoY2h1bmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsT3V0cHV0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsT3V0cHV0U3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGF3YWl0IHJ1bk1hbmFnZXI/LmhhbmRsZUNoYWluRXJyb3IoZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwge1xuICAgICAgICAgICAgICAgIGlucHV0czogX2NvZXJjZVRvRGljdChmaW5hbElucHV0LCBcImlucHV0XCIpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHJ1bk1hbmFnZXI/LmhhbmRsZUNoYWluRW5kKGZpbmFsT3V0cHV0ID8/IHt9LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7IGlucHV0czogX2NvZXJjZVRvRGljdChmaW5hbElucHV0LCBcImlucHV0XCIpIH0pO1xuICAgIH1cbiAgICBfcGF0Y2hDb25maWcoY29uZmlnID0ge30sIGNhbGxiYWNrTWFuYWdlciA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4geyAuLi5jb25maWcsIGNhbGxiYWNrczogY2FsbGJhY2tNYW5hZ2VyIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBydW5uYWJsZSBzZXF1ZW5jZSB0aGF0IHJ1bnMgZWFjaCBpbmRpdmlkdWFsIHJ1bm5hYmxlIGluIHNlcmllcyxcbiAgICAgKiBwaXBpbmcgdGhlIG91dHB1dCBvZiBvbmUgcnVubmFibGUgaW50byBhbm90aGVyIHJ1bm5hYmxlIG9yIHJ1bm5hYmxlLWxpa2UuXG4gICAgICogQHBhcmFtIGNvZXJjZWFibGUgQSBydW5uYWJsZSwgZnVuY3Rpb24sIG9yIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGZ1bmN0aW9ucyBvciBydW5uYWJsZXMuXG4gICAgICogQHJldHVybnMgQSBuZXcgcnVubmFibGUgc2VxdWVuY2UuXG4gICAgICovXG4gICAgcGlwZShjb2VyY2VhYmxlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICAgICAgcmV0dXJuIG5ldyBSdW5uYWJsZVNlcXVlbmNlKHtcbiAgICAgICAgICAgIGZpcnN0OiB0aGlzLFxuICAgICAgICAgICAgbGFzdDogX2NvZXJjZVRvUnVubmFibGUoY29lcmNlYWJsZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHRyYW5zZm9ybSwgd2hpY2ggYnVmZmVycyBpbnB1dCBhbmQgdGhlbiBjYWxscyBzdHJlYW0uXG4gICAgICogU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaWYgdGhleSBjYW4gc3RhcnQgcHJvZHVjaW5nIG91dHB1dCB3aGlsZVxuICAgICAqIGlucHV0IGlzIHN0aWxsIGJlaW5nIGdlbmVyYXRlZC5cbiAgICAgKiBAcGFyYW0gZ2VuZXJhdG9yXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKi9cbiAgICBhc3luYyAqdHJhbnNmb3JtKGdlbmVyYXRvciwgb3B0aW9ucykge1xuICAgICAgICBsZXQgZmluYWxDaHVuaztcbiAgICAgICAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBnZW5lcmF0b3IpIHtcbiAgICAgICAgICAgIGlmICghZmluYWxDaHVuaykge1xuICAgICAgICAgICAgICAgIGZpbmFsQ2h1bmsgPSBjaHVuaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE1ha2UgYSBiZXN0IGVmZm9ydCB0byBnYXRoZXIsIGZvciBhbnkgdHlwZSB0aGF0IHN1cHBvcnRzIGNvbmNhdC5cbiAgICAgICAgICAgICAgICAvLyBUaGlzIG1ldGhvZCBzaG91bGQgdGhyb3cgYW4gZXJyb3IgaWYgZ2F0aGVyaW5nIGZhaWxzLlxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgICAgZmluYWxDaHVuayA9IGZpbmFsQ2h1bmsuY29uY2F0KGNodW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB5aWVsZCogdGhpcy5fc3RyZWFtSXRlcmF0b3IoZmluYWxDaHVuaywgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgc3RhdGljIGlzUnVubmFibGUodGhpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaW5nLmxjX3J1bm5hYmxlO1xuICAgIH1cbn1cbi8qKlxuICogQSBydW5uYWJsZSB0aGF0IGRlbGVnYXRlcyBjYWxscyB0byBhbm90aGVyIHJ1bm5hYmxlIHdpdGggYSBzZXQgb2Yga3dhcmdzLlxuICovXG5leHBvcnQgY2xhc3MgUnVubmFibGVCaW5kaW5nIGV4dGVuZHMgUnVubmFibGUge1xuICAgIHN0YXRpYyBsY19uYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJSdW5uYWJsZUJpbmRpbmdcIjtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoZmllbGRzKSB7XG4gICAgICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImxjX25hbWVzcGFjZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogW1wibGFuZ2NoYWluXCIsIFwic2NoZW1hXCIsIFwicnVubmFibGVcIl1cbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImxjX3NlcmlhbGl6YWJsZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiYm91bmRcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwia3dhcmdzXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYm91bmQgPSBmaWVsZHMuYm91bmQ7XG4gICAgICAgIHRoaXMua3dhcmdzID0gZmllbGRzLmt3YXJncztcbiAgICB9XG4gICAgYmluZChrd2FyZ3MpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSdW5uYWJsZUJpbmRpbmcoe1xuICAgICAgICAgICAgYm91bmQ6IHRoaXMuYm91bmQsXG4gICAgICAgICAgICBrd2FyZ3M6IHsgLi4udGhpcy5rd2FyZ3MsIC4uLmt3YXJncyB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgaW52b2tlKGlucHV0LCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvdW5kLmludm9rZShpbnB1dCwgeyAuLi5vcHRpb25zLCAuLi50aGlzLmt3YXJncyB9KTtcbiAgICB9XG4gICAgYXN5bmMgYmF0Y2goaW5wdXRzLCBvcHRpb25zLCBiYXRjaE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IEFycmF5LmlzQXJyYXkob3B0aW9ucylcbiAgICAgICAgICAgID8gb3B0aW9ucy5tYXAoKGluZGl2aWR1YWxPcHRpb24pID0+ICh7XG4gICAgICAgICAgICAgICAgLi4uaW5kaXZpZHVhbE9wdGlvbixcbiAgICAgICAgICAgICAgICAuLi50aGlzLmt3YXJncyxcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgOiB7IC4uLm9wdGlvbnMsIC4uLnRoaXMua3dhcmdzIH07XG4gICAgICAgIHJldHVybiB0aGlzLmJvdW5kLmJhdGNoKGlucHV0cywgbWVyZ2VkT3B0aW9ucywgYmF0Y2hPcHRpb25zKTtcbiAgICB9XG4gICAgYXN5bmMgKl9zdHJlYW1JdGVyYXRvcihpbnB1dCwgb3B0aW9ucykge1xuICAgICAgICB5aWVsZCogdGhpcy5ib3VuZC5fc3RyZWFtSXRlcmF0b3IoaW5wdXQsIHsgLi4ub3B0aW9ucywgLi4udGhpcy5rd2FyZ3MgfSk7XG4gICAgfVxuICAgIGFzeW5jIHN0cmVhbShpbnB1dCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5ib3VuZC5zdHJlYW0oaW5wdXQsIHsgLi4ub3B0aW9ucywgLi4udGhpcy5rd2FyZ3MgfSk7XG4gICAgfVxuICAgIGFzeW5jICp0cmFuc2Zvcm0oXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBnZW5lcmF0b3IsIG9wdGlvbnMpIHtcbiAgICAgICAgeWllbGQqIHRoaXMuYm91bmQudHJhbnNmb3JtKGdlbmVyYXRvciwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHN0YXRpYyBpc1J1bm5hYmxlQmluZGluZyhcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHRoaW5nXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIHRoaW5nLmJvdW5kICYmIFJ1bm5hYmxlLmlzUnVubmFibGUodGhpbmcuYm91bmQpO1xuICAgIH1cbn1cbi8qKlxuICogQSBydW5uYWJsZSB0aGF0IGRlbGVnYXRlcyBjYWxscyB0byBhbm90aGVyIHJ1bm5hYmxlXG4gKiB3aXRoIGVhY2ggZWxlbWVudCBvZiB0aGUgaW5wdXQgc2VxdWVuY2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBSdW5uYWJsZUVhY2ggZXh0ZW5kcyBSdW5uYWJsZSB7XG4gICAgc3RhdGljIGxjX25hbWUoKSB7XG4gICAgICAgIHJldHVybiBcIlJ1bm5hYmxlRWFjaFwiO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihmaWVsZHMpIHtcbiAgICAgICAgc3VwZXIoZmllbGRzKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibGNfc2VyaWFsaXphYmxlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJsY19uYW1lc3BhY2VcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IFtcImxhbmdjaGFpblwiLCBcInNjaGVtYVwiLCBcInJ1bm5hYmxlXCJdXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJib3VuZFwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJvdW5kID0gZmllbGRzLmJvdW5kO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCaW5kcyB0aGUgcnVubmFibGUgd2l0aCB0aGUgc3BlY2lmaWVkIGFyZ3VtZW50cy5cbiAgICAgKiBAcGFyYW0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGJpbmQgdGhlIHJ1bm5hYmxlIHdpdGguXG4gICAgICogQHJldHVybnMgQSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGBSdW5uYWJsZUVhY2hgIGNsYXNzIHRoYXQgaXMgYm91bmQgd2l0aCB0aGUgc3BlY2lmaWVkIGFyZ3VtZW50cy5cbiAgICAgKi9cbiAgICBiaW5kKGt3YXJncykge1xuICAgICAgICByZXR1cm4gbmV3IFJ1bm5hYmxlRWFjaCh7XG4gICAgICAgICAgICBib3VuZDogdGhpcy5ib3VuZC5iaW5kKGt3YXJncyksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnZva2VzIHRoZSBydW5uYWJsZSB3aXRoIHRoZSBzcGVjaWZpZWQgaW5wdXQgYW5kIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQHBhcmFtIGlucHV0IFRoZSBpbnB1dCB0byBpbnZva2UgdGhlIHJ1bm5hYmxlIHdpdGguXG4gICAgICogQHBhcmFtIGNvbmZpZyBUaGUgY29uZmlndXJhdGlvbiB0byBpbnZva2UgdGhlIHJ1bm5hYmxlIHdpdGguXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIG91dHB1dCBvZiB0aGUgcnVubmFibGUuXG4gICAgICovXG4gICAgYXN5bmMgaW52b2tlKGlucHV0cywgY29uZmlnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxsV2l0aENvbmZpZyh0aGlzLl9pbnZva2UsIGlucHV0cywgY29uZmlnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbnZva2UgdGhlIHJ1bm5hYmxlIHdpdGggdGhlIHNwZWNpZmllZCBpbnB1dCBhbmQgY29uZmlndXJhdGlvbi5cbiAgICAgKiBAcGFyYW0gaW5wdXQgVGhlIGlucHV0IHRvIGludm9rZSB0aGUgcnVubmFibGUgd2l0aC5cbiAgICAgKiBAcGFyYW0gY29uZmlnIFRoZSBjb25maWd1cmF0aW9uIHRvIGludm9rZSB0aGUgcnVubmFibGUgd2l0aC5cbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgb3V0cHV0IG9mIHRoZSBydW5uYWJsZS5cbiAgICAgKi9cbiAgICBhc3luYyBfaW52b2tlKGlucHV0cywgY29uZmlnLCBydW5NYW5hZ2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvdW5kLmJhdGNoKGlucHV0cywgdGhpcy5fcGF0Y2hDb25maWcoY29uZmlnLCBydW5NYW5hZ2VyPy5nZXRDaGlsZCgpKSk7XG4gICAgfVxufVxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBydW5uYWJsZXMgdGhhdCBjYW4gYmUgcmV0cmllZCBhXG4gKiBzcGVjaWZpZWQgbnVtYmVyIG9mIHRpbWVzLlxuICovXG5leHBvcnQgY2xhc3MgUnVubmFibGVSZXRyeSBleHRlbmRzIFJ1bm5hYmxlQmluZGluZyB7XG4gICAgc3RhdGljIGxjX25hbWUoKSB7XG4gICAgICAgIHJldHVybiBcIlJ1bm5hYmxlUmV0cnlcIjtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoZmllbGRzKSB7XG4gICAgICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImxjX25hbWVzcGFjZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogW1wibGFuZ2NoYWluXCIsIFwic2NoZW1hXCIsIFwicnVubmFibGVcIl1cbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm1heEF0dGVtcHROdW1iZXJcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IDNcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm9uRmFpbGVkQXR0ZW1wdFwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogKCkgPT4geyB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm1heEF0dGVtcHROdW1iZXIgPSBmaWVsZHMubWF4QXR0ZW1wdE51bWJlciA/PyB0aGlzLm1heEF0dGVtcHROdW1iZXI7XG4gICAgICAgIHRoaXMub25GYWlsZWRBdHRlbXB0ID0gZmllbGRzLm9uRmFpbGVkQXR0ZW1wdCA/PyB0aGlzLm9uRmFpbGVkQXR0ZW1wdDtcbiAgICB9XG4gICAgX3BhdGNoQ29uZmlnRm9yUmV0cnkoYXR0ZW1wdCwgY29uZmlnLCBydW5NYW5hZ2VyKSB7XG4gICAgICAgIGNvbnN0IHRhZyA9IGF0dGVtcHQgPiAxID8gYHJldHJ5OmF0dGVtcHQ6JHthdHRlbXB0fWAgOiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRjaENvbmZpZyhjb25maWcsIHJ1bk1hbmFnZXI/LmdldENoaWxkKHRhZykpO1xuICAgIH1cbiAgICBhc3luYyBfaW52b2tlKGlucHV0LCBjb25maWcsIHJ1bk1hbmFnZXIpIHtcbiAgICAgICAgcmV0dXJuIHBSZXRyeSgoYXR0ZW1wdE51bWJlcikgPT4gc3VwZXIuaW52b2tlKGlucHV0LCB0aGlzLl9wYXRjaENvbmZpZ0ZvclJldHJ5KGF0dGVtcHROdW1iZXIsIGNvbmZpZywgcnVuTWFuYWdlcikpLCB7XG4gICAgICAgICAgICBvbkZhaWxlZEF0dGVtcHQ6IHRoaXMub25GYWlsZWRBdHRlbXB0LFxuICAgICAgICAgICAgcmV0cmllczogTWF0aC5tYXgodGhpcy5tYXhBdHRlbXB0TnVtYmVyIC0gMSwgMCksXG4gICAgICAgICAgICByYW5kb21pemU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdGhhdCBpbnZva2VzIHRoZSBydW5uYWJsZSB3aXRoIHRoZSBzcGVjaWZpZWQgaW5wdXQsIHJ1biBtYW5hZ2VyLFxuICAgICAqIGFuZCBjb25maWcuIEl0IGhhbmRsZXMgdGhlIHJldHJ5IGxvZ2ljIGJ5IGNhdGNoaW5nIGFueSBlcnJvcnMgYW5kXG4gICAgICogcmVjdXJzaXZlbHkgaW52b2tpbmcgaXRzZWxmIHdpdGggdGhlIHVwZGF0ZWQgY29uZmlnIGZvciB0aGUgbmV4dCByZXRyeVxuICAgICAqIGF0dGVtcHQuXG4gICAgICogQHBhcmFtIGlucHV0IFRoZSBpbnB1dCBmb3IgdGhlIHJ1bm5hYmxlLlxuICAgICAqIEBwYXJhbSBydW5NYW5hZ2VyIFRoZSBydW4gbWFuYWdlciBmb3IgdGhlIHJ1bm5hYmxlLlxuICAgICAqIEBwYXJhbSBjb25maWcgVGhlIGNvbmZpZyBmb3IgdGhlIHJ1bm5hYmxlLlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBvdXRwdXQgb2YgdGhlIHJ1bm5hYmxlLlxuICAgICAqL1xuICAgIGFzeW5jIGludm9rZShpbnB1dCwgY29uZmlnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxsV2l0aENvbmZpZyh0aGlzLl9pbnZva2UsIGlucHV0LCBjb25maWcpO1xuICAgIH1cbiAgICBhc3luYyBfYmF0Y2goaW5wdXRzLCBjb25maWdzLCBydW5NYW5hZ2VycywgYmF0Y2hPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHNNYXAgPSB7fTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHBSZXRyeShhc3luYyAoYXR0ZW1wdE51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlbWFpbmluZ0luZGV4ZXMgPSBpbnB1dHNcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoXywgaSkgPT4gaSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoaSkgPT4gcmVzdWx0c01hcFtpLnRvU3RyaW5nKCldID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWluc3RhbmNlb2Yvbm8taW5zdGFuY2VvZlxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzTWFwW2kudG9TdHJpbmcoKV0gaW5zdGFuY2VvZiBFcnJvcik7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVtYWluaW5nSW5wdXRzID0gcmVtYWluaW5nSW5kZXhlcy5tYXAoKGkpID0+IGlucHV0c1tpXSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0Y2hlZENvbmZpZ3MgPSByZW1haW5pbmdJbmRleGVzLm1hcCgoaSkgPT4gdGhpcy5fcGF0Y2hDb25maWdGb3JSZXRyeShhdHRlbXB0TnVtYmVyLCBjb25maWdzPy5baV0sIHJ1bk1hbmFnZXJzPy5baV0pKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgc3VwZXIuYmF0Y2gocmVtYWluaW5nSW5wdXRzLCBwYXRjaGVkQ29uZmlncywge1xuICAgICAgICAgICAgICAgICAgICAuLi5iYXRjaE9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIHJldHVybkV4Y2VwdGlvbnM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0RXhjZXB0aW9uO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW2ldO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRNYXBJbmRleCA9IHJlbWFpbmluZ0luZGV4ZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1pbnN0YW5jZW9mL25vLWluc3RhbmNlb2ZcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3RFeGNlcHRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RXhjZXB0aW9uID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNNYXBbcmVzdWx0TWFwSW5kZXgudG9TdHJpbmcoKV0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmaXJzdEV4Y2VwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBmaXJzdEV4Y2VwdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgb25GYWlsZWRBdHRlbXB0OiB0aGlzLm9uRmFpbGVkQXR0ZW1wdCxcbiAgICAgICAgICAgICAgICByZXRyaWVzOiBNYXRoLm1heCh0aGlzLm1heEF0dGVtcHROdW1iZXIgLSAxLCAwKSxcbiAgICAgICAgICAgICAgICByYW5kb21pemU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKGJhdGNoT3B0aW9ucz8ucmV0dXJuRXhjZXB0aW9ucyAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHJlc3VsdHNNYXApXG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gcGFyc2VJbnQoYSwgMTApIC0gcGFyc2VJbnQoYiwgMTApKVxuICAgICAgICAgICAgLm1hcCgoa2V5KSA9PiByZXN1bHRzTWFwW3BhcnNlSW50KGtleSwgMTApXSk7XG4gICAgfVxuICAgIGFzeW5jIGJhdGNoKGlucHV0cywgb3B0aW9ucywgYmF0Y2hPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iYXRjaFdpdGhDb25maWcodGhpcy5fYmF0Y2guYmluZCh0aGlzKSwgaW5wdXRzLCBvcHRpb25zLCBiYXRjaE9wdGlvbnMpO1xuICAgIH1cbn1cbi8qKlxuICogQSBzZXF1ZW5jZSBvZiBydW5uYWJsZXMsIHdoZXJlIHRoZSBvdXRwdXQgb2YgZWFjaCBpcyB0aGUgaW5wdXQgb2YgdGhlIG5leHQuXG4gKi9cbmV4cG9ydCBjbGFzcyBSdW5uYWJsZVNlcXVlbmNlIGV4dGVuZHMgUnVubmFibGUge1xuICAgIHN0YXRpYyBsY19uYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJSdW5uYWJsZVNlcXVlbmNlXCI7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGZpZWxkcykge1xuICAgICAgICBzdXBlcihmaWVsZHMpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJmaXJzdFwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJtaWRkbGVcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IFtdXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJsYXN0XCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImxjX3NlcmlhbGl6YWJsZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibGNfbmFtZXNwYWNlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBbXCJsYW5nY2hhaW5cIiwgXCJzY2hlbWFcIiwgXCJydW5uYWJsZVwiXVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5maXJzdCA9IGZpZWxkcy5maXJzdDtcbiAgICAgICAgdGhpcy5taWRkbGUgPSBmaWVsZHMubWlkZGxlID8/IHRoaXMubWlkZGxlO1xuICAgICAgICB0aGlzLmxhc3QgPSBmaWVsZHMubGFzdDtcbiAgICB9XG4gICAgZ2V0IHN0ZXBzKCkge1xuICAgICAgICByZXR1cm4gW3RoaXMuZmlyc3QsIC4uLnRoaXMubWlkZGxlLCB0aGlzLmxhc3RdO1xuICAgIH1cbiAgICBhc3luYyBpbnZva2UoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tNYW5hZ2VyXyA9IGF3YWl0IGdldENhbGxiYWNrTWFuZ2VyRm9yQ29uZmlnKG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBydW5NYW5hZ2VyID0gYXdhaXQgY2FsbGJhY2tNYW5hZ2VyXz8uaGFuZGxlQ2hhaW5TdGFydCh0aGlzLnRvSlNPTigpLCBfY29lcmNlVG9EaWN0KGlucHV0LCBcImlucHV0XCIpKTtcbiAgICAgICAgbGV0IG5leHRTdGVwSW5wdXQgPSBpbnB1dDtcbiAgICAgICAgbGV0IGZpbmFsT3V0cHV0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFN0ZXBzID0gW3RoaXMuZmlyc3QsIC4uLnRoaXMubWlkZGxlXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5pdGlhbFN0ZXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcCA9IGluaXRpYWxTdGVwc1tpXTtcbiAgICAgICAgICAgICAgICBuZXh0U3RlcElucHV0ID0gYXdhaXQgc3RlcC5pbnZva2UobmV4dFN0ZXBJbnB1dCwgdGhpcy5fcGF0Y2hDb25maWcob3B0aW9ucywgcnVuTWFuYWdlcj8uZ2V0Q2hpbGQoYHNlcTpzdGVwOiR7aSArIDF9YCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFR5cGVTY3JpcHQgY2FuJ3QgZGV0ZWN0IHRoYXQgdGhlIGxhc3Qgb3V0cHV0IG9mIHRoZSBzZXF1ZW5jZSByZXR1cm5zIFJ1bk91dHB1dCwgc28gY2FsbCBpdCBvdXQgb2YgdGhlIGxvb3AgaGVyZVxuICAgICAgICAgICAgZmluYWxPdXRwdXQgPSBhd2FpdCB0aGlzLmxhc3QuaW52b2tlKG5leHRTdGVwSW5wdXQsIHRoaXMuX3BhdGNoQ29uZmlnKG9wdGlvbnMsIHJ1bk1hbmFnZXI/LmdldENoaWxkKGBzZXE6c3RlcDoke3RoaXMuc3RlcHMubGVuZ3RofWApKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGF3YWl0IHJ1bk1hbmFnZXI/LmhhbmRsZUNoYWluRXJyb3IoZSk7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHJ1bk1hbmFnZXI/LmhhbmRsZUNoYWluRW5kKF9jb2VyY2VUb0RpY3QoZmluYWxPdXRwdXQsIFwib3V0cHV0XCIpKTtcbiAgICAgICAgcmV0dXJuIGZpbmFsT3V0cHV0O1xuICAgIH1cbiAgICBhc3luYyBiYXRjaChpbnB1dHMsIG9wdGlvbnMsIGJhdGNoT3B0aW9ucykge1xuICAgICAgICBjb25zdCBjb25maWdMaXN0ID0gdGhpcy5fZ2V0T3B0aW9uc0xpc3Qob3B0aW9ucyA/PyB7fSwgaW5wdXRzLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrTWFuYWdlcnMgPSBhd2FpdCBQcm9taXNlLmFsbChjb25maWdMaXN0Lm1hcChnZXRDYWxsYmFja01hbmdlckZvckNvbmZpZykpO1xuICAgICAgICBjb25zdCBydW5NYW5hZ2VycyA9IGF3YWl0IFByb21pc2UuYWxsKGNhbGxiYWNrTWFuYWdlcnMubWFwKChjYWxsYmFja01hbmFnZXIsIGkpID0+IGNhbGxiYWNrTWFuYWdlcj8uaGFuZGxlQ2hhaW5TdGFydCh0aGlzLnRvSlNPTigpLCBfY29lcmNlVG9EaWN0KGlucHV0c1tpXSwgXCJpbnB1dFwiKSkpKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgbGV0IG5leHRTdGVwSW5wdXRzID0gaW5wdXRzO1xuICAgICAgICBsZXQgZmluYWxPdXRwdXRzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFN0ZXBzID0gW3RoaXMuZmlyc3QsIC4uLnRoaXMubWlkZGxlXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5pdGlhbFN0ZXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcCA9IGluaXRpYWxTdGVwc1tpXTtcbiAgICAgICAgICAgICAgICBuZXh0U3RlcElucHV0cyA9IGF3YWl0IHN0ZXAuYmF0Y2gobmV4dFN0ZXBJbnB1dHMsIHJ1bk1hbmFnZXJzLm1hcCgocnVuTWFuYWdlciwgaikgPT4gdGhpcy5fcGF0Y2hDb25maWcoY29uZmlnTGlzdFtqXSwgcnVuTWFuYWdlcj8uZ2V0Q2hpbGQoYHNlcTpzdGVwOiR7aSArIDF9YCkpKSwgYmF0Y2hPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsT3V0cHV0cyA9IGF3YWl0IHRoaXMubGFzdC5iYXRjaChuZXh0U3RlcElucHV0cywgcnVuTWFuYWdlcnMubWFwKChydW5NYW5hZ2VyKSA9PiB0aGlzLl9wYXRjaENvbmZpZyhjb25maWdMaXN0W3RoaXMuc3RlcHMubGVuZ3RoIC0gMV0sIHJ1bk1hbmFnZXI/LmdldENoaWxkKGBzZXE6c3RlcDoke3RoaXMuc3RlcHMubGVuZ3RofWApKSksIGJhdGNoT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHJ1bk1hbmFnZXJzLm1hcCgocnVuTWFuYWdlcikgPT4gcnVuTWFuYWdlcj8uaGFuZGxlQ2hhaW5FcnJvcihlKSkpO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChydW5NYW5hZ2Vycy5tYXAoKHJ1bk1hbmFnZXIsIGkpID0+IHJ1bk1hbmFnZXI/LmhhbmRsZUNoYWluRW5kKF9jb2VyY2VUb0RpY3QoZmluYWxPdXRwdXRzW2ldLCBcIm91dHB1dFwiKSkpKTtcbiAgICAgICAgcmV0dXJuIGZpbmFsT3V0cHV0cztcbiAgICB9XG4gICAgYXN5bmMgKl9zdHJlYW1JdGVyYXRvcihpbnB1dCwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBjYWxsYmFja01hbmFnZXJfID0gYXdhaXQgZ2V0Q2FsbGJhY2tNYW5nZXJGb3JDb25maWcob3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHJ1bk1hbmFnZXIgPSBhd2FpdCBjYWxsYmFja01hbmFnZXJfPy5oYW5kbGVDaGFpblN0YXJ0KHRoaXMudG9KU09OKCksIF9jb2VyY2VUb0RpY3QoaW5wdXQsIFwiaW5wdXRcIikpO1xuICAgICAgICBsZXQgbmV4dFN0ZXBJbnB1dCA9IGlucHV0O1xuICAgICAgICBjb25zdCBzdGVwcyA9IFt0aGlzLmZpcnN0LCAuLi50aGlzLm1pZGRsZSwgdGhpcy5sYXN0XTtcbiAgICAgICAgLy8gRmluZCB0aGUgaW5kZXggb2YgdGhlIGxhc3QgcnVubmFibGUgaW4gdGhlIHNlcXVlbmNlIHRoYXQgZG9lc24ndCBoYXZlIGFuIG92ZXJyaWRkZW4gLnRyYW5zZm9ybSgpIG1ldGhvZFxuICAgICAgICAvLyBhbmQgc3RhcnQgc3RyZWFtaW5nIGZyb20gdGhlcmVcbiAgICAgICAgY29uc3Qgc3RyZWFtaW5nU3RhcnRTdGVwSW5kZXggPSBNYXRoLm1pbihzdGVwcy5sZW5ndGggLSAxLCBzdGVwcy5sZW5ndGggLVxuICAgICAgICAgICAgWy4uLnN0ZXBzXS5yZXZlcnNlKCkuZmluZEluZGV4KChzdGVwKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNEZWZhdWx0SW1wbGVtZW50YXRpb24gPSBzdGVwLnRyYW5zZm9ybSA9PT0gUnVubmFibGUucHJvdG90eXBlLnRyYW5zZm9ybTtcbiAgICAgICAgICAgICAgICBjb25zdCBib3VuZFJ1bm5hYmxlSXNEZWZhdWx0SW1wbGVtZW50YXRpb24gPSBSdW5uYWJsZUJpbmRpbmcuaXNSdW5uYWJsZUJpbmRpbmcoc3RlcCkgJiZcbiAgICAgICAgICAgICAgICAgICAgc3RlcC5ib3VuZD8udHJhbnNmb3JtID09PSBSdW5uYWJsZS5wcm90b3R5cGUudHJhbnNmb3JtO1xuICAgICAgICAgICAgICAgIHJldHVybiAoaXNEZWZhdWx0SW1wbGVtZW50YXRpb24gfHwgYm91bmRSdW5uYWJsZUlzRGVmYXVsdEltcGxlbWVudGF0aW9uKTtcbiAgICAgICAgICAgIH0pIC1cbiAgICAgICAgICAgIDEpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgaW52b2tlU3RlcHMgPSBzdGVwcy5zbGljZSgwLCBzdHJlYW1pbmdTdGFydFN0ZXBJbmRleCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGludm9rZVN0ZXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcCA9IGludm9rZVN0ZXBzW2ldO1xuICAgICAgICAgICAgICAgIG5leHRTdGVwSW5wdXQgPSBhd2FpdCBzdGVwLmludm9rZShuZXh0U3RlcElucHV0LCB0aGlzLl9wYXRjaENvbmZpZyhvcHRpb25zLCBydW5NYW5hZ2VyPy5nZXRDaGlsZChgc2VxOnN0ZXA6JHtpICsgMX1gKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBhd2FpdCBydW5NYW5hZ2VyPy5oYW5kbGVDaGFpbkVycm9yKGUpO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29uY2F0U3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgbGV0IGZpbmFsT3V0cHV0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGZpbmFsR2VuZXJhdG9yID0gYXdhaXQgc3RlcHNbc3RyZWFtaW5nU3RhcnRTdGVwSW5kZXhdLl9zdHJlYW1JdGVyYXRvcihuZXh0U3RlcElucHV0LCB0aGlzLl9wYXRjaENvbmZpZyhvcHRpb25zLCBydW5NYW5hZ2VyPy5nZXRDaGlsZChgc2VxOnN0ZXA6JHtzdHJlYW1pbmdTdGFydFN0ZXBJbmRleCArIDF9YCkpKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbmFsU3RlcHMgPSBzdGVwcy5zbGljZShzdHJlYW1pbmdTdGFydFN0ZXBJbmRleCArIDEpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaW5hbFN0ZXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcCA9IGZpbmFsU3RlcHNbaV07XG4gICAgICAgICAgICAgICAgZmluYWxHZW5lcmF0b3IgPSBhd2FpdCBzdGVwLnRyYW5zZm9ybShmaW5hbEdlbmVyYXRvciwgdGhpcy5fcGF0Y2hDb25maWcob3B0aW9ucywgcnVuTWFuYWdlcj8uZ2V0Q2hpbGQoYHNlcTpzdGVwOiR7c3RyZWFtaW5nU3RhcnRTdGVwSW5kZXggKyBpICsgMn1gKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBmaW5hbEdlbmVyYXRvcikge1xuICAgICAgICAgICAgICAgIHlpZWxkIGNodW5rO1xuICAgICAgICAgICAgICAgIGlmIChjb25jYXRTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsT3V0cHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsT3V0cHV0ID0gY2h1bms7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxPdXRwdXQgPSBmaW5hbE91dHB1dC5jb25jYXQoY2h1bmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbE91dHB1dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25jYXRTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYXdhaXQgcnVuTWFuYWdlcj8uaGFuZGxlQ2hhaW5FcnJvcihlKTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgcnVuTWFuYWdlcj8uaGFuZGxlQ2hhaW5FbmQoX2NvZXJjZVRvRGljdChmaW5hbE91dHB1dCwgXCJvdXRwdXRcIikpO1xuICAgIH1cbiAgICBwaXBlKGNvZXJjZWFibGUpIHtcbiAgICAgICAgaWYgKFJ1bm5hYmxlU2VxdWVuY2UuaXNSdW5uYWJsZVNlcXVlbmNlKGNvZXJjZWFibGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJ1bm5hYmxlU2VxdWVuY2Uoe1xuICAgICAgICAgICAgICAgIGZpcnN0OiB0aGlzLmZpcnN0LFxuICAgICAgICAgICAgICAgIG1pZGRsZTogdGhpcy5taWRkbGUuY29uY2F0KFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0LFxuICAgICAgICAgICAgICAgICAgICBjb2VyY2VhYmxlLmZpcnN0LFxuICAgICAgICAgICAgICAgICAgICAuLi5jb2VyY2VhYmxlLm1pZGRsZSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBsYXN0OiBjb2VyY2VhYmxlLmxhc3QsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUnVubmFibGVTZXF1ZW5jZSh7XG4gICAgICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXG4gICAgICAgICAgICAgICAgbWlkZGxlOiBbLi4udGhpcy5taWRkbGUsIHRoaXMubGFzdF0sXG4gICAgICAgICAgICAgICAgbGFzdDogX2NvZXJjZVRvUnVubmFibGUoY29lcmNlYWJsZSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHN0YXRpYyBpc1J1bm5hYmxlU2VxdWVuY2UodGhpbmcpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGhpbmcubWlkZGxlKSAmJiBSdW5uYWJsZS5pc1J1bm5hYmxlKHRoaW5nKTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBzdGF0aWMgZnJvbShbZmlyc3QsIC4uLnJ1bm5hYmxlc10pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSdW5uYWJsZVNlcXVlbmNlKHtcbiAgICAgICAgICAgIGZpcnN0OiBfY29lcmNlVG9SdW5uYWJsZShmaXJzdCksXG4gICAgICAgICAgICBtaWRkbGU6IHJ1bm5hYmxlcy5zbGljZSgwLCAtMSkubWFwKF9jb2VyY2VUb1J1bm5hYmxlKSxcbiAgICAgICAgICAgIGxhc3Q6IF9jb2VyY2VUb1J1bm5hYmxlKHJ1bm5hYmxlc1tydW5uYWJsZXMubGVuZ3RoIC0gMV0pLFxuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIEEgcnVubmFibGUgdGhhdCBydW5zIGEgbWFwcGluZyBvZiBydW5uYWJsZXMgaW4gcGFyYWxsZWwsXG4gKiBhbmQgcmV0dXJucyBhIG1hcHBpbmcgb2YgdGhlaXIgb3V0cHV0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJ1bm5hYmxlTWFwIGV4dGVuZHMgUnVubmFibGUge1xuICAgIHN0YXRpYyBsY19uYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJSdW5uYWJsZU1hcFwiO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihmaWVsZHMpIHtcbiAgICAgICAgc3VwZXIoZmllbGRzKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibGNfbmFtZXNwYWNlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBbXCJsYW5nY2hhaW5cIiwgXCJzY2hlbWFcIiwgXCJydW5uYWJsZVwiXVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibGNfc2VyaWFsaXphYmxlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJzdGVwc1wiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN0ZXBzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGZpZWxkcy5zdGVwcykpIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcHNba2V5XSA9IF9jb2VyY2VUb1J1bm5hYmxlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBpbnZva2UoaW5wdXQsIG9wdGlvbnNcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICkge1xuICAgICAgICBjb25zdCBjYWxsYmFja01hbmFnZXJfID0gYXdhaXQgZ2V0Q2FsbGJhY2tNYW5nZXJGb3JDb25maWcob3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHJ1bk1hbmFnZXIgPSBhd2FpdCBjYWxsYmFja01hbmFnZXJfPy5oYW5kbGVDaGFpblN0YXJ0KHRoaXMudG9KU09OKCksIHtcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0ge307XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHJ1bm5hYmxlXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLnN0ZXBzKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJ1bm5hYmxlLmludm9rZShpbnB1dCwgdGhpcy5fcGF0Y2hDb25maWcob3B0aW9ucywgcnVuTWFuYWdlcj8uZ2V0Q2hpbGQoKSkpO1xuICAgICAgICAgICAgICAgIG91dHB1dFtrZXldID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBhd2FpdCBydW5NYW5hZ2VyPy5oYW5kbGVDaGFpbkVycm9yKGUpO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBydW5NYW5hZ2VyPy5oYW5kbGVDaGFpbkVuZChvdXRwdXQpO1xuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cbn1cbi8qKlxuICogQSBydW5uYWJsZSB0aGF0IHJ1bnMgYSBjYWxsYWJsZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJ1bm5hYmxlTGFtYmRhIGV4dGVuZHMgUnVubmFibGUge1xuICAgIHN0YXRpYyBsY19uYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJSdW5uYWJsZUxhbWJkYVwiO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihmaWVsZHMpIHtcbiAgICAgICAgc3VwZXIoZmllbGRzKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibGNfbmFtZXNwYWNlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBbXCJsYW5nY2hhaW5cIiwgXCJzY2hlbWFcIiwgXCJydW5uYWJsZVwiXVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZnVuY1wiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZ1bmMgPSBmaWVsZHMuZnVuYztcbiAgICB9XG4gICAgYXN5bmMgX2ludm9rZShpbnB1dCwgY29uZmlnLCBydW5NYW5hZ2VyKSB7XG4gICAgICAgIGxldCBvdXRwdXQgPSBhd2FpdCB0aGlzLmZ1bmMoaW5wdXQpO1xuICAgICAgICBpZiAob3V0cHV0ICYmIFJ1bm5hYmxlLmlzUnVubmFibGUob3V0cHV0KSkge1xuICAgICAgICAgICAgb3V0cHV0ID0gYXdhaXQgb3V0cHV0Lmludm9rZShpbnB1dCwgdGhpcy5fcGF0Y2hDb25maWcoY29uZmlnLCBydW5NYW5hZ2VyPy5nZXRDaGlsZCgpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG4gICAgYXN5bmMgaW52b2tlKGlucHV0LCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxsV2l0aENvbmZpZyh0aGlzLl9pbnZva2UsIGlucHV0LCBvcHRpb25zKTtcbiAgICB9XG59XG4vKipcbiAqIEEgUnVubmFibGUgdGhhdCBjYW4gZmFsbGJhY2sgdG8gb3RoZXIgUnVubmFibGVzIGlmIGl0IGZhaWxzLlxuICovXG5leHBvcnQgY2xhc3MgUnVubmFibGVXaXRoRmFsbGJhY2tzIGV4dGVuZHMgUnVubmFibGUge1xuICAgIHN0YXRpYyBsY19uYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJSdW5uYWJsZVdpdGhGYWxsYmFja3NcIjtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoZmllbGRzKSB7XG4gICAgICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImxjX25hbWVzcGFjZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogW1wibGFuZ2NoYWluXCIsIFwic2NoZW1hXCIsIFwicnVubmFibGVcIl1cbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImxjX3NlcmlhbGl6YWJsZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwicnVubmFibGVcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZmFsbGJhY2tzXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucnVubmFibGUgPSBmaWVsZHMucnVubmFibGU7XG4gICAgICAgIHRoaXMuZmFsbGJhY2tzID0gZmllbGRzLmZhbGxiYWNrcztcbiAgICB9XG4gICAgKnJ1bm5hYmxlcygpIHtcbiAgICAgICAgeWllbGQgdGhpcy5ydW5uYWJsZTtcbiAgICAgICAgZm9yIChjb25zdCBmYWxsYmFjayBvZiB0aGlzLmZhbGxiYWNrcykge1xuICAgICAgICAgICAgeWllbGQgZmFsbGJhY2s7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgaW52b2tlKGlucHV0LCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrTWFuYWdlcl8gPSBhd2FpdCBDYWxsYmFja01hbmFnZXIuY29uZmlndXJlKG9wdGlvbnM/LmNhbGxiYWNrcywgdW5kZWZpbmVkLCBvcHRpb25zPy50YWdzLCB1bmRlZmluZWQsIG9wdGlvbnM/Lm1ldGFkYXRhKTtcbiAgICAgICAgY29uc3QgcnVuTWFuYWdlciA9IGF3YWl0IGNhbGxiYWNrTWFuYWdlcl8/LmhhbmRsZUNoYWluU3RhcnQodGhpcy50b0pTT04oKSwgX2NvZXJjZVRvRGljdChpbnB1dCwgXCJpbnB1dFwiKSk7XG4gICAgICAgIGxldCBmaXJzdEVycm9yO1xuICAgICAgICBmb3IgKGNvbnN0IHJ1bm5hYmxlIG9mIHRoaXMucnVubmFibGVzKCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgcnVubmFibGUuaW52b2tlKGlucHV0LCB0aGlzLl9wYXRjaENvbmZpZyhvcHRpb25zLCBydW5NYW5hZ2VyPy5nZXRDaGlsZCgpKSk7XG4gICAgICAgICAgICAgICAgYXdhaXQgcnVuTWFuYWdlcj8uaGFuZGxlQ2hhaW5FbmQoX2NvZXJjZVRvRGljdChvdXRwdXQsIFwib3V0cHV0XCIpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RFcnJvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RXJyb3IgPSBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlyc3RFcnJvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBlcnJvciBzdG9yZWQgYXQgZW5kIG9mIGZhbGxiYWNrLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBydW5NYW5hZ2VyPy5oYW5kbGVDaGFpbkVycm9yKGZpcnN0RXJyb3IpO1xuICAgICAgICB0aHJvdyBmaXJzdEVycm9yO1xuICAgIH1cbiAgICBhc3luYyBiYXRjaChpbnB1dHMsIG9wdGlvbnMsIGJhdGNoT3B0aW9ucykge1xuICAgICAgICBpZiAoYmF0Y2hPcHRpb25zPy5yZXR1cm5FeGNlcHRpb25zKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbmZpZ0xpc3QgPSB0aGlzLl9nZXRPcHRpb25zTGlzdChvcHRpb25zID8/IHt9LCBpbnB1dHMubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tNYW5hZ2VycyA9IGF3YWl0IFByb21pc2UuYWxsKGNvbmZpZ0xpc3QubWFwKChjb25maWcpID0+IENhbGxiYWNrTWFuYWdlci5jb25maWd1cmUoY29uZmlnPy5jYWxsYmFja3MsIHVuZGVmaW5lZCwgY29uZmlnPy50YWdzLCB1bmRlZmluZWQsIGNvbmZpZz8ubWV0YWRhdGEpKSk7XG4gICAgICAgIGNvbnN0IHJ1bk1hbmFnZXJzID0gYXdhaXQgUHJvbWlzZS5hbGwoY2FsbGJhY2tNYW5hZ2Vycy5tYXAoKGNhbGxiYWNrTWFuYWdlciwgaSkgPT4gY2FsbGJhY2tNYW5hZ2VyPy5oYW5kbGVDaGFpblN0YXJ0KHRoaXMudG9KU09OKCksIF9jb2VyY2VUb0RpY3QoaW5wdXRzW2ldLCBcImlucHV0XCIpKSkpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBsZXQgZmlyc3RFcnJvcjtcbiAgICAgICAgZm9yIChjb25zdCBydW5uYWJsZSBvZiB0aGlzLnJ1bm5hYmxlcygpKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG91dHB1dHMgPSBhd2FpdCBydW5uYWJsZS5iYXRjaChpbnB1dHMsIHJ1bk1hbmFnZXJzLm1hcCgocnVuTWFuYWdlciwgaikgPT4gdGhpcy5fcGF0Y2hDb25maWcoY29uZmlnTGlzdFtqXSwgcnVuTWFuYWdlcj8uZ2V0Q2hpbGQoKSkpLCBiYXRjaE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHJ1bk1hbmFnZXJzLm1hcCgocnVuTWFuYWdlciwgaSkgPT4gcnVuTWFuYWdlcj8uaGFuZGxlQ2hhaW5FbmQoX2NvZXJjZVRvRGljdChvdXRwdXRzW2ldLCBcIm91dHB1dFwiKSkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0cHV0cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RXJyb3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdEVycm9yID0gZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmaXJzdEVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBlcnJvciBzdG9yZWQgYXQgZW5kIG9mIGZhbGxiYWNrcy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocnVuTWFuYWdlcnMubWFwKChydW5NYW5hZ2VyKSA9PiBydW5NYW5hZ2VyPy5oYW5kbGVDaGFpbkVycm9yKGZpcnN0RXJyb3IpKSk7XG4gICAgICAgIHRocm93IGZpcnN0RXJyb3I7XG4gICAgfVxufVxuLy8gVE9ETzogRmlndXJlIG91dCB3aHkgdGhlIGNvbXBpbGVyIG5lZWRzIGhlbHAgZWxpbWluYXRpbmcgRXJyb3IgYXMgYSBSdW5PdXRwdXQgdHlwZVxuZXhwb3J0IGZ1bmN0aW9uIF9jb2VyY2VUb1J1bm5hYmxlKGNvZXJjZWFibGUpIHtcbiAgICBpZiAodHlwZW9mIGNvZXJjZWFibGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gbmV3IFJ1bm5hYmxlTGFtYmRhKHsgZnVuYzogY29lcmNlYWJsZSB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoUnVubmFibGUuaXNSdW5uYWJsZShjb2VyY2VhYmxlKSkge1xuICAgICAgICByZXR1cm4gY29lcmNlYWJsZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoY29lcmNlYWJsZSkgJiYgdHlwZW9mIGNvZXJjZWFibGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY29uc3QgcnVubmFibGVzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGNvZXJjZWFibGUpKSB7XG4gICAgICAgICAgICBydW5uYWJsZXNba2V5XSA9IF9jb2VyY2VUb1J1bm5hYmxlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFJ1bm5hYmxlTWFwKHtcbiAgICAgICAgICAgIHN0ZXBzOiBydW5uYWJsZXMsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhIFJ1bm5hYmxlLCBmdW5jdGlvbiBvciBvYmplY3QuXFxuSW5zdGVhZCBnb3QgYW4gdW5zdXBwb3J0ZWQgdHlwZS5gKTtcbiAgICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCByZXRyeSA9IHJlcXVpcmUoJ3JldHJ5Jyk7XG5cbmNvbnN0IG5ldHdvcmtFcnJvck1zZ3MgPSBbXG5cdCdGYWlsZWQgdG8gZmV0Y2gnLCAvLyBDaHJvbWVcblx0J05ldHdvcmtFcnJvciB3aGVuIGF0dGVtcHRpbmcgdG8gZmV0Y2ggcmVzb3VyY2UuJywgLy8gRmlyZWZveFxuXHQnVGhlIEludGVybmV0IGNvbm5lY3Rpb24gYXBwZWFycyB0byBiZSBvZmZsaW5lLicsIC8vIFNhZmFyaVxuXHQnTmV0d29yayByZXF1ZXN0IGZhaWxlZCcgLy8gYGNyb3NzLWZldGNoYFxuXTtcblxuY2xhc3MgQWJvcnRFcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IobWVzc2FnZSkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHRpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0XHR0aGlzLm9yaWdpbmFsRXJyb3IgPSBtZXNzYWdlO1xuXHRcdFx0KHttZXNzYWdlfSA9IG1lc3NhZ2UpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLm9yaWdpbmFsRXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG5cdFx0XHR0aGlzLm9yaWdpbmFsRXJyb3Iuc3RhY2sgPSB0aGlzLnN0YWNrO1xuXHRcdH1cblxuXHRcdHRoaXMubmFtZSA9ICdBYm9ydEVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9XG59XG5cbmNvbnN0IGRlY29yYXRlRXJyb3JXaXRoQ291bnRzID0gKGVycm9yLCBhdHRlbXB0TnVtYmVyLCBvcHRpb25zKSA9PiB7XG5cdC8vIE1pbnVzIDEgZnJvbSBhdHRlbXB0TnVtYmVyIGJlY2F1c2UgdGhlIGZpcnN0IGF0dGVtcHQgZG9lcyBub3QgY291bnQgYXMgYSByZXRyeVxuXHRjb25zdCByZXRyaWVzTGVmdCA9IG9wdGlvbnMucmV0cmllcyAtIChhdHRlbXB0TnVtYmVyIC0gMSk7XG5cblx0ZXJyb3IuYXR0ZW1wdE51bWJlciA9IGF0dGVtcHROdW1iZXI7XG5cdGVycm9yLnJldHJpZXNMZWZ0ID0gcmV0cmllc0xlZnQ7XG5cdHJldHVybiBlcnJvcjtcbn07XG5cbmNvbnN0IGlzTmV0d29ya0Vycm9yID0gZXJyb3JNZXNzYWdlID0+IG5ldHdvcmtFcnJvck1zZ3MuaW5jbHVkZXMoZXJyb3JNZXNzYWdlKTtcblxuY29uc3QgcFJldHJ5ID0gKGlucHV0LCBvcHRpb25zKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdG9wdGlvbnMgPSB7XG5cdFx0b25GYWlsZWRBdHRlbXB0OiAoKSA9PiB7fSxcblx0XHRyZXRyaWVzOiAxMCxcblx0XHQuLi5vcHRpb25zXG5cdH07XG5cblx0Y29uc3Qgb3BlcmF0aW9uID0gcmV0cnkub3BlcmF0aW9uKG9wdGlvbnMpO1xuXG5cdG9wZXJhdGlvbi5hdHRlbXB0KGFzeW5jIGF0dGVtcHROdW1iZXIgPT4ge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXNvbHZlKGF3YWl0IGlucHV0KGF0dGVtcHROdW1iZXIpKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0aWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcblx0XHRcdFx0cmVqZWN0KG5ldyBUeXBlRXJyb3IoYE5vbi1lcnJvciB3YXMgdGhyb3duOiBcIiR7ZXJyb3J9XCIuIFlvdSBzaG91bGQgb25seSB0aHJvdyBlcnJvcnMuYCkpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIEFib3J0RXJyb3IpIHtcblx0XHRcdFx0b3BlcmF0aW9uLnN0b3AoKTtcblx0XHRcdFx0cmVqZWN0KGVycm9yLm9yaWdpbmFsRXJyb3IpO1xuXHRcdFx0fSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIFR5cGVFcnJvciAmJiAhaXNOZXR3b3JrRXJyb3IoZXJyb3IubWVzc2FnZSkpIHtcblx0XHRcdFx0b3BlcmF0aW9uLnN0b3AoKTtcblx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlY29yYXRlRXJyb3JXaXRoQ291bnRzKGVycm9yLCBhdHRlbXB0TnVtYmVyLCBvcHRpb25zKTtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGF3YWl0IG9wdGlvbnMub25GYWlsZWRBdHRlbXB0KGVycm9yKTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICghb3BlcmF0aW9uLnJldHJ5KGVycm9yKSkge1xuXHRcdFx0XHRcdHJlamVjdChvcGVyYXRpb24ubWFpbkVycm9yKCkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBSZXRyeTtcbi8vIFRPRE86IHJlbW92ZSB0aGlzIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb25cbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBwUmV0cnk7XG5cbm1vZHVsZS5leHBvcnRzLkFib3J0RXJyb3IgPSBBYm9ydEVycm9yO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9yZXRyeScpOyIsInZhciBSZXRyeU9wZXJhdGlvbiA9IHJlcXVpcmUoJy4vcmV0cnlfb3BlcmF0aW9uJyk7XG5cbmV4cG9ydHMub3BlcmF0aW9uID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgdGltZW91dHMgPSBleHBvcnRzLnRpbWVvdXRzKG9wdGlvbnMpO1xuICByZXR1cm4gbmV3IFJldHJ5T3BlcmF0aW9uKHRpbWVvdXRzLCB7XG4gICAgICBmb3JldmVyOiBvcHRpb25zICYmIChvcHRpb25zLmZvcmV2ZXIgfHwgb3B0aW9ucy5yZXRyaWVzID09PSBJbmZpbml0eSksXG4gICAgICB1bnJlZjogb3B0aW9ucyAmJiBvcHRpb25zLnVucmVmLFxuICAgICAgbWF4UmV0cnlUaW1lOiBvcHRpb25zICYmIG9wdGlvbnMubWF4UmV0cnlUaW1lXG4gIH0pO1xufTtcblxuZXhwb3J0cy50aW1lb3V0cyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIHJldHVybiBbXS5jb25jYXQob3B0aW9ucyk7XG4gIH1cblxuICB2YXIgb3B0cyA9IHtcbiAgICByZXRyaWVzOiAxMCxcbiAgICBmYWN0b3I6IDIsXG4gICAgbWluVGltZW91dDogMSAqIDEwMDAsXG4gICAgbWF4VGltZW91dDogSW5maW5pdHksXG4gICAgcmFuZG9taXplOiBmYWxzZVxuICB9O1xuICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucykge1xuICAgIG9wdHNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgfVxuXG4gIGlmIChvcHRzLm1pblRpbWVvdXQgPiBvcHRzLm1heFRpbWVvdXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ21pblRpbWVvdXQgaXMgZ3JlYXRlciB0aGFuIG1heFRpbWVvdXQnKTtcbiAgfVxuXG4gIHZhciB0aW1lb3V0cyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdHMucmV0cmllczsgaSsrKSB7XG4gICAgdGltZW91dHMucHVzaCh0aGlzLmNyZWF0ZVRpbWVvdXQoaSwgb3B0cykpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5mb3JldmVyICYmICF0aW1lb3V0cy5sZW5ndGgpIHtcbiAgICB0aW1lb3V0cy5wdXNoKHRoaXMuY3JlYXRlVGltZW91dChpLCBvcHRzKSk7XG4gIH1cblxuICAvLyBzb3J0IHRoZSBhcnJheSBudW1lcmljYWxseSBhc2NlbmRpbmdcbiAgdGltZW91dHMuc29ydChmdW5jdGlvbihhLGIpIHtcbiAgICByZXR1cm4gYSAtIGI7XG4gIH0pO1xuXG4gIHJldHVybiB0aW1lb3V0cztcbn07XG5cbmV4cG9ydHMuY3JlYXRlVGltZW91dCA9IGZ1bmN0aW9uKGF0dGVtcHQsIG9wdHMpIHtcbiAgdmFyIHJhbmRvbSA9IChvcHRzLnJhbmRvbWl6ZSlcbiAgICA/IChNYXRoLnJhbmRvbSgpICsgMSlcbiAgICA6IDE7XG5cbiAgdmFyIHRpbWVvdXQgPSBNYXRoLnJvdW5kKHJhbmRvbSAqIE1hdGgubWF4KG9wdHMubWluVGltZW91dCwgMSkgKiBNYXRoLnBvdyhvcHRzLmZhY3RvciwgYXR0ZW1wdCkpO1xuICB0aW1lb3V0ID0gTWF0aC5taW4odGltZW91dCwgb3B0cy5tYXhUaW1lb3V0KTtcblxuICByZXR1cm4gdGltZW91dDtcbn07XG5cbmV4cG9ydHMud3JhcCA9IGZ1bmN0aW9uKG9iaiwgb3B0aW9ucywgbWV0aG9kcykge1xuICBpZiAob3B0aW9ucyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgbWV0aG9kcyA9IG9wdGlvbnM7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cblxuICBpZiAoIW1ldGhvZHMpIHtcbiAgICBtZXRob2RzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBtZXRob2RzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldGhvZHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbWV0aG9kICAgPSBtZXRob2RzW2ldO1xuICAgIHZhciBvcmlnaW5hbCA9IG9ialttZXRob2RdO1xuXG4gICAgb2JqW21ldGhvZF0gPSBmdW5jdGlvbiByZXRyeVdyYXBwZXIob3JpZ2luYWwpIHtcbiAgICAgIHZhciBvcCAgICAgICA9IGV4cG9ydHMub3BlcmF0aW9uKG9wdGlvbnMpO1xuICAgICAgdmFyIGFyZ3MgICAgID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3MucG9wKCk7XG5cbiAgICAgIGFyZ3MucHVzaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgaWYgKG9wLnJldHJ5KGVycikpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGFyZ3VtZW50c1swXSA9IG9wLm1haW5FcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcblxuICAgICAgb3AuYXR0ZW1wdChmdW5jdGlvbigpIHtcbiAgICAgICAgb3JpZ2luYWwuYXBwbHkob2JqLCBhcmdzKTtcbiAgICAgIH0pO1xuICAgIH0uYmluZChvYmosIG9yaWdpbmFsKTtcbiAgICBvYmpbbWV0aG9kXS5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxufTtcbiIsImZ1bmN0aW9uIFJldHJ5T3BlcmF0aW9uKHRpbWVvdXRzLCBvcHRpb25zKSB7XG4gIC8vIENvbXBhdGliaWxpdHkgZm9yIHRoZSBvbGQgKHRpbWVvdXRzLCByZXRyeUZvcmV2ZXIpIHNpZ25hdHVyZVxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdib29sZWFuJykge1xuICAgIG9wdGlvbnMgPSB7IGZvcmV2ZXI6IG9wdGlvbnMgfTtcbiAgfVxuXG4gIHRoaXMuX29yaWdpbmFsVGltZW91dHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRpbWVvdXRzKSk7XG4gIHRoaXMuX3RpbWVvdXRzID0gdGltZW91dHM7XG4gIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLl9tYXhSZXRyeVRpbWUgPSBvcHRpb25zICYmIG9wdGlvbnMubWF4UmV0cnlUaW1lIHx8IEluZmluaXR5O1xuICB0aGlzLl9mbiA9IG51bGw7XG4gIHRoaXMuX2Vycm9ycyA9IFtdO1xuICB0aGlzLl9hdHRlbXB0cyA9IDE7XG4gIHRoaXMuX29wZXJhdGlvblRpbWVvdXQgPSBudWxsO1xuICB0aGlzLl9vcGVyYXRpb25UaW1lb3V0Q2IgPSBudWxsO1xuICB0aGlzLl90aW1lb3V0ID0gbnVsbDtcbiAgdGhpcy5fb3BlcmF0aW9uU3RhcnQgPSBudWxsO1xuICB0aGlzLl90aW1lciA9IG51bGw7XG5cbiAgaWYgKHRoaXMuX29wdGlvbnMuZm9yZXZlcikge1xuICAgIHRoaXMuX2NhY2hlZFRpbWVvdXRzID0gdGhpcy5fdGltZW91dHMuc2xpY2UoMCk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gUmV0cnlPcGVyYXRpb247XG5cblJldHJ5T3BlcmF0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9hdHRlbXB0cyA9IDE7XG4gIHRoaXMuX3RpbWVvdXRzID0gdGhpcy5fb3JpZ2luYWxUaW1lb3V0cy5zbGljZSgwKTtcbn1cblxuUmV0cnlPcGVyYXRpb24ucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuX3RpbWVvdXQpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG4gIH1cbiAgaWYgKHRoaXMuX3RpbWVyKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgfVxuXG4gIHRoaXMuX3RpbWVvdXRzICAgICAgID0gW107XG4gIHRoaXMuX2NhY2hlZFRpbWVvdXRzID0gbnVsbDtcbn07XG5cblJldHJ5T3BlcmF0aW9uLnByb3RvdHlwZS5yZXRyeSA9IGZ1bmN0aW9uKGVycikge1xuICBpZiAodGhpcy5fdGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcbiAgfVxuXG4gIGlmICghZXJyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBpZiAoZXJyICYmIGN1cnJlbnRUaW1lIC0gdGhpcy5fb3BlcmF0aW9uU3RhcnQgPj0gdGhpcy5fbWF4UmV0cnlUaW1lKSB7XG4gICAgdGhpcy5fZXJyb3JzLnB1c2goZXJyKTtcbiAgICB0aGlzLl9lcnJvcnMudW5zaGlmdChuZXcgRXJyb3IoJ1JldHJ5T3BlcmF0aW9uIHRpbWVvdXQgb2NjdXJyZWQnKSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdGhpcy5fZXJyb3JzLnB1c2goZXJyKTtcblxuICB2YXIgdGltZW91dCA9IHRoaXMuX3RpbWVvdXRzLnNoaWZ0KCk7XG4gIGlmICh0aW1lb3V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodGhpcy5fY2FjaGVkVGltZW91dHMpIHtcbiAgICAgIC8vIHJldHJ5IGZvcmV2ZXIsIG9ubHkga2VlcCBsYXN0IGVycm9yXG4gICAgICB0aGlzLl9lcnJvcnMuc3BsaWNlKDAsIHRoaXMuX2Vycm9ycy5sZW5ndGggLSAxKTtcbiAgICAgIHRpbWVvdXQgPSB0aGlzLl9jYWNoZWRUaW1lb3V0cy5zbGljZSgtMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBzZWxmLl9hdHRlbXB0cysrO1xuXG4gICAgaWYgKHNlbGYuX29wZXJhdGlvblRpbWVvdXRDYikge1xuICAgICAgc2VsZi5fdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuX29wZXJhdGlvblRpbWVvdXRDYihzZWxmLl9hdHRlbXB0cyk7XG4gICAgICB9LCBzZWxmLl9vcGVyYXRpb25UaW1lb3V0KTtcblxuICAgICAgaWYgKHNlbGYuX29wdGlvbnMudW5yZWYpIHtcbiAgICAgICAgICBzZWxmLl90aW1lb3V0LnVucmVmKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2VsZi5fZm4oc2VsZi5fYXR0ZW1wdHMpO1xuICB9LCB0aW1lb3V0KTtcblxuICBpZiAodGhpcy5fb3B0aW9ucy51bnJlZikge1xuICAgICAgdGhpcy5fdGltZXIudW5yZWYoKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuUmV0cnlPcGVyYXRpb24ucHJvdG90eXBlLmF0dGVtcHQgPSBmdW5jdGlvbihmbiwgdGltZW91dE9wcykge1xuICB0aGlzLl9mbiA9IGZuO1xuXG4gIGlmICh0aW1lb3V0T3BzKSB7XG4gICAgaWYgKHRpbWVvdXRPcHMudGltZW91dCkge1xuICAgICAgdGhpcy5fb3BlcmF0aW9uVGltZW91dCA9IHRpbWVvdXRPcHMudGltZW91dDtcbiAgICB9XG4gICAgaWYgKHRpbWVvdXRPcHMuY2IpIHtcbiAgICAgIHRoaXMuX29wZXJhdGlvblRpbWVvdXRDYiA9IHRpbWVvdXRPcHMuY2I7XG4gICAgfVxuICB9XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBpZiAodGhpcy5fb3BlcmF0aW9uVGltZW91dENiKSB7XG4gICAgdGhpcy5fdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLl9vcGVyYXRpb25UaW1lb3V0Q2IoKTtcbiAgICB9LCBzZWxmLl9vcGVyYXRpb25UaW1lb3V0KTtcbiAgfVxuXG4gIHRoaXMuX29wZXJhdGlvblN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgdGhpcy5fZm4odGhpcy5fYXR0ZW1wdHMpO1xufTtcblxuUmV0cnlPcGVyYXRpb24ucHJvdG90eXBlLnRyeSA9IGZ1bmN0aW9uKGZuKSB7XG4gIGNvbnNvbGUubG9nKCdVc2luZyBSZXRyeU9wZXJhdGlvbi50cnkoKSBpcyBkZXByZWNhdGVkJyk7XG4gIHRoaXMuYXR0ZW1wdChmbik7XG59O1xuXG5SZXRyeU9wZXJhdGlvbi5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbihmbikge1xuICBjb25zb2xlLmxvZygnVXNpbmcgUmV0cnlPcGVyYXRpb24uc3RhcnQoKSBpcyBkZXByZWNhdGVkJyk7XG4gIHRoaXMuYXR0ZW1wdChmbik7XG59O1xuXG5SZXRyeU9wZXJhdGlvbi5wcm90b3R5cGUuc3RhcnQgPSBSZXRyeU9wZXJhdGlvbi5wcm90b3R5cGUudHJ5O1xuXG5SZXRyeU9wZXJhdGlvbi5wcm90b3R5cGUuZXJyb3JzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9lcnJvcnM7XG59O1xuXG5SZXRyeU9wZXJhdGlvbi5wcm90b3R5cGUuYXR0ZW1wdHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX2F0dGVtcHRzO1xufTtcblxuUmV0cnlPcGVyYXRpb24ucHJvdG90eXBlLm1haW5FcnJvciA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5fZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIGNvdW50cyA9IHt9O1xuICB2YXIgbWFpbkVycm9yID0gbnVsbDtcbiAgdmFyIG1haW5FcnJvckNvdW50ID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2Vycm9ycy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBlcnJvciA9IHRoaXMuX2Vycm9yc1tpXTtcbiAgICB2YXIgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgdmFyIGNvdW50ID0gKGNvdW50c1ttZXNzYWdlXSB8fCAwKSArIDE7XG5cbiAgICBjb3VudHNbbWVzc2FnZV0gPSBjb3VudDtcblxuICAgIGlmIChjb3VudCA+PSBtYWluRXJyb3JDb3VudCkge1xuICAgICAgbWFpbkVycm9yID0gZXJyb3I7XG4gICAgICBtYWluRXJyb3JDb3VudCA9IGNvdW50O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYWluRXJyb3I7XG59O1xuIiwiaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSBcInV1aWRcIjtcbmltcG9ydCB7IEJhc2VDYWxsYmFja0hhbmRsZXIsIH0gZnJvbSBcIi4vYmFzZS5qc1wiO1xuaW1wb3J0IHsgQ29uc29sZUNhbGxiYWNrSGFuZGxlciB9IGZyb20gXCIuL2hhbmRsZXJzL2NvbnNvbGUuanNcIjtcbmltcG9ydCB7IGdldFRyYWNpbmdDYWxsYmFja0hhbmRsZXIsIGdldFRyYWNpbmdWMkNhbGxiYWNrSGFuZGxlciwgfSBmcm9tIFwiLi9oYW5kbGVycy9pbml0aWFsaXplLmpzXCI7XG5pbXBvcnQgeyBnZXRCdWZmZXJTdHJpbmcgfSBmcm9tIFwiLi4vbWVtb3J5L2Jhc2UuanNcIjtcbmltcG9ydCB7IGdldEVudmlyb25tZW50VmFyaWFibGUgfSBmcm9tIFwiLi4vdXRpbC9lbnYuanNcIjtcbmltcG9ydCB7IExhbmdDaGFpblRyYWNlciwgfSBmcm9tIFwiLi9oYW5kbGVycy90cmFjZXJfbGFuZ2NoYWluLmpzXCI7XG5pbXBvcnQgeyBjb25zdW1lQ2FsbGJhY2sgfSBmcm9tIFwiLi9wcm9taXNlcy5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ2FsbGJhY2tDb25maWdBcmcoYXJnKSB7XG4gICAgaWYgKCFhcmcpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykgfHwgXCJuYW1lXCIgaW4gYXJnKSB7XG4gICAgICAgIHJldHVybiB7IGNhbGxiYWNrczogYXJnIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gYXJnO1xuICAgIH1cbn1cbi8qKlxuICogTWFuYWdlIGNhbGxiYWNrcyBmcm9tIGRpZmZlcmVudCBjb21wb25lbnRzIG9mIExhbmdDaGFpbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEJhc2VDYWxsYmFja01hbmFnZXIge1xuICAgIHNldEhhbmRsZXIoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRIYW5kbGVycyhbaGFuZGxlcl0pO1xuICAgIH1cbn1cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgcnVuIG1hbmFnZXIgaW4gTGFuZ0NoYWluLlxuICovXG5jbGFzcyBCYXNlUnVuTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IocnVuSWQsIGhhbmRsZXJzLCBpbmhlcml0YWJsZUhhbmRsZXJzLCB0YWdzLCBpbmhlcml0YWJsZVRhZ3MsIG1ldGFkYXRhLCBpbmhlcml0YWJsZU1ldGFkYXRhLCBfcGFyZW50UnVuSWQpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwicnVuSWRcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHJ1bklkXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJoYW5kbGVyc1wiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogaGFuZGxlcnNcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImluaGVyaXRhYmxlSGFuZGxlcnNcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGluaGVyaXRhYmxlSGFuZGxlcnNcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInRhZ3NcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHRhZ3NcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImluaGVyaXRhYmxlVGFnc1wiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogaW5oZXJpdGFibGVUYWdzXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJtZXRhZGF0YVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogbWV0YWRhdGFcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImluaGVyaXRhYmxlTWV0YWRhdGFcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGluaGVyaXRhYmxlTWV0YWRhdGFcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIl9wYXJlbnRSdW5JZFwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogX3BhcmVudFJ1bklkXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVUZXh0KHRleHQpIHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5oYW5kbGVycy5tYXAoKGhhbmRsZXIpID0+IGNvbnN1bWVDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGhhbmRsZXIuaGFuZGxlVGV4dD8uKHRleHQsIHRoaXMucnVuSWQsIHRoaXMuX3BhcmVudFJ1bklkLCB0aGlzLnRhZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIGhhbmRsZXIgJHtoYW5kbGVyLmNvbnN0cnVjdG9yLm5hbWV9LCBoYW5kbGVUZXh0OiAke2Vycn1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgaGFuZGxlci5hd2FpdEhhbmRsZXJzKSkpO1xuICAgIH1cbn1cbi8qKlxuICogTWFuYWdlcyBjYWxsYmFja3MgZm9yIHJldHJpZXZlciBydW5zLlxuICovXG5leHBvcnQgY2xhc3MgQ2FsbGJhY2tNYW5hZ2VyRm9yUmV0cmlldmVyUnVuIGV4dGVuZHMgQmFzZVJ1bk1hbmFnZXIge1xuICAgIGdldENoaWxkKHRhZykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgQ2FsbGJhY2tNYW5hZ2VyKHRoaXMucnVuSWQpO1xuICAgICAgICBtYW5hZ2VyLnNldEhhbmRsZXJzKHRoaXMuaW5oZXJpdGFibGVIYW5kbGVycyk7XG4gICAgICAgIG1hbmFnZXIuYWRkVGFncyh0aGlzLmluaGVyaXRhYmxlVGFncyk7XG4gICAgICAgIG1hbmFnZXIuYWRkTWV0YWRhdGEodGhpcy5pbmhlcml0YWJsZU1ldGFkYXRhKTtcbiAgICAgICAgaWYgKHRhZykge1xuICAgICAgICAgICAgbWFuYWdlci5hZGRUYWdzKFt0YWddLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hbmFnZXI7XG4gICAgfVxuICAgIGFzeW5jIGhhbmRsZVJldHJpZXZlckVuZChkb2N1bWVudHMpIHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5oYW5kbGVycy5tYXAoKGhhbmRsZXIpID0+IGNvbnN1bWVDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIuaWdub3JlUmV0cmlldmVyKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgaGFuZGxlci5oYW5kbGVSZXRyaWV2ZXJFbmQ/Lihkb2N1bWVudHMsIHRoaXMucnVuSWQsIHRoaXMuX3BhcmVudFJ1bklkLCB0aGlzLnRhZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIGhhbmRsZXIgJHtoYW5kbGVyLmNvbnN0cnVjdG9yLm5hbWV9LCBoYW5kbGVSZXRyaWV2ZXJgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGhhbmRsZXIuYXdhaXRIYW5kbGVycykpKTtcbiAgICB9XG4gICAgYXN5bmMgaGFuZGxlUmV0cmlldmVyRXJyb3IoZXJyKSB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHRoaXMuaGFuZGxlcnMubWFwKChoYW5kbGVyKSA9PiBjb25zdW1lQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFoYW5kbGVyLmlnbm9yZVJldHJpZXZlcikge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGhhbmRsZXIuaGFuZGxlUmV0cmlldmVyRXJyb3I/LihlcnIsIHRoaXMucnVuSWQsIHRoaXMuX3BhcmVudFJ1bklkLCB0aGlzLnRhZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgaW4gaGFuZGxlciAke2hhbmRsZXIuY29uc3RydWN0b3IubmFtZX0sIGhhbmRsZVJldHJpZXZlckVycm9yOiAke2Vycm9yfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgaGFuZGxlci5hd2FpdEhhbmRsZXJzKSkpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBDYWxsYmFja01hbmFnZXJGb3JMTE1SdW4gZXh0ZW5kcyBCYXNlUnVuTWFuYWdlciB7XG4gICAgYXN5bmMgaGFuZGxlTExNTmV3VG9rZW4odG9rZW4sIGlkeCwgX3J1bklkLCBfcGFyZW50UnVuSWQsIF90YWdzLCBmaWVsZHMpIHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5oYW5kbGVycy5tYXAoKGhhbmRsZXIpID0+IGNvbnN1bWVDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIuaWdub3JlTExNKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgaGFuZGxlci5oYW5kbGVMTE1OZXdUb2tlbj8uKHRva2VuLCBpZHggPz8geyBwcm9tcHQ6IDAsIGNvbXBsZXRpb246IDAgfSwgdGhpcy5ydW5JZCwgdGhpcy5fcGFyZW50UnVuSWQsIHRoaXMudGFncywgZmllbGRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBpbiBoYW5kbGVyICR7aGFuZGxlci5jb25zdHJ1Y3Rvci5uYW1lfSwgaGFuZGxlTExNTmV3VG9rZW46ICR7ZXJyfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgaGFuZGxlci5hd2FpdEhhbmRsZXJzKSkpO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVMTE1FcnJvcihlcnIpIHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5oYW5kbGVycy5tYXAoKGhhbmRsZXIpID0+IGNvbnN1bWVDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIuaWdub3JlTExNKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgaGFuZGxlci5oYW5kbGVMTE1FcnJvcj8uKGVyciwgdGhpcy5ydW5JZCwgdGhpcy5fcGFyZW50UnVuSWQsIHRoaXMudGFncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgaW4gaGFuZGxlciAke2hhbmRsZXIuY29uc3RydWN0b3IubmFtZX0sIGhhbmRsZUxMTUVycm9yOiAke2Vycn1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGhhbmRsZXIuYXdhaXRIYW5kbGVycykpKTtcbiAgICB9XG4gICAgYXN5bmMgaGFuZGxlTExNRW5kKG91dHB1dCkge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmhhbmRsZXJzLm1hcCgoaGFuZGxlcikgPT4gY29uc3VtZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmICghaGFuZGxlci5pZ25vcmVMTE0pIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBoYW5kbGVyLmhhbmRsZUxMTUVuZD8uKG91dHB1dCwgdGhpcy5ydW5JZCwgdGhpcy5fcGFyZW50UnVuSWQsIHRoaXMudGFncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgaW4gaGFuZGxlciAke2hhbmRsZXIuY29uc3RydWN0b3IubmFtZX0sIGhhbmRsZUxMTUVuZDogJHtlcnJ9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBoYW5kbGVyLmF3YWl0SGFuZGxlcnMpKSk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIENhbGxiYWNrTWFuYWdlckZvckNoYWluUnVuIGV4dGVuZHMgQmFzZVJ1bk1hbmFnZXIge1xuICAgIGdldENoaWxkKHRhZykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgQ2FsbGJhY2tNYW5hZ2VyKHRoaXMucnVuSWQpO1xuICAgICAgICBtYW5hZ2VyLnNldEhhbmRsZXJzKHRoaXMuaW5oZXJpdGFibGVIYW5kbGVycyk7XG4gICAgICAgIG1hbmFnZXIuYWRkVGFncyh0aGlzLmluaGVyaXRhYmxlVGFncyk7XG4gICAgICAgIG1hbmFnZXIuYWRkTWV0YWRhdGEodGhpcy5pbmhlcml0YWJsZU1ldGFkYXRhKTtcbiAgICAgICAgaWYgKHRhZykge1xuICAgICAgICAgICAgbWFuYWdlci5hZGRUYWdzKFt0YWddLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hbmFnZXI7XG4gICAgfVxuICAgIGFzeW5jIGhhbmRsZUNoYWluRXJyb3IoZXJyLCBfcnVuSWQsIF9wYXJlbnRSdW5JZCwgX3RhZ3MsIGt3YXJncykge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmhhbmRsZXJzLm1hcCgoaGFuZGxlcikgPT4gY29uc3VtZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmICghaGFuZGxlci5pZ25vcmVDaGFpbikge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGhhbmRsZXIuaGFuZGxlQ2hhaW5FcnJvcj8uKGVyciwgdGhpcy5ydW5JZCwgdGhpcy5fcGFyZW50UnVuSWQsIHRoaXMudGFncywga3dhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBpbiBoYW5kbGVyICR7aGFuZGxlci5jb25zdHJ1Y3Rvci5uYW1lfSwgaGFuZGxlQ2hhaW5FcnJvcjogJHtlcnJ9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBoYW5kbGVyLmF3YWl0SGFuZGxlcnMpKSk7XG4gICAgfVxuICAgIGFzeW5jIGhhbmRsZUNoYWluRW5kKG91dHB1dCwgX3J1bklkLCBfcGFyZW50UnVuSWQsIF90YWdzLCBrd2FyZ3MpIHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5oYW5kbGVycy5tYXAoKGhhbmRsZXIpID0+IGNvbnN1bWVDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIuaWdub3JlQ2hhaW4pIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBoYW5kbGVyLmhhbmRsZUNoYWluRW5kPy4ob3V0cHV0LCB0aGlzLnJ1bklkLCB0aGlzLl9wYXJlbnRSdW5JZCwgdGhpcy50YWdzLCBrd2FyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIGhhbmRsZXIgJHtoYW5kbGVyLmNvbnN0cnVjdG9yLm5hbWV9LCBoYW5kbGVDaGFpbkVuZDogJHtlcnJ9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBoYW5kbGVyLmF3YWl0SGFuZGxlcnMpKSk7XG4gICAgfVxuICAgIGFzeW5jIGhhbmRsZUFnZW50QWN0aW9uKGFjdGlvbikge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmhhbmRsZXJzLm1hcCgoaGFuZGxlcikgPT4gY29uc3VtZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmICghaGFuZGxlci5pZ25vcmVBZ2VudCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGhhbmRsZXIuaGFuZGxlQWdlbnRBY3Rpb24/LihhY3Rpb24sIHRoaXMucnVuSWQsIHRoaXMuX3BhcmVudFJ1bklkLCB0aGlzLnRhZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIGhhbmRsZXIgJHtoYW5kbGVyLmNvbnN0cnVjdG9yLm5hbWV9LCBoYW5kbGVBZ2VudEFjdGlvbjogJHtlcnJ9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBoYW5kbGVyLmF3YWl0SGFuZGxlcnMpKSk7XG4gICAgfVxuICAgIGFzeW5jIGhhbmRsZUFnZW50RW5kKGFjdGlvbikge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmhhbmRsZXJzLm1hcCgoaGFuZGxlcikgPT4gY29uc3VtZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmICghaGFuZGxlci5pZ25vcmVBZ2VudCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGhhbmRsZXIuaGFuZGxlQWdlbnRFbmQ/LihhY3Rpb24sIHRoaXMucnVuSWQsIHRoaXMuX3BhcmVudFJ1bklkLCB0aGlzLnRhZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIGhhbmRsZXIgJHtoYW5kbGVyLmNvbnN0cnVjdG9yLm5hbWV9LCBoYW5kbGVBZ2VudEVuZDogJHtlcnJ9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBoYW5kbGVyLmF3YWl0SGFuZGxlcnMpKSk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIENhbGxiYWNrTWFuYWdlckZvclRvb2xSdW4gZXh0ZW5kcyBCYXNlUnVuTWFuYWdlciB7XG4gICAgZ2V0Q2hpbGQodGFnKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICAgICAgY29uc3QgbWFuYWdlciA9IG5ldyBDYWxsYmFja01hbmFnZXIodGhpcy5ydW5JZCk7XG4gICAgICAgIG1hbmFnZXIuc2V0SGFuZGxlcnModGhpcy5pbmhlcml0YWJsZUhhbmRsZXJzKTtcbiAgICAgICAgbWFuYWdlci5hZGRUYWdzKHRoaXMuaW5oZXJpdGFibGVUYWdzKTtcbiAgICAgICAgbWFuYWdlci5hZGRNZXRhZGF0YSh0aGlzLmluaGVyaXRhYmxlTWV0YWRhdGEpO1xuICAgICAgICBpZiAodGFnKSB7XG4gICAgICAgICAgICBtYW5hZ2VyLmFkZFRhZ3MoW3RhZ10sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFuYWdlcjtcbiAgICB9XG4gICAgYXN5bmMgaGFuZGxlVG9vbEVycm9yKGVycikge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmhhbmRsZXJzLm1hcCgoaGFuZGxlcikgPT4gY29uc3VtZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmICghaGFuZGxlci5pZ25vcmVBZ2VudCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGhhbmRsZXIuaGFuZGxlVG9vbEVycm9yPy4oZXJyLCB0aGlzLnJ1bklkLCB0aGlzLl9wYXJlbnRSdW5JZCwgdGhpcy50YWdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBpbiBoYW5kbGVyICR7aGFuZGxlci5jb25zdHJ1Y3Rvci5uYW1lfSwgaGFuZGxlVG9vbEVycm9yOiAke2Vycn1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGhhbmRsZXIuYXdhaXRIYW5kbGVycykpKTtcbiAgICB9XG4gICAgYXN5bmMgaGFuZGxlVG9vbEVuZChvdXRwdXQpIHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5oYW5kbGVycy5tYXAoKGhhbmRsZXIpID0+IGNvbnN1bWVDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIuaWdub3JlQWdlbnQpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBoYW5kbGVyLmhhbmRsZVRvb2xFbmQ/LihvdXRwdXQsIHRoaXMucnVuSWQsIHRoaXMuX3BhcmVudFJ1bklkLCB0aGlzLnRhZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIGhhbmRsZXIgJHtoYW5kbGVyLmNvbnN0cnVjdG9yLm5hbWV9LCBoYW5kbGVUb29sRW5kOiAke2Vycn1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGhhbmRsZXIuYXdhaXRIYW5kbGVycykpKTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQ2FsbGJhY2tNYW5hZ2VyIGV4dGVuZHMgQmFzZUNhbGxiYWNrTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IocGFyZW50UnVuSWQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiaGFuZGxlcnNcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiaW5oZXJpdGFibGVIYW5kbGVyc1wiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJ0YWdzXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBbXVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiaW5oZXJpdGFibGVUYWdzXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBbXVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibWV0YWRhdGFcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJpbmhlcml0YWJsZU1ldGFkYXRhXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB7fVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibmFtZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogXCJjYWxsYmFja19tYW5hZ2VyXCJcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIl9wYXJlbnRSdW5JZFwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gICAgICAgIHRoaXMuaW5oZXJpdGFibGVIYW5kbGVycyA9IFtdO1xuICAgICAgICB0aGlzLl9wYXJlbnRSdW5JZCA9IHBhcmVudFJ1bklkO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVMTE1TdGFydChsbG0sIHByb21wdHMsIF9ydW5JZCA9IHVuZGVmaW5lZCwgX3BhcmVudFJ1bklkID0gdW5kZWZpbmVkLCBleHRyYVBhcmFtcyA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbXB0cy5tYXAoYXN5bmMgKHByb21wdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcnVuSWQgPSB1dWlkdjQoKTtcbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHRoaXMuaGFuZGxlcnMubWFwKChoYW5kbGVyKSA9PiBjb25zdW1lQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghaGFuZGxlci5pZ25vcmVMTE0pIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGhhbmRsZXIuaGFuZGxlTExNU3RhcnQ/LihsbG0sIFtwcm9tcHRdLCBydW5JZCwgdGhpcy5fcGFyZW50UnVuSWQsIGV4dHJhUGFyYW1zLCB0aGlzLnRhZ3MsIHRoaXMubWV0YWRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIGhhbmRsZXIgJHtoYW5kbGVyLmNvbnN0cnVjdG9yLm5hbWV9LCBoYW5kbGVMTE1TdGFydDogJHtlcnJ9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBoYW5kbGVyLmF3YWl0SGFuZGxlcnMpKSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENhbGxiYWNrTWFuYWdlckZvckxMTVJ1bihydW5JZCwgdGhpcy5oYW5kbGVycywgdGhpcy5pbmhlcml0YWJsZUhhbmRsZXJzLCB0aGlzLnRhZ3MsIHRoaXMuaW5oZXJpdGFibGVUYWdzLCB0aGlzLm1ldGFkYXRhLCB0aGlzLmluaGVyaXRhYmxlTWV0YWRhdGEsIHRoaXMuX3BhcmVudFJ1bklkKTtcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVDaGF0TW9kZWxTdGFydChsbG0sIG1lc3NhZ2VzLCBfcnVuSWQgPSB1bmRlZmluZWQsIF9wYXJlbnRSdW5JZCA9IHVuZGVmaW5lZCwgZXh0cmFQYXJhbXMgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKG1lc3NhZ2VzLm1hcChhc3luYyAobWVzc2FnZUdyb3VwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBydW5JZCA9IHV1aWR2NCgpO1xuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5oYW5kbGVycy5tYXAoKGhhbmRsZXIpID0+IGNvbnN1bWVDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFoYW5kbGVyLmlnbm9yZUxMTSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRsZXIuaGFuZGxlQ2hhdE1vZGVsU3RhcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgaGFuZGxlci5oYW5kbGVDaGF0TW9kZWxTdGFydD8uKGxsbSwgW21lc3NhZ2VHcm91cF0sIHJ1bklkLCB0aGlzLl9wYXJlbnRSdW5JZCwgZXh0cmFQYXJhbXMsIHRoaXMudGFncywgdGhpcy5tZXRhZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChoYW5kbGVyLmhhbmRsZUxMTVN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZVN0cmluZyA9IGdldEJ1ZmZlclN0cmluZyhtZXNzYWdlR3JvdXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGhhbmRsZXIuaGFuZGxlTExNU3RhcnQ/LihsbG0sIFttZXNzYWdlU3RyaW5nXSwgcnVuSWQsIHRoaXMuX3BhcmVudFJ1bklkLCBleHRyYVBhcmFtcywgdGhpcy50YWdzLCB0aGlzLm1ldGFkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBpbiBoYW5kbGVyICR7aGFuZGxlci5jb25zdHJ1Y3Rvci5uYW1lfSwgaGFuZGxlTExNU3RhcnQ6ICR7ZXJyfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgaGFuZGxlci5hd2FpdEhhbmRsZXJzKSkpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDYWxsYmFja01hbmFnZXJGb3JMTE1SdW4ocnVuSWQsIHRoaXMuaGFuZGxlcnMsIHRoaXMuaW5oZXJpdGFibGVIYW5kbGVycywgdGhpcy50YWdzLCB0aGlzLmluaGVyaXRhYmxlVGFncywgdGhpcy5tZXRhZGF0YSwgdGhpcy5pbmhlcml0YWJsZU1ldGFkYXRhLCB0aGlzLl9wYXJlbnRSdW5JZCk7XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgYXN5bmMgaGFuZGxlQ2hhaW5TdGFydChjaGFpbiwgaW5wdXRzLCBydW5JZCA9IHV1aWR2NCgpLCBydW5UeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHRoaXMuaGFuZGxlcnMubWFwKChoYW5kbGVyKSA9PiBjb25zdW1lQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFoYW5kbGVyLmlnbm9yZUNoYWluKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgaGFuZGxlci5oYW5kbGVDaGFpblN0YXJ0Py4oY2hhaW4sIGlucHV0cywgcnVuSWQsIHRoaXMuX3BhcmVudFJ1bklkLCB0aGlzLnRhZ3MsIHRoaXMubWV0YWRhdGEsIHJ1blR5cGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIGhhbmRsZXIgJHtoYW5kbGVyLmNvbnN0cnVjdG9yLm5hbWV9LCBoYW5kbGVDaGFpblN0YXJ0OiAke2Vycn1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGhhbmRsZXIuYXdhaXRIYW5kbGVycykpKTtcbiAgICAgICAgcmV0dXJuIG5ldyBDYWxsYmFja01hbmFnZXJGb3JDaGFpblJ1bihydW5JZCwgdGhpcy5oYW5kbGVycywgdGhpcy5pbmhlcml0YWJsZUhhbmRsZXJzLCB0aGlzLnRhZ3MsIHRoaXMuaW5oZXJpdGFibGVUYWdzLCB0aGlzLm1ldGFkYXRhLCB0aGlzLmluaGVyaXRhYmxlTWV0YWRhdGEsIHRoaXMuX3BhcmVudFJ1bklkKTtcbiAgICB9XG4gICAgYXN5bmMgaGFuZGxlVG9vbFN0YXJ0KHRvb2wsIGlucHV0LCBydW5JZCA9IHV1aWR2NCgpKSB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHRoaXMuaGFuZGxlcnMubWFwKChoYW5kbGVyKSA9PiBjb25zdW1lQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFoYW5kbGVyLmlnbm9yZUFnZW50KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgaGFuZGxlci5oYW5kbGVUb29sU3RhcnQ/Lih0b29sLCBpbnB1dCwgcnVuSWQsIHRoaXMuX3BhcmVudFJ1bklkLCB0aGlzLnRhZ3MsIHRoaXMubWV0YWRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIGhhbmRsZXIgJHtoYW5kbGVyLmNvbnN0cnVjdG9yLm5hbWV9LCBoYW5kbGVUb29sU3RhcnQ6ICR7ZXJyfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgaGFuZGxlci5hd2FpdEhhbmRsZXJzKSkpO1xuICAgICAgICByZXR1cm4gbmV3IENhbGxiYWNrTWFuYWdlckZvclRvb2xSdW4ocnVuSWQsIHRoaXMuaGFuZGxlcnMsIHRoaXMuaW5oZXJpdGFibGVIYW5kbGVycywgdGhpcy50YWdzLCB0aGlzLmluaGVyaXRhYmxlVGFncywgdGhpcy5tZXRhZGF0YSwgdGhpcy5pbmhlcml0YWJsZU1ldGFkYXRhLCB0aGlzLl9wYXJlbnRSdW5JZCk7XG4gICAgfVxuICAgIGFzeW5jIGhhbmRsZVJldHJpZXZlclN0YXJ0KHJldHJpZXZlciwgcXVlcnksIHJ1bklkID0gdXVpZHY0KCksIF9wYXJlbnRSdW5JZCA9IHVuZGVmaW5lZCkge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmhhbmRsZXJzLm1hcCgoaGFuZGxlcikgPT4gY29uc3VtZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmICghaGFuZGxlci5pZ25vcmVSZXRyaWV2ZXIpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBoYW5kbGVyLmhhbmRsZVJldHJpZXZlclN0YXJ0Py4ocmV0cmlldmVyLCBxdWVyeSwgcnVuSWQsIHRoaXMuX3BhcmVudFJ1bklkLCB0aGlzLnRhZ3MsIHRoaXMubWV0YWRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIGhhbmRsZXIgJHtoYW5kbGVyLmNvbnN0cnVjdG9yLm5hbWV9LCBoYW5kbGVSZXRyaWV2ZXJTdGFydDogJHtlcnJ9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBoYW5kbGVyLmF3YWl0SGFuZGxlcnMpKSk7XG4gICAgICAgIHJldHVybiBuZXcgQ2FsbGJhY2tNYW5hZ2VyRm9yUmV0cmlldmVyUnVuKHJ1bklkLCB0aGlzLmhhbmRsZXJzLCB0aGlzLmluaGVyaXRhYmxlSGFuZGxlcnMsIHRoaXMudGFncywgdGhpcy5pbmhlcml0YWJsZVRhZ3MsIHRoaXMubWV0YWRhdGEsIHRoaXMuaW5oZXJpdGFibGVNZXRhZGF0YSwgdGhpcy5fcGFyZW50UnVuSWQpO1xuICAgIH1cbiAgICBhZGRIYW5kbGVyKGhhbmRsZXIsIGluaGVyaXQgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICAgICAgaWYgKGluaGVyaXQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5oZXJpdGFibGVIYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZUhhbmRsZXIoaGFuZGxlcikge1xuICAgICAgICB0aGlzLmhhbmRsZXJzID0gdGhpcy5oYW5kbGVycy5maWx0ZXIoKF9oYW5kbGVyKSA9PiBfaGFuZGxlciAhPT0gaGFuZGxlcik7XG4gICAgICAgIHRoaXMuaW5oZXJpdGFibGVIYW5kbGVycyA9IHRoaXMuaW5oZXJpdGFibGVIYW5kbGVycy5maWx0ZXIoKF9oYW5kbGVyKSA9PiBfaGFuZGxlciAhPT0gaGFuZGxlcik7XG4gICAgfVxuICAgIHNldEhhbmRsZXJzKGhhbmRsZXJzLCBpbmhlcml0ID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gICAgICAgIHRoaXMuaW5oZXJpdGFibGVIYW5kbGVycyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGhhbmRsZXIgb2YgaGFuZGxlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkSGFuZGxlcihoYW5kbGVyLCBpbmhlcml0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGRUYWdzKHRhZ3MsIGluaGVyaXQgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlVGFncyh0YWdzKTsgLy8gUmVtb3ZlIGR1cGxpY2F0ZXNcbiAgICAgICAgdGhpcy50YWdzLnB1c2goLi4udGFncyk7XG4gICAgICAgIGlmIChpbmhlcml0KSB7XG4gICAgICAgICAgICB0aGlzLmluaGVyaXRhYmxlVGFncy5wdXNoKC4uLnRhZ3MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZVRhZ3ModGFncykge1xuICAgICAgICB0aGlzLnRhZ3MgPSB0aGlzLnRhZ3MuZmlsdGVyKCh0YWcpID0+ICF0YWdzLmluY2x1ZGVzKHRhZykpO1xuICAgICAgICB0aGlzLmluaGVyaXRhYmxlVGFncyA9IHRoaXMuaW5oZXJpdGFibGVUYWdzLmZpbHRlcigodGFnKSA9PiAhdGFncy5pbmNsdWRlcyh0YWcpKTtcbiAgICB9XG4gICAgYWRkTWV0YWRhdGEobWV0YWRhdGEsIGluaGVyaXQgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMubWV0YWRhdGEgPSB7IC4uLnRoaXMubWV0YWRhdGEsIC4uLm1ldGFkYXRhIH07XG4gICAgICAgIGlmIChpbmhlcml0KSB7XG4gICAgICAgICAgICB0aGlzLmluaGVyaXRhYmxlTWV0YWRhdGEgPSB7IC4uLnRoaXMuaW5oZXJpdGFibGVNZXRhZGF0YSwgLi4ubWV0YWRhdGEgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmVNZXRhZGF0YShtZXRhZGF0YSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhtZXRhZGF0YSkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm1ldGFkYXRhW2tleV07XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5pbmhlcml0YWJsZU1ldGFkYXRhW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29weShhZGRpdGlvbmFsSGFuZGxlcnMgPSBbXSwgaW5oZXJpdCA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgbWFuYWdlciA9IG5ldyBDYWxsYmFja01hbmFnZXIodGhpcy5fcGFyZW50UnVuSWQpO1xuICAgICAgICBmb3IgKGNvbnN0IGhhbmRsZXIgb2YgdGhpcy5oYW5kbGVycykge1xuICAgICAgICAgICAgY29uc3QgaW5oZXJpdGFibGUgPSB0aGlzLmluaGVyaXRhYmxlSGFuZGxlcnMuaW5jbHVkZXMoaGFuZGxlcik7XG4gICAgICAgICAgICBtYW5hZ2VyLmFkZEhhbmRsZXIoaGFuZGxlciwgaW5oZXJpdGFibGUpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgdGFnIG9mIHRoaXMudGFncykge1xuICAgICAgICAgICAgY29uc3QgaW5oZXJpdGFibGUgPSB0aGlzLmluaGVyaXRhYmxlVGFncy5pbmNsdWRlcyh0YWcpO1xuICAgICAgICAgICAgbWFuYWdlci5hZGRUYWdzKFt0YWddLCBpbmhlcml0YWJsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5tZXRhZGF0YSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGluaGVyaXRhYmxlID0gT2JqZWN0LmtleXModGhpcy5pbmhlcml0YWJsZU1ldGFkYXRhKS5pbmNsdWRlcyhrZXkpO1xuICAgICAgICAgICAgbWFuYWdlci5hZGRNZXRhZGF0YSh7IFtrZXldOiB0aGlzLm1ldGFkYXRhW2tleV0gfSwgaW5oZXJpdGFibGUpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgaGFuZGxlciBvZiBhZGRpdGlvbmFsSGFuZGxlcnMpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIC8vIFByZXZlbnQgbXVsdGlwbGUgY29waWVzIG9mIGNvbnNvbGVfY2FsbGJhY2tfaGFuZGxlclxuICAgICAgICAgICAgbWFuYWdlci5oYW5kbGVyc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIoKGgpID0+IGgubmFtZSA9PT0gXCJjb25zb2xlX2NhbGxiYWNrX2hhbmRsZXJcIilcbiAgICAgICAgICAgICAgICAuc29tZSgoaCkgPT4gaC5uYW1lID09PSBoYW5kbGVyLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYW5hZ2VyLmFkZEhhbmRsZXIoaGFuZGxlciwgaW5oZXJpdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hbmFnZXI7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tSGFuZGxlcnMoaGFuZGxlcnMpIHtcbiAgICAgICAgY2xhc3MgSGFuZGxlciBleHRlbmRzIEJhc2VDYWxsYmFja0hhbmRsZXIge1xuICAgICAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJuYW1lXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHV1aWR2NCgpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBoYW5kbGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWFuYWdlciA9IG5ldyB0aGlzKCk7XG4gICAgICAgIG1hbmFnZXIuYWRkSGFuZGxlcihuZXcgSGFuZGxlcigpKTtcbiAgICAgICAgcmV0dXJuIG1hbmFnZXI7XG4gICAgfVxuICAgIHN0YXRpYyBhc3luYyBjb25maWd1cmUoaW5oZXJpdGFibGVIYW5kbGVycywgbG9jYWxIYW5kbGVycywgaW5oZXJpdGFibGVUYWdzLCBsb2NhbFRhZ3MsIGluaGVyaXRhYmxlTWV0YWRhdGEsIGxvY2FsTWV0YWRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IGNhbGxiYWNrTWFuYWdlcjtcbiAgICAgICAgaWYgKGluaGVyaXRhYmxlSGFuZGxlcnMgfHwgbG9jYWxIYW5kbGVycykge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaW5oZXJpdGFibGVIYW5kbGVycykgfHwgIWluaGVyaXRhYmxlSGFuZGxlcnMpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja01hbmFnZXIgPSBuZXcgQ2FsbGJhY2tNYW5hZ2VyKCk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tNYW5hZ2VyLnNldEhhbmRsZXJzKGluaGVyaXRhYmxlSGFuZGxlcnM/Lm1hcChlbnN1cmVIYW5kbGVyKSA/PyBbXSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja01hbmFnZXIgPSBpbmhlcml0YWJsZUhhbmRsZXJzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2tNYW5hZ2VyID0gY2FsbGJhY2tNYW5hZ2VyLmNvcHkoQXJyYXkuaXNBcnJheShsb2NhbEhhbmRsZXJzKVxuICAgICAgICAgICAgICAgID8gbG9jYWxIYW5kbGVycy5tYXAoZW5zdXJlSGFuZGxlcilcbiAgICAgICAgICAgICAgICA6IGxvY2FsSGFuZGxlcnM/LmhhbmRsZXJzLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmVyYm9zZUVuYWJsZWQgPSBnZXRFbnZpcm9ubWVudFZhcmlhYmxlKFwiTEFOR0NIQUlOX1ZFUkJPU0VcIikgfHwgb3B0aW9ucz8udmVyYm9zZTtcbiAgICAgICAgY29uc3QgdHJhY2luZ1YyRW5hYmxlZCA9IGdldEVudmlyb25tZW50VmFyaWFibGUoXCJMQU5HQ0hBSU5fVFJBQ0lOR19WMlwiKSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgIGNvbnN0IHRyYWNpbmdFbmFibGVkID0gdHJhY2luZ1YyRW5hYmxlZCB8fFxuICAgICAgICAgICAgKGdldEVudmlyb25tZW50VmFyaWFibGUoXCJMQU5HQ0hBSU5fVFJBQ0lOR1wiKSA/PyBmYWxzZSk7XG4gICAgICAgIGlmICh2ZXJib3NlRW5hYmxlZCB8fCB0cmFjaW5nRW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKCFjYWxsYmFja01hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja01hbmFnZXIgPSBuZXcgQ2FsbGJhY2tNYW5hZ2VyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmVyYm9zZUVuYWJsZWQgJiZcbiAgICAgICAgICAgICAgICAhY2FsbGJhY2tNYW5hZ2VyLmhhbmRsZXJzLnNvbWUoKGhhbmRsZXIpID0+IGhhbmRsZXIubmFtZSA9PT0gQ29uc29sZUNhbGxiYWNrSGFuZGxlci5wcm90b3R5cGUubmFtZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb25zb2xlSGFuZGxlciA9IG5ldyBDb25zb2xlQ2FsbGJhY2tIYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tNYW5hZ2VyLmFkZEhhbmRsZXIoY29uc29sZUhhbmRsZXIsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRyYWNpbmdFbmFibGVkICYmXG4gICAgICAgICAgICAgICAgIWNhbGxiYWNrTWFuYWdlci5oYW5kbGVycy5zb21lKChoYW5kbGVyKSA9PiBoYW5kbGVyLm5hbWUgPT09IFwibGFuZ2NoYWluX3RyYWNlclwiKSkge1xuICAgICAgICAgICAgICAgIGlmICh0cmFjaW5nVjJFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrTWFuYWdlci5hZGRIYW5kbGVyKGF3YWl0IGdldFRyYWNpbmdWMkNhbGxiYWNrSGFuZGxlcigpLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSBnZXRFbnZpcm9ubWVudFZhcmlhYmxlKFwiTEFOR0NIQUlOX1BST0pFQ1RcIikgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEVudmlyb25tZW50VmFyaWFibGUoXCJMQU5HQ0hBSU5fU0VTU0lPTlwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tNYW5hZ2VyLmFkZEhhbmRsZXIoYXdhaXQgZ2V0VHJhY2luZ0NhbGxiYWNrSGFuZGxlcihzZXNzaW9uKSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpbmhlcml0YWJsZVRhZ3MgfHwgbG9jYWxUYWdzKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tNYW5hZ2VyLmFkZFRhZ3MoaW5oZXJpdGFibGVUYWdzID8/IFtdKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja01hbmFnZXIuYWRkVGFncyhsb2NhbFRhZ3MgPz8gW10sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5oZXJpdGFibGVNZXRhZGF0YSB8fCBsb2NhbE1ldGFkYXRhKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tNYW5hZ2VyLmFkZE1ldGFkYXRhKGluaGVyaXRhYmxlTWV0YWRhdGEgPz8ge30pO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrTWFuYWdlci5hZGRNZXRhZGF0YShsb2NhbE1ldGFkYXRhID8/IHt9LCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrTWFuYWdlcjtcbiAgICB9XG59XG5mdW5jdGlvbiBlbnN1cmVIYW5kbGVyKGhhbmRsZXIpIHtcbiAgICBpZiAoXCJuYW1lXCIgaW4gaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gaGFuZGxlcjtcbiAgICB9XG4gICAgcmV0dXJuIEJhc2VDYWxsYmFja0hhbmRsZXIuZnJvbU1ldGhvZHMoaGFuZGxlcik7XG59XG5leHBvcnQgY2xhc3MgVHJhY2VHcm91cCB7XG4gICAgY29uc3RydWN0b3IoZ3JvdXBOYW1lLCBvcHRpb25zKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImdyb3VwTmFtZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogZ3JvdXBOYW1lXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJvcHRpb25zXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBvcHRpb25zXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJydW5NYW5hZ2VyXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGdldFRyYWNlR3JvdXBDYWxsYmFja01hbmFnZXIoZ3JvdXBfbmFtZSwgaW5wdXRzLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGNiID0gbmV3IExhbmdDaGFpblRyYWNlcihvcHRpb25zKTtcbiAgICAgICAgY29uc3QgY20gPSBhd2FpdCBDYWxsYmFja01hbmFnZXIuY29uZmlndXJlKFtjYl0pO1xuICAgICAgICBjb25zdCBydW5NYW5hZ2VyID0gYXdhaXQgY20/LmhhbmRsZUNoYWluU3RhcnQoe1xuICAgICAgICAgICAgbGM6IDEsXG4gICAgICAgICAgICB0eXBlOiBcIm5vdF9pbXBsZW1lbnRlZFwiLFxuICAgICAgICAgICAgaWQ6IFtcImxhbmdjaGFpblwiLCBcImNhbGxiYWNrc1wiLCBcImdyb3Vwc1wiLCBncm91cF9uYW1lXSxcbiAgICAgICAgfSwgaW5wdXRzID8/IHt9KTtcbiAgICAgICAgaWYgKCFydW5NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gY3JlYXRlIHJ1biBncm91cCBjYWxsYmFjayBtYW5hZ2VyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcnVuTWFuYWdlcjtcbiAgICB9XG4gICAgYXN5bmMgc3RhcnQoaW5wdXRzKSB7XG4gICAgICAgIGlmICghdGhpcy5ydW5NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLnJ1bk1hbmFnZXIgPSBhd2FpdCB0aGlzLmdldFRyYWNlR3JvdXBDYWxsYmFja01hbmFnZXIodGhpcy5ncm91cE5hbWUsIGlucHV0cywgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5ydW5NYW5hZ2VyLmdldENoaWxkKCk7XG4gICAgfVxuICAgIGFzeW5jIGVycm9yKGVycikge1xuICAgICAgICBpZiAodGhpcy5ydW5NYW5hZ2VyKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJ1bk1hbmFnZXIuaGFuZGxlQ2hhaW5FcnJvcihlcnIpO1xuICAgICAgICAgICAgdGhpcy5ydW5NYW5hZ2VyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGVuZChvdXRwdXQpIHtcbiAgICAgICAgaWYgKHRoaXMucnVuTWFuYWdlcikge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5ydW5NYW5hZ2VyLmhhbmRsZUNoYWluRW5kKG91dHB1dCA/PyB7fSk7XG4gICAgICAgICAgICB0aGlzLnJ1bk1hbmFnZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZnVuY3Rpb24gX2NvZXJjZVRvRGljdCh2YWx1ZSwgZGVmYXVsdEtleSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiB7IFtkZWZhdWx0S2V5XTogdmFsdWUgfTtcbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdHJhY2VBc0dyb3VwKGdyb3VwT3B0aW9ucywgZW5jbG9zZWRDb2RlLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgdHJhY2VHcm91cCA9IG5ldyBUcmFjZUdyb3VwKGdyb3VwT3B0aW9ucy5uYW1lLCBncm91cE9wdGlvbnMpO1xuICAgIGNvbnN0IGNhbGxiYWNrTWFuYWdlciA9IGF3YWl0IHRyYWNlR3JvdXAuc3RhcnQoeyAuLi5hcmdzIH0pO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGVuY2xvc2VkQ29kZShjYWxsYmFja01hbmFnZXIsIC4uLmFyZ3MpO1xuICAgICAgICBhd2FpdCB0cmFjZUdyb3VwLmVuZChfY29lcmNlVG9EaWN0KHJlc3VsdCwgXCJvdXRwdXRcIikpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGF3YWl0IHRyYWNlR3JvdXAuZXJyb3IoZXJyKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbn1cbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgdjEgfSBmcm9tICcuL3YxLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdjMgfSBmcm9tICcuL3YzLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdjQgfSBmcm9tICcuL3Y0LmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdjUgfSBmcm9tICcuL3Y1LmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTklMIH0gZnJvbSAnLi9uaWwuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB2ZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdmFsaWRhdGUgfSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBwYXJzZSB9IGZyb20gJy4vcGFyc2UuanMnOyIsImltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHsgdW5zYWZlU3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnOyAvLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbmxldCBfbm9kZUlkO1xuXG5sZXQgX2Nsb2Nrc2VxOyAvLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcblxuXG5sZXQgX2xhc3RNU2VjcyA9IDA7XG5sZXQgX2xhc3ROU2VjcyA9IDA7IC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQgZm9yIEFQSSBkZXRhaWxzXG5cbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGxldCBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICBjb25zdCBiID0gYnVmIHx8IG5ldyBBcnJheSgxNik7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsZXQgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICBsZXQgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxOyAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcblxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICBjb25zdCBzZWVkQnl0ZXMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gICAgICBub2RlID0gX25vZGVJZCA9IFtzZWVkQnl0ZXNbMF0gfCAweDAxLCBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XV07XG4gICAgfVxuXG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9IC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuXG5cbiAgbGV0IG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IERhdGUubm93KCk7IC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcblxuICBsZXQgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7IC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcblxuICBjb25zdCBkdCA9IG1zZWNzIC0gX2xhc3RNU2VjcyArIChuc2VjcyAtIF9sYXN0TlNlY3MpIC8gMTAwMDA7IC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9IC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcblxuXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9IC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcblxuXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInV1aWQudjEoKTogQ2FuJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjXCIpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxOyAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcblxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDsgLy8gYHRpbWVfbG93YFxuXG4gIGNvbnN0IHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjsgLy8gYHRpbWVfbWlkYFxuXG4gIGNvbnN0IHRtaCA9IG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjsgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcblxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG5cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7IC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDsgLy8gYGNsb2NrX3NlcV9sb3dgXG5cbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmOyAvLyBgbm9kZWBcblxuICBmb3IgKGxldCBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgfHwgdW5zYWZlU3RyaW5naWZ5KGIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2MTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgcmV0dXJuIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIGNvbnN0IHV1aWQgPSB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCJpbXBvcnQgdjM1IGZyb20gJy4vdjM1LmpzJztcbmltcG9ydCBtZDUgZnJvbSAnLi9tZDUuanMnO1xuY29uc3QgdjMgPSB2MzUoJ3YzJywgMHgzMCwgbWQ1KTtcbmV4cG9ydCBkZWZhdWx0IHYzOyIsImltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcbmltcG9ydCBwYXJzZSBmcm9tICcuL3BhcnNlLmpzJztcblxuZnVuY3Rpb24gc3RyaW5nVG9CeXRlcyhzdHIpIHtcbiAgc3RyID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpOyAvLyBVVEY4IGVzY2FwZVxuXG4gIGNvbnN0IGJ5dGVzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBieXRlcy5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpKTtcbiAgfVxuXG4gIHJldHVybiBieXRlcztcbn1cblxuZXhwb3J0IGNvbnN0IEROUyA9ICc2YmE3YjgxMC05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xuZXhwb3J0IGNvbnN0IFVSTCA9ICc2YmE3YjgxMS05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdjM1KG5hbWUsIHZlcnNpb24sIGhhc2hmdW5jKSB7XG4gIGZ1bmN0aW9uIGdlbmVyYXRlVVVJRCh2YWx1ZSwgbmFtZXNwYWNlLCBidWYsIG9mZnNldCkge1xuICAgIHZhciBfbmFtZXNwYWNlO1xuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gc3RyaW5nVG9CeXRlcyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBuYW1lc3BhY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICBuYW1lc3BhY2UgPSBwYXJzZShuYW1lc3BhY2UpO1xuICAgIH1cblxuICAgIGlmICgoKF9uYW1lc3BhY2UgPSBuYW1lc3BhY2UpID09PSBudWxsIHx8IF9uYW1lc3BhY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9uYW1lc3BhY2UubGVuZ3RoKSAhPT0gMTYpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignTmFtZXNwYWNlIG11c3QgYmUgYXJyYXktbGlrZSAoMTYgaXRlcmFibGUgaW50ZWdlciB2YWx1ZXMsIDAtMjU1KScpO1xuICAgIH0gLy8gQ29tcHV0ZSBoYXNoIG9mIG5hbWVzcGFjZSBhbmQgdmFsdWUsIFBlciA0LjNcbiAgICAvLyBGdXR1cmU6IFVzZSBzcHJlYWQgc3ludGF4IHdoZW4gc3VwcG9ydGVkIG9uIGFsbCBwbGF0Zm9ybXMsIGUuZy4gYGJ5dGVzID1cbiAgICAvLyBoYXNoZnVuYyhbLi4ubmFtZXNwYWNlLCAuLi4gdmFsdWVdKWBcblxuXG4gICAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoMTYgKyB2YWx1ZS5sZW5ndGgpO1xuICAgIGJ5dGVzLnNldChuYW1lc3BhY2UpO1xuICAgIGJ5dGVzLnNldCh2YWx1ZSwgbmFtZXNwYWNlLmxlbmd0aCk7XG4gICAgYnl0ZXMgPSBoYXNoZnVuYyhieXRlcyk7XG4gICAgYnl0ZXNbNl0gPSBieXRlc1s2XSAmIDB4MGYgfCB2ZXJzaW9uO1xuICAgIGJ5dGVzWzhdID0gYnl0ZXNbOF0gJiAweDNmIHwgMHg4MDtcblxuICAgIGlmIChidWYpIHtcbiAgICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgICAgYnVmW29mZnNldCArIGldID0gYnl0ZXNbaV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShieXRlcyk7XG4gIH0gLy8gRnVuY3Rpb24jbmFtZSBpcyBub3Qgc2V0dGFibGUgb24gc29tZSBwbGF0Zm9ybXMgKCMyNzApXG5cblxuICB0cnkge1xuICAgIGdlbmVyYXRlVVVJRC5uYW1lID0gbmFtZTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gIH0gY2F0Y2ggKGVycikge30gLy8gRm9yIENvbW1vbkpTIGRlZmF1bHQgZXhwb3J0IHN1cHBvcnRcblxuXG4gIGdlbmVyYXRlVVVJRC5ETlMgPSBETlM7XG4gIGdlbmVyYXRlVVVJRC5VUkwgPSBVUkw7XG4gIHJldHVybiBnZW5lcmF0ZVVVSUQ7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuXG5mdW5jdGlvbiBwYXJzZSh1dWlkKSB7XG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVVVJRCcpO1xuICB9XG5cbiAgbGV0IHY7XG4gIGNvbnN0IGFyciA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gUGFyc2UgIyMjIyMjIyMtLi4uLi0uLi4uLS4uLi4tLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDAsIDgpLCAxNikpID4+PiAyNDtcbiAgYXJyWzFdID0gdiA+Pj4gMTYgJiAweGZmO1xuICBhcnJbMl0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzNdID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLSMjIyMtLi4uLi0uLi4uLS4uLi4uLi4uLi4uLlxuXG4gIGFycls0XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSg5LCAxMyksIDE2KSkgPj4+IDg7XG4gIGFycls1XSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLSMjIyMtLi4uLi0uLi4uLi4uLi4uLi5cblxuICBhcnJbNl0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTQsIDE4KSwgMTYpKSA+Pj4gODtcbiAgYXJyWzddID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tLi4uLi0jIyMjLS4uLi4uLi4uLi4uLlxuXG4gIGFycls4XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgxOSwgMjMpLCAxNikpID4+PiA4O1xuICBhcnJbOV0gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0uLi4uLS4uLi4tIyMjIyMjIyMjIyMjXG4gIC8vIChVc2UgXCIvXCIgdG8gYXZvaWQgMzItYml0IHRydW5jYXRpb24gd2hlbiBiaXQtc2hpZnRpbmcgaGlnaC1vcmRlciBieXRlcylcblxuICBhcnJbMTBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDI0LCAzNiksIDE2KSkgLyAweDEwMDAwMDAwMDAwICYgMHhmZjtcbiAgYXJyWzExXSA9IHYgLyAweDEwMDAwMDAwMCAmIDB4ZmY7XG4gIGFyclsxMl0gPSB2ID4+PiAyNCAmIDB4ZmY7XG4gIGFyclsxM10gPSB2ID4+PiAxNiAmIDB4ZmY7XG4gIGFyclsxNF0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzE1XSA9IHYgJiAweGZmO1xuICByZXR1cm4gYXJyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJzZTsiLCIvKlxuICogQnJvd3Nlci1jb21wYXRpYmxlIEphdmFTY3JpcHQgTUQ1XG4gKlxuICogTW9kaWZpY2F0aW9uIG9mIEphdmFTY3JpcHQgTUQ1XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9KYXZhU2NyaXB0LU1ENVxuICpcbiAqIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqXG4gKiBCYXNlZCBvblxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cbiAqIFZlcnNpb24gMi4yIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwOVxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxuICovXG5mdW5jdGlvbiBtZDUoYnl0ZXMpIHtcbiAgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBtc2cgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYnl0ZXMpKTsgLy8gVVRGOCBlc2NhcGVcblxuICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobXNnLmxlbmd0aCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXNbaV0gPSBtc2cuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWQ1VG9IZXhFbmNvZGVkQXJyYXkod29yZHNUb01kNShieXRlc1RvV29yZHMoYnl0ZXMpLCBieXRlcy5sZW5ndGggKiA4KSk7XG59XG4vKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGFuIGFycmF5IG9mIGJ5dGVzXG4gKi9cblxuXG5mdW5jdGlvbiBtZDVUb0hleEVuY29kZWRBcnJheShpbnB1dCkge1xuICBjb25zdCBvdXRwdXQgPSBbXTtcbiAgY29uc3QgbGVuZ3RoMzIgPSBpbnB1dC5sZW5ndGggKiAzMjtcbiAgY29uc3QgaGV4VGFiID0gJzAxMjM0NTY3ODlhYmNkZWYnO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoMzI7IGkgKz0gOCkge1xuICAgIGNvbnN0IHggPSBpbnB1dFtpID4+IDVdID4+PiBpICUgMzIgJiAweGZmO1xuICAgIGNvbnN0IGhleCA9IHBhcnNlSW50KGhleFRhYi5jaGFyQXQoeCA+Pj4gNCAmIDB4MGYpICsgaGV4VGFiLmNoYXJBdCh4ICYgMHgwZiksIDE2KTtcbiAgICBvdXRwdXQucHVzaChoZXgpO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlIG91dHB1dCBsZW5ndGggd2l0aCBwYWRkaW5nIGFuZCBiaXQgbGVuZ3RoXG4gKi9cblxuXG5mdW5jdGlvbiBnZXRPdXRwdXRMZW5ndGgoaW5wdXRMZW5ndGg4KSB7XG4gIHJldHVybiAoaW5wdXRMZW5ndGg4ICsgNjQgPj4+IDkgPDwgNCkgKyAxNCArIDE7XG59XG4vKlxuICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cbiAqL1xuXG5cbmZ1bmN0aW9uIHdvcmRzVG9NZDUoeCwgbGVuKSB7XG4gIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgbGVuICUgMzI7XG4gIHhbZ2V0T3V0cHV0TGVuZ3RoKGxlbikgLSAxXSA9IGxlbjtcbiAgbGV0IGEgPSAxNzMyNTg0MTkzO1xuICBsZXQgYiA9IC0yNzE3MzM4Nzk7XG4gIGxldCBjID0gLTE3MzI1ODQxOTQ7XG4gIGxldCBkID0gMjcxNzMzODc4O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICBjb25zdCBvbGRhID0gYTtcbiAgICBjb25zdCBvbGRiID0gYjtcbiAgICBjb25zdCBvbGRjID0gYztcbiAgICBjb25zdCBvbGRkID0gZDtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpXSwgNywgLTY4MDg3NjkzNik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDFdLCAxMiwgLTM4OTU2NDU4Nik7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNywgNjA2MTA1ODE5KTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgM10sIDIyLCAtMTA0NDUyNTMzMCk7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA3LCAtMTc2NDE4ODk3KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgNV0sIDEyLCAxMjAwMDgwNDI2KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDddLCAyMiwgLTQ1NzA1OTgzKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgOF0sIDcsIDE3NzAwMzU0MTYpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNywgLTQyMDYzKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDcsIDE4MDQ2MDM2ODIpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxM10sIDEyLCAtNDAzNDExMDEpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsIDEyMzY1MzUzMjkpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNSwgLTE2NTc5NjUxMCk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDZdLCA5LCAtMTA2OTUwMTYzMik7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTQsIDY0MzcxNzcxMyk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaV0sIDIwLCAtMzczODk3MzAyKTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgNV0sIDUsIC03MDE1NTg2OTEpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sIDksIDM4MDE2MDgzKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDRdLCAyMCwgLTQwNTUzNzg0OCk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDldLCA1LCA1Njg0NDY0MzgpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxNF0sIDksIC0xMDE5ODAzNjkwKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgM10sIDE0LCAtMTg3MzYzOTYxKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgOF0sIDIwLCAxMTYzNTMxNTAxKTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMTNdLCA1LCAtMTQ0NDY4MTQ2Nyk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDJdLCA5LCAtNTE0MDM3ODQpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTQsIDE3MzUzMjg0NzMpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyAxMl0sIDIwLCAtMTkyNjYwNzczNCk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA0LCAtMzc4NTU4KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgOF0sIDExLCAtMjAyMjU3NDQ2Myk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsIDE4MzkwMzA1NjIpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxNF0sIDIzLCAtMzUzMDk1NTYpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNCwgLTE1MzA5OTIwNjApO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA0XSwgMTEsIDEyNzI4OTMzNTMpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTYsIC0xNTU0OTc2MzIpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxMF0sIDIzLCAtMTA5NDczMDY0MCk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNCwgNjgxMjc5MTc0KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpXSwgMTEsIC0zNTg1MzcyMjIpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyA2XSwgMjMsIDc2MDI5MTg5KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgOV0sIDQsIC02NDAzNjQ0ODcpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyAxMl0sIDExLCAtNDIxODE1ODM1KTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgNTMwNzQyNTIwKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMl0sIDIzLCAtOTk1MzM4NjUxKTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpXSwgNiwgLTE5ODYzMDg0NCk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDddLCAxMCwgMTEyNjg5MTQxNSk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgNV0sIDIxLCAtNTc0MzQwNTUpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDYsIDE3MDA0ODU1NzEpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNSwgLTEwNTE1MjMpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgOF0sIDYsIDE4NzMzMTMzNTkpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxNV0sIDEwLCAtMzA2MTE3NDQpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgMTMwOTE1MTY0OSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA2LCAtMTQ1NTIzMDcwKTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTUsIDcxODc4NzI1OSk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDldLCAyMSwgLTM0MzQ4NTU1MSk7XG4gICAgYSA9IHNhZmVBZGQoYSwgb2xkYSk7XG4gICAgYiA9IHNhZmVBZGQoYiwgb2xkYik7XG4gICAgYyA9IHNhZmVBZGQoYywgb2xkYyk7XG4gICAgZCA9IHNhZmVBZGQoZCwgb2xkZCk7XG4gIH1cblxuICByZXR1cm4gW2EsIGIsIGMsIGRdO1xufVxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgYnl0ZXMgdG8gYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3Jkc1xuICogQ2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGlnaC1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXG4gKi9cblxuXG5mdW5jdGlvbiBieXRlc1RvV29yZHMoaW5wdXQpIHtcbiAgaWYgKGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IGxlbmd0aDggPSBpbnB1dC5sZW5ndGggKiA4O1xuICBjb25zdCBvdXRwdXQgPSBuZXcgVWludDMyQXJyYXkoZ2V0T3V0cHV0TGVuZ3RoKGxlbmd0aDgpKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDg7IGkgKz0gOCkge1xuICAgIG91dHB1dFtpID4+IDVdIHw9IChpbnB1dFtpIC8gOF0gJiAweGZmKSA8PCBpICUgMzI7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuLypcbiAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXG4gKi9cblxuXG5mdW5jdGlvbiBzYWZlQWRkKHgsIHkpIHtcbiAgY29uc3QgbHN3ID0gKHggJiAweGZmZmYpICsgKHkgJiAweGZmZmYpO1xuICBjb25zdCBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgcmV0dXJuIG1zdyA8PCAxNiB8IGxzdyAmIDB4ZmZmZjtcbn1cbi8qXG4gKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXG4gKi9cblxuXG5mdW5jdGlvbiBiaXRSb3RhdGVMZWZ0KG51bSwgY250KSB7XG4gIHJldHVybiBudW0gPDwgY250IHwgbnVtID4+PiAzMiAtIGNudDtcbn1cbi8qXG4gKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxuICovXG5cblxuZnVuY3Rpb24gbWQ1Y21uKHEsIGEsIGIsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIHNhZmVBZGQoYml0Um90YXRlTGVmdChzYWZlQWRkKHNhZmVBZGQoYSwgcSksIHNhZmVBZGQoeCwgdCkpLCBzKSwgYik7XG59XG5cbmZ1bmN0aW9uIG1kNWZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiICYgYyB8IH5iICYgZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWdnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiICYgZCB8IGMgJiB+ZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWhoKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xufVxuXG5mdW5jdGlvbiBtZDVpaShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gIHJldHVybiBtZDVjbW4oYyBeIChiIHwgfmQpLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWQ1OyIsImltcG9ydCBuYXRpdmUgZnJvbSAnLi9uYXRpdmUuanMnO1xuaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgeyB1bnNhZmVTdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGlmIChuYXRpdmUucmFuZG9tVVVJRCAmJiAhYnVmICYmICFvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5hdGl2ZS5yYW5kb21VVUlEKCk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiB1bnNhZmVTdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiaW1wb3J0IHYzNSBmcm9tICcuL3YzNS5qcyc7XG5pbXBvcnQgc2hhMSBmcm9tICcuL3NoYTEuanMnO1xuY29uc3QgdjUgPSB2MzUoJ3Y1JywgMHg1MCwgc2hhMSk7XG5leHBvcnQgZGVmYXVsdCB2NTsiLCIvLyBBZGFwdGVkIGZyb20gQ2hyaXMgVmVuZXNzJyBTSEExIGNvZGUgYXRcbi8vIGh0dHA6Ly93d3cubW92YWJsZS10eXBlLmNvLnVrL3NjcmlwdHMvc2hhMS5odG1sXG5mdW5jdGlvbiBmKHMsIHgsIHksIHopIHtcbiAgc3dpdGNoIChzKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIHggJiB5IF4gfnggJiB6O1xuXG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHggXiB5IF4gejtcblxuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiB4ICYgeSBeIHggJiB6IF4geSAmIHo7XG5cbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuICB9XG59XG5cbmZ1bmN0aW9uIFJPVEwoeCwgbikge1xuICByZXR1cm4geCA8PCBuIHwgeCA+Pj4gMzIgLSBuO1xufVxuXG5mdW5jdGlvbiBzaGExKGJ5dGVzKSB7XG4gIGNvbnN0IEsgPSBbMHg1YTgyNzk5OSwgMHg2ZWQ5ZWJhMSwgMHg4ZjFiYmNkYywgMHhjYTYyYzFkNl07XG4gIGNvbnN0IEggPSBbMHg2NzQ1MjMwMSwgMHhlZmNkYWI4OSwgMHg5OGJhZGNmZSwgMHgxMDMyNTQ3NiwgMHhjM2QyZTFmMF07XG5cbiAgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBtc2cgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYnl0ZXMpKTsgLy8gVVRGOCBlc2NhcGVcblxuICAgIGJ5dGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXMucHVzaChtc2cuY2hhckNvZGVBdChpKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGJ5dGVzKSkge1xuICAgIC8vIENvbnZlcnQgQXJyYXktbGlrZSB0byBBcnJheVxuICAgIGJ5dGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYnl0ZXMpO1xuICB9XG5cbiAgYnl0ZXMucHVzaCgweDgwKTtcbiAgY29uc3QgbCA9IGJ5dGVzLmxlbmd0aCAvIDQgKyAyO1xuICBjb25zdCBOID0gTWF0aC5jZWlsKGwgLyAxNik7XG4gIGNvbnN0IE0gPSBuZXcgQXJyYXkoTik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBOOyArK2kpIHtcbiAgICBjb25zdCBhcnIgPSBuZXcgVWludDMyQXJyYXkoMTYpO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICBhcnJbal0gPSBieXRlc1tpICogNjQgKyBqICogNF0gPDwgMjQgfCBieXRlc1tpICogNjQgKyBqICogNCArIDFdIDw8IDE2IHwgYnl0ZXNbaSAqIDY0ICsgaiAqIDQgKyAyXSA8PCA4IHwgYnl0ZXNbaSAqIDY0ICsgaiAqIDQgKyAzXTtcbiAgICB9XG5cbiAgICBNW2ldID0gYXJyO1xuICB9XG5cbiAgTVtOIC0gMV1bMTRdID0gKGJ5dGVzLmxlbmd0aCAtIDEpICogOCAvIE1hdGgucG93KDIsIDMyKTtcbiAgTVtOIC0gMV1bMTRdID0gTWF0aC5mbG9vcihNW04gLSAxXVsxNF0pO1xuICBNW04gLSAxXVsxNV0gPSAoYnl0ZXMubGVuZ3RoIC0gMSkgKiA4ICYgMHhmZmZmZmZmZjtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IE47ICsraSkge1xuICAgIGNvbnN0IFcgPSBuZXcgVWludDMyQXJyYXkoODApO1xuXG4gICAgZm9yIChsZXQgdCA9IDA7IHQgPCAxNjsgKyt0KSB7XG4gICAgICBXW3RdID0gTVtpXVt0XTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCB0ID0gMTY7IHQgPCA4MDsgKyt0KSB7XG4gICAgICBXW3RdID0gUk9UTChXW3QgLSAzXSBeIFdbdCAtIDhdIF4gV1t0IC0gMTRdIF4gV1t0IC0gMTZdLCAxKTtcbiAgICB9XG5cbiAgICBsZXQgYSA9IEhbMF07XG4gICAgbGV0IGIgPSBIWzFdO1xuICAgIGxldCBjID0gSFsyXTtcbiAgICBsZXQgZCA9IEhbM107XG4gICAgbGV0IGUgPSBIWzRdO1xuXG4gICAgZm9yIChsZXQgdCA9IDA7IHQgPCA4MDsgKyt0KSB7XG4gICAgICBjb25zdCBzID0gTWF0aC5mbG9vcih0IC8gMjApO1xuICAgICAgY29uc3QgVCA9IFJPVEwoYSwgNSkgKyBmKHMsIGIsIGMsIGQpICsgZSArIEtbc10gKyBXW3RdID4+PiAwO1xuICAgICAgZSA9IGQ7XG4gICAgICBkID0gYztcbiAgICAgIGMgPSBST1RMKGIsIDMwKSA+Pj4gMDtcbiAgICAgIGIgPSBhO1xuICAgICAgYSA9IFQ7XG4gICAgfVxuXG4gICAgSFswXSA9IEhbMF0gKyBhID4+PiAwO1xuICAgIEhbMV0gPSBIWzFdICsgYiA+Pj4gMDtcbiAgICBIWzJdID0gSFsyXSArIGMgPj4+IDA7XG4gICAgSFszXSA9IEhbM10gKyBkID4+PiAwO1xuICAgIEhbNF0gPSBIWzRdICsgZSA+Pj4gMDtcbiAgfVxuXG4gIHJldHVybiBbSFswXSA+PiAyNCAmIDB4ZmYsIEhbMF0gPj4gMTYgJiAweGZmLCBIWzBdID4+IDggJiAweGZmLCBIWzBdICYgMHhmZiwgSFsxXSA+PiAyNCAmIDB4ZmYsIEhbMV0gPj4gMTYgJiAweGZmLCBIWzFdID4+IDggJiAweGZmLCBIWzFdICYgMHhmZiwgSFsyXSA+PiAyNCAmIDB4ZmYsIEhbMl0gPj4gMTYgJiAweGZmLCBIWzJdID4+IDggJiAweGZmLCBIWzJdICYgMHhmZiwgSFszXSA+PiAyNCAmIDB4ZmYsIEhbM10gPj4gMTYgJiAweGZmLCBIWzNdID4+IDggJiAweGZmLCBIWzNdICYgMHhmZiwgSFs0XSA+PiAyNCAmIDB4ZmYsIEhbNF0gPj4gMTYgJiAweGZmLCBIWzRdID4+IDggJiAweGZmLCBIWzRdICYgMHhmZl07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNoYTE7IiwiZXhwb3J0IGRlZmF1bHQgJzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCc7IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuXG5mdW5jdGlvbiB2ZXJzaW9uKHV1aWQpIHtcbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignSW52YWxpZCBVVUlEJyk7XG4gIH1cblxuICByZXR1cm4gcGFyc2VJbnQodXVpZC5zbGljZSgxNCwgMTUpLCAxNik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZlcnNpb247IiwiaW1wb3J0ICogYXMgdXVpZCBmcm9tIFwidXVpZFwiO1xuaW1wb3J0IHsgU2VyaWFsaXphYmxlLCBnZXRfbGNfdW5pcXVlX25hbWUsIH0gZnJvbSBcIi4uL2xvYWQvc2VyaWFsaXphYmxlLmpzXCI7XG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIHRoYXQgcHJvdmlkZXMgYSBzZXQgb2Ygb3B0aW9uYWwgbWV0aG9kcyB0aGF0IGNhbiBiZVxuICogb3ZlcnJpZGRlbiBpbiBkZXJpdmVkIGNsYXNzZXMgdG8gaGFuZGxlIHZhcmlvdXMgZXZlbnRzIGR1cmluZyB0aGVcbiAqIGV4ZWN1dGlvbiBvZiBhIExhbmdDaGFpbiBhcHBsaWNhdGlvbi5cbiAqL1xuY2xhc3MgQmFzZUNhbGxiYWNrSGFuZGxlck1ldGhvZHNDbGFzcyB7XG59XG4vKipcbiAqIEFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIGNyZWF0aW5nIGNhbGxiYWNrIGhhbmRsZXJzIGluIHRoZSBMYW5nQ2hhaW5cbiAqIGZyYW1ld29yay4gSXQgcHJvdmlkZXMgYSBzZXQgb2Ygb3B0aW9uYWwgbWV0aG9kcyB0aGF0IGNhbiBiZSBvdmVycmlkZGVuXG4gKiBpbiBkZXJpdmVkIGNsYXNzZXMgdG8gaGFuZGxlIHZhcmlvdXMgZXZlbnRzIGR1cmluZyB0aGUgZXhlY3V0aW9uIG9mIGFcbiAqIExhbmdDaGFpbiBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEJhc2VDYWxsYmFja0hhbmRsZXIgZXh0ZW5kcyBCYXNlQ2FsbGJhY2tIYW5kbGVyTWV0aG9kc0NsYXNzIHtcbiAgICBnZXQgbGNfbmFtZXNwYWNlKCkge1xuICAgICAgICByZXR1cm4gW1wibGFuZ2NoYWluXCIsIFwiY2FsbGJhY2tzXCIsIHRoaXMubmFtZV07XG4gICAgfVxuICAgIGdldCBsY19zZWNyZXRzKCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBnZXQgbGNfYXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZ2V0IGxjX2FsaWFzZXMoKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBzZXJpYWxpemFibGUuIE92ZXJyaWRlIHRvIHByb3ZpZGUgYW4gYWxpYXMgb3JcbiAgICAgKiB0byBwcmVzZXJ2ZSB0aGUgc2VyaWFsaXplZCBtb2R1bGUgbmFtZSBpbiBtaW5pZmllZCBlbnZpcm9ubWVudHMuXG4gICAgICpcbiAgICAgKiBJbXBsZW1lbnRlZCBhcyBhIHN0YXRpYyBtZXRob2QgdG8gc3VwcG9ydCBsb2FkaW5nIGxvZ2ljLlxuICAgICAqL1xuICAgIHN0YXRpYyBsY19uYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZmluYWwgc2VyaWFsaXplZCBpZGVudGlmaWVyIGZvciB0aGUgbW9kdWxlLlxuICAgICAqL1xuICAgIGdldCBsY19pZCgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIC4uLnRoaXMubGNfbmFtZXNwYWNlLFxuICAgICAgICAgICAgZ2V0X2xjX3VuaXF1ZV9uYW1lKHRoaXMuY29uc3RydWN0b3IpLFxuICAgICAgICBdO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihpbnB1dCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJsY19zZXJpYWxpemFibGVcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJsY19rd2FyZ3NcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiaWdub3JlTExNXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiaWdub3JlQ2hhaW5cIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJpZ25vcmVBZ2VudFwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImlnbm9yZVJldHJpZXZlclwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImF3YWl0SGFuZGxlcnNcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgPyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvY2Vzcy1lbnZcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnY/LkxBTkdDSEFJTl9DQUxMQkFDS1NfQkFDS0dST1VORCAhPT0gXCJ0cnVlXCJcbiAgICAgICAgICAgICAgICA6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubGNfa3dhcmdzID0gaW5wdXQgfHwge307XG4gICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5pZ25vcmVMTE0gPSBpbnB1dC5pZ25vcmVMTE0gPz8gdGhpcy5pZ25vcmVMTE07XG4gICAgICAgICAgICB0aGlzLmlnbm9yZUNoYWluID0gaW5wdXQuaWdub3JlQ2hhaW4gPz8gdGhpcy5pZ25vcmVDaGFpbjtcbiAgICAgICAgICAgIHRoaXMuaWdub3JlQWdlbnQgPSBpbnB1dC5pZ25vcmVBZ2VudCA/PyB0aGlzLmlnbm9yZUFnZW50O1xuICAgICAgICAgICAgdGhpcy5pZ25vcmVSZXRyaWV2ZXIgPSBpbnB1dC5pZ25vcmVSZXRyaWV2ZXIgPz8gdGhpcy5pZ25vcmVSZXRyaWV2ZXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMpO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiBTZXJpYWxpemFibGUucHJvdG90eXBlLnRvSlNPTi5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICB0b0pTT05Ob3RJbXBsZW1lbnRlZCgpIHtcbiAgICAgICAgcmV0dXJuIFNlcmlhbGl6YWJsZS5wcm90b3R5cGUudG9KU09OTm90SW1wbGVtZW50ZWQuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgc3RhdGljIGZyb21NZXRob2RzKG1ldGhvZHMpIHtcbiAgICAgICAgY2xhc3MgSGFuZGxlciBleHRlbmRzIEJhc2VDYWxsYmFja0hhbmRsZXIge1xuICAgICAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJuYW1lXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHV1aWQudjQoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgbWV0aG9kcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBIYW5kbGVyKCk7XG4gICAgfVxufVxuIiwidmFyIHE9T2JqZWN0LmNyZWF0ZTt2YXIgcD1PYmplY3QuZGVmaW5lUHJvcGVydHk7dmFyIEE9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjt2YXIgST1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lczt2YXIgUT1PYmplY3QuZ2V0UHJvdG90eXBlT2YsUz1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O3ZhciBOPShlLHQpPT4oKT0+KHR8fGUoKHQ9e2V4cG9ydHM6e319KS5leHBvcnRzLHQpLHQuZXhwb3J0cyksTz0oZSx0KT0+e2Zvcih2YXIgbiBpbiB0KXAoZSxuLHtnZXQ6dFtuXSxlbnVtZXJhYmxlOiEwfSl9LG09KGUsdCxuLHcpPT57aWYodCYmdHlwZW9mIHQ9PVwib2JqZWN0XCJ8fHR5cGVvZiB0PT1cImZ1bmN0aW9uXCIpZm9yKGxldCBmIG9mIEkodCkpIVMuY2FsbChlLGYpJiZmIT09biYmcChlLGYse2dldDooKT0+dFtmXSxlbnVtZXJhYmxlOiEodz1BKHQsZikpfHx3LmVudW1lcmFibGV9KTtyZXR1cm4gZX0saD0oZSx0LG4pPT4obShlLHQsXCJkZWZhdWx0XCIpLG4mJm0obix0LFwiZGVmYXVsdFwiKSkseT0oZSx0LG4pPT4obj1lIT1udWxsP3EoUShlKSk6e30sbSh0fHwhZXx8IWUuX19lc01vZHVsZT9wKG4sXCJkZWZhdWx0XCIse3ZhbHVlOmUsZW51bWVyYWJsZTohMH0pOm4sZSkpLFU9ZT0+bShwKHt9LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGUpO3ZhciB2PU4oKEYsRSk9Pnt2YXIgcj1FLmV4cG9ydHM9e30saSx1O2Z1bmN0aW9uIFQoKXt0aHJvdyBuZXcgRXJyb3IoXCJzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkXCIpfWZ1bmN0aW9uIGcoKXt0aHJvdyBuZXcgRXJyb3IoXCJjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWRcIil9KGZ1bmN0aW9uKCl7dHJ5e3R5cGVvZiBzZXRUaW1lb3V0PT1cImZ1bmN0aW9uXCI/aT1zZXRUaW1lb3V0Omk9VH1jYXRjaChlKXtpPVR9dHJ5e3R5cGVvZiBjbGVhclRpbWVvdXQ9PVwiZnVuY3Rpb25cIj91PWNsZWFyVGltZW91dDp1PWd9Y2F0Y2goZSl7dT1nfX0pKCk7ZnVuY3Rpb24gYihlKXtpZihpPT09c2V0VGltZW91dClyZXR1cm4gc2V0VGltZW91dChlLDApO2lmKChpPT09VHx8IWkpJiZzZXRUaW1lb3V0KXJldHVybiBpPXNldFRpbWVvdXQsc2V0VGltZW91dChlLDApO3RyeXtyZXR1cm4gaShlLDApfWNhdGNoKHQpe3RyeXtyZXR1cm4gaS5jYWxsKG51bGwsZSwwKX1jYXRjaChuKXtyZXR1cm4gaS5jYWxsKHRoaXMsZSwwKX19fWZ1bmN0aW9uIGooZSl7aWYodT09PWNsZWFyVGltZW91dClyZXR1cm4gY2xlYXJUaW1lb3V0KGUpO2lmKCh1PT09Z3x8IXUpJiZjbGVhclRpbWVvdXQpcmV0dXJuIHU9Y2xlYXJUaW1lb3V0LGNsZWFyVGltZW91dChlKTt0cnl7cmV0dXJuIHUoZSl9Y2F0Y2godCl7dHJ5e3JldHVybiB1LmNhbGwobnVsbCxlKX1jYXRjaChuKXtyZXR1cm4gdS5jYWxsKHRoaXMsZSl9fX12YXIgbz1bXSxzPSExLGEsZD0tMTtmdW5jdGlvbiB6KCl7IXN8fCFhfHwocz0hMSxhLmxlbmd0aD9vPWEuY29uY2F0KG8pOmQ9LTEsby5sZW5ndGgmJngoKSl9ZnVuY3Rpb24geCgpe2lmKCFzKXt2YXIgZT1iKHopO3M9ITA7Zm9yKHZhciB0PW8ubGVuZ3RoO3Q7KXtmb3IoYT1vLG89W107KytkPHQ7KWEmJmFbZF0ucnVuKCk7ZD0tMSx0PW8ubGVuZ3RofWE9bnVsbCxzPSExLGooZSl9fXIubmV4dFRpY2s9ZnVuY3Rpb24oZSl7dmFyIHQ9bmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgtMSk7aWYoYXJndW1lbnRzLmxlbmd0aD4xKWZvcih2YXIgbj0xO248YXJndW1lbnRzLmxlbmd0aDtuKyspdFtuLTFdPWFyZ3VtZW50c1tuXTtvLnB1c2gobmV3IEwoZSx0KSksby5sZW5ndGg9PT0xJiYhcyYmYih4KX07ZnVuY3Rpb24gTChlLHQpe3RoaXMuZnVuPWUsdGhpcy5hcnJheT10fUwucHJvdG90eXBlLnJ1bj1mdW5jdGlvbigpe3RoaXMuZnVuLmFwcGx5KG51bGwsdGhpcy5hcnJheSl9O3IudGl0bGU9XCJicm93c2VyXCI7ci5icm93c2VyPSEwO3IuZW52PXt9O3IuYXJndj1bXTtyLnZlcnNpb249XCJcIjtyLnZlcnNpb25zPXt9O2Z1bmN0aW9uIGMoKXt9ci5vbj1jO3IuYWRkTGlzdGVuZXI9YztyLm9uY2U9YztyLm9mZj1jO3IucmVtb3ZlTGlzdGVuZXI9YztyLnJlbW92ZUFsbExpc3RlbmVycz1jO3IuZW1pdD1jO3IucHJlcGVuZExpc3RlbmVyPWM7ci5wcmVwZW5kT25jZUxpc3RlbmVyPWM7ci5saXN0ZW5lcnM9ZnVuY3Rpb24oZSl7cmV0dXJuW119O3IuYmluZGluZz1mdW5jdGlvbihlKXt0aHJvdyBuZXcgRXJyb3IoXCJwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZFwiKX07ci5jd2Q9ZnVuY3Rpb24oKXtyZXR1cm5cIi9cIn07ci5jaGRpcj1mdW5jdGlvbihlKXt0aHJvdyBuZXcgRXJyb3IoXCJwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWRcIil9O3IudW1hc2s9ZnVuY3Rpb24oKXtyZXR1cm4gMH19KTt2YXIgbD17fTtPKGwse2RlZmF1bHQ6KCk9PkJ9KTttb2R1bGUuZXhwb3J0cz1VKGwpO3ZhciBDPXkodigpKTtoKGwseSh2KCkpLG1vZHVsZS5leHBvcnRzKTt2YXIgQj1DLmRlZmF1bHQ7XG4iLCJpbXBvcnQgc3R5bGVzIGZyb20gXCJhbnNpLXN0eWxlc1wiO1xuaW1wb3J0IHsgQmFzZVRyYWNlciB9IGZyb20gXCIuL3RyYWNlci5qc1wiO1xuZnVuY3Rpb24gd3JhcChzdHlsZSwgdGV4dCkge1xuICAgIHJldHVybiBgJHtzdHlsZS5vcGVufSR7dGV4dH0ke3N0eWxlLmNsb3NlfWA7XG59XG5mdW5jdGlvbiB0cnlKc29uU3RyaW5naWZ5KG9iaiwgZmFsbGJhY2spIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAyKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICByZXR1cm4gZmFsbGJhY2s7XG4gICAgfVxufVxuZnVuY3Rpb24gZWxhcHNlZChydW4pIHtcbiAgICBpZiAoIXJ1bi5lbmRfdGltZSlcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgY29uc3QgZWxhcHNlZCA9IHJ1bi5lbmRfdGltZSAtIHJ1bi5zdGFydF90aW1lO1xuICAgIGlmIChlbGFwc2VkIDwgMTAwMCkge1xuICAgICAgICByZXR1cm4gYCR7ZWxhcHNlZH1tc2A7XG4gICAgfVxuICAgIHJldHVybiBgJHsoZWxhcHNlZCAvIDEwMDApLnRvRml4ZWQoMil9c2A7XG59XG5jb25zdCB7IGNvbG9yIH0gPSBzdHlsZXM7XG4vKipcbiAqIEEgdHJhY2VyIHRoYXQgbG9ncyBhbGwgZXZlbnRzIHRvIHRoZSBjb25zb2xlLiBJdCBleHRlbmRzIGZyb20gdGhlXG4gKiBgQmFzZVRyYWNlcmAgY2xhc3MgYW5kIG92ZXJyaWRlcyBpdHMgbWV0aG9kcyB0byBwcm92aWRlIGN1c3RvbSBsb2dnaW5nXG4gKiBmdW5jdGlvbmFsaXR5LlxuICovXG5leHBvcnQgY2xhc3MgQ29uc29sZUNhbGxiYWNrSGFuZGxlciBleHRlbmRzIEJhc2VUcmFjZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJuYW1lXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBcImNvbnNvbGVfY2FsbGJhY2tfaGFuZGxlclwiXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdXNlZCB0byBwZXJzaXN0IHRoZSBydW4uIEluIHRoaXMgY2FzZSwgaXQgc2ltcGx5IHJldHVybnMgYVxuICAgICAqIHJlc29sdmVkIHByb21pc2UgYXMgdGhlcmUncyBubyBwZXJzaXN0ZW5jZSBsb2dpYy5cbiAgICAgKiBAcGFyYW0gX3J1biBUaGUgcnVuIHRvIHBlcnNpc3QuXG4gICAgICogQHJldHVybnMgQSByZXNvbHZlZCBwcm9taXNlLlxuICAgICAqL1xuICAgIHBlcnNpc3RSdW4oX3J1bikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIC8vIHV0aWxpdHkgbWV0aG9kc1xuICAgIC8qKlxuICAgICAqIE1ldGhvZCB1c2VkIHRvIGdldCBhbGwgdGhlIHBhcmVudCBydW5zIG9mIGEgZ2l2ZW4gcnVuLlxuICAgICAqIEBwYXJhbSBydW4gVGhlIHJ1biB3aG9zZSBwYXJlbnRzIGFyZSB0byBiZSByZXRyaWV2ZWQuXG4gICAgICogQHJldHVybnMgQW4gYXJyYXkgb2YgcGFyZW50IHJ1bnMuXG4gICAgICovXG4gICAgZ2V0UGFyZW50cyhydW4pIHtcbiAgICAgICAgY29uc3QgcGFyZW50cyA9IFtdO1xuICAgICAgICBsZXQgY3VycmVudFJ1biA9IHJ1bjtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnRSdW4ucGFyZW50X3J1bl9pZCkge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5ydW5NYXAuZ2V0KGN1cnJlbnRSdW4ucGFyZW50X3J1bl9pZCk7XG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgICAgICAgICAgICAgY3VycmVudFJ1biA9IHBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJlbnRzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdXNlZCB0byBnZXQgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHJ1bidzIGxpbmVhZ2UsIHdoaWNoXG4gICAgICogaXMgdXNlZCBpbiBsb2dnaW5nLlxuICAgICAqIEBwYXJhbSBydW4gVGhlIHJ1biB3aG9zZSBsaW5lYWdlIGlzIHRvIGJlIHJldHJpZXZlZC5cbiAgICAgKiBAcmV0dXJucyBBIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgcnVuJ3MgbGluZWFnZS5cbiAgICAgKi9cbiAgICBnZXRCcmVhZGNydW1icyhydW4pIHtcbiAgICAgICAgY29uc3QgcGFyZW50cyA9IHRoaXMuZ2V0UGFyZW50cyhydW4pLnJldmVyc2UoKTtcbiAgICAgICAgY29uc3Qgc3RyaW5nID0gWy4uLnBhcmVudHMsIHJ1bl1cbiAgICAgICAgICAgIC5tYXAoKHBhcmVudCwgaSwgYXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gYCR7cGFyZW50LmV4ZWN1dGlvbl9vcmRlcn06JHtwYXJlbnQucnVuX3R5cGV9OiR7cGFyZW50Lm5hbWV9YDtcbiAgICAgICAgICAgIHJldHVybiBpID09PSBhcnIubGVuZ3RoIC0gMSA/IHdyYXAoc3R5bGVzLmJvbGQsIG5hbWUpIDogbmFtZTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKFwiID4gXCIpO1xuICAgICAgICByZXR1cm4gd3JhcChjb2xvci5ncmV5LCBzdHJpbmcpO1xuICAgIH1cbiAgICAvLyBsb2dnaW5nIG1ldGhvZHNcbiAgICAvKipcbiAgICAgKiBNZXRob2QgdXNlZCB0byBsb2cgdGhlIHN0YXJ0IG9mIGEgY2hhaW4gcnVuLlxuICAgICAqIEBwYXJhbSBydW4gVGhlIGNoYWluIHJ1biB0aGF0IGhhcyBzdGFydGVkLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBvbkNoYWluU3RhcnQocnVuKSB7XG4gICAgICAgIGNvbnN0IGNydW1icyA9IHRoaXMuZ2V0QnJlYWRjcnVtYnMocnVuKTtcbiAgICAgICAgY29uc29sZS5sb2coYCR7d3JhcChjb2xvci5ncmVlbiwgXCJbY2hhaW4vc3RhcnRdXCIpfSBbJHtjcnVtYnN9XSBFbnRlcmluZyBDaGFpbiBydW4gd2l0aCBpbnB1dDogJHt0cnlKc29uU3RyaW5naWZ5KHJ1bi5pbnB1dHMsIFwiW2lucHV0c11cIil9YCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB1c2VkIHRvIGxvZyB0aGUgZW5kIG9mIGEgY2hhaW4gcnVuLlxuICAgICAqIEBwYXJhbSBydW4gVGhlIGNoYWluIHJ1biB0aGF0IGhhcyBlbmRlZC5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgb25DaGFpbkVuZChydW4pIHtcbiAgICAgICAgY29uc3QgY3J1bWJzID0gdGhpcy5nZXRCcmVhZGNydW1icyhydW4pO1xuICAgICAgICBjb25zb2xlLmxvZyhgJHt3cmFwKGNvbG9yLmN5YW4sIFwiW2NoYWluL2VuZF1cIil9IFske2NydW1ic31dIFske2VsYXBzZWQocnVuKX1dIEV4aXRpbmcgQ2hhaW4gcnVuIHdpdGggb3V0cHV0OiAke3RyeUpzb25TdHJpbmdpZnkocnVuLm91dHB1dHMsIFwiW291dHB1dHNdXCIpfWApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdXNlZCB0byBsb2cgYW55IGVycm9ycyBvZiBhIGNoYWluIHJ1bi5cbiAgICAgKiBAcGFyYW0gcnVuIFRoZSBjaGFpbiBydW4gdGhhdCBoYXMgZXJyb3JlZC5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgb25DaGFpbkVycm9yKHJ1bikge1xuICAgICAgICBjb25zdCBjcnVtYnMgPSB0aGlzLmdldEJyZWFkY3J1bWJzKHJ1bik7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke3dyYXAoY29sb3IucmVkLCBcIltjaGFpbi9lcnJvcl1cIil9IFske2NydW1ic31dIFske2VsYXBzZWQocnVuKX1dIENoYWluIHJ1biBlcnJvcmVkIHdpdGggZXJyb3I6ICR7dHJ5SnNvblN0cmluZ2lmeShydW4uZXJyb3IsIFwiW2Vycm9yXVwiKX1gKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHVzZWQgdG8gbG9nIHRoZSBzdGFydCBvZiBhbiBMTE0gcnVuLlxuICAgICAqIEBwYXJhbSBydW4gVGhlIExMTSBydW4gdGhhdCBoYXMgc3RhcnRlZC5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgb25MTE1TdGFydChydW4pIHtcbiAgICAgICAgY29uc3QgY3J1bWJzID0gdGhpcy5nZXRCcmVhZGNydW1icyhydW4pO1xuICAgICAgICBjb25zdCBpbnB1dHMgPSBcInByb21wdHNcIiBpbiBydW4uaW5wdXRzXG4gICAgICAgICAgICA/IHsgcHJvbXB0czogcnVuLmlucHV0cy5wcm9tcHRzLm1hcCgocCkgPT4gcC50cmltKCkpIH1cbiAgICAgICAgICAgIDogcnVuLmlucHV0cztcbiAgICAgICAgY29uc29sZS5sb2coYCR7d3JhcChjb2xvci5ncmVlbiwgXCJbbGxtL3N0YXJ0XVwiKX0gWyR7Y3J1bWJzfV0gRW50ZXJpbmcgTExNIHJ1biB3aXRoIGlucHV0OiAke3RyeUpzb25TdHJpbmdpZnkoaW5wdXRzLCBcIltpbnB1dHNdXCIpfWApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdXNlZCB0byBsb2cgdGhlIGVuZCBvZiBhbiBMTE0gcnVuLlxuICAgICAqIEBwYXJhbSBydW4gVGhlIExMTSBydW4gdGhhdCBoYXMgZW5kZWQuXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIG9uTExNRW5kKHJ1bikge1xuICAgICAgICBjb25zdCBjcnVtYnMgPSB0aGlzLmdldEJyZWFkY3J1bWJzKHJ1bik7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke3dyYXAoY29sb3IuY3lhbiwgXCJbbGxtL2VuZF1cIil9IFske2NydW1ic31dIFske2VsYXBzZWQocnVuKX1dIEV4aXRpbmcgTExNIHJ1biB3aXRoIG91dHB1dDogJHt0cnlKc29uU3RyaW5naWZ5KHJ1bi5vdXRwdXRzLCBcIltyZXNwb25zZV1cIil9YCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB1c2VkIHRvIGxvZyBhbnkgZXJyb3JzIG9mIGFuIExMTSBydW4uXG4gICAgICogQHBhcmFtIHJ1biBUaGUgTExNIHJ1biB0aGF0IGhhcyBlcnJvcmVkLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBvbkxMTUVycm9yKHJ1bikge1xuICAgICAgICBjb25zdCBjcnVtYnMgPSB0aGlzLmdldEJyZWFkY3J1bWJzKHJ1bik7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke3dyYXAoY29sb3IucmVkLCBcIltsbG0vZXJyb3JdXCIpfSBbJHtjcnVtYnN9XSBbJHtlbGFwc2VkKHJ1bil9XSBMTE0gcnVuIGVycm9yZWQgd2l0aCBlcnJvcjogJHt0cnlKc29uU3RyaW5naWZ5KHJ1bi5lcnJvciwgXCJbZXJyb3JdXCIpfWApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdXNlZCB0byBsb2cgdGhlIHN0YXJ0IG9mIGEgdG9vbCBydW4uXG4gICAgICogQHBhcmFtIHJ1biBUaGUgdG9vbCBydW4gdGhhdCBoYXMgc3RhcnRlZC5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgb25Ub29sU3RhcnQocnVuKSB7XG4gICAgICAgIGNvbnN0IGNydW1icyA9IHRoaXMuZ2V0QnJlYWRjcnVtYnMocnVuKTtcbiAgICAgICAgY29uc29sZS5sb2coYCR7d3JhcChjb2xvci5ncmVlbiwgXCJbdG9vbC9zdGFydF1cIil9IFske2NydW1ic31dIEVudGVyaW5nIFRvb2wgcnVuIHdpdGggaW5wdXQ6IFwiJHtydW4uaW5wdXRzLmlucHV0Py50cmltKCl9XCJgKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHVzZWQgdG8gbG9nIHRoZSBlbmQgb2YgYSB0b29sIHJ1bi5cbiAgICAgKiBAcGFyYW0gcnVuIFRoZSB0b29sIHJ1biB0aGF0IGhhcyBlbmRlZC5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgb25Ub29sRW5kKHJ1bikge1xuICAgICAgICBjb25zdCBjcnVtYnMgPSB0aGlzLmdldEJyZWFkY3J1bWJzKHJ1bik7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke3dyYXAoY29sb3IuY3lhbiwgXCJbdG9vbC9lbmRdXCIpfSBbJHtjcnVtYnN9XSBbJHtlbGFwc2VkKHJ1bil9XSBFeGl0aW5nIFRvb2wgcnVuIHdpdGggb3V0cHV0OiBcIiR7cnVuLm91dHB1dHM/Lm91dHB1dD8udHJpbSgpfVwiYCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB1c2VkIHRvIGxvZyBhbnkgZXJyb3JzIG9mIGEgdG9vbCBydW4uXG4gICAgICogQHBhcmFtIHJ1biBUaGUgdG9vbCBydW4gdGhhdCBoYXMgZXJyb3JlZC5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgb25Ub29sRXJyb3IocnVuKSB7XG4gICAgICAgIGNvbnN0IGNydW1icyA9IHRoaXMuZ2V0QnJlYWRjcnVtYnMocnVuKTtcbiAgICAgICAgY29uc29sZS5sb2coYCR7d3JhcChjb2xvci5yZWQsIFwiW3Rvb2wvZXJyb3JdXCIpfSBbJHtjcnVtYnN9XSBbJHtlbGFwc2VkKHJ1bil9XSBUb29sIHJ1biBlcnJvcmVkIHdpdGggZXJyb3I6ICR7dHJ5SnNvblN0cmluZ2lmeShydW4uZXJyb3IsIFwiW2Vycm9yXVwiKX1gKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHVzZWQgdG8gbG9nIHRoZSBzdGFydCBvZiBhIHJldHJpZXZlciBydW4uXG4gICAgICogQHBhcmFtIHJ1biBUaGUgcmV0cmlldmVyIHJ1biB0aGF0IGhhcyBzdGFydGVkLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBvblJldHJpZXZlclN0YXJ0KHJ1bikge1xuICAgICAgICBjb25zdCBjcnVtYnMgPSB0aGlzLmdldEJyZWFkY3J1bWJzKHJ1bik7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke3dyYXAoY29sb3IuZ3JlZW4sIFwiW3JldHJpZXZlci9zdGFydF1cIil9IFske2NydW1ic31dIEVudGVyaW5nIFJldHJpZXZlciBydW4gd2l0aCBpbnB1dDogJHt0cnlKc29uU3RyaW5naWZ5KHJ1bi5pbnB1dHMsIFwiW2lucHV0c11cIil9YCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB1c2VkIHRvIGxvZyB0aGUgZW5kIG9mIGEgcmV0cmlldmVyIHJ1bi5cbiAgICAgKiBAcGFyYW0gcnVuIFRoZSByZXRyaWV2ZXIgcnVuIHRoYXQgaGFzIGVuZGVkLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBvblJldHJpZXZlckVuZChydW4pIHtcbiAgICAgICAgY29uc3QgY3J1bWJzID0gdGhpcy5nZXRCcmVhZGNydW1icyhydW4pO1xuICAgICAgICBjb25zb2xlLmxvZyhgJHt3cmFwKGNvbG9yLmN5YW4sIFwiW3JldHJpZXZlci9lbmRdXCIpfSBbJHtjcnVtYnN9XSBbJHtlbGFwc2VkKHJ1bil9XSBFeGl0aW5nIFJldHJpZXZlciBydW4gd2l0aCBvdXRwdXQ6ICR7dHJ5SnNvblN0cmluZ2lmeShydW4ub3V0cHV0cywgXCJbb3V0cHV0c11cIil9YCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB1c2VkIHRvIGxvZyBhbnkgZXJyb3JzIG9mIGEgcmV0cmlldmVyIHJ1bi5cbiAgICAgKiBAcGFyYW0gcnVuIFRoZSByZXRyaWV2ZXIgcnVuIHRoYXQgaGFzIGVycm9yZWQuXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIG9uUmV0cmlldmVyRXJyb3IocnVuKSB7XG4gICAgICAgIGNvbnN0IGNydW1icyA9IHRoaXMuZ2V0QnJlYWRjcnVtYnMocnVuKTtcbiAgICAgICAgY29uc29sZS5sb2coYCR7d3JhcChjb2xvci5yZWQsIFwiW3JldHJpZXZlci9lcnJvcl1cIil9IFske2NydW1ic31dIFske2VsYXBzZWQocnVuKX1dIFJldHJpZXZlciBydW4gZXJyb3JlZCB3aXRoIGVycm9yOiAke3RyeUpzb25TdHJpbmdpZnkocnVuLmVycm9yLCBcIltlcnJvcl1cIil9YCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB1c2VkIHRvIGxvZyB0aGUgYWN0aW9uIHNlbGVjdGVkIGJ5IHRoZSBhZ2VudC5cbiAgICAgKiBAcGFyYW0gcnVuIFRoZSBydW4gaW4gd2hpY2ggdGhlIGFnZW50IGFjdGlvbiBvY2N1cnJlZC5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgb25BZ2VudEFjdGlvbihydW4pIHtcbiAgICAgICAgY29uc3QgYWdlbnRSdW4gPSBydW47XG4gICAgICAgIGNvbnN0IGNydW1icyA9IHRoaXMuZ2V0QnJlYWRjcnVtYnMocnVuKTtcbiAgICAgICAgY29uc29sZS5sb2coYCR7d3JhcChjb2xvci5ibHVlLCBcIlthZ2VudC9hY3Rpb25dXCIpfSBbJHtjcnVtYnN9XSBBZ2VudCBzZWxlY3RlZCBhY3Rpb246ICR7dHJ5SnNvblN0cmluZ2lmeShhZ2VudFJ1bi5hY3Rpb25zW2FnZW50UnVuLmFjdGlvbnMubGVuZ3RoIC0gMV0sIFwiW2FjdGlvbl1cIil9YCk7XG4gICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUID0gMTA7XG5cbmNvbnN0IHdyYXBBbnNpMjU2ID0gKG9mZnNldCA9IDApID0+IGNvZGUgPT4gYFxcdTAwMUJbJHszOCArIG9mZnNldH07NTske2NvZGV9bWA7XG5cbmNvbnN0IHdyYXBBbnNpMTZtID0gKG9mZnNldCA9IDApID0+IChyZWQsIGdyZWVuLCBibHVlKSA9PiBgXFx1MDAxQlskezM4ICsgb2Zmc2V0fTsyOyR7cmVkfTske2dyZWVufTske2JsdWV9bWA7XG5cbmZ1bmN0aW9uIGFzc2VtYmxlU3R5bGVzKCkge1xuXHRjb25zdCBjb2RlcyA9IG5ldyBNYXAoKTtcblx0Y29uc3Qgc3R5bGVzID0ge1xuXHRcdG1vZGlmaWVyOiB7XG5cdFx0XHRyZXNldDogWzAsIDBdLFxuXHRcdFx0Ly8gMjEgaXNuJ3Qgd2lkZWx5IHN1cHBvcnRlZCBhbmQgMjIgZG9lcyB0aGUgc2FtZSB0aGluZ1xuXHRcdFx0Ym9sZDogWzEsIDIyXSxcblx0XHRcdGRpbTogWzIsIDIyXSxcblx0XHRcdGl0YWxpYzogWzMsIDIzXSxcblx0XHRcdHVuZGVybGluZTogWzQsIDI0XSxcblx0XHRcdG92ZXJsaW5lOiBbNTMsIDU1XSxcblx0XHRcdGludmVyc2U6IFs3LCAyN10sXG5cdFx0XHRoaWRkZW46IFs4LCAyOF0sXG5cdFx0XHRzdHJpa2V0aHJvdWdoOiBbOSwgMjldXG5cdFx0fSxcblx0XHRjb2xvcjoge1xuXHRcdFx0YmxhY2s6IFszMCwgMzldLFxuXHRcdFx0cmVkOiBbMzEsIDM5XSxcblx0XHRcdGdyZWVuOiBbMzIsIDM5XSxcblx0XHRcdHllbGxvdzogWzMzLCAzOV0sXG5cdFx0XHRibHVlOiBbMzQsIDM5XSxcblx0XHRcdG1hZ2VudGE6IFszNSwgMzldLFxuXHRcdFx0Y3lhbjogWzM2LCAzOV0sXG5cdFx0XHR3aGl0ZTogWzM3LCAzOV0sXG5cblx0XHRcdC8vIEJyaWdodCBjb2xvclxuXHRcdFx0YmxhY2tCcmlnaHQ6IFs5MCwgMzldLFxuXHRcdFx0cmVkQnJpZ2h0OiBbOTEsIDM5XSxcblx0XHRcdGdyZWVuQnJpZ2h0OiBbOTIsIDM5XSxcblx0XHRcdHllbGxvd0JyaWdodDogWzkzLCAzOV0sXG5cdFx0XHRibHVlQnJpZ2h0OiBbOTQsIDM5XSxcblx0XHRcdG1hZ2VudGFCcmlnaHQ6IFs5NSwgMzldLFxuXHRcdFx0Y3lhbkJyaWdodDogWzk2LCAzOV0sXG5cdFx0XHR3aGl0ZUJyaWdodDogWzk3LCAzOV1cblx0XHR9LFxuXHRcdGJnQ29sb3I6IHtcblx0XHRcdGJnQmxhY2s6IFs0MCwgNDldLFxuXHRcdFx0YmdSZWQ6IFs0MSwgNDldLFxuXHRcdFx0YmdHcmVlbjogWzQyLCA0OV0sXG5cdFx0XHRiZ1llbGxvdzogWzQzLCA0OV0sXG5cdFx0XHRiZ0JsdWU6IFs0NCwgNDldLFxuXHRcdFx0YmdNYWdlbnRhOiBbNDUsIDQ5XSxcblx0XHRcdGJnQ3lhbjogWzQ2LCA0OV0sXG5cdFx0XHRiZ1doaXRlOiBbNDcsIDQ5XSxcblxuXHRcdFx0Ly8gQnJpZ2h0IGNvbG9yXG5cdFx0XHRiZ0JsYWNrQnJpZ2h0OiBbMTAwLCA0OV0sXG5cdFx0XHRiZ1JlZEJyaWdodDogWzEwMSwgNDldLFxuXHRcdFx0YmdHcmVlbkJyaWdodDogWzEwMiwgNDldLFxuXHRcdFx0YmdZZWxsb3dCcmlnaHQ6IFsxMDMsIDQ5XSxcblx0XHRcdGJnQmx1ZUJyaWdodDogWzEwNCwgNDldLFxuXHRcdFx0YmdNYWdlbnRhQnJpZ2h0OiBbMTA1LCA0OV0sXG5cdFx0XHRiZ0N5YW5CcmlnaHQ6IFsxMDYsIDQ5XSxcblx0XHRcdGJnV2hpdGVCcmlnaHQ6IFsxMDcsIDQ5XVxuXHRcdH1cblx0fTtcblxuXHQvLyBBbGlhcyBicmlnaHQgYmxhY2sgYXMgZ3JheSAoYW5kIGdyZXkpXG5cdHN0eWxlcy5jb2xvci5ncmF5ID0gc3R5bGVzLmNvbG9yLmJsYWNrQnJpZ2h0O1xuXHRzdHlsZXMuYmdDb2xvci5iZ0dyYXkgPSBzdHlsZXMuYmdDb2xvci5iZ0JsYWNrQnJpZ2h0O1xuXHRzdHlsZXMuY29sb3IuZ3JleSA9IHN0eWxlcy5jb2xvci5ibGFja0JyaWdodDtcblx0c3R5bGVzLmJnQ29sb3IuYmdHcmV5ID0gc3R5bGVzLmJnQ29sb3IuYmdCbGFja0JyaWdodDtcblxuXHRmb3IgKGNvbnN0IFtncm91cE5hbWUsIGdyb3VwXSBvZiBPYmplY3QuZW50cmllcyhzdHlsZXMpKSB7XG5cdFx0Zm9yIChjb25zdCBbc3R5bGVOYW1lLCBzdHlsZV0gb2YgT2JqZWN0LmVudHJpZXMoZ3JvdXApKSB7XG5cdFx0XHRzdHlsZXNbc3R5bGVOYW1lXSA9IHtcblx0XHRcdFx0b3BlbjogYFxcdTAwMUJbJHtzdHlsZVswXX1tYCxcblx0XHRcdFx0Y2xvc2U6IGBcXHUwMDFCWyR7c3R5bGVbMV19bWBcblx0XHRcdH07XG5cblx0XHRcdGdyb3VwW3N0eWxlTmFtZV0gPSBzdHlsZXNbc3R5bGVOYW1lXTtcblxuXHRcdFx0Y29kZXMuc2V0KHN0eWxlWzBdLCBzdHlsZVsxXSk7XG5cdFx0fVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgZ3JvdXBOYW1lLCB7XG5cdFx0XHR2YWx1ZTogZ3JvdXAsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHRcdH0pO1xuXHR9XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgJ2NvZGVzJywge1xuXHRcdHZhbHVlOiBjb2Rlcyxcblx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHR9KTtcblxuXHRzdHlsZXMuY29sb3IuY2xvc2UgPSAnXFx1MDAxQlszOW0nO1xuXHRzdHlsZXMuYmdDb2xvci5jbG9zZSA9ICdcXHUwMDFCWzQ5bSc7XG5cblx0c3R5bGVzLmNvbG9yLmFuc2kyNTYgPSB3cmFwQW5zaTI1NigpO1xuXHRzdHlsZXMuY29sb3IuYW5zaTE2bSA9IHdyYXBBbnNpMTZtKCk7XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kyNTYgPSB3cmFwQW5zaTI1NihBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUKTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaTE2bSA9IHdyYXBBbnNpMTZtKEFOU0lfQkFDS0dST1VORF9PRkZTRVQpO1xuXG5cdC8vIEZyb20gaHR0cHM6Ly9naXRodWIuY29tL1FpeC0vY29sb3ItY29udmVydC9ibG9iLzNmMGUwZDRlOTJlMjM1Nzk2Y2NiMTdmNmU4NWM3MjA5NGE2NTFmNDkvY29udmVyc2lvbnMuanNcblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoc3R5bGVzLCB7XG5cdFx0cmdiVG9BbnNpMjU2OiB7XG5cdFx0XHR2YWx1ZTogKHJlZCwgZ3JlZW4sIGJsdWUpID0+IHtcblx0XHRcdFx0Ly8gV2UgdXNlIHRoZSBleHRlbmRlZCBncmV5c2NhbGUgcGFsZXR0ZSBoZXJlLCB3aXRoIHRoZSBleGNlcHRpb24gb2Zcblx0XHRcdFx0Ly8gYmxhY2sgYW5kIHdoaXRlLiBub3JtYWwgcGFsZXR0ZSBvbmx5IGhhcyA0IGdyZXlzY2FsZSBzaGFkZXMuXG5cdFx0XHRcdGlmIChyZWQgPT09IGdyZWVuICYmIGdyZWVuID09PSBibHVlKSB7XG5cdFx0XHRcdFx0aWYgKHJlZCA8IDgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAxNjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAocmVkID4gMjQ4KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMjMxO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBNYXRoLnJvdW5kKCgocmVkIC0gOCkgLyAyNDcpICogMjQpICsgMjMyO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIDE2ICtcblx0XHRcdFx0XHQoMzYgKiBNYXRoLnJvdW5kKHJlZCAvIDI1NSAqIDUpKSArXG5cdFx0XHRcdFx0KDYgKiBNYXRoLnJvdW5kKGdyZWVuIC8gMjU1ICogNSkpICtcblx0XHRcdFx0XHRNYXRoLnJvdW5kKGJsdWUgLyAyNTUgKiA1KTtcblx0XHRcdH0sXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHRcdH0sXG5cdFx0aGV4VG9SZ2I6IHtcblx0XHRcdHZhbHVlOiBoZXggPT4ge1xuXHRcdFx0XHRjb25zdCBtYXRjaGVzID0gLyg/PGNvbG9yU3RyaW5nPlthLWZcXGRdezZ9fFthLWZcXGRdezN9KS9pLmV4ZWMoaGV4LnRvU3RyaW5nKDE2KSk7XG5cdFx0XHRcdGlmICghbWF0Y2hlcykge1xuXHRcdFx0XHRcdHJldHVybiBbMCwgMCwgMF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQge2NvbG9yU3RyaW5nfSA9IG1hdGNoZXMuZ3JvdXBzO1xuXG5cdFx0XHRcdGlmIChjb2xvclN0cmluZy5sZW5ndGggPT09IDMpIHtcblx0XHRcdFx0XHRjb2xvclN0cmluZyA9IGNvbG9yU3RyaW5nLnNwbGl0KCcnKS5tYXAoY2hhcmFjdGVyID0+IGNoYXJhY3RlciArIGNoYXJhY3Rlcikuam9pbignJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBpbnRlZ2VyID0gTnVtYmVyLnBhcnNlSW50KGNvbG9yU3RyaW5nLCAxNik7XG5cblx0XHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0XHQoaW50ZWdlciA+PiAxNikgJiAweEZGLFxuXHRcdFx0XHRcdChpbnRlZ2VyID4+IDgpICYgMHhGRixcblx0XHRcdFx0XHRpbnRlZ2VyICYgMHhGRlxuXHRcdFx0XHRdO1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlXG5cdFx0fSxcblx0XHRoZXhUb0Fuc2kyNTY6IHtcblx0XHRcdHZhbHVlOiBoZXggPT4gc3R5bGVzLnJnYlRvQW5zaTI1NiguLi5zdHlsZXMuaGV4VG9SZ2IoaGV4KSksXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuLy8gTWFrZSB0aGUgZXhwb3J0IGltbXV0YWJsZVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgJ2V4cG9ydHMnLCB7XG5cdGVudW1lcmFibGU6IHRydWUsXG5cdGdldDogYXNzZW1ibGVTdHlsZXNcbn0pO1xuIiwiaW1wb3J0IHsgQmFzZUNhbGxiYWNrSGFuZGxlciwgfSBmcm9tIFwiLi4vYmFzZS5qc1wiO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmZ1bmN0aW9uIF9jb2VyY2VUb0RpY3QodmFsdWUsIGRlZmF1bHRLZXkpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIlxuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogeyBbZGVmYXVsdEtleV06IHZhbHVlIH07XG59XG5leHBvcnQgY2xhc3MgQmFzZVRyYWNlciBleHRlbmRzIEJhc2VDYWxsYmFja0hhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKF9maWVsZHMpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwicnVuTWFwXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBuZXcgTWFwKClcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvcHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfYWRkQ2hpbGRSdW4ocGFyZW50UnVuLCBjaGlsZFJ1bikge1xuICAgICAgICBwYXJlbnRSdW4uY2hpbGRfcnVucy5wdXNoKGNoaWxkUnVuKTtcbiAgICB9XG4gICAgX3N0YXJ0VHJhY2UocnVuKSB7XG4gICAgICAgIGlmIChydW4ucGFyZW50X3J1bl9pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnRSdW4gPSB0aGlzLnJ1bk1hcC5nZXQocnVuLnBhcmVudF9ydW5faWQpO1xuICAgICAgICAgICAgaWYgKHBhcmVudFJ1bikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZENoaWxkUnVuKHBhcmVudFJ1biwgcnVuKTtcbiAgICAgICAgICAgICAgICBwYXJlbnRSdW4uY2hpbGRfZXhlY3V0aW9uX29yZGVyID0gTWF0aC5tYXgocGFyZW50UnVuLmNoaWxkX2V4ZWN1dGlvbl9vcmRlciwgcnVuLmNoaWxkX2V4ZWN1dGlvbl9vcmRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ydW5NYXAuc2V0KHJ1bi5pZCwgcnVuKTtcbiAgICB9XG4gICAgYXN5bmMgX2VuZFRyYWNlKHJ1bikge1xuICAgICAgICBjb25zdCBwYXJlbnRSdW4gPSBydW4ucGFyZW50X3J1bl9pZCAhPT0gdW5kZWZpbmVkICYmIHRoaXMucnVuTWFwLmdldChydW4ucGFyZW50X3J1bl9pZCk7XG4gICAgICAgIGlmIChwYXJlbnRSdW4pIHtcbiAgICAgICAgICAgIHBhcmVudFJ1bi5jaGlsZF9leGVjdXRpb25fb3JkZXIgPSBNYXRoLm1heChwYXJlbnRSdW4uY2hpbGRfZXhlY3V0aW9uX29yZGVyLCBydW4uY2hpbGRfZXhlY3V0aW9uX29yZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGVyc2lzdFJ1bihydW4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucnVuTWFwLmRlbGV0ZShydW4uaWQpO1xuICAgIH1cbiAgICBfZ2V0RXhlY3V0aW9uT3JkZXIocGFyZW50UnVuSWQpIHtcbiAgICAgICAgY29uc3QgcGFyZW50UnVuID0gcGFyZW50UnVuSWQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJ1bk1hcC5nZXQocGFyZW50UnVuSWQpO1xuICAgICAgICAvLyBJZiBhIHJ1biBoYXMgbm8gcGFyZW50IHRoZW4gZXhlY3V0aW9uIG9yZGVyIGlzIDFcbiAgICAgICAgaWYgKCFwYXJlbnRSdW4pIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJlbnRSdW4uY2hpbGRfZXhlY3V0aW9uX29yZGVyICsgMTtcbiAgICB9XG4gICAgYXN5bmMgaGFuZGxlTExNU3RhcnQobGxtLCBwcm9tcHRzLCBydW5JZCwgcGFyZW50UnVuSWQsIGV4dHJhUGFyYW1zLCB0YWdzLCBtZXRhZGF0YSkge1xuICAgICAgICBjb25zdCBleGVjdXRpb25fb3JkZXIgPSB0aGlzLl9nZXRFeGVjdXRpb25PcmRlcihwYXJlbnRSdW5JZCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0X3RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBmaW5hbEV4dHJhUGFyYW1zID0gbWV0YWRhdGFcbiAgICAgICAgICAgID8geyAuLi5leHRyYVBhcmFtcywgbWV0YWRhdGEgfVxuICAgICAgICAgICAgOiBleHRyYVBhcmFtcztcbiAgICAgICAgY29uc3QgcnVuID0ge1xuICAgICAgICAgICAgaWQ6IHJ1bklkLFxuICAgICAgICAgICAgbmFtZTogbGxtLmlkW2xsbS5pZC5sZW5ndGggLSAxXSxcbiAgICAgICAgICAgIHBhcmVudF9ydW5faWQ6IHBhcmVudFJ1bklkLFxuICAgICAgICAgICAgc3RhcnRfdGltZSxcbiAgICAgICAgICAgIHNlcmlhbGl6ZWQ6IGxsbSxcbiAgICAgICAgICAgIGV2ZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZShzdGFydF90aW1lKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaW5wdXRzOiB7IHByb21wdHMgfSxcbiAgICAgICAgICAgIGV4ZWN1dGlvbl9vcmRlcixcbiAgICAgICAgICAgIGNoaWxkX3J1bnM6IFtdLFxuICAgICAgICAgICAgY2hpbGRfZXhlY3V0aW9uX29yZGVyOiBleGVjdXRpb25fb3JkZXIsXG4gICAgICAgICAgICBydW5fdHlwZTogXCJsbG1cIixcbiAgICAgICAgICAgIGV4dHJhOiBmaW5hbEV4dHJhUGFyYW1zID8/IHt9LFxuICAgICAgICAgICAgdGFnczogdGFncyB8fCBbXSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc3RhcnRUcmFjZShydW4pO1xuICAgICAgICBhd2FpdCB0aGlzLm9uTExNU3RhcnQ/LihydW4pO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVDaGF0TW9kZWxTdGFydChsbG0sIG1lc3NhZ2VzLCBydW5JZCwgcGFyZW50UnVuSWQsIGV4dHJhUGFyYW1zLCB0YWdzLCBtZXRhZGF0YSkge1xuICAgICAgICBjb25zdCBleGVjdXRpb25fb3JkZXIgPSB0aGlzLl9nZXRFeGVjdXRpb25PcmRlcihwYXJlbnRSdW5JZCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0X3RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBmaW5hbEV4dHJhUGFyYW1zID0gbWV0YWRhdGFcbiAgICAgICAgICAgID8geyAuLi5leHRyYVBhcmFtcywgbWV0YWRhdGEgfVxuICAgICAgICAgICAgOiBleHRyYVBhcmFtcztcbiAgICAgICAgY29uc3QgcnVuID0ge1xuICAgICAgICAgICAgaWQ6IHJ1bklkLFxuICAgICAgICAgICAgbmFtZTogbGxtLmlkW2xsbS5pZC5sZW5ndGggLSAxXSxcbiAgICAgICAgICAgIHBhcmVudF9ydW5faWQ6IHBhcmVudFJ1bklkLFxuICAgICAgICAgICAgc3RhcnRfdGltZSxcbiAgICAgICAgICAgIHNlcmlhbGl6ZWQ6IGxsbSxcbiAgICAgICAgICAgIGV2ZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZShzdGFydF90aW1lKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaW5wdXRzOiB7IG1lc3NhZ2VzIH0sXG4gICAgICAgICAgICBleGVjdXRpb25fb3JkZXIsXG4gICAgICAgICAgICBjaGlsZF9ydW5zOiBbXSxcbiAgICAgICAgICAgIGNoaWxkX2V4ZWN1dGlvbl9vcmRlcjogZXhlY3V0aW9uX29yZGVyLFxuICAgICAgICAgICAgcnVuX3R5cGU6IFwibGxtXCIsXG4gICAgICAgICAgICBleHRyYTogZmluYWxFeHRyYVBhcmFtcyA/PyB7fSxcbiAgICAgICAgICAgIHRhZ3M6IHRhZ3MgfHwgW10sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3N0YXJ0VHJhY2UocnVuKTtcbiAgICAgICAgYXdhaXQgdGhpcy5vbkxMTVN0YXJ0Py4ocnVuKTtcbiAgICB9XG4gICAgYXN5bmMgaGFuZGxlTExNRW5kKG91dHB1dCwgcnVuSWQpIHtcbiAgICAgICAgY29uc3QgcnVuID0gdGhpcy5ydW5NYXAuZ2V0KHJ1bklkKTtcbiAgICAgICAgaWYgKCFydW4gfHwgcnVuPy5ydW5fdHlwZSAhPT0gXCJsbG1cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gTExNIHJ1biB0byBlbmQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJ1bi5lbmRfdGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHJ1bi5vdXRwdXRzID0gb3V0cHV0O1xuICAgICAgICBydW4uZXZlbnRzLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogXCJlbmRcIixcbiAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKHJ1bi5lbmRfdGltZSkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHRoaXMub25MTE1FbmQ/LihydW4pO1xuICAgICAgICBhd2FpdCB0aGlzLl9lbmRUcmFjZShydW4pO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVMTE1FcnJvcihlcnJvciwgcnVuSWQpIHtcbiAgICAgICAgY29uc3QgcnVuID0gdGhpcy5ydW5NYXAuZ2V0KHJ1bklkKTtcbiAgICAgICAgaWYgKCFydW4gfHwgcnVuPy5ydW5fdHlwZSAhPT0gXCJsbG1cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gTExNIHJ1biB0byBlbmQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJ1bi5lbmRfdGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHJ1bi5lcnJvciA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIHJ1bi5ldmVudHMucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBcImVycm9yXCIsXG4gICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZShydW4uZW5kX3RpbWUpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLm9uTExNRXJyb3I/LihydW4pO1xuICAgICAgICBhd2FpdCB0aGlzLl9lbmRUcmFjZShydW4pO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVDaGFpblN0YXJ0KGNoYWluLCBpbnB1dHMsIHJ1bklkLCBwYXJlbnRSdW5JZCwgdGFncywgbWV0YWRhdGEsIHJ1blR5cGUpIHtcbiAgICAgICAgY29uc3QgZXhlY3V0aW9uX29yZGVyID0gdGhpcy5fZ2V0RXhlY3V0aW9uT3JkZXIocGFyZW50UnVuSWQpO1xuICAgICAgICBjb25zdCBzdGFydF90aW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgcnVuID0ge1xuICAgICAgICAgICAgaWQ6IHJ1bklkLFxuICAgICAgICAgICAgbmFtZTogY2hhaW4uaWRbY2hhaW4uaWQubGVuZ3RoIC0gMV0sXG4gICAgICAgICAgICBwYXJlbnRfcnVuX2lkOiBwYXJlbnRSdW5JZCxcbiAgICAgICAgICAgIHN0YXJ0X3RpbWUsXG4gICAgICAgICAgICBzZXJpYWxpemVkOiBjaGFpbixcbiAgICAgICAgICAgIGV2ZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZShzdGFydF90aW1lKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaW5wdXRzLFxuICAgICAgICAgICAgZXhlY3V0aW9uX29yZGVyLFxuICAgICAgICAgICAgY2hpbGRfZXhlY3V0aW9uX29yZGVyOiBleGVjdXRpb25fb3JkZXIsXG4gICAgICAgICAgICBydW5fdHlwZTogcnVuVHlwZSA/PyBcImNoYWluXCIsXG4gICAgICAgICAgICBjaGlsZF9ydW5zOiBbXSxcbiAgICAgICAgICAgIGV4dHJhOiBtZXRhZGF0YSA/IHsgbWV0YWRhdGEgfSA6IHt9LFxuICAgICAgICAgICAgdGFnczogdGFncyB8fCBbXSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc3RhcnRUcmFjZShydW4pO1xuICAgICAgICBhd2FpdCB0aGlzLm9uQ2hhaW5TdGFydD8uKHJ1bik7XG4gICAgfVxuICAgIGFzeW5jIGhhbmRsZUNoYWluRW5kKG91dHB1dHMsIHJ1bklkLCBfcGFyZW50UnVuSWQsIF90YWdzLCBrd2FyZ3MpIHtcbiAgICAgICAgY29uc3QgcnVuID0gdGhpcy5ydW5NYXAuZ2V0KHJ1bklkKTtcbiAgICAgICAgaWYgKCFydW4pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGNoYWluIHJ1biB0byBlbmQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJ1bi5lbmRfdGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHJ1bi5vdXRwdXRzID0gX2NvZXJjZVRvRGljdChvdXRwdXRzLCBcIm91dHB1dFwiKTtcbiAgICAgICAgcnVuLmV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IFwiZW5kXCIsXG4gICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZShydW4uZW5kX3RpbWUpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoa3dhcmdzPy5pbnB1dHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcnVuLmlucHV0cyA9IF9jb2VyY2VUb0RpY3Qoa3dhcmdzLmlucHV0cywgXCJpbnB1dFwiKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLm9uQ2hhaW5FbmQ/LihydW4pO1xuICAgICAgICBhd2FpdCB0aGlzLl9lbmRUcmFjZShydW4pO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVDaGFpbkVycm9yKGVycm9yLCBydW5JZCwgX3BhcmVudFJ1bklkLCBfdGFncywga3dhcmdzKSB7XG4gICAgICAgIGNvbnN0IHJ1biA9IHRoaXMucnVuTWFwLmdldChydW5JZCk7XG4gICAgICAgIGlmICghcnVuKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjaGFpbiBydW4gdG8gZW5kLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBydW4uZW5kX3RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBydW4uZXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICBydW4uZXZlbnRzLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogXCJlcnJvclwiLFxuICAgICAgICAgICAgdGltZTogbmV3IERhdGUocnVuLmVuZF90aW1lKS50b0lTT1N0cmluZygpLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGt3YXJncz8uaW5wdXRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJ1bi5pbnB1dHMgPSBfY29lcmNlVG9EaWN0KGt3YXJncy5pbnB1dHMsIFwiaW5wdXRcIik7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5vbkNoYWluRXJyb3I/LihydW4pO1xuICAgICAgICBhd2FpdCB0aGlzLl9lbmRUcmFjZShydW4pO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVUb29sU3RhcnQodG9vbCwgaW5wdXQsIHJ1bklkLCBwYXJlbnRSdW5JZCwgdGFncywgbWV0YWRhdGEpIHtcbiAgICAgICAgY29uc3QgZXhlY3V0aW9uX29yZGVyID0gdGhpcy5fZ2V0RXhlY3V0aW9uT3JkZXIocGFyZW50UnVuSWQpO1xuICAgICAgICBjb25zdCBzdGFydF90aW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgcnVuID0ge1xuICAgICAgICAgICAgaWQ6IHJ1bklkLFxuICAgICAgICAgICAgbmFtZTogdG9vbC5pZFt0b29sLmlkLmxlbmd0aCAtIDFdLFxuICAgICAgICAgICAgcGFyZW50X3J1bl9pZDogcGFyZW50UnVuSWQsXG4gICAgICAgICAgICBzdGFydF90aW1lLFxuICAgICAgICAgICAgc2VyaWFsaXplZDogdG9vbCxcbiAgICAgICAgICAgIGV2ZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZShzdGFydF90aW1lKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaW5wdXRzOiB7IGlucHV0IH0sXG4gICAgICAgICAgICBleGVjdXRpb25fb3JkZXIsXG4gICAgICAgICAgICBjaGlsZF9leGVjdXRpb25fb3JkZXI6IGV4ZWN1dGlvbl9vcmRlcixcbiAgICAgICAgICAgIHJ1bl90eXBlOiBcInRvb2xcIixcbiAgICAgICAgICAgIGNoaWxkX3J1bnM6IFtdLFxuICAgICAgICAgICAgZXh0cmE6IG1ldGFkYXRhID8geyBtZXRhZGF0YSB9IDoge30sXG4gICAgICAgICAgICB0YWdzOiB0YWdzIHx8IFtdLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9zdGFydFRyYWNlKHJ1bik7XG4gICAgICAgIGF3YWl0IHRoaXMub25Ub29sU3RhcnQ/LihydW4pO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVUb29sRW5kKG91dHB1dCwgcnVuSWQpIHtcbiAgICAgICAgY29uc3QgcnVuID0gdGhpcy5ydW5NYXAuZ2V0KHJ1bklkKTtcbiAgICAgICAgaWYgKCFydW4gfHwgcnVuPy5ydW5fdHlwZSAhPT0gXCJ0b29sXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHRvb2wgcnVuIHRvIGVuZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBydW4uZW5kX3RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBydW4ub3V0cHV0cyA9IHsgb3V0cHV0IH07XG4gICAgICAgIHJ1bi5ldmVudHMucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBcImVuZFwiLFxuICAgICAgICAgICAgdGltZTogbmV3IERhdGUocnVuLmVuZF90aW1lKS50b0lTT1N0cmluZygpLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5vblRvb2xFbmQ/LihydW4pO1xuICAgICAgICBhd2FpdCB0aGlzLl9lbmRUcmFjZShydW4pO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVUb29sRXJyb3IoZXJyb3IsIHJ1bklkKSB7XG4gICAgICAgIGNvbnN0IHJ1biA9IHRoaXMucnVuTWFwLmdldChydW5JZCk7XG4gICAgICAgIGlmICghcnVuIHx8IHJ1bj8ucnVuX3R5cGUgIT09IFwidG9vbFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB0b29sIHJ1biB0byBlbmRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcnVuLmVuZF90aW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgcnVuLmVycm9yID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgcnVuLmV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IFwiZXJyb3JcIixcbiAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKHJ1bi5lbmRfdGltZSkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHRoaXMub25Ub29sRXJyb3I/LihydW4pO1xuICAgICAgICBhd2FpdCB0aGlzLl9lbmRUcmFjZShydW4pO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVBZ2VudEFjdGlvbihhY3Rpb24sIHJ1bklkKSB7XG4gICAgICAgIGNvbnN0IHJ1biA9IHRoaXMucnVuTWFwLmdldChydW5JZCk7XG4gICAgICAgIGlmICghcnVuIHx8IHJ1bj8ucnVuX3R5cGUgIT09IFwiY2hhaW5cIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFnZW50UnVuID0gcnVuO1xuICAgICAgICBhZ2VudFJ1bi5hY3Rpb25zID0gYWdlbnRSdW4uYWN0aW9ucyB8fCBbXTtcbiAgICAgICAgYWdlbnRSdW4uYWN0aW9ucy5wdXNoKGFjdGlvbik7XG4gICAgICAgIGFnZW50UnVuLmV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IFwiYWdlbnRfYWN0aW9uXCIsXG4gICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICBrd2FyZ3M6IHsgYWN0aW9uIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLm9uQWdlbnRBY3Rpb24/LihydW4pO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVBZ2VudEVuZChhY3Rpb24sIHJ1bklkKSB7XG4gICAgICAgIGNvbnN0IHJ1biA9IHRoaXMucnVuTWFwLmdldChydW5JZCk7XG4gICAgICAgIGlmICghcnVuIHx8IHJ1bj8ucnVuX3R5cGUgIT09IFwiY2hhaW5cIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJ1bi5ldmVudHMucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBcImFnZW50X2VuZFwiLFxuICAgICAgICAgICAgdGltZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAga3dhcmdzOiB7IGFjdGlvbiB9LFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5vbkFnZW50RW5kPy4ocnVuKTtcbiAgICB9XG4gICAgYXN5bmMgaGFuZGxlUmV0cmlldmVyU3RhcnQocmV0cmlldmVyLCBxdWVyeSwgcnVuSWQsIHBhcmVudFJ1bklkLCB0YWdzLCBtZXRhZGF0YSkge1xuICAgICAgICBjb25zdCBleGVjdXRpb25fb3JkZXIgPSB0aGlzLl9nZXRFeGVjdXRpb25PcmRlcihwYXJlbnRSdW5JZCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0X3RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBydW4gPSB7XG4gICAgICAgICAgICBpZDogcnVuSWQsXG4gICAgICAgICAgICBuYW1lOiByZXRyaWV2ZXIuaWRbcmV0cmlldmVyLmlkLmxlbmd0aCAtIDFdLFxuICAgICAgICAgICAgcGFyZW50X3J1bl9pZDogcGFyZW50UnVuSWQsXG4gICAgICAgICAgICBzdGFydF90aW1lLFxuICAgICAgICAgICAgc2VyaWFsaXplZDogcmV0cmlldmVyLFxuICAgICAgICAgICAgZXZlbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKHN0YXJ0X3RpbWUpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpbnB1dHM6IHsgcXVlcnkgfSxcbiAgICAgICAgICAgIGV4ZWN1dGlvbl9vcmRlcixcbiAgICAgICAgICAgIGNoaWxkX2V4ZWN1dGlvbl9vcmRlcjogZXhlY3V0aW9uX29yZGVyLFxuICAgICAgICAgICAgcnVuX3R5cGU6IFwicmV0cmlldmVyXCIsXG4gICAgICAgICAgICBjaGlsZF9ydW5zOiBbXSxcbiAgICAgICAgICAgIGV4dHJhOiBtZXRhZGF0YSA/IHsgbWV0YWRhdGEgfSA6IHt9LFxuICAgICAgICAgICAgdGFnczogdGFncyB8fCBbXSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc3RhcnRUcmFjZShydW4pO1xuICAgICAgICBhd2FpdCB0aGlzLm9uUmV0cmlldmVyU3RhcnQ/LihydW4pO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVSZXRyaWV2ZXJFbmQoZG9jdW1lbnRzLCBydW5JZCkge1xuICAgICAgICBjb25zdCBydW4gPSB0aGlzLnJ1bk1hcC5nZXQocnVuSWQpO1xuICAgICAgICBpZiAoIXJ1biB8fCBydW4/LnJ1bl90eXBlICE9PSBcInJldHJpZXZlclwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyByZXRyaWV2ZXIgcnVuIHRvIGVuZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBydW4uZW5kX3RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBydW4ub3V0cHV0cyA9IHsgZG9jdW1lbnRzIH07XG4gICAgICAgIHJ1bi5ldmVudHMucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBcImVuZFwiLFxuICAgICAgICAgICAgdGltZTogbmV3IERhdGUocnVuLmVuZF90aW1lKS50b0lTT1N0cmluZygpLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5vblJldHJpZXZlckVuZD8uKHJ1bik7XG4gICAgICAgIGF3YWl0IHRoaXMuX2VuZFRyYWNlKHJ1bik7XG4gICAgfVxuICAgIGFzeW5jIGhhbmRsZVJldHJpZXZlckVycm9yKGVycm9yLCBydW5JZCkge1xuICAgICAgICBjb25zdCBydW4gPSB0aGlzLnJ1bk1hcC5nZXQocnVuSWQpO1xuICAgICAgICBpZiAoIXJ1biB8fCBydW4/LnJ1bl90eXBlICE9PSBcInJldHJpZXZlclwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyByZXRyaWV2ZXIgcnVuIHRvIGVuZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBydW4uZW5kX3RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBydW4uZXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICBydW4uZXZlbnRzLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogXCJlcnJvclwiLFxuICAgICAgICAgICAgdGltZTogbmV3IERhdGUocnVuLmVuZF90aW1lKS50b0lTT1N0cmluZygpLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5vblJldHJpZXZlckVycm9yPy4ocnVuKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fZW5kVHJhY2UocnVuKTtcbiAgICB9XG4gICAgYXN5bmMgaGFuZGxlVGV4dCh0ZXh0LCBydW5JZCkge1xuICAgICAgICBjb25zdCBydW4gPSB0aGlzLnJ1bk1hcC5nZXQocnVuSWQpO1xuICAgICAgICBpZiAoIXJ1biB8fCBydW4/LnJ1bl90eXBlICE9PSBcImNoYWluXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBydW4uZXZlbnRzLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICBrd2FyZ3M6IHsgdGV4dCB9LFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5vblRleHQ/LihydW4pO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVMTE1OZXdUb2tlbih0b2tlbiwgaWR4LCBydW5JZCwgX3BhcmVudFJ1bklkLCBfdGFncywgZmllbGRzKSB7XG4gICAgICAgIGNvbnN0IHJ1biA9IHRoaXMucnVuTWFwLmdldChydW5JZCk7XG4gICAgICAgIGlmICghcnVuIHx8IHJ1bj8ucnVuX3R5cGUgIT09IFwibGxtXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBydW4uZXZlbnRzLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogXCJuZXdfdG9rZW5cIixcbiAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgIGt3YXJnczogeyB0b2tlbiwgaWR4LCBjaHVuazogZmllbGRzPy5jaHVuayB9LFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5vbkxMTU5ld1Rva2VuPy4ocnVuKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBMYW5nQ2hhaW5UcmFjZXIgfSBmcm9tIFwiLi90cmFjZXJfbGFuZ2NoYWluLmpzXCI7XG5pbXBvcnQgeyBMYW5nQ2hhaW5UcmFjZXJWMSB9IGZyb20gXCIuL3RyYWNlcl9sYW5nY2hhaW5fdjEuanNcIjtcbi8qKlxuICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIGluc3RhbmNlIG9mIGBMYW5nQ2hhaW5UcmFjZXJWMWAuIElmIGEgc2Vzc2lvblxuICogaXMgcHJvdmlkZWQsIGl0IGxvYWRzIHRoYXQgc2Vzc2lvbiBpbnRvIHRoZSB0cmFjZXI7IG90aGVyd2lzZSwgaXQgbG9hZHNcbiAqIGEgZGVmYXVsdCBzZXNzaW9uLlxuICogQHBhcmFtIHNlc3Npb24gT3B0aW9uYWwgc2Vzc2lvbiB0byBsb2FkIGludG8gdGhlIHRyYWNlci5cbiAqIEByZXR1cm5zIEFuIGluc3RhbmNlIG9mIGBMYW5nQ2hhaW5UcmFjZXJWMWAuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUcmFjaW5nQ2FsbGJhY2tIYW5kbGVyKHNlc3Npb24pIHtcbiAgICBjb25zdCB0cmFjZXIgPSBuZXcgTGFuZ0NoYWluVHJhY2VyVjEoKTtcbiAgICBpZiAoc2Vzc2lvbikge1xuICAgICAgICBhd2FpdCB0cmFjZXIubG9hZFNlc3Npb24oc2Vzc2lvbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhd2FpdCB0cmFjZXIubG9hZERlZmF1bHRTZXNzaW9uKCk7XG4gICAgfVxuICAgIHJldHVybiB0cmFjZXI7XG59XG4vKipcbiAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBpbnN0YW5jZSBvZiBgTGFuZ0NoYWluVHJhY2VyYC4gSXQgZG9lcyBub3RcbiAqIGxvYWQgYW55IHNlc3Npb24gZGF0YS5cbiAqIEByZXR1cm5zIEFuIGluc3RhbmNlIG9mIGBMYW5nQ2hhaW5UcmFjZXJgLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VHJhY2luZ1YyQ2FsbGJhY2tIYW5kbGVyKCkge1xuICAgIHJldHVybiBuZXcgTGFuZ0NoYWluVHJhY2VyKCk7XG59XG4iLCJpbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwibGFuZ3NtaXRoXCI7XG5pbXBvcnQgeyBnZXRFbnZpcm9ubWVudFZhcmlhYmxlLCBnZXRSdW50aW1lRW52aXJvbm1lbnQsIH0gZnJvbSBcIi4uLy4uL3V0aWwvZW52LmpzXCI7XG5pbXBvcnQgeyBCYXNlVHJhY2VyIH0gZnJvbSBcIi4vdHJhY2VyLmpzXCI7XG5leHBvcnQgY2xhc3MgTGFuZ0NoYWluVHJhY2VyIGV4dGVuZHMgQmFzZVRyYWNlciB7XG4gICAgY29uc3RydWN0b3IoZmllbGRzID0ge30pIHtcbiAgICAgICAgc3VwZXIoZmllbGRzKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibmFtZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogXCJsYW5nY2hhaW5fdHJhY2VyXCJcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInByb2plY3ROYW1lXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImV4YW1wbGVJZFwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJjbGllbnRcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgeyBleGFtcGxlSWQsIHByb2plY3ROYW1lLCBjbGllbnQgfSA9IGZpZWxkcztcbiAgICAgICAgdGhpcy5wcm9qZWN0TmFtZSA9XG4gICAgICAgICAgICBwcm9qZWN0TmFtZSA/P1xuICAgICAgICAgICAgICAgIGdldEVudmlyb25tZW50VmFyaWFibGUoXCJMQU5HQ0hBSU5fUFJPSkVDVFwiKSA/P1xuICAgICAgICAgICAgICAgIGdldEVudmlyb25tZW50VmFyaWFibGUoXCJMQU5HQ0hBSU5fU0VTU0lPTlwiKTtcbiAgICAgICAgdGhpcy5leGFtcGxlSWQgPSBleGFtcGxlSWQ7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gY2xpZW50ID8/IG5ldyBDbGllbnQoe30pO1xuICAgIH1cbiAgICBhc3luYyBfY29udmVydFRvQ3JlYXRlKHJ1biwgZXhhbXBsZV9pZCA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4ucnVuLFxuICAgICAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICAgICAgICAuLi5ydW4uZXh0cmEsXG4gICAgICAgICAgICAgICAgcnVudGltZTogYXdhaXQgZ2V0UnVudGltZUVudmlyb25tZW50KCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hpbGRfcnVuczogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc2Vzc2lvbl9uYW1lOiB0aGlzLnByb2plY3ROYW1lLFxuICAgICAgICAgICAgcmVmZXJlbmNlX2V4YW1wbGVfaWQ6IHJ1bi5wYXJlbnRfcnVuX2lkID8gdW5kZWZpbmVkIDogZXhhbXBsZV9pZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgYXN5bmMgcGVyc2lzdFJ1bihfcnVuKSB7IH1cbiAgICBhc3luYyBfcGVyc2lzdFJ1blNpbmdsZShydW4pIHtcbiAgICAgICAgY29uc3QgcGVyc2lzdGVkUnVuID0gYXdhaXQgdGhpcy5fY29udmVydFRvQ3JlYXRlKHJ1biwgdGhpcy5leGFtcGxlSWQpO1xuICAgICAgICBhd2FpdCB0aGlzLmNsaWVudC5jcmVhdGVSdW4ocGVyc2lzdGVkUnVuKTtcbiAgICB9XG4gICAgYXN5bmMgX3VwZGF0ZVJ1blNpbmdsZShydW4pIHtcbiAgICAgICAgY29uc3QgcnVuVXBkYXRlID0ge1xuICAgICAgICAgICAgZW5kX3RpbWU6IHJ1bi5lbmRfdGltZSxcbiAgICAgICAgICAgIGVycm9yOiBydW4uZXJyb3IsXG4gICAgICAgICAgICBvdXRwdXRzOiBydW4ub3V0cHV0cyxcbiAgICAgICAgICAgIGV2ZW50czogcnVuLmV2ZW50cyxcbiAgICAgICAgICAgIGlucHV0czogcnVuLmlucHV0cyxcbiAgICAgICAgfTtcbiAgICAgICAgYXdhaXQgdGhpcy5jbGllbnQudXBkYXRlUnVuKHJ1bi5pZCwgcnVuVXBkYXRlKTtcbiAgICB9XG4gICAgYXN5bmMgb25SZXRyaWV2ZXJTdGFydChydW4pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fcGVyc2lzdFJ1blNpbmdsZShydW4pO1xuICAgIH1cbiAgICBhc3luYyBvblJldHJpZXZlckVuZChydW4pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fdXBkYXRlUnVuU2luZ2xlKHJ1bik7XG4gICAgfVxuICAgIGFzeW5jIG9uUmV0cmlldmVyRXJyb3IocnVuKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3VwZGF0ZVJ1blNpbmdsZShydW4pO1xuICAgIH1cbiAgICBhc3luYyBvbkxMTVN0YXJ0KHJ1bikge1xuICAgICAgICBhd2FpdCB0aGlzLl9wZXJzaXN0UnVuU2luZ2xlKHJ1bik7XG4gICAgfVxuICAgIGFzeW5jIG9uTExNRW5kKHJ1bikge1xuICAgICAgICBhd2FpdCB0aGlzLl91cGRhdGVSdW5TaW5nbGUocnVuKTtcbiAgICB9XG4gICAgYXN5bmMgb25MTE1FcnJvcihydW4pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fdXBkYXRlUnVuU2luZ2xlKHJ1bik7XG4gICAgfVxuICAgIGFzeW5jIG9uQ2hhaW5TdGFydChydW4pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fcGVyc2lzdFJ1blNpbmdsZShydW4pO1xuICAgIH1cbiAgICBhc3luYyBvbkNoYWluRW5kKHJ1bikge1xuICAgICAgICBhd2FpdCB0aGlzLl91cGRhdGVSdW5TaW5nbGUocnVuKTtcbiAgICB9XG4gICAgYXN5bmMgb25DaGFpbkVycm9yKHJ1bikge1xuICAgICAgICBhd2FpdCB0aGlzLl91cGRhdGVSdW5TaW5nbGUocnVuKTtcbiAgICB9XG4gICAgYXN5bmMgb25Ub29sU3RhcnQocnVuKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3BlcnNpc3RSdW5TaW5nbGUocnVuKTtcbiAgICB9XG4gICAgYXN5bmMgb25Ub29sRW5kKHJ1bikge1xuICAgICAgICBhd2FpdCB0aGlzLl91cGRhdGVSdW5TaW5nbGUocnVuKTtcbiAgICB9XG4gICAgYXN5bmMgb25Ub29sRXJyb3IocnVuKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3VwZGF0ZVJ1blNpbmdsZShydW4pO1xuICAgIH1cbn1cbiIsImV4cG9ydCB7IENsaWVudCB9IGZyb20gXCIuL2NsaWVudC5qc1wiO1xuZXhwb3J0IHsgUnVuVHJlZSB9IGZyb20gXCIuL3J1bl90cmVlcy5qc1wiO1xuIiwiaW1wb3J0ICogYXMgdXVpZCBmcm9tIFwidXVpZFwiO1xuaW1wb3J0IHsgQXN5bmNDYWxsZXIgfSBmcm9tIFwiLi91dGlscy9hc3luY19jYWxsZXIuanNcIjtcbmltcG9ydCB7IGNvbnZlcnRMYW5nQ2hhaW5NZXNzYWdlVG9FeGFtcGxlLCBpc0xhbmdDaGFpbk1lc3NhZ2UsIH0gZnJvbSBcIi4vdXRpbHMvbWVzc2FnZXMuanNcIjtcbmltcG9ydCB7IGdldEVudmlyb25tZW50VmFyaWFibGUsIGdldFJ1bnRpbWVFbnZpcm9ubWVudCB9IGZyb20gXCIuL3V0aWxzL2Vudi5qc1wiO1xuLy8gdXRpbGl0eSBmdW5jdGlvbnNcbmNvbnN0IGlzTG9jYWxob3N0ID0gKHVybCkgPT4ge1xuICAgIGNvbnN0IHN0cmlwcGVkVXJsID0gdXJsLnJlcGxhY2UoXCJodHRwOi8vXCIsIFwiXCIpLnJlcGxhY2UoXCJodHRwczovL1wiLCBcIlwiKTtcbiAgICBjb25zdCBob3N0bmFtZSA9IHN0cmlwcGVkVXJsLnNwbGl0KFwiL1wiKVswXS5zcGxpdChcIjpcIilbMF07XG4gICAgcmV0dXJuIChob3N0bmFtZSA9PT0gXCJsb2NhbGhvc3RcIiB8fCBob3N0bmFtZSA9PT0gXCIxMjcuMC4wLjFcIiB8fCBob3N0bmFtZSA9PT0gXCI6OjFcIik7XG59O1xuY29uc3QgcmFpc2VGb3JTdGF0dXMgPSBhc3luYyAocmVzcG9uc2UsIG9wZXJhdGlvbikgPT4ge1xuICAgIC8vIGNvbnN1bWUgdGhlIHJlc3BvbnNlIGJvZHkgdG8gcmVsZWFzZSB0aGUgY29ubmVjdGlvblxuICAgIC8vIGh0dHBzOi8vdW5kaWNpLm5vZGVqcy5vcmcvIy8/aWQ9Z2FyYmFnZS1jb2xsZWN0aW9uXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvICR7b3BlcmF0aW9ufTogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH0gJHtib2R5fWApO1xuICAgIH1cbn07XG5hc3luYyBmdW5jdGlvbiB0b0FycmF5KGl0ZXJhYmxlKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIGF3YWl0IChjb25zdCBpdGVtIG9mIGl0ZXJhYmxlKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gdHJpbVF1b3RlcyhzdHIpIHtcbiAgICBpZiAoc3RyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHN0clxuICAgICAgICAudHJpbSgpXG4gICAgICAgIC5yZXBsYWNlKC9eXCIoLiopXCIkLywgXCIkMVwiKVxuICAgICAgICAucmVwbGFjZSgvXicoLiopJyQvLCBcIiQxXCIpO1xufVxuZnVuY3Rpb24gaGlkZUlucHV0cyhpbnB1dHMpIHtcbiAgICBpZiAoZ2V0RW52aXJvbm1lbnRWYXJpYWJsZShcIkxBTkdDSEFJTl9ISURFX0lOUFVUU1wiKSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXRzO1xufVxuZnVuY3Rpb24gaGlkZU91dHB1dHMob3V0cHV0cykge1xuICAgIGlmIChnZXRFbnZpcm9ubWVudFZhcmlhYmxlKFwiTEFOR0NIQUlOX0hJREVfT1VUUFVUU1wiKSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0cztcbn1cbmZ1bmN0aW9uIGFzc2VydFV1aWQoc3RyKSB7XG4gICAgaWYgKCF1dWlkLnZhbGlkYXRlKHN0cikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIFVVSUQ6ICR7c3RyfWApO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBDbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZyA9IHt9KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImFwaUtleVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJhcGlVcmxcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwid2ViVXJsXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImNhbGxlclwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJ0aW1lb3V0X21zXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIl90ZW5hbnRJZFwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IENsaWVudC5nZXREZWZhdWx0Q2xpZW50Q29uZmlnKCk7XG4gICAgICAgIHRoaXMuYXBpVXJsID0gdHJpbVF1b3Rlcyhjb25maWcuYXBpVXJsID8/IGRlZmF1bHRDb25maWcuYXBpVXJsKSA/PyBcIlwiO1xuICAgICAgICB0aGlzLmFwaUtleSA9IHRyaW1RdW90ZXMoY29uZmlnLmFwaUtleSA/PyBkZWZhdWx0Q29uZmlnLmFwaUtleSk7XG4gICAgICAgIHRoaXMud2ViVXJsID0gdHJpbVF1b3Rlcyhjb25maWcud2ViVXJsID8/IGRlZmF1bHRDb25maWcud2ViVXJsKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUFwaUtleUlmSG9zdGVkKCk7XG4gICAgICAgIHRoaXMudGltZW91dF9tcyA9IGNvbmZpZy50aW1lb3V0X21zID8/IDQwMDA7XG4gICAgICAgIHRoaXMuY2FsbGVyID0gbmV3IEFzeW5jQ2FsbGVyKGNvbmZpZy5jYWxsZXJPcHRpb25zID8/IHt9KTtcbiAgICB9XG4gICAgc3RhdGljIGdldERlZmF1bHRDbGllbnRDb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGFwaUtleSA9IGdldEVudmlyb25tZW50VmFyaWFibGUoXCJMQU5HQ0hBSU5fQVBJX0tFWVwiKTtcbiAgICAgICAgY29uc3QgYXBpVXJsID0gZ2V0RW52aXJvbm1lbnRWYXJpYWJsZShcIkxBTkdDSEFJTl9FTkRQT0lOVFwiKSA/P1xuICAgICAgICAgICAgKGFwaUtleSA/IFwiaHR0cHM6Ly9hcGkuc21pdGgubGFuZ2NoYWluLmNvbVwiIDogXCJodHRwOi8vbG9jYWxob3N0OjE5ODRcIik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhcGlVcmw6IGFwaVVybCxcbiAgICAgICAgICAgIGFwaUtleTogYXBpS2V5LFxuICAgICAgICAgICAgd2ViVXJsOiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHZhbGlkYXRlQXBpS2V5SWZIb3N0ZWQoKSB7XG4gICAgICAgIGNvbnN0IGlzTG9jYWwgPSBpc0xvY2FsaG9zdCh0aGlzLmFwaVVybCk7XG4gICAgICAgIGlmICghaXNMb2NhbCAmJiAhdGhpcy5hcGlLZXkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFQSSBrZXkgbXVzdCBiZSBwcm92aWRlZCB3aGVuIHVzaW5nIGhvc3RlZCBMYW5nU21pdGggQVBJXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEhvc3RVcmwoKSB7XG4gICAgICAgIGlmICh0aGlzLndlYlVybCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2ViVXJsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzTG9jYWxob3N0KHRoaXMuYXBpVXJsKSkge1xuICAgICAgICAgICAgdGhpcy53ZWJVcmwgPSBcImh0dHA6Ly9sb2NhbGhvc3RcIjtcbiAgICAgICAgICAgIHJldHVybiBcImh0dHA6Ly9sb2NhbGhvc3RcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmFwaVVybC5zcGxpdChcIi5cIiwgMSlbMF0uaW5jbHVkZXMoXCJkZXZcIikpIHtcbiAgICAgICAgICAgIHRoaXMud2ViVXJsID0gXCJodHRwczovL2Rldi5zbWl0aC5sYW5nY2hhaW4uY29tXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJodHRwczovL2Rldi5zbWl0aC5sYW5nY2hhaW4uY29tXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLndlYlVybCA9IFwiaHR0cHM6Ly9zbWl0aC5sYW5nY2hhaW4uY29tXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJodHRwczovL3NtaXRoLmxhbmdjaGFpbi5jb21cIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgaGVhZGVycygpIHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHt9O1xuICAgICAgICBpZiAodGhpcy5hcGlLZXkpIHtcbiAgICAgICAgICAgIGhlYWRlcnNbXCJ4LWFwaS1rZXlcIl0gPSBgJHt0aGlzLmFwaUtleX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cbiAgICBhc3luYyBfZ2V0UmVzcG9uc2UocGF0aCwgcXVlcnlQYXJhbXMpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zU3RyaW5nID0gcXVlcnlQYXJhbXM/LnRvU3RyaW5nKCkgPz8gXCJcIjtcbiAgICAgICAgY29uc3QgdXJsID0gYCR7dGhpcy5hcGlVcmx9JHtwYXRofT8ke3BhcmFtc1N0cmluZ31gO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2FsbGVyLmNhbGwoZmV0Y2gsIHVybCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgc2lnbmFsOiBBYm9ydFNpZ25hbC50aW1lb3V0KHRoaXMudGltZW91dF9tcyksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCAke3BhdGh9OiAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gICAgYXN5bmMgX2dldChwYXRoLCBxdWVyeVBhcmFtcykge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2dldFJlc3BvbnNlKHBhdGgsIHF1ZXJ5UGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9XG4gICAgYXN5bmMgKl9nZXRQYWdpbmF0ZWQocGF0aCwgcXVlcnlQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCkpIHtcbiAgICAgICAgbGV0IG9mZnNldCA9IE51bWJlcihxdWVyeVBhcmFtcy5nZXQoXCJvZmZzZXRcIikpIHx8IDA7XG4gICAgICAgIGNvbnN0IGxpbWl0ID0gTnVtYmVyKHF1ZXJ5UGFyYW1zLmdldChcImxpbWl0XCIpKSB8fCAxMDA7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtcy5zZXQoXCJvZmZzZXRcIiwgU3RyaW5nKG9mZnNldCkpO1xuICAgICAgICAgICAgcXVlcnlQYXJhbXMuc2V0KFwibGltaXRcIiwgU3RyaW5nKGxpbWl0KSk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmFwaVVybH0ke3BhdGh9PyR7cXVlcnlQYXJhbXN9YDtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jYWxsZXIuY2FsbChmZXRjaCwgdXJsLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICBzaWduYWw6IEFib3J0U2lnbmFsLnRpbWVvdXQodGhpcy50aW1lb3V0X21zKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoICR7cGF0aH06ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHlpZWxkIGl0ZW1zO1xuICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA8IGxpbWl0KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvZmZzZXQgKz0gaXRlbXMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGNyZWF0ZVJ1bihydW4pIHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHsgLi4udGhpcy5oZWFkZXJzLCBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9O1xuICAgICAgICBjb25zdCBleHRyYSA9IHJ1bi5leHRyYSA/PyB7fTtcbiAgICAgICAgY29uc3QgcnVudGltZUVudiA9IGF3YWl0IGdldFJ1bnRpbWVFbnZpcm9ubWVudCgpO1xuICAgICAgICBjb25zdCBzZXNzaW9uX25hbWUgPSBydW4ucHJvamVjdF9uYW1lO1xuICAgICAgICBkZWxldGUgcnVuLnByb2plY3RfbmFtZTtcbiAgICAgICAgY29uc3QgcnVuQ3JlYXRlID0ge1xuICAgICAgICAgICAgc2Vzc2lvbl9uYW1lLFxuICAgICAgICAgICAgLi4ucnVuLFxuICAgICAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICAgICAgICAuLi5ydW4uZXh0cmEsXG4gICAgICAgICAgICAgICAgcnVudGltZToge1xuICAgICAgICAgICAgICAgICAgICAuLi5ydW50aW1lRW52LFxuICAgICAgICAgICAgICAgICAgICAuLi5leHRyYS5ydW50aW1lLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBydW5DcmVhdGUuaW5wdXRzID0gaGlkZUlucHV0cyhydW5DcmVhdGUuaW5wdXRzKTtcbiAgICAgICAgaWYgKHJ1bkNyZWF0ZS5vdXRwdXRzKSB7XG4gICAgICAgICAgICBydW5DcmVhdGUub3V0cHV0cyA9IGhpZGVPdXRwdXRzKHJ1bkNyZWF0ZS5vdXRwdXRzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2FsbGVyLmNhbGwoZmV0Y2gsIGAke3RoaXMuYXBpVXJsfS9ydW5zYCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShydW5DcmVhdGUpLFxuICAgICAgICAgICAgc2lnbmFsOiBBYm9ydFNpZ25hbC50aW1lb3V0KHRoaXMudGltZW91dF9tcyksXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCByYWlzZUZvclN0YXR1cyhyZXNwb25zZSwgXCJjcmVhdGUgcnVuXCIpO1xuICAgIH1cbiAgICBhc3luYyB1cGRhdGVSdW4ocnVuSWQsIHJ1bikge1xuICAgICAgICBhc3NlcnRVdWlkKHJ1bklkKTtcbiAgICAgICAgaWYgKHJ1bi5pbnB1dHMpIHtcbiAgICAgICAgICAgIHJ1bi5pbnB1dHMgPSBoaWRlSW5wdXRzKHJ1bi5pbnB1dHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChydW4ub3V0cHV0cykge1xuICAgICAgICAgICAgcnVuLm91dHB1dHMgPSBoaWRlT3V0cHV0cyhydW4ub3V0cHV0cyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHsgLi4udGhpcy5oZWFkZXJzLCBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9O1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2FsbGVyLmNhbGwoZmV0Y2gsIGAke3RoaXMuYXBpVXJsfS9ydW5zLyR7cnVuSWR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocnVuKSxcbiAgICAgICAgICAgIHNpZ25hbDogQWJvcnRTaWduYWwudGltZW91dCh0aGlzLnRpbWVvdXRfbXMpLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgcmFpc2VGb3JTdGF0dXMocmVzcG9uc2UsIFwidXBkYXRlIHJ1blwiKTtcbiAgICB9XG4gICAgYXN5bmMgcmVhZFJ1bihydW5JZCwgeyBsb2FkQ2hpbGRSdW5zIH0gPSB7IGxvYWRDaGlsZFJ1bnM6IGZhbHNlIH0pIHtcbiAgICAgICAgYXNzZXJ0VXVpZChydW5JZCk7XG4gICAgICAgIGxldCBydW4gPSBhd2FpdCB0aGlzLl9nZXQoYC9ydW5zLyR7cnVuSWR9YCk7XG4gICAgICAgIGlmIChsb2FkQ2hpbGRSdW5zICYmIHJ1bi5jaGlsZF9ydW5faWRzKSB7XG4gICAgICAgICAgICBydW4gPSBhd2FpdCB0aGlzLl9sb2FkQ2hpbGRSdW5zKHJ1bik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJ1bjtcbiAgICB9XG4gICAgYXN5bmMgZ2V0UnVuVXJsKHsgcnVuSWQsIHJ1biwgcHJvamVjdE9wdHMsIH0pIHtcbiAgICAgICAgaWYgKHJ1biAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgc2Vzc2lvbklkO1xuICAgICAgICAgICAgaWYgKHJ1bi5zZXNzaW9uX2lkKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbklkID0gcnVuLnNlc3Npb25faWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9qZWN0T3B0cz8ucHJvamVjdE5hbWUpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uSWQgPSAoYXdhaXQgdGhpcy5yZWFkUHJvamVjdCh7IHByb2plY3ROYW1lOiBwcm9qZWN0T3B0cz8ucHJvamVjdE5hbWUgfSkpLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvamVjdE9wdHM/LnByb2plY3RJZCkge1xuICAgICAgICAgICAgICAgIHNlc3Npb25JZCA9IHByb2plY3RPcHRzPy5wcm9qZWN0SWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gYXdhaXQgdGhpcy5yZWFkUHJvamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHByb2plY3ROYW1lOiBnZXRFbnZpcm9ubWVudFZhcmlhYmxlKFwiTEFOR0NIQUlOX1BST0pFQ1RcIikgfHwgXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbklkID0gcHJvamVjdC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRlbmFudElkID0gYXdhaXQgdGhpcy5fZ2V0VGVuYW50SWQoKTtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLmdldEhvc3RVcmwoKX0vby8ke3RlbmFudElkfS9wcm9qZWN0cy9wLyR7c2Vzc2lvbklkfS9yLyR7cnVuLmlkfT9wb2xsPXRydWVgO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJ1bklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJ1bl8gPSBhd2FpdCB0aGlzLnJlYWRSdW4ocnVuSWQpO1xuICAgICAgICAgICAgaWYgKCFydW5fLmFwcF9wYXRoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSdW4gJHtydW5JZH0gaGFzIG5vIGFwcF9wYXRoYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBiYXNlVXJsID0gdGhpcy5nZXRIb3N0VXJsKCk7XG4gICAgICAgICAgICByZXR1cm4gYCR7YmFzZVVybH0ke3J1bl8uYXBwX3BhdGh9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBlaXRoZXIgcnVuSWQgb3IgcnVuXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIF9sb2FkQ2hpbGRSdW5zKHJ1bikge1xuICAgICAgICBjb25zdCBjaGlsZFJ1bnMgPSBhd2FpdCB0b0FycmF5KHRoaXMubGlzdFJ1bnMoeyBpZDogcnVuLmNoaWxkX3J1bl9pZHMgfSkpO1xuICAgICAgICBjb25zdCB0cmVlbWFwID0ge307XG4gICAgICAgIGNvbnN0IHJ1bnMgPSB7fTtcbiAgICAgICAgLy8gVE9ETzogbWFrZSBkb3R0ZWQgb3JkZXIgcmVxdWlyZWQgd2hlbiB0aGUgbWlncmF0aW9uIGZpbmlzaGVzXG4gICAgICAgIGNoaWxkUnVucy5zb3J0KChhLCBiKSA9PiAoYT8uZG90dGVkX29yZGVyID8/IFwiXCIpLmxvY2FsZUNvbXBhcmUoYj8uZG90dGVkX29yZGVyID8/IFwiXCIpKTtcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZFJ1biBvZiBjaGlsZFJ1bnMpIHtcbiAgICAgICAgICAgIGlmIChjaGlsZFJ1bi5wYXJlbnRfcnVuX2lkID09PSBudWxsIHx8XG4gICAgICAgICAgICAgICAgY2hpbGRSdW4ucGFyZW50X3J1bl9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGlsZCBydW4gJHtjaGlsZFJ1bi5pZH0gaGFzIG5vIHBhcmVudGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoY2hpbGRSdW4ucGFyZW50X3J1bl9pZCBpbiB0cmVlbWFwKSkge1xuICAgICAgICAgICAgICAgIHRyZWVtYXBbY2hpbGRSdW4ucGFyZW50X3J1bl9pZF0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyZWVtYXBbY2hpbGRSdW4ucGFyZW50X3J1bl9pZF0ucHVzaChjaGlsZFJ1bik7XG4gICAgICAgICAgICBydW5zW2NoaWxkUnVuLmlkXSA9IGNoaWxkUnVuO1xuICAgICAgICB9XG4gICAgICAgIHJ1bi5jaGlsZF9ydW5zID0gdHJlZW1hcFtydW4uaWRdIHx8IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHJ1bklkIGluIHRyZWVtYXApIHtcbiAgICAgICAgICAgIGlmIChydW5JZCAhPT0gcnVuLmlkKSB7XG4gICAgICAgICAgICAgICAgcnVuc1tydW5JZF0uY2hpbGRfcnVucyA9IHRyZWVtYXBbcnVuSWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBydW47XG4gICAgfVxuICAgIGFzeW5jICpsaXN0UnVucyh7IHByb2plY3RJZCwgcHJvamVjdE5hbWUsIHBhcmVudFJ1bklkLCByZWZlcmVuY2VFeGFtcGxlSWQsIHN0YXJ0VGltZSwgZXhlY3V0aW9uT3JkZXIsIHJ1blR5cGUsIGVycm9yLCBpZCwgbGltaXQsIG9mZnNldCwgcXVlcnksIGZpbHRlciwgfSkge1xuICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICAgICAgbGV0IHByb2plY3RJZF8gPSBwcm9qZWN0SWQ7XG4gICAgICAgIGlmIChwcm9qZWN0TmFtZSkge1xuICAgICAgICAgICAgaWYgKHByb2plY3RJZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgb25lIG9mIHByb2plY3RJZCBvciBwcm9qZWN0TmFtZSBtYXkgYmUgZ2l2ZW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9qZWN0SWRfID0gKGF3YWl0IHRoaXMucmVhZFByb2plY3QoeyBwcm9qZWN0TmFtZSB9KSkuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2plY3RJZF8pIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zLmFwcGVuZChcInNlc3Npb25cIiwgcHJvamVjdElkXyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudFJ1bklkKSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtcy5hcHBlbmQoXCJwYXJlbnRfcnVuXCIsIHBhcmVudFJ1bklkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVmZXJlbmNlRXhhbXBsZUlkKSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtcy5hcHBlbmQoXCJyZWZlcmVuY2VfZXhhbXBsZVwiLCByZWZlcmVuY2VFeGFtcGxlSWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydFRpbWUpIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zLmFwcGVuZChcInN0YXJ0X3RpbWVcIiwgc3RhcnRUaW1lLnRvSVNPU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChleGVjdXRpb25PcmRlcikge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXMuYXBwZW5kKFwiZXhlY3V0aW9uX29yZGVyXCIsIGV4ZWN1dGlvbk9yZGVyLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChydW5UeXBlKSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtcy5hcHBlbmQoXCJydW5fdHlwZVwiLCBydW5UeXBlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXMuYXBwZW5kKFwiZXJyb3JcIiwgZXJyb3IudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaWRfIG9mIGlkKSB7XG4gICAgICAgICAgICAgICAgcXVlcnlQYXJhbXMuYXBwZW5kKFwiaWRcIiwgaWRfKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobGltaXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXMuYXBwZW5kKFwibGltaXRcIiwgbGltaXQudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9mZnNldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtcy5hcHBlbmQoXCJvZmZzZXRcIiwgb2Zmc2V0LnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChxdWVyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtcy5hcHBlbmQoXCJxdWVyeVwiLCBxdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtcy5hcHBlbmQoXCJmaWx0ZXJcIiwgZmlsdGVyKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgYXdhaXQgKGNvbnN0IHJ1bnMgb2YgdGhpcy5fZ2V0UGFnaW5hdGVkKFwiL3J1bnNcIiwgcXVlcnlQYXJhbXMpKSB7XG4gICAgICAgICAgICB5aWVsZCogcnVucztcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBzaGFyZVJ1bihydW5JZCwgeyBzaGFyZUlkIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgcnVuX2lkOiBydW5JZCxcbiAgICAgICAgICAgIHNoYXJlX3Rva2VuOiBzaGFyZUlkIHx8IHV1aWQudjQoKSxcbiAgICAgICAgfTtcbiAgICAgICAgYXNzZXJ0VXVpZChydW5JZCk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jYWxsZXIuY2FsbChmZXRjaCwgYCR7dGhpcy5hcGlVcmx9L3J1bnMvJHtydW5JZH0vc2hhcmVgLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgICAgIHNpZ25hbDogQWJvcnRTaWduYWwudGltZW91dCh0aGlzLnRpbWVvdXRfbXMpLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8ICEoXCJzaGFyZV90b2tlblwiIGluIHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcmVzcG9uc2UgZnJvbSBzZXJ2ZXJcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0SG9zdFVybCgpfS9wdWJsaWMvJHtyZXN1bHRbXCJzaGFyZV90b2tlblwiXX0vcmA7XG4gICAgfVxuICAgIGFzeW5jIHVuc2hhcmVSdW4ocnVuSWQpIHtcbiAgICAgICAgYXNzZXJ0VXVpZChydW5JZCk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jYWxsZXIuY2FsbChmZXRjaCwgYCR7dGhpcy5hcGlVcmx9L3J1bnMvJHtydW5JZH0vc2hhcmVgLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBzaWduYWw6IEFib3J0U2lnbmFsLnRpbWVvdXQodGhpcy50aW1lb3V0X21zKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHJhaXNlRm9yU3RhdHVzKHJlc3BvbnNlLCBcInVuc2hhcmUgcnVuXCIpO1xuICAgIH1cbiAgICBhc3luYyByZWFkUnVuU2hhcmVkTGluayhydW5JZCkge1xuICAgICAgICBhc3NlcnRVdWlkKHJ1bklkKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNhbGxlci5jYWxsKGZldGNoLCBgJHt0aGlzLmFwaVVybH0vcnVucy8ke3J1bklkfS9zaGFyZWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHNpZ25hbDogQWJvcnRTaWduYWwudGltZW91dCh0aGlzLnRpbWVvdXRfbXMpLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8ICEoXCJzaGFyZV90b2tlblwiIGluIHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0SG9zdFVybCgpfS9wdWJsaWMvJHtyZXN1bHRbXCJzaGFyZV90b2tlblwiXX0vcmA7XG4gICAgfVxuICAgIGFzeW5jIGxpc3RTaGFyZWRSdW5zKHNoYXJlVG9rZW4sIHsgcnVuSWRzLCB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgICAgIHNoYXJlX3Rva2VuOiBzaGFyZVRva2VuLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHJ1bklkcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJ1bklkIG9mIHJ1bklkcykge1xuICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zLmFwcGVuZChcImlkXCIsIHJ1bklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhc3NlcnRVdWlkKHNoYXJlVG9rZW4pO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2FsbGVyLmNhbGwoZmV0Y2gsIGAke3RoaXMuYXBpVXJsfS9wdWJsaWMvJHtzaGFyZVRva2VufS9ydW5zJHtxdWVyeVBhcmFtc31gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBzaWduYWw6IEFib3J0U2lnbmFsLnRpbWVvdXQodGhpcy50aW1lb3V0X21zKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJ1bnMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiBydW5zO1xuICAgIH1cbiAgICBhc3luYyByZWFkRGF0YXNldFNoYXJlZFNjaGVtYShkYXRhc2V0SWQsIGRhdGFzZXROYW1lKSB7XG4gICAgICAgIGlmICghZGF0YXNldElkICYmICFkYXRhc2V0TmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRWl0aGVyIGRhdGFzZXRJZCBvciBkYXRhc2V0TmFtZSBtdXN0IGJlIGdpdmVuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGF0YXNldElkKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgdGhpcy5yZWFkRGF0YXNldCh7IGRhdGFzZXROYW1lIH0pO1xuICAgICAgICAgICAgZGF0YXNldElkID0gZGF0YXNldC5pZDtcbiAgICAgICAgfVxuICAgICAgICBhc3NlcnRVdWlkKGRhdGFzZXRJZCk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jYWxsZXIuY2FsbChmZXRjaCwgYCR7dGhpcy5hcGlVcmx9L2RhdGFzZXRzLyR7ZGF0YXNldElkfS9zaGFyZWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHNpZ25hbDogQWJvcnRTaWduYWwudGltZW91dCh0aGlzLnRpbWVvdXRfbXMpLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgc2hhcmVTY2hlbWEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHNoYXJlU2NoZW1hLnVybCA9IGAke3RoaXMuZ2V0SG9zdFVybCgpfS9wdWJsaWMvJHtzaGFyZVNjaGVtYS5zaGFyZV90b2tlbn0vZGA7XG4gICAgICAgIHJldHVybiBzaGFyZVNjaGVtYTtcbiAgICB9XG4gICAgYXN5bmMgc2hhcmVEYXRhc2V0KGRhdGFzZXRJZCwgZGF0YXNldE5hbWUpIHtcbiAgICAgICAgaWYgKCFkYXRhc2V0SWQgJiYgIWRhdGFzZXROYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFaXRoZXIgZGF0YXNldElkIG9yIGRhdGFzZXROYW1lIG11c3QgYmUgZ2l2ZW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkYXRhc2V0SWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSBhd2FpdCB0aGlzLnJlYWREYXRhc2V0KHsgZGF0YXNldE5hbWUgfSk7XG4gICAgICAgICAgICBkYXRhc2V0SWQgPSBkYXRhc2V0LmlkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBkYXRhc2V0X2lkOiBkYXRhc2V0SWQsXG4gICAgICAgIH07XG4gICAgICAgIGFzc2VydFV1aWQoZGF0YXNldElkKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNhbGxlci5jYWxsKGZldGNoLCBgJHt0aGlzLmFwaVVybH0vZGF0YXNldHMvJHtkYXRhc2V0SWR9L3NoYXJlYCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgICAgICBzaWduYWw6IEFib3J0U2lnbmFsLnRpbWVvdXQodGhpcy50aW1lb3V0X21zKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHNoYXJlU2NoZW1hID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBzaGFyZVNjaGVtYS51cmwgPSBgJHt0aGlzLmdldEhvc3RVcmwoKX0vcHVibGljLyR7c2hhcmVTY2hlbWEuc2hhcmVfdG9rZW59L2RgO1xuICAgICAgICByZXR1cm4gc2hhcmVTY2hlbWE7XG4gICAgfVxuICAgIGFzeW5jIHVuc2hhcmVEYXRhc2V0KGRhdGFzZXRJZCkge1xuICAgICAgICBhc3NlcnRVdWlkKGRhdGFzZXRJZCk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jYWxsZXIuY2FsbChmZXRjaCwgYCR7dGhpcy5hcGlVcmx9L2RhdGFzZXRzLyR7ZGF0YXNldElkfS9zaGFyZWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHNpZ25hbDogQWJvcnRTaWduYWwudGltZW91dCh0aGlzLnRpbWVvdXRfbXMpLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgcmFpc2VGb3JTdGF0dXMocmVzcG9uc2UsIFwidW5zaGFyZSBkYXRhc2V0XCIpO1xuICAgIH1cbiAgICBhc3luYyByZWFkU2hhcmVkRGF0YXNldChzaGFyZVRva2VuKSB7XG4gICAgICAgIGFzc2VydFV1aWQoc2hhcmVUb2tlbik7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jYWxsZXIuY2FsbChmZXRjaCwgYCR7dGhpcy5hcGlVcmx9L3B1YmxpYy8ke3NoYXJlVG9rZW59L2RhdGFzZXRzYCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgc2lnbmFsOiBBYm9ydFNpZ25hbC50aW1lb3V0KHRoaXMudGltZW91dF9tcyksXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICByZXR1cm4gZGF0YXNldDtcbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlUHJvamVjdCh7IHByb2plY3ROYW1lLCBwcm9qZWN0RXh0cmEsIHVwc2VydCwgcmVmZXJlbmNlRGF0YXNldElkLCB9KSB7XG4gICAgICAgIGNvbnN0IHVwc2VydF8gPSB1cHNlcnQgPyBgP3Vwc2VydD10cnVlYCA6IFwiXCI7XG4gICAgICAgIGNvbnN0IGVuZHBvaW50ID0gYCR7dGhpcy5hcGlVcmx9L3Nlc3Npb25zJHt1cHNlcnRffWA7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICAgICAgICBuYW1lOiBwcm9qZWN0TmFtZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHByb2plY3RFeHRyYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBib2R5W1wiZXh0cmFcIl0gPSBwcm9qZWN0RXh0cmE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZmVyZW5jZURhdGFzZXRJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBib2R5W1wicmVmZXJlbmNlX2RhdGFzZXRfaWRcIl0gPSByZWZlcmVuY2VEYXRhc2V0SWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNhbGxlci5jYWxsKGZldGNoLCBlbmRwb2ludCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgLi4udGhpcy5oZWFkZXJzLCBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gICAgICAgICAgICBzaWduYWw6IEFib3J0U2lnbmFsLnRpbWVvdXQodGhpcy50aW1lb3V0X21zKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gY3JlYXRlIHNlc3Npb24gJHtwcm9qZWN0TmFtZX06ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgYXN5bmMgcmVhZFByb2plY3QoeyBwcm9qZWN0SWQsIHByb2plY3ROYW1lLCB9KSB7XG4gICAgICAgIGxldCBwYXRoID0gXCIvc2Vzc2lvbnNcIjtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgICAgICBpZiAocHJvamVjdElkICE9PSB1bmRlZmluZWQgJiYgcHJvamVjdE5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGVpdGhlciBwcm9qZWN0TmFtZSBvciBwcm9qZWN0SWQsIG5vdCBib3RoXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHByb2plY3RJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhc3NlcnRVdWlkKHByb2plY3RJZCk7XG4gICAgICAgICAgICBwYXRoICs9IGAvJHtwcm9qZWN0SWR9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwcm9qZWN0TmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJhbXMuYXBwZW5kKFwibmFtZVwiLCBwcm9qZWN0TmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgcHJvamVjdE5hbWUgb3IgcHJvamVjdElkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZ2V0KHBhdGgsIHBhcmFtcyk7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvamVjdFtpZD0ke3Byb2plY3RJZH0sIG5hbWU9JHtwcm9qZWN0TmFtZX1dIG5vdCBmb3VuZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzcG9uc2VbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSByZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBhc3luYyBfZ2V0VGVuYW50SWQoKSB7XG4gICAgICAgIGlmICh0aGlzLl90ZW5hbnRJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RlbmFudElkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7IGxpbWl0OiBcIjFcIiB9KTtcbiAgICAgICAgZm9yIGF3YWl0IChjb25zdCBwcm9qZWN0cyBvZiB0aGlzLl9nZXRQYWdpbmF0ZWQoXCIvc2Vzc2lvbnNcIiwgcXVlcnlQYXJhbXMpKSB7XG4gICAgICAgICAgICB0aGlzLl90ZW5hbnRJZCA9IHByb2plY3RzWzBdLnRlbmFudF9pZDtcbiAgICAgICAgICAgIHJldHVybiBwcm9qZWN0c1swXS50ZW5hbnRfaWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gcHJvamVjdHMgZm91bmQgdG8gcmVzb2x2ZSB0ZW5hbnQuXCIpO1xuICAgIH1cbiAgICBhc3luYyAqbGlzdFByb2plY3RzKHsgcHJvamVjdElkcywgbmFtZSwgbmFtZUNvbnRhaW5zLCByZWZlcmVuY2VEYXRhc2V0SWQsIHJlZmVyZW5jZURhdGFzZXROYW1lLCByZWZlcmVuY2VGcmVlLCB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgICAgICBpZiAocHJvamVjdElkcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb2plY3RJZCBvZiBwcm9qZWN0SWRzKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmFwcGVuZChcImlkXCIsIHByb2plY3RJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGFyYW1zLmFwcGVuZChcIm5hbWVcIiwgbmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hbWVDb250YWlucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJhbXMuYXBwZW5kKFwibmFtZV9jb250YWluc1wiLCBuYW1lQ29udGFpbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWZlcmVuY2VEYXRhc2V0SWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGFyYW1zLmFwcGVuZChcInJlZmVyZW5jZV9kYXRhc2V0XCIsIHJlZmVyZW5jZURhdGFzZXRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVmZXJlbmNlRGF0YXNldE5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGF3YWl0IHRoaXMucmVhZERhdGFzZXQoe1xuICAgICAgICAgICAgICAgIGRhdGFzZXROYW1lOiByZWZlcmVuY2VEYXRhc2V0TmFtZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGFyYW1zLmFwcGVuZChcInJlZmVyZW5jZV9kYXRhc2V0XCIsIGRhdGFzZXQuaWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWZlcmVuY2VGcmVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhcmFtcy5hcHBlbmQoXCJyZWZlcmVuY2VfZnJlZVwiLCByZWZlcmVuY2VGcmVlLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciBhd2FpdCAoY29uc3QgcHJvamVjdHMgb2YgdGhpcy5fZ2V0UGFnaW5hdGVkKFwiL3Nlc3Npb25zXCIsIHBhcmFtcykpIHtcbiAgICAgICAgICAgIHlpZWxkKiBwcm9qZWN0cztcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBkZWxldGVQcm9qZWN0KHsgcHJvamVjdElkLCBwcm9qZWN0TmFtZSwgfSkge1xuICAgICAgICBsZXQgcHJvamVjdElkXztcbiAgICAgICAgaWYgKHByb2plY3RJZCA9PT0gdW5kZWZpbmVkICYmIHByb2plY3ROYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBwcm9qZWN0TmFtZSBvciBwcm9qZWN0SWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocHJvamVjdElkICE9PSB1bmRlZmluZWQgJiYgcHJvamVjdE5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGVpdGhlciBwcm9qZWN0TmFtZSBvciBwcm9qZWN0SWQsIG5vdCBib3RoXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHByb2plY3RJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwcm9qZWN0SWRfID0gKGF3YWl0IHRoaXMucmVhZFByb2plY3QoeyBwcm9qZWN0TmFtZSB9KSkuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwcm9qZWN0SWRfID0gcHJvamVjdElkO1xuICAgICAgICB9XG4gICAgICAgIGFzc2VydFV1aWQocHJvamVjdElkXyk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jYWxsZXIuY2FsbChmZXRjaCwgYCR7dGhpcy5hcGlVcmx9L3Nlc3Npb25zLyR7cHJvamVjdElkX31gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBzaWduYWw6IEFib3J0U2lnbmFsLnRpbWVvdXQodGhpcy50aW1lb3V0X21zKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHJhaXNlRm9yU3RhdHVzKHJlc3BvbnNlLCBgZGVsZXRlIHNlc3Npb24gJHtwcm9qZWN0SWRffSAoJHtwcm9qZWN0TmFtZX0pYCk7XG4gICAgfVxuICAgIGFzeW5jIHVwbG9hZENzdih7IGNzdkZpbGUsIGZpbGVOYW1lLCBpbnB1dEtleXMsIG91dHB1dEtleXMsIGRlc2NyaXB0aW9uLCBkYXRhVHlwZSwgbmFtZSwgfSkge1xuICAgICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmFwaVVybH0vZGF0YXNldHMvdXBsb2FkYDtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwiZmlsZVwiLCBjc3ZGaWxlLCBmaWxlTmFtZSk7XG4gICAgICAgIGlucHV0S2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChcImlucHV0X2tleXNcIiwga2V5KTtcbiAgICAgICAgfSk7XG4gICAgICAgIG91dHB1dEtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXCJvdXRwdXRfa2V5c1wiLCBrZXkpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXCJkZXNjcmlwdGlvblwiLCBkZXNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGFUeXBlKSB7XG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXCJkYXRhX3R5cGVcIiwgZGF0YVR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXCJuYW1lXCIsIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jYWxsZXIuY2FsbChmZXRjaCwgdXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgYm9keTogZm9ybURhdGEsXG4gICAgICAgICAgICBzaWduYWw6IEFib3J0U2lnbmFsLnRpbWVvdXQodGhpcy50aW1lb3V0X21zKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZGV0YWlsICYmIHJlc3VsdC5kZXRhaWwuaW5jbHVkZXMoXCJhbHJlYWR5IGV4aXN0c1wiKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRGF0YXNldCAke2ZpbGVOYW1lfSBhbHJlYWR5IGV4aXN0c2ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gdXBsb2FkIENTVjogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGFzeW5jIGNyZWF0ZURhdGFzZXQobmFtZSwgeyBkZXNjcmlwdGlvbiwgZGF0YVR5cGUsIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBib2R5ID0ge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoZGF0YVR5cGUpIHtcbiAgICAgICAgICAgIGJvZHkuZGF0YV90eXBlID0gZGF0YVR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNhbGxlci5jYWxsKGZldGNoLCBgJHt0aGlzLmFwaVVybH0vZGF0YXNldHNgLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgaGVhZGVyczogeyAuLi50aGlzLmhlYWRlcnMsIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICAgICAgICAgIHNpZ25hbDogQWJvcnRTaWduYWwudGltZW91dCh0aGlzLnRpbWVvdXRfbXMpLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5kZXRhaWwgJiYgcmVzdWx0LmRldGFpbC5pbmNsdWRlcyhcImFscmVhZHkgZXhpc3RzXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEYXRhc2V0ICR7bmFtZX0gYWxyZWFkeSBleGlzdHNgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGNyZWF0ZSBkYXRhc2V0ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBhc3luYyByZWFkRGF0YXNldCh7IGRhdGFzZXRJZCwgZGF0YXNldE5hbWUsIH0pIHtcbiAgICAgICAgbGV0IHBhdGggPSBcIi9kYXRhc2V0c1wiO1xuICAgICAgICAvLyBsaW1pdCB0byAxIHJlc3VsdFxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHsgbGltaXQ6IFwiMVwiIH0pO1xuICAgICAgICBpZiAoZGF0YXNldElkICE9PSB1bmRlZmluZWQgJiYgZGF0YXNldE5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGVpdGhlciBkYXRhc2V0TmFtZSBvciBkYXRhc2V0SWQsIG5vdCBib3RoXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRhdGFzZXRJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhc3NlcnRVdWlkKGRhdGFzZXRJZCk7XG4gICAgICAgICAgICBwYXRoICs9IGAvJHtkYXRhc2V0SWR9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkYXRhc2V0TmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJhbXMuYXBwZW5kKFwibmFtZVwiLCBkYXRhc2V0TmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgZGF0YXNldE5hbWUgb3IgZGF0YXNldElkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZ2V0KHBhdGgsIHBhcmFtcyk7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRGF0YXNldFtpZD0ke2RhdGFzZXRJZH0sIG5hbWU9JHtkYXRhc2V0TmFtZX1dIG5vdCBmb3VuZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzcG9uc2VbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSByZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBhc3luYyByZWFkRGF0YXNldE9wZW5haUZpbmV0dW5pbmcoeyBkYXRhc2V0SWQsIGRhdGFzZXROYW1lLCB9KSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSBcIi9kYXRhc2V0c1wiO1xuICAgICAgICBpZiAoZGF0YXNldElkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkYXRhc2V0TmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkYXRhc2V0SWQgPSAoYXdhaXQgdGhpcy5yZWFkRGF0YXNldCh7IGRhdGFzZXROYW1lIH0pKS5pZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBkYXRhc2V0TmFtZSBvciBkYXRhc2V0SWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9nZXRSZXNwb25zZShgJHtwYXRofS8ke2RhdGFzZXRJZH0vb3BlbmFpX2Z0YCk7XG4gICAgICAgIGNvbnN0IGRhdGFzZXRUZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICBjb25zdCBkYXRhc2V0ID0gZGF0YXNldFRleHRcbiAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgIC5zcGxpdChcIlxcblwiKVxuICAgICAgICAgICAgLm1hcCgobGluZSkgPT4gSlNPTi5wYXJzZShsaW5lKSk7XG4gICAgICAgIHJldHVybiBkYXRhc2V0O1xuICAgIH1cbiAgICBhc3luYyAqbGlzdERhdGFzZXRzKHsgbGltaXQgPSAxMDAsIG9mZnNldCA9IDAsIGRhdGFzZXRJZHMsIGRhdGFzZXROYW1lLCBkYXRhc2V0TmFtZUNvbnRhaW5zLCB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IFwiL2RhdGFzZXRzXCI7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICAgICAgbGltaXQ6IGxpbWl0LnRvU3RyaW5nKCksXG4gICAgICAgICAgICBvZmZzZXQ6IG9mZnNldC50b1N0cmluZygpLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGRhdGFzZXRJZHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBpZF8gb2YgZGF0YXNldElkcykge1xuICAgICAgICAgICAgICAgIHBhcmFtcy5hcHBlbmQoXCJpZFwiLCBpZF8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhc2V0TmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJhbXMuYXBwZW5kKFwibmFtZVwiLCBkYXRhc2V0TmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGFzZXROYW1lQ29udGFpbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGFyYW1zLmFwcGVuZChcIm5hbWVfY29udGFpbnNcIiwgZGF0YXNldE5hbWVDb250YWlucyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIGF3YWl0IChjb25zdCBkYXRhc2V0cyBvZiB0aGlzLl9nZXRQYWdpbmF0ZWQocGF0aCwgcGFyYW1zKSkge1xuICAgICAgICAgICAgeWllbGQqIGRhdGFzZXRzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGRlbGV0ZURhdGFzZXQoeyBkYXRhc2V0SWQsIGRhdGFzZXROYW1lLCB9KSB7XG4gICAgICAgIGxldCBwYXRoID0gXCIvZGF0YXNldHNcIjtcbiAgICAgICAgbGV0IGRhdGFzZXRJZF8gPSBkYXRhc2V0SWQ7XG4gICAgICAgIGlmIChkYXRhc2V0SWQgIT09IHVuZGVmaW5lZCAmJiBkYXRhc2V0TmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgZWl0aGVyIGRhdGFzZXROYW1lIG9yIGRhdGFzZXRJZCwgbm90IGJvdGhcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGF0YXNldE5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGF3YWl0IHRoaXMucmVhZERhdGFzZXQoeyBkYXRhc2V0TmFtZSB9KTtcbiAgICAgICAgICAgIGRhdGFzZXRJZF8gPSBkYXRhc2V0LmlkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhc2V0SWRfICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFzc2VydFV1aWQoZGF0YXNldElkXyk7XG4gICAgICAgICAgICBwYXRoICs9IGAvJHtkYXRhc2V0SWRffWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgZGF0YXNldE5hbWUgb3IgZGF0YXNldElkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jYWxsZXIuY2FsbChmZXRjaCwgdGhpcy5hcGlVcmwgKyBwYXRoLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBzaWduYWw6IEFib3J0U2lnbmFsLnRpbWVvdXQodGhpcy50aW1lb3V0X21zKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGRlbGV0ZSAke3BhdGh9OiAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlRXhhbXBsZShpbnB1dHMsIG91dHB1dHMsIHsgZGF0YXNldElkLCBkYXRhc2V0TmFtZSwgY3JlYXRlZEF0LCBleGFtcGxlSWQgfSkge1xuICAgICAgICBsZXQgZGF0YXNldElkXyA9IGRhdGFzZXRJZDtcbiAgICAgICAgaWYgKGRhdGFzZXRJZF8gPT09IHVuZGVmaW5lZCAmJiBkYXRhc2V0TmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgZWl0aGVyIGRhdGFzZXROYW1lIG9yIGRhdGFzZXRJZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkYXRhc2V0SWRfICE9PSB1bmRlZmluZWQgJiYgZGF0YXNldE5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGVpdGhlciBkYXRhc2V0TmFtZSBvciBkYXRhc2V0SWQsIG5vdCBib3RoXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRhdGFzZXRJZF8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGF3YWl0IHRoaXMucmVhZERhdGFzZXQoeyBkYXRhc2V0TmFtZSB9KTtcbiAgICAgICAgICAgIGRhdGFzZXRJZF8gPSBkYXRhc2V0LmlkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNyZWF0ZWRBdF8gPSBjcmVhdGVkQXQgfHwgbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIGRhdGFzZXRfaWQ6IGRhdGFzZXRJZF8sXG4gICAgICAgICAgICBpbnB1dHMsXG4gICAgICAgICAgICBvdXRwdXRzLFxuICAgICAgICAgICAgY3JlYXRlZF9hdDogY3JlYXRlZEF0Xy50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgaWQ6IGV4YW1wbGVJZCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNhbGxlci5jYWxsKGZldGNoLCBgJHt0aGlzLmFwaVVybH0vZXhhbXBsZXNgLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgaGVhZGVyczogeyAuLi50aGlzLmhlYWRlcnMsIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgICAgIHNpZ25hbDogQWJvcnRTaWduYWwudGltZW91dCh0aGlzLnRpbWVvdXRfbXMpLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gY3JlYXRlIGV4YW1wbGU6ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBhc3luYyBjcmVhdGVMTE1FeGFtcGxlKGlucHV0LCBnZW5lcmF0aW9uLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUV4YW1wbGUoeyBpbnB1dCB9LCB7IG91dHB1dDogZ2VuZXJhdGlvbiB9LCBvcHRpb25zKTtcbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlQ2hhdEV4YW1wbGUoaW5wdXQsIGdlbmVyYXRpb25zLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGZpbmFsSW5wdXQgPSBpbnB1dC5tYXAoKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0xhbmdDaGFpbk1lc3NhZ2UobWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udmVydExhbmdDaGFpbk1lc3NhZ2VUb0V4YW1wbGUobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGZpbmFsT3V0cHV0ID0gaXNMYW5nQ2hhaW5NZXNzYWdlKGdlbmVyYXRpb25zKVxuICAgICAgICAgICAgPyBjb252ZXJ0TGFuZ0NoYWluTWVzc2FnZVRvRXhhbXBsZShnZW5lcmF0aW9ucylcbiAgICAgICAgICAgIDogZ2VuZXJhdGlvbnM7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUV4YW1wbGUoeyBpbnB1dDogZmluYWxJbnB1dCB9LCB7IG91dHB1dDogZmluYWxPdXRwdXQgfSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGFzeW5jIHJlYWRFeGFtcGxlKGV4YW1wbGVJZCkge1xuICAgICAgICBhc3NlcnRVdWlkKGV4YW1wbGVJZCk7XG4gICAgICAgIGNvbnN0IHBhdGggPSBgL2V4YW1wbGVzLyR7ZXhhbXBsZUlkfWA7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9nZXQocGF0aCk7XG4gICAgfVxuICAgIGFzeW5jICpsaXN0RXhhbXBsZXMoeyBkYXRhc2V0SWQsIGRhdGFzZXROYW1lLCBleGFtcGxlSWRzLCB9ID0ge30pIHtcbiAgICAgICAgbGV0IGRhdGFzZXRJZF87XG4gICAgICAgIGlmIChkYXRhc2V0SWQgIT09IHVuZGVmaW5lZCAmJiBkYXRhc2V0TmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgZWl0aGVyIGRhdGFzZXROYW1lIG9yIGRhdGFzZXRJZCwgbm90IGJvdGhcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGF0YXNldElkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRhdGFzZXRJZF8gPSBkYXRhc2V0SWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGF0YXNldE5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGF3YWl0IHRoaXMucmVhZERhdGFzZXQoeyBkYXRhc2V0TmFtZSB9KTtcbiAgICAgICAgICAgIGRhdGFzZXRJZF8gPSBkYXRhc2V0LmlkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGEgZGF0YXNldE5hbWUgb3IgZGF0YXNldElkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoeyBkYXRhc2V0OiBkYXRhc2V0SWRfIH0pO1xuICAgICAgICBpZiAoZXhhbXBsZUlkcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGlkXyBvZiBleGFtcGxlSWRzKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmFwcGVuZChcImlkXCIsIGlkXyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIGF3YWl0IChjb25zdCBleGFtcGxlcyBvZiB0aGlzLl9nZXRQYWdpbmF0ZWQoXCIvZXhhbXBsZXNcIiwgcGFyYW1zKSkge1xuICAgICAgICAgICAgeWllbGQqIGV4YW1wbGVzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGRlbGV0ZUV4YW1wbGUoZXhhbXBsZUlkKSB7XG4gICAgICAgIGFzc2VydFV1aWQoZXhhbXBsZUlkKTtcbiAgICAgICAgY29uc3QgcGF0aCA9IGAvZXhhbXBsZXMvJHtleGFtcGxlSWR9YDtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNhbGxlci5jYWxsKGZldGNoLCB0aGlzLmFwaVVybCArIHBhdGgsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHNpZ25hbDogQWJvcnRTaWduYWwudGltZW91dCh0aGlzLnRpbWVvdXRfbXMpLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZGVsZXRlICR7cGF0aH06ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIH1cbiAgICBhc3luYyB1cGRhdGVFeGFtcGxlKGV4YW1wbGVJZCwgdXBkYXRlKSB7XG4gICAgICAgIGFzc2VydFV1aWQoZXhhbXBsZUlkKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNhbGxlci5jYWxsKGZldGNoLCBgJHt0aGlzLmFwaVVybH0vZXhhbXBsZXMvJHtleGFtcGxlSWR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7IC4uLnRoaXMuaGVhZGVycywgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZSksXG4gICAgICAgICAgICBzaWduYWw6IEFib3J0U2lnbmFsLnRpbWVvdXQodGhpcy50aW1lb3V0X21zKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHVwZGF0ZSBleGFtcGxlICR7ZXhhbXBsZUlkfTogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGFzeW5jIGV2YWx1YXRlUnVuKHJ1biwgZXZhbHVhdG9yLCB7IHNvdXJjZUluZm8sIGxvYWRDaGlsZFJ1bnMsIH0gPSB7IGxvYWRDaGlsZFJ1bnM6IGZhbHNlIH0pIHtcbiAgICAgICAgbGV0IHJ1bl87XG4gICAgICAgIGlmICh0eXBlb2YgcnVuID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBydW5fID0gYXdhaXQgdGhpcy5yZWFkUnVuKHJ1biwgeyBsb2FkQ2hpbGRSdW5zIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBydW4gPT09IFwib2JqZWN0XCIgJiYgXCJpZFwiIGluIHJ1bikge1xuICAgICAgICAgICAgcnVuXyA9IHJ1bjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBydW4gdHlwZTogJHt0eXBlb2YgcnVufWApO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZWZlcmVuY2VFeGFtcGxlID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAocnVuXy5yZWZlcmVuY2VfZXhhbXBsZV9pZCAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgcnVuXy5yZWZlcmVuY2VfZXhhbXBsZV9pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZWZlcmVuY2VFeGFtcGxlID0gYXdhaXQgdGhpcy5yZWFkRXhhbXBsZShydW5fLnJlZmVyZW5jZV9leGFtcGxlX2lkKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmZWVkYmFja1Jlc3VsdCA9IGF3YWl0IGV2YWx1YXRvci5ldmFsdWF0ZVJ1bihydW5fLCByZWZlcmVuY2VFeGFtcGxlKTtcbiAgICAgICAgbGV0IHNvdXJjZUluZm9fID0gc291cmNlSW5mbyA/PyB7fTtcbiAgICAgICAgaWYgKGZlZWRiYWNrUmVzdWx0LmV2YWx1YXRvckluZm8pIHtcbiAgICAgICAgICAgIHNvdXJjZUluZm9fID0geyAuLi5zb3VyY2VJbmZvXywgLi4uZmVlZGJhY2tSZXN1bHQuZXZhbHVhdG9ySW5mbyB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNyZWF0ZUZlZWRiYWNrKHJ1bl8uaWQsIGZlZWRiYWNrUmVzdWx0LmtleSwge1xuICAgICAgICAgICAgc2NvcmU6IGZlZWRiYWNrUmVzdWx0LnNjb3JlLFxuICAgICAgICAgICAgdmFsdWU6IGZlZWRiYWNrUmVzdWx0LnZhbHVlLFxuICAgICAgICAgICAgY29tbWVudDogZmVlZGJhY2tSZXN1bHQuY29tbWVudCxcbiAgICAgICAgICAgIGNvcnJlY3Rpb246IGZlZWRiYWNrUmVzdWx0LmNvcnJlY3Rpb24sXG4gICAgICAgICAgICBzb3VyY2VJbmZvOiBzb3VyY2VJbmZvXyxcbiAgICAgICAgICAgIGZlZWRiYWNrU291cmNlVHlwZTogXCJtb2RlbFwiLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlRmVlZGJhY2socnVuSWQsIGtleSwgeyBzY29yZSwgdmFsdWUsIGNvcnJlY3Rpb24sIGNvbW1lbnQsIHNvdXJjZUluZm8sIGZlZWRiYWNrU291cmNlVHlwZSA9IFwiYXBpXCIsIHNvdXJjZVJ1bklkLCBmZWVkYmFja0lkLCBlYWdlciA9IGZhbHNlLCB9KSB7XG4gICAgICAgIGNvbnN0IGZlZWRiYWNrX3NvdXJjZSA9IHtcbiAgICAgICAgICAgIHR5cGU6IGZlZWRiYWNrU291cmNlVHlwZSA/PyBcImFwaVwiLFxuICAgICAgICAgICAgbWV0YWRhdGE6IHNvdXJjZUluZm8gPz8ge30sXG4gICAgICAgIH07XG4gICAgICAgIGlmIChzb3VyY2VSdW5JZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBmZWVkYmFja19zb3VyY2U/Lm1ldGFkYXRhICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICFmZWVkYmFja19zb3VyY2UubWV0YWRhdGFbXCJfX3J1blwiXSkge1xuICAgICAgICAgICAgZmVlZGJhY2tfc291cmNlLm1ldGFkYXRhW1wiX19ydW5cIl0gPSB7IHJ1bl9pZDogc291cmNlUnVuSWQgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmVlZGJhY2tfc291cmNlPy5tZXRhZGF0YSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBmZWVkYmFja19zb3VyY2UubWV0YWRhdGFbXCJfX3J1blwiXT8ucnVuX2lkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFzc2VydFV1aWQoZmVlZGJhY2tfc291cmNlLm1ldGFkYXRhW1wiX19ydW5cIl0ucnVuX2lkKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmZWVkYmFjayA9IHtcbiAgICAgICAgICAgIGlkOiBmZWVkYmFja0lkID8/IHV1aWQudjQoKSxcbiAgICAgICAgICAgIHJ1bl9pZDogcnVuSWQsXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBzY29yZSxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgY29ycmVjdGlvbixcbiAgICAgICAgICAgIGNvbW1lbnQsXG4gICAgICAgICAgICBmZWVkYmFja19zb3VyY2U6IGZlZWRiYWNrX3NvdXJjZSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdXJsID0gYCR7dGhpcy5hcGlVcmx9L2ZlZWRiYWNrYCArIChlYWdlciA/IFwiL2VhZ2VyXCIgOiBcIlwiKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNhbGxlci5jYWxsKGZldGNoLCB1cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7IC4uLnRoaXMuaGVhZGVycywgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGZlZWRiYWNrKSxcbiAgICAgICAgICAgIHNpZ25hbDogQWJvcnRTaWduYWwudGltZW91dCh0aGlzLnRpbWVvdXRfbXMpLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgcmFpc2VGb3JTdGF0dXMocmVzcG9uc2UsIFwiY3JlYXRlIGZlZWRiYWNrXCIpO1xuICAgICAgICByZXR1cm4gZmVlZGJhY2s7XG4gICAgfVxuICAgIGFzeW5jIHVwZGF0ZUZlZWRiYWNrKGZlZWRiYWNrSWQsIHsgc2NvcmUsIHZhbHVlLCBjb3JyZWN0aW9uLCBjb21tZW50LCB9KSB7XG4gICAgICAgIGNvbnN0IGZlZWRiYWNrVXBkYXRlID0ge307XG4gICAgICAgIGlmIChzY29yZSAhPT0gdW5kZWZpbmVkICYmIHNjb3JlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBmZWVkYmFja1VwZGF0ZVtcInNjb3JlXCJdID0gc2NvcmU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGZlZWRiYWNrVXBkYXRlW1widmFsdWVcIl0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29ycmVjdGlvbiAhPT0gdW5kZWZpbmVkICYmIGNvcnJlY3Rpb24gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGZlZWRiYWNrVXBkYXRlW1wiY29ycmVjdGlvblwiXSA9IGNvcnJlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbW1lbnQgIT09IHVuZGVmaW5lZCAmJiBjb21tZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBmZWVkYmFja1VwZGF0ZVtcImNvbW1lbnRcIl0gPSBjb21tZW50O1xuICAgICAgICB9XG4gICAgICAgIGFzc2VydFV1aWQoZmVlZGJhY2tJZCk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jYWxsZXIuY2FsbChmZXRjaCwgYCR7dGhpcy5hcGlVcmx9L2ZlZWRiYWNrLyR7ZmVlZGJhY2tJZH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgLi4udGhpcy5oZWFkZXJzLCBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZmVlZGJhY2tVcGRhdGUpLFxuICAgICAgICAgICAgc2lnbmFsOiBBYm9ydFNpZ25hbC50aW1lb3V0KHRoaXMudGltZW91dF9tcyksXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCByYWlzZUZvclN0YXR1cyhyZXNwb25zZSwgXCJ1cGRhdGUgZmVlZGJhY2tcIik7XG4gICAgfVxuICAgIGFzeW5jIHJlYWRGZWVkYmFjayhmZWVkYmFja0lkKSB7XG4gICAgICAgIGFzc2VydFV1aWQoZmVlZGJhY2tJZCk7XG4gICAgICAgIGNvbnN0IHBhdGggPSBgL2ZlZWRiYWNrLyR7ZmVlZGJhY2tJZH1gO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2dldChwYXRoKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgICBhc3luYyBkZWxldGVGZWVkYmFjayhmZWVkYmFja0lkKSB7XG4gICAgICAgIGFzc2VydFV1aWQoZmVlZGJhY2tJZCk7XG4gICAgICAgIGNvbnN0IHBhdGggPSBgL2ZlZWRiYWNrLyR7ZmVlZGJhY2tJZH1gO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2FsbGVyLmNhbGwoZmV0Y2gsIHRoaXMuYXBpVXJsICsgcGF0aCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgc2lnbmFsOiBBYm9ydFNpZ25hbC50aW1lb3V0KHRoaXMudGltZW91dF9tcyksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBkZWxldGUgJHtwYXRofTogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgfVxuICAgIGFzeW5jICpsaXN0RmVlZGJhY2soeyBydW5JZHMsIGZlZWRiYWNrS2V5cywgZmVlZGJhY2tTb3VyY2VUeXBlcywgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgICAgICBpZiAocnVuSWRzKSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtcy5hcHBlbmQoXCJydW5cIiwgcnVuSWRzLmpvaW4oXCIsXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmVlZGJhY2tLZXlzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBmZWVkYmFja0tleXMpIHtcbiAgICAgICAgICAgICAgICBxdWVyeVBhcmFtcy5hcHBlbmQoXCJrZXlcIiwga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZmVlZGJhY2tTb3VyY2VUeXBlcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0eXBlIG9mIGZlZWRiYWNrU291cmNlVHlwZXMpIHtcbiAgICAgICAgICAgICAgICBxdWVyeVBhcmFtcy5hcHBlbmQoXCJzb3VyY2VcIiwgdHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIGF3YWl0IChjb25zdCBmZWVkYmFja3Mgb2YgdGhpcy5fZ2V0UGFnaW5hdGVkKFwiL2ZlZWRiYWNrXCIsIHF1ZXJ5UGFyYW1zKSkge1xuICAgICAgICAgICAgeWllbGQqIGZlZWRiYWNrcztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBwUmV0cnkgZnJvbSBcInAtcmV0cnlcIjtcbmltcG9ydCBQUXVldWVNb2QgZnJvbSBcInAtcXVldWVcIjtcbmNvbnN0IFNUQVRVU19OT19SRVRSWSA9IFtcbiAgICA0MDAsXG4gICAgNDAxLFxuICAgIDQwMyxcbiAgICA0MDQsXG4gICAgNDA1LFxuICAgIDQwNixcbiAgICA0MDcsXG4gICAgNDA4LFxuICAgIDQwOSwgLy8gQ29uZmxpY3Rcbl07XG4vKipcbiAqIEEgY2xhc3MgdGhhdCBjYW4gYmUgdXNlZCB0byBtYWtlIGFzeW5jIGNhbGxzIHdpdGggY29uY3VycmVuY3kgYW5kIHJldHJ5IGxvZ2ljLlxuICpcbiAqIFRoaXMgaXMgdXNlZnVsIGZvciBtYWtpbmcgY2FsbHMgdG8gYW55IGtpbmQgb2YgXCJleHBlbnNpdmVcIiBleHRlcm5hbCByZXNvdXJjZSxcbiAqIGJlIGl0IGJlY2F1c2UgaXQncyByYXRlLWxpbWl0ZWQsIHN1YmplY3QgdG8gbmV0d29yayBpc3N1ZXMsIGV0Yy5cbiAqXG4gKiBDb25jdXJyZW50IGNhbGxzIGFyZSBsaW1pdGVkIGJ5IHRoZSBgbWF4Q29uY3VycmVuY3lgIHBhcmFtZXRlciwgd2hpY2ggZGVmYXVsdHNcbiAqIHRvIGBJbmZpbml0eWAuIFRoaXMgbWVhbnMgdGhhdCBieSBkZWZhdWx0LCBhbGwgY2FsbHMgd2lsbCBiZSBtYWRlIGluIHBhcmFsbGVsLlxuICpcbiAqIFJldHJpZXMgYXJlIGxpbWl0ZWQgYnkgdGhlIGBtYXhSZXRyaWVzYCBwYXJhbWV0ZXIsIHdoaWNoIGRlZmF1bHRzIHRvIDYuIFRoaXNcbiAqIG1lYW5zIHRoYXQgYnkgZGVmYXVsdCwgZWFjaCBjYWxsIHdpbGwgYmUgcmV0cmllZCB1cCB0byA2IHRpbWVzLCB3aXRoIGFuXG4gKiBleHBvbmVudGlhbCBiYWNrb2ZmIGJldHdlZW4gZWFjaCBhdHRlbXB0LlxuICovXG5leHBvcnQgY2xhc3MgQXN5bmNDYWxsZXIge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJtYXhDb25jdXJyZW5jeVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJtYXhSZXRyaWVzXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInF1ZXVlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubWF4Q29uY3VycmVuY3kgPSBwYXJhbXMubWF4Q29uY3VycmVuY3kgPz8gSW5maW5pdHk7XG4gICAgICAgIHRoaXMubWF4UmV0cmllcyA9IHBhcmFtcy5tYXhSZXRyaWVzID8/IDY7XG4gICAgICAgIGNvbnN0IFBRdWV1ZSA9IFwiZGVmYXVsdFwiIGluIFBRdWV1ZU1vZCA/IFBRdWV1ZU1vZC5kZWZhdWx0IDogUFF1ZXVlTW9kO1xuICAgICAgICB0aGlzLnF1ZXVlID0gbmV3IFBRdWV1ZSh7IGNvbmN1cnJlbmN5OiB0aGlzLm1heENvbmN1cnJlbmN5IH0pO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNhbGwoY2FsbGFibGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVldWUuYWRkKCgpID0+IHBSZXRyeSgoKSA9PiBjYWxsYWJsZSguLi5hcmdzKS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1pbnN0YW5jZW9mL25vLWluc3RhbmNlb2ZcbiAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSwge1xuICAgICAgICAgICAgb25GYWlsZWRBdHRlbXB0KGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIkNhbmNlbFwiKSB8fFxuICAgICAgICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlLnN0YXJ0c1dpdGgoXCJUaW1lb3V0RXJyb3JcIikgfHxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IubWVzc2FnZS5zdGFydHNXaXRoKFwiQWJvcnRFcnJvclwiKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3I/LmNvZGUgPT09IFwiRUNPTk5BQk9SVEVEXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gZXJyb3I/LnJlc3BvbnNlPy5zdGF0dXM7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyAmJiBTVEFUVVNfTk9fUkVUUlkuaW5jbHVkZXMoK3N0YXR1cykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJldHJpZXM6IHRoaXMubWF4UmV0cmllcyxcbiAgICAgICAgICAgIHJhbmRvbWl6ZTogdHJ1ZSxcbiAgICAgICAgICAgIC8vIElmIG5lZWRlZCB3ZSBjYW4gY2hhbmdlIHNvbWUgb2YgdGhlIGRlZmF1bHRzIGhlcmUsXG4gICAgICAgICAgICAvLyBidXQgdGhleSdyZSBxdWl0ZSBzZW5zaWJsZS5cbiAgICAgICAgfSksIHsgdGhyb3dPblRpbWVvdXQ6IHRydWUgfSk7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgY2FsbFdpdGhPcHRpb25zKG9wdGlvbnMsIGNhbGxhYmxlLCAuLi5hcmdzKSB7XG4gICAgICAgIC8vIE5vdGUgdGhpcyBkb2Vzbid0IGNhbmNlbCB0aGUgdW5kZXJseWluZyByZXF1ZXN0LFxuICAgICAgICAvLyB3aGVuIGF2YWlsYWJsZSBwcmVmZXIgdG8gdXNlIHRoZSBzaWduYWwgb3B0aW9uIG9mIHRoZSB1bmRlcmx5aW5nIGNhbGxcbiAgICAgICAgaWYgKG9wdGlvbnMuc2lnbmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yYWNlKFtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGwoY2FsbGFibGUsIC4uLmFyZ3MpLFxuICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKChfLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zaWduYWw/LmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiQWJvcnRFcnJvclwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbChjYWxsYWJsZSwgLi4uYXJncyk7XG4gICAgfVxuICAgIGZldGNoKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbCgoKSA9PiBmZXRjaCguLi5hcmdzKS50aGVuKChyZXMpID0+IChyZXMub2sgPyByZXMgOiBQcm9taXNlLnJlamVjdChyZXMpKSkpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcImV2ZW50ZW1pdHRlcjNcIik7XG5jb25zdCBwX3RpbWVvdXRfMSA9IHJlcXVpcmUoXCJwLXRpbWVvdXRcIik7XG5jb25zdCBwcmlvcml0eV9xdWV1ZV8xID0gcmVxdWlyZShcIi4vcHJpb3JpdHktcXVldWVcIik7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uXG5jb25zdCBlbXB0eSA9ICgpID0+IHsgfTtcbmNvbnN0IHRpbWVvdXRFcnJvciA9IG5ldyBwX3RpbWVvdXRfMS5UaW1lb3V0RXJyb3IoKTtcbi8qKlxuUHJvbWlzZSBxdWV1ZSB3aXRoIGNvbmN1cnJlbmN5IGNvbnRyb2wuXG4qL1xuY2xhc3MgUFF1ZXVlIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5faW50ZXJ2YWxDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuX2ludGVydmFsRW5kID0gMDtcbiAgICAgICAgdGhpcy5fcGVuZGluZ0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZUVtcHR5ID0gZW1wdHk7XG4gICAgICAgIHRoaXMuX3Jlc29sdmVJZGxlID0gZW1wdHk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY29uc2lzdGVudC10eXBlLWFzc2VydGlvbnNcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oeyBjYXJyeW92ZXJDb25jdXJyZW5jeUNvdW50OiBmYWxzZSwgaW50ZXJ2YWxDYXA6IEluZmluaXR5LCBpbnRlcnZhbDogMCwgY29uY3VycmVuY3k6IEluZmluaXR5LCBhdXRvU3RhcnQ6IHRydWUsIHF1ZXVlQ2xhc3M6IHByaW9yaXR5X3F1ZXVlXzEuZGVmYXVsdCB9LCBvcHRpb25zKTtcbiAgICAgICAgaWYgKCEodHlwZW9mIG9wdGlvbnMuaW50ZXJ2YWxDYXAgPT09ICdudW1iZXInICYmIG9wdGlvbnMuaW50ZXJ2YWxDYXAgPj0gMSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIFxcYGludGVydmFsQ2FwXFxgIHRvIGJlIGEgbnVtYmVyIGZyb20gMSBhbmQgdXAsIGdvdCBcXGAkeyhfYiA9IChfYSA9IG9wdGlvbnMuaW50ZXJ2YWxDYXApID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJ31cXGAgKCR7dHlwZW9mIG9wdGlvbnMuaW50ZXJ2YWxDYXB9KWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmludGVydmFsID09PSB1bmRlZmluZWQgfHwgIShOdW1iZXIuaXNGaW5pdGUob3B0aW9ucy5pbnRlcnZhbCkgJiYgb3B0aW9ucy5pbnRlcnZhbCA+PSAwKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgXFxgaW50ZXJ2YWxcXGAgdG8gYmUgYSBmaW5pdGUgbnVtYmVyID49IDAsIGdvdCBcXGAkeyhfZCA9IChfYyA9IG9wdGlvbnMuaW50ZXJ2YWwpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy50b1N0cmluZygpKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiAnJ31cXGAgKCR7dHlwZW9mIG9wdGlvbnMuaW50ZXJ2YWx9KWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NhcnJ5b3ZlckNvbmN1cnJlbmN5Q291bnQgPSBvcHRpb25zLmNhcnJ5b3ZlckNvbmN1cnJlbmN5Q291bnQ7XG4gICAgICAgIHRoaXMuX2lzSW50ZXJ2YWxJZ25vcmVkID0gb3B0aW9ucy5pbnRlcnZhbENhcCA9PT0gSW5maW5pdHkgfHwgb3B0aW9ucy5pbnRlcnZhbCA9PT0gMDtcbiAgICAgICAgdGhpcy5faW50ZXJ2YWxDYXAgPSBvcHRpb25zLmludGVydmFsQ2FwO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IG9wdGlvbnMuaW50ZXJ2YWw7XG4gICAgICAgIHRoaXMuX3F1ZXVlID0gbmV3IG9wdGlvbnMucXVldWVDbGFzcygpO1xuICAgICAgICB0aGlzLl9xdWV1ZUNsYXNzID0gb3B0aW9ucy5xdWV1ZUNsYXNzO1xuICAgICAgICB0aGlzLmNvbmN1cnJlbmN5ID0gb3B0aW9ucy5jb25jdXJyZW5jeTtcbiAgICAgICAgdGhpcy5fdGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcbiAgICAgICAgdGhpcy5fdGhyb3dPblRpbWVvdXQgPSBvcHRpb25zLnRocm93T25UaW1lb3V0ID09PSB0cnVlO1xuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IG9wdGlvbnMuYXV0b1N0YXJ0ID09PSBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IF9kb2VzSW50ZXJ2YWxBbGxvd0Fub3RoZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0ludGVydmFsSWdub3JlZCB8fCB0aGlzLl9pbnRlcnZhbENvdW50IDwgdGhpcy5faW50ZXJ2YWxDYXA7XG4gICAgfVxuICAgIGdldCBfZG9lc0NvbmN1cnJlbnRBbGxvd0Fub3RoZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wZW5kaW5nQ291bnQgPCB0aGlzLl9jb25jdXJyZW5jeTtcbiAgICB9XG4gICAgX25leHQoKSB7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdDb3VudC0tO1xuICAgICAgICB0aGlzLl90cnlUb1N0YXJ0QW5vdGhlcigpO1xuICAgICAgICB0aGlzLmVtaXQoJ25leHQnKTtcbiAgICB9XG4gICAgX3Jlc29sdmVQcm9taXNlcygpIHtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZUVtcHR5KCk7XG4gICAgICAgIHRoaXMuX3Jlc29sdmVFbXB0eSA9IGVtcHR5O1xuICAgICAgICBpZiAodGhpcy5fcGVuZGluZ0NvdW50ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlSWRsZSgpO1xuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZUlkbGUgPSBlbXB0eTtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnaWRsZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9vblJlc3VtZUludGVydmFsKCkge1xuICAgICAgICB0aGlzLl9vbkludGVydmFsKCk7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVJbnRlcnZhbElmTmVlZGVkKCk7XG4gICAgICAgIHRoaXMuX3RpbWVvdXRJZCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgX2lzSW50ZXJ2YWxQYXVzZWQoKSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGlmICh0aGlzLl9pbnRlcnZhbElkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5faW50ZXJ2YWxFbmQgLSBub3c7XG4gICAgICAgICAgICBpZiAoZGVsYXkgPCAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQWN0IGFzIHRoZSBpbnRlcnZhbCB3YXMgZG9uZVxuICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gcmVzdW1lIGl0IGhlcmUgYmVjYXVzZSBpdCB3aWxsIGJlIHJlc3VtZWQgb24gbGluZSAxNjBcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcnZhbENvdW50ID0gKHRoaXMuX2NhcnJ5b3ZlckNvbmN1cnJlbmN5Q291bnQpID8gdGhpcy5fcGVuZGluZ0NvdW50IDogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEFjdCBhcyB0aGUgaW50ZXJ2YWwgaXMgcGVuZGluZ1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90aW1lb3V0SWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29uUmVzdW1lSW50ZXJ2YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIF90cnlUb1N0YXJ0QW5vdGhlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX3F1ZXVlLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIC8vIFdlIGNhbiBjbGVhciB0aGUgaW50ZXJ2YWwgKFwicGF1c2VcIilcbiAgICAgICAgICAgIC8vIEJlY2F1c2Ugd2UgY2FuIHJlZG8gaXQgbGF0ZXIgKFwicmVzdW1lXCIpXG4gICAgICAgICAgICBpZiAodGhpcy5faW50ZXJ2YWxJZCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWxJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9pbnRlcnZhbElkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZVByb21pc2VzKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9pc1BhdXNlZCkge1xuICAgICAgICAgICAgY29uc3QgY2FuSW5pdGlhbGl6ZUludGVydmFsID0gIXRoaXMuX2lzSW50ZXJ2YWxQYXVzZWQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kb2VzSW50ZXJ2YWxBbGxvd0Fub3RoZXIgJiYgdGhpcy5fZG9lc0NvbmN1cnJlbnRBbGxvd0Fub3RoZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBqb2IgPSB0aGlzLl9xdWV1ZS5kZXF1ZXVlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFqb2IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGpvYigpO1xuICAgICAgICAgICAgICAgIGlmIChjYW5Jbml0aWFsaXplSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZUludGVydmFsSWZOZWVkZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBfaW5pdGlhbGl6ZUludGVydmFsSWZOZWVkZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0ludGVydmFsSWdub3JlZCB8fCB0aGlzLl9pbnRlcnZhbElkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fb25JbnRlcnZhbCgpO1xuICAgICAgICB9LCB0aGlzLl9pbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuX2ludGVydmFsRW5kID0gRGF0ZS5ub3coKSArIHRoaXMuX2ludGVydmFsO1xuICAgIH1cbiAgICBfb25JbnRlcnZhbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ludGVydmFsQ291bnQgPT09IDAgJiYgdGhpcy5fcGVuZGluZ0NvdW50ID09PSAwICYmIHRoaXMuX2ludGVydmFsSWQpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWxJZCk7XG4gICAgICAgICAgICB0aGlzLl9pbnRlcnZhbElkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ludGVydmFsQ291bnQgPSB0aGlzLl9jYXJyeW92ZXJDb25jdXJyZW5jeUNvdW50ID8gdGhpcy5fcGVuZGluZ0NvdW50IDogMDtcbiAgICAgICAgdGhpcy5fcHJvY2Vzc1F1ZXVlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgIEV4ZWN1dGVzIGFsbCBxdWV1ZWQgZnVuY3Rpb25zIHVudGlsIGl0IHJlYWNoZXMgdGhlIGxpbWl0LlxuICAgICovXG4gICAgX3Byb2Nlc3NRdWV1ZSgpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgICAgIHdoaWxlICh0aGlzLl90cnlUb1N0YXJ0QW5vdGhlcigpKSB7IH1cbiAgICB9XG4gICAgZ2V0IGNvbmN1cnJlbmN5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uY3VycmVuY3k7XG4gICAgfVxuICAgIHNldCBjb25jdXJyZW5jeShuZXdDb25jdXJyZW5jeSkge1xuICAgICAgICBpZiAoISh0eXBlb2YgbmV3Q29uY3VycmVuY3kgPT09ICdudW1iZXInICYmIG5ld0NvbmN1cnJlbmN5ID49IDEpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBjb25jdXJyZW5jeVxcYCB0byBiZSBhIG51bWJlciBmcm9tIDEgYW5kIHVwLCBnb3QgXFxgJHtuZXdDb25jdXJyZW5jeX1cXGAgKCR7dHlwZW9mIG5ld0NvbmN1cnJlbmN5fSlgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb25jdXJyZW5jeSA9IG5ld0NvbmN1cnJlbmN5O1xuICAgICAgICB0aGlzLl9wcm9jZXNzUXVldWUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgQWRkcyBhIHN5bmMgb3IgYXN5bmMgdGFzayB0byB0aGUgcXVldWUuIEFsd2F5cyByZXR1cm5zIGEgcHJvbWlzZS5cbiAgICAqL1xuICAgIGFzeW5jIGFkZChmbiwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBydW4gPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGVuZGluZ0NvdW50Kys7XG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWxDb3VudCsrO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wZXJhdGlvbiA9ICh0aGlzLl90aW1lb3V0ID09PSB1bmRlZmluZWQgJiYgb3B0aW9ucy50aW1lb3V0ID09PSB1bmRlZmluZWQpID8gZm4oKSA6IHBfdGltZW91dF8xLmRlZmF1bHQoUHJvbWlzZS5yZXNvbHZlKGZuKCkpLCAob3B0aW9ucy50aW1lb3V0ID09PSB1bmRlZmluZWQgPyB0aGlzLl90aW1lb3V0IDogb3B0aW9ucy50aW1lb3V0KSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudGhyb3dPblRpbWVvdXQgPT09IHVuZGVmaW5lZCA/IHRoaXMuX3Rocm93T25UaW1lb3V0IDogb3B0aW9ucy50aHJvd09uVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh0aW1lb3V0RXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYXdhaXQgb3BlcmF0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX25leHQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9xdWV1ZS5lbnF1ZXVlKHJ1biwgb3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLl90cnlUb1N0YXJ0QW5vdGhlcigpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdhZGQnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgIFNhbWUgYXMgYC5hZGQoKWAsIGJ1dCBhY2NlcHRzIGFuIGFycmF5IG9mIHN5bmMgb3IgYXN5bmMgZnVuY3Rpb25zLlxuXG4gICAgQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBhbGwgZnVuY3Rpb25zIGFyZSByZXNvbHZlZC5cbiAgICAqL1xuICAgIGFzeW5jIGFkZEFsbChmdW5jdGlvbnMsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGZ1bmN0aW9ucy5tYXAoYXN5bmMgKGZ1bmN0aW9uXykgPT4gdGhpcy5hZGQoZnVuY3Rpb25fLCBvcHRpb25zKSkpO1xuICAgIH1cbiAgICAvKipcbiAgICBTdGFydCAob3IgcmVzdW1lKSBleGVjdXRpbmcgZW5xdWV1ZWQgdGFza3Mgd2l0aGluIGNvbmN1cnJlbmN5IGxpbWl0LiBObyBuZWVkIHRvIGNhbGwgdGhpcyBpZiBxdWV1ZSBpcyBub3QgcGF1c2VkICh2aWEgYG9wdGlvbnMuYXV0b1N0YXJ0ID0gZmFsc2VgIG9yIGJ5IGAucGF1c2UoKWAgbWV0aG9kLilcbiAgICAqL1xuICAgIHN0YXJ0KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzUGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wcm9jZXNzUXVldWUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgIFB1dCBxdWV1ZSBleGVjdXRpb24gb24gaG9sZC5cbiAgICAqL1xuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgIENsZWFyIHRoZSBxdWV1ZS5cbiAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9xdWV1ZSA9IG5ldyB0aGlzLl9xdWV1ZUNsYXNzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgIENhbiBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZXMuIFVzZWZ1bCBpZiB5b3UgZm9yIGV4YW1wbGUgYWRkIGFkZGl0aW9uYWwgaXRlbXMgYXQgYSBsYXRlciB0aW1lLlxuXG4gICAgQHJldHVybnMgQSBwcm9taXNlIHRoYXQgc2V0dGxlcyB3aGVuIHRoZSBxdWV1ZSBiZWNvbWVzIGVtcHR5LlxuICAgICovXG4gICAgYXN5bmMgb25FbXB0eSgpIHtcbiAgICAgICAgLy8gSW5zdGFudGx5IHJlc29sdmUgaWYgdGhlIHF1ZXVlIGlzIGVtcHR5XG4gICAgICAgIGlmICh0aGlzLl9xdWV1ZS5zaXplID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdSZXNvbHZlID0gdGhpcy5fcmVzb2x2ZUVtcHR5O1xuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZUVtcHR5ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nUmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICBUaGUgZGlmZmVyZW5jZSB3aXRoIGAub25FbXB0eWAgaXMgdGhhdCBgLm9uSWRsZWAgZ3VhcmFudGVlcyB0aGF0IGFsbCB3b3JrIGZyb20gdGhlIHF1ZXVlIGhhcyBmaW5pc2hlZC4gYC5vbkVtcHR5YCBtZXJlbHkgc2lnbmFscyB0aGF0IHRoZSBxdWV1ZSBpcyBlbXB0eSwgYnV0IGl0IGNvdWxkIG1lYW4gdGhhdCBzb21lIHByb21pc2VzIGhhdmVuJ3QgY29tcGxldGVkIHlldC5cblxuICAgIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHNldHRsZXMgd2hlbiB0aGUgcXVldWUgYmVjb21lcyBlbXB0eSwgYW5kIGFsbCBwcm9taXNlcyBoYXZlIGNvbXBsZXRlZDsgYHF1ZXVlLnNpemUgPT09IDAgJiYgcXVldWUucGVuZGluZyA9PT0gMGAuXG4gICAgKi9cbiAgICBhc3luYyBvbklkbGUoKSB7XG4gICAgICAgIC8vIEluc3RhbnRseSByZXNvbHZlIGlmIG5vbmUgcGVuZGluZyBhbmQgaWYgbm90aGluZyBlbHNlIGlzIHF1ZXVlZFxuICAgICAgICBpZiAodGhpcy5fcGVuZGluZ0NvdW50ID09PSAwICYmIHRoaXMuX3F1ZXVlLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ1Jlc29sdmUgPSB0aGlzLl9yZXNvbHZlSWRsZTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmVJZGxlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nUmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICBTaXplIG9mIHRoZSBxdWV1ZS5cbiAgICAqL1xuICAgIGdldCBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVldWUuc2l6ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgU2l6ZSBvZiB0aGUgcXVldWUsIGZpbHRlcmVkIGJ5IHRoZSBnaXZlbiBvcHRpb25zLlxuXG4gICAgRm9yIGV4YW1wbGUsIHRoaXMgY2FuIGJlIHVzZWQgdG8gZmluZCB0aGUgbnVtYmVyIG9mIGl0ZW1zIHJlbWFpbmluZyBpbiB0aGUgcXVldWUgd2l0aCBhIHNwZWNpZmljIHByaW9yaXR5IGxldmVsLlxuICAgICovXG4gICAgc2l6ZUJ5KG9wdGlvbnMpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vbm8tZm4tcmVmZXJlbmNlLWluLWl0ZXJhdG9yXG4gICAgICAgIHJldHVybiB0aGlzLl9xdWV1ZS5maWx0ZXIob3B0aW9ucykubGVuZ3RoO1xuICAgIH1cbiAgICAvKipcbiAgICBOdW1iZXIgb2YgcGVuZGluZyBwcm9taXNlcy5cbiAgICAqL1xuICAgIGdldCBwZW5kaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGVuZGluZ0NvdW50O1xuICAgIH1cbiAgICAvKipcbiAgICBXaGV0aGVyIHRoZSBxdWV1ZSBpcyBjdXJyZW50bHkgcGF1c2VkLlxuICAgICovXG4gICAgZ2V0IGlzUGF1c2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNQYXVzZWQ7XG4gICAgfVxuICAgIGdldCB0aW1lb3V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGltZW91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgU2V0IHRoZSB0aW1lb3V0IGZvciBmdXR1cmUgb3BlcmF0aW9ucy5cbiAgICAqL1xuICAgIHNldCB0aW1lb3V0KG1pbGxpc2Vjb25kcykge1xuICAgICAgICB0aGlzLl90aW1lb3V0ID0gbWlsbGlzZWNvbmRzO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFBRdWV1ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbiAgLCBwcmVmaXggPSAnfic7XG5cbi8qKlxuICogQ29uc3RydWN0b3IgdG8gY3JlYXRlIGEgc3RvcmFnZSBmb3Igb3VyIGBFRWAgb2JqZWN0cy5cbiAqIEFuIGBFdmVudHNgIGluc3RhbmNlIGlzIGEgcGxhaW4gb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIGV2ZW50IG5hbWVzLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRXZlbnRzKCkge31cblxuLy9cbi8vIFdlIHRyeSB0byBub3QgaW5oZXJpdCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC4gSW4gc29tZSBlbmdpbmVzIGNyZWF0aW5nIGFuXG4vLyBpbnN0YW5jZSBpbiB0aGlzIHdheSBpcyBmYXN0ZXIgdGhhbiBjYWxsaW5nIGBPYmplY3QuY3JlYXRlKG51bGwpYCBkaXJlY3RseS5cbi8vIElmIGBPYmplY3QuY3JlYXRlKG51bGwpYCBpcyBub3Qgc3VwcG9ydGVkIHdlIHByZWZpeCB0aGUgZXZlbnQgbmFtZXMgd2l0aCBhXG4vLyBjaGFyYWN0ZXIgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGJ1aWx0LWluIG9iamVjdCBwcm9wZXJ0aWVzIGFyZSBub3Rcbi8vIG92ZXJyaWRkZW4gb3IgdXNlZCBhcyBhbiBhdHRhY2sgdmVjdG9yLlxuLy9cbmlmIChPYmplY3QuY3JlYXRlKSB7XG4gIEV2ZW50cy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIC8vXG4gIC8vIFRoaXMgaGFjayBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgYF9fcHJvdG9fX2AgcHJvcGVydHkgaXMgc3RpbGwgaW5oZXJpdGVkIGluXG4gIC8vIHNvbWUgb2xkIGJyb3dzZXJzIGxpa2UgQW5kcm9pZCA0LCBpUGhvbmUgNS4xLCBPcGVyYSAxMSBhbmQgU2FmYXJpIDUuXG4gIC8vXG4gIGlmICghbmV3IEV2ZW50cygpLl9fcHJvdG9fXykgcHJlZml4ID0gZmFsc2U7XG59XG5cbi8qKlxuICogUmVwcmVzZW50YXRpb24gb2YgYSBzaW5nbGUgZXZlbnQgbGlzdGVuZXIuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29uY2U9ZmFsc2VdIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEVFKGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHRoaXMuZm4gPSBmbjtcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5vbmNlID0gb25jZSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZW1pdHRlciBSZWZlcmVuY2UgdG8gdGhlIGBFdmVudEVtaXR0ZXJgIGluc3RhbmNlLlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBTcGVjaWZ5IGlmIHRoZSBsaXN0ZW5lciBpcyBhIG9uZS10aW1lIGxpc3RlbmVyLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFkZExpc3RlbmVyKGVtaXR0ZXIsIGV2ZW50LCBmbiwgY29udGV4dCwgb25jZSkge1xuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGxpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVyID0gbmV3IEVFKGZuLCBjb250ZXh0IHx8IGVtaXR0ZXIsIG9uY2UpXG4gICAgLCBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghZW1pdHRlci5fZXZlbnRzW2V2dF0pIGVtaXR0ZXIuX2V2ZW50c1tldnRdID0gbGlzdGVuZXIsIGVtaXR0ZXIuX2V2ZW50c0NvdW50Kys7XG4gIGVsc2UgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XS5mbikgZW1pdHRlci5fZXZlbnRzW2V2dF0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2UgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBbZW1pdHRlci5fZXZlbnRzW2V2dF0sIGxpc3RlbmVyXTtcblxuICByZXR1cm4gZW1pdHRlcjtcbn1cblxuLyoqXG4gKiBDbGVhciBldmVudCBieSBuYW1lLlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZ0IFRoZSBFdmVudCBuYW1lLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2xlYXJFdmVudChlbWl0dGVyLCBldnQpIHtcbiAgaWYgKC0tZW1pdHRlci5fZXZlbnRzQ291bnQgPT09IDApIGVtaXR0ZXIuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgZWxzZSBkZWxldGUgZW1pdHRlci5fZXZlbnRzW2V2dF07XG59XG5cbi8qKlxuICogTWluaW1hbCBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UgdGhhdCBpcyBtb2xkZWQgYWdhaW5zdCB0aGUgTm9kZS5qc1xuICogYEV2ZW50RW1pdHRlcmAgaW50ZXJmYWNlLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xufVxuXG4vKipcbiAqIFJldHVybiBhbiBhcnJheSBsaXN0aW5nIHRoZSBldmVudHMgZm9yIHdoaWNoIHRoZSBlbWl0dGVyIGhhcyByZWdpc3RlcmVkXG4gKiBsaXN0ZW5lcnMuXG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICB2YXIgbmFtZXMgPSBbXVxuICAgICwgZXZlbnRzXG4gICAgLCBuYW1lO1xuXG4gIGlmICh0aGlzLl9ldmVudHNDb3VudCA9PT0gMCkgcmV0dXJuIG5hbWVzO1xuXG4gIGZvciAobmFtZSBpbiAoZXZlbnRzID0gdGhpcy5fZXZlbnRzKSkge1xuICAgIGlmIChoYXMuY2FsbChldmVudHMsIG5hbWUpKSBuYW1lcy5wdXNoKHByZWZpeCA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lKTtcbiAgfVxuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgcmV0dXJuIG5hbWVzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGV2ZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIG5hbWVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gVGhlIHJlZ2lzdGVyZWQgbGlzdGVuZXJzLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyhldmVudCkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudFxuICAgICwgaGFuZGxlcnMgPSB0aGlzLl9ldmVudHNbZXZ0XTtcblxuICBpZiAoIWhhbmRsZXJzKSByZXR1cm4gW107XG4gIGlmIChoYW5kbGVycy5mbikgcmV0dXJuIFtoYW5kbGVycy5mbl07XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBoYW5kbGVycy5sZW5ndGgsIGVlID0gbmV3IEFycmF5KGwpOyBpIDwgbDsgaSsrKSB7XG4gICAgZWVbaV0gPSBoYW5kbGVyc1tpXS5mbjtcbiAgfVxuXG4gIHJldHVybiBlZTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBudW1iZXIgb2YgbGlzdGVuZXJzIGxpc3RlbmluZyB0byBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1iZXIgb2YgbGlzdGVuZXJzLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbiBsaXN0ZW5lckNvdW50KGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XTtcblxuICBpZiAoIWxpc3RlbmVycykgcmV0dXJuIDA7XG4gIGlmIChsaXN0ZW5lcnMuZm4pIHJldHVybiAxO1xuICByZXR1cm4gbGlzdGVuZXJzLmxlbmd0aDtcbn07XG5cbi8qKlxuICogQ2FsbHMgZWFjaCBvZiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgZXZlbnQgaGFkIGxpc3RlbmVycywgZWxzZSBgZmFsc2VgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2ZW50LCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XSkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XVxuICAgICwgbGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgYXJnc1xuICAgICwgaTtcblxuICBpZiAobGlzdGVuZXJzLmZuKSB7XG4gICAgaWYgKGxpc3RlbmVycy5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnMuZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICBzd2l0Y2ggKGxlbikge1xuICAgICAgY2FzZSAxOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQpLCB0cnVlO1xuICAgICAgY2FzZSAyOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExKSwgdHJ1ZTtcbiAgICAgIGNhc2UgMzogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIpLCB0cnVlO1xuICAgICAgY2FzZSA0OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMpLCB0cnVlO1xuICAgICAgY2FzZSA1OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgNjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCwgYTUpLCB0cnVlO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMuZm4uYXBwbHkobGlzdGVuZXJzLmNvbnRleHQsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoXG4gICAgICAsIGo7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChsaXN0ZW5lcnNbaV0ub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzW2ldLmZuLCB1bmRlZmluZWQsIHRydWUpO1xuXG4gICAgICBzd2l0Y2ggKGxlbikge1xuICAgICAgICBjYXNlIDE6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0KTsgYnJlYWs7XG4gICAgICAgIGNhc2UgMjogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgMzogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMik7IGJyZWFrO1xuICAgICAgICBjYXNlIDQ6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIsIGEzKTsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKCFhcmdzKSBmb3IgKGogPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgYXJnc1tqIC0gMV0gPSBhcmd1bWVudHNbal07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogQWRkIGEgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIGFkZExpc3RlbmVyKHRoaXMsIGV2ZW50LCBmbiwgY29udGV4dCwgZmFsc2UpO1xufTtcblxuLyoqXG4gKiBBZGQgYSBvbmUtdGltZSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZShldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIGFkZExpc3RlbmVyKHRoaXMsIGV2ZW50LCBmbiwgY29udGV4dCwgdHJ1ZSk7XG59O1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgbGlzdGVuZXJzIG9mIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gT25seSByZW1vdmUgdGhlIGxpc3RlbmVycyB0aGF0IG1hdGNoIHRoaXMgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgT25seSByZW1vdmUgdGhlIGxpc3RlbmVycyB0aGF0IGhhdmUgdGhpcyBjb250ZXh0LlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIE9ubHkgcmVtb3ZlIG9uZS10aW1lIGxpc3RlbmVycy5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCwgb25jZSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gdGhpcztcbiAgaWYgKCFmbikge1xuICAgIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XTtcblxuICBpZiAobGlzdGVuZXJzLmZuKSB7XG4gICAgaWYgKFxuICAgICAgbGlzdGVuZXJzLmZuID09PSBmbiAmJlxuICAgICAgKCFvbmNlIHx8IGxpc3RlbmVycy5vbmNlKSAmJlxuICAgICAgKCFjb250ZXh0IHx8IGxpc3RlbmVycy5jb250ZXh0ID09PSBjb250ZXh0KVxuICAgICkge1xuICAgICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgZXZlbnRzID0gW10sIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICBsaXN0ZW5lcnNbaV0uZm4gIT09IGZuIHx8XG4gICAgICAgIChvbmNlICYmICFsaXN0ZW5lcnNbaV0ub25jZSkgfHxcbiAgICAgICAgKGNvbnRleHQgJiYgbGlzdGVuZXJzW2ldLmNvbnRleHQgIT09IGNvbnRleHQpXG4gICAgICApIHtcbiAgICAgICAgZXZlbnRzLnB1c2gobGlzdGVuZXJzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIFJlc2V0IHRoZSBhcnJheSwgb3IgcmVtb3ZlIGl0IGNvbXBsZXRlbHkgaWYgd2UgaGF2ZSBubyBtb3JlIGxpc3RlbmVycy5cbiAgICAvL1xuICAgIGlmIChldmVudHMubGVuZ3RoKSB0aGlzLl9ldmVudHNbZXZ0XSA9IGV2ZW50cy5sZW5ndGggPT09IDEgPyBldmVudHNbMF0gOiBldmVudHM7XG4gICAgZWxzZSBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFsbCBsaXN0ZW5lcnMsIG9yIHRob3NlIG9mIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IFtldmVudF0gVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQ7XG5cbiAgaWYgKGV2ZW50KSB7XG4gICAgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcbiAgICBpZiAodGhpcy5fZXZlbnRzW2V2dF0pIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vL1xuLy8gQWxpYXMgbWV0aG9kcyBuYW1lcyBiZWNhdXNlIHBlb3BsZSByb2xsIGxpa2UgdGhhdC5cbi8vXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcblxuLy9cbi8vIEV4cG9zZSB0aGUgcHJlZml4LlxuLy9cbkV2ZW50RW1pdHRlci5wcmVmaXhlZCA9IHByZWZpeDtcblxuLy9cbi8vIEFsbG93IGBFdmVudEVtaXR0ZXJgIHRvIGJlIGltcG9ydGVkIGFzIG1vZHVsZSBuYW1lc3BhY2UuXG4vL1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuLy9cbi8vIEV4cG9zZSB0aGUgbW9kdWxlLlxuLy9cbmlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG1vZHVsZSkge1xuICBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcEZpbmFsbHkgPSByZXF1aXJlKCdwLWZpbmFsbHknKTtcblxuY2xhc3MgVGltZW91dEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG5cdFx0c3VwZXIobWVzc2FnZSk7XG5cdFx0dGhpcy5uYW1lID0gJ1RpbWVvdXRFcnJvcic7XG5cdH1cbn1cblxuY29uc3QgcFRpbWVvdXQgPSAocHJvbWlzZSwgbWlsbGlzZWNvbmRzLCBmYWxsYmFjaykgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRpZiAodHlwZW9mIG1pbGxpc2Vjb25kcyAhPT0gJ251bWJlcicgfHwgbWlsbGlzZWNvbmRzIDwgMCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGBtaWxsaXNlY29uZHNgIHRvIGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG5cdH1cblxuXHRpZiAobWlsbGlzZWNvbmRzID09PSBJbmZpbml0eSkge1xuXHRcdHJlc29sdmUocHJvbWlzZSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRpZiAodHlwZW9mIGZhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXNvbHZlKGZhbGxiYWNrKCkpO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1lc3NhZ2UgPSB0eXBlb2YgZmFsbGJhY2sgPT09ICdzdHJpbmcnID8gZmFsbGJhY2sgOiBgUHJvbWlzZSB0aW1lZCBvdXQgYWZ0ZXIgJHttaWxsaXNlY29uZHN9IG1pbGxpc2Vjb25kc2A7XG5cdFx0Y29uc3QgdGltZW91dEVycm9yID0gZmFsbGJhY2sgaW5zdGFuY2VvZiBFcnJvciA/IGZhbGxiYWNrIDogbmV3IFRpbWVvdXRFcnJvcihtZXNzYWdlKTtcblxuXHRcdGlmICh0eXBlb2YgcHJvbWlzZS5jYW5jZWwgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHByb21pc2UuY2FuY2VsKCk7XG5cdFx0fVxuXG5cdFx0cmVqZWN0KHRpbWVvdXRFcnJvcik7XG5cdH0sIG1pbGxpc2Vjb25kcyk7XG5cblx0Ly8gVE9ETzogVXNlIG5hdGl2ZSBgZmluYWxseWAga2V5d29yZCB3aGVuIHRhcmdldGluZyBOb2RlLmpzIDEwXG5cdHBGaW5hbGx5KFxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcm9taXNlL3ByZWZlci1hd2FpdC10by10aGVuXG5cdFx0cHJvbWlzZS50aGVuKHJlc29sdmUsIHJlamVjdCksXG5cdFx0KCkgPT4ge1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcblx0XHR9XG5cdCk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBwVGltZW91dDtcbi8vIFRPRE86IFJlbW92ZSB0aGlzIGZvciB0aGUgbmV4dCBtYWpvciByZWxlYXNlXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gcFRpbWVvdXQ7XG5cbm1vZHVsZS5leHBvcnRzLlRpbWVvdXRFcnJvciA9IFRpbWVvdXRFcnJvcjtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gKHByb21pc2UsIG9uRmluYWxseSkgPT4ge1xuXHRvbkZpbmFsbHkgPSBvbkZpbmFsbHkgfHwgKCgpID0+IHt9KTtcblxuXHRyZXR1cm4gcHJvbWlzZS50aGVuKFxuXHRcdHZhbCA9PiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblx0XHRcdHJlc29sdmUob25GaW5hbGx5KCkpO1xuXHRcdH0pLnRoZW4oKCkgPT4gdmFsKSxcblx0XHRlcnIgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cdFx0XHRyZXNvbHZlKG9uRmluYWxseSgpKTtcblx0XHR9KS50aGVuKCgpID0+IHtcblx0XHRcdHRocm93IGVycjtcblx0XHR9KVxuXHQpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbG93ZXJfYm91bmRfMSA9IHJlcXVpcmUoXCIuL2xvd2VyLWJvdW5kXCIpO1xuY2xhc3MgUHJpb3JpdHlRdWV1ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3F1ZXVlID0gW107XG4gICAgfVxuICAgIGVucXVldWUocnVuLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHsgcHJpb3JpdHk6IDAgfSwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7XG4gICAgICAgICAgICBwcmlvcml0eTogb3B0aW9ucy5wcmlvcml0eSxcbiAgICAgICAgICAgIHJ1blxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5zaXplICYmIHRoaXMuX3F1ZXVlW3RoaXMuc2l6ZSAtIDFdLnByaW9yaXR5ID49IG9wdGlvbnMucHJpb3JpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlLnB1c2goZWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW5kZXggPSBsb3dlcl9ib3VuZF8xLmRlZmF1bHQodGhpcy5fcXVldWUsIGVsZW1lbnQsIChhLCBiKSA9PiBiLnByaW9yaXR5IC0gYS5wcmlvcml0eSk7XG4gICAgICAgIHRoaXMuX3F1ZXVlLnNwbGljZShpbmRleCwgMCwgZWxlbWVudCk7XG4gICAgfVxuICAgIGRlcXVldWUoKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9xdWV1ZS5zaGlmdCgpO1xuICAgICAgICByZXR1cm4gaXRlbSA9PT0gbnVsbCB8fCBpdGVtID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpdGVtLnJ1bjtcbiAgICB9XG4gICAgZmlsdGVyKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXVlLmZpbHRlcigoZWxlbWVudCkgPT4gZWxlbWVudC5wcmlvcml0eSA9PT0gb3B0aW9ucy5wcmlvcml0eSkubWFwKChlbGVtZW50KSA9PiBlbGVtZW50LnJ1bik7XG4gICAgfVxuICAgIGdldCBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVldWUubGVuZ3RoO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFByaW9yaXR5UXVldWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIFBvcnQgb2YgbG93ZXJfYm91bmQgZnJvbSBodHRwczovL2VuLmNwcHJlZmVyZW5jZS5jb20vdy9jcHAvYWxnb3JpdGhtL2xvd2VyX2JvdW5kXG4vLyBVc2VkIHRvIGNvbXB1dGUgaW5zZXJ0aW9uIGluZGV4IHRvIGtlZXAgcXVldWUgc29ydGVkIGFmdGVyIGluc2VydGlvblxuZnVuY3Rpb24gbG93ZXJCb3VuZChhcnJheSwgdmFsdWUsIGNvbXBhcmF0b3IpIHtcbiAgICBsZXQgZmlyc3QgPSAwO1xuICAgIGxldCBjb3VudCA9IGFycmF5Lmxlbmd0aDtcbiAgICB3aGlsZSAoY291bnQgPiAwKSB7XG4gICAgICAgIGNvbnN0IHN0ZXAgPSAoY291bnQgLyAyKSB8IDA7XG4gICAgICAgIGxldCBpdCA9IGZpcnN0ICsgc3RlcDtcbiAgICAgICAgaWYgKGNvbXBhcmF0b3IoYXJyYXlbaXRdLCB2YWx1ZSkgPD0gMCkge1xuICAgICAgICAgICAgZmlyc3QgPSArK2l0O1xuICAgICAgICAgICAgY291bnQgLT0gc3RlcCArIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb3VudCA9IHN0ZXA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpcnN0O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gbG93ZXJCb3VuZDtcbiIsImV4cG9ydCBmdW5jdGlvbiBpc0xhbmdDaGFpbk1lc3NhZ2UobWVzc2FnZSkge1xuICAgIHJldHVybiB0eXBlb2YgbWVzc2FnZT8uX2dldFR5cGUgPT09IFwiZnVuY3Rpb25cIjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0TGFuZ0NoYWluTWVzc2FnZVRvRXhhbXBsZShtZXNzYWdlKSB7XG4gICAgY29uc3QgY29udmVydGVkID0ge1xuICAgICAgICB0eXBlOiBtZXNzYWdlLl9nZXRUeXBlKCksXG4gICAgICAgIGRhdGE6IHsgY29udGVudDogbWVzc2FnZS5jb250ZW50IH0sXG4gICAgfTtcbiAgICAvLyBDaGVjayBmb3IgcHJlc2VuY2Ugb2Yga2V5cyBpbiBhZGRpdGlvbmFsX2t3YXJnc1xuICAgIGlmIChtZXNzYWdlPy5hZGRpdGlvbmFsX2t3YXJncyAmJlxuICAgICAgICBPYmplY3Qua2V5cyhtZXNzYWdlLmFkZGl0aW9uYWxfa3dhcmdzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnZlcnRlZC5kYXRhLmFkZGl0aW9uYWxfa3dhcmdzID0geyAuLi5tZXNzYWdlLmFkZGl0aW9uYWxfa3dhcmdzIH07XG4gICAgfVxuICAgIHJldHVybiBjb252ZXJ0ZWQ7XG59XG4iLCJleHBvcnQgY29uc3QgaXNCcm93c2VyID0gKCkgPT4gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93LmRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiO1xuZXhwb3J0IGNvbnN0IGlzV2ViV29ya2VyID0gKCkgPT4gdHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIgJiZcbiAgICBnbG9iYWxUaGlzLmNvbnN0cnVjdG9yICYmXG4gICAgZ2xvYmFsVGhpcy5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIkRlZGljYXRlZFdvcmtlckdsb2JhbFNjb3BlXCI7XG5leHBvcnQgY29uc3QgaXNKc0RvbSA9ICgpID0+ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5uYW1lID09PSBcIm5vZGVqc1wiKSB8fFxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIChuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwiTm9kZS5qc1wiKSB8fFxuICAgICAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcImpzZG9tXCIpKSk7XG4vLyBTdXBhYmFzZSBFZGdlIEZ1bmN0aW9uIHByb3ZpZGVzIGEgYERlbm9gIGdsb2JhbCBvYmplY3Rcbi8vIHdpdGhvdXQgYHZlcnNpb25gIHByb3BlcnR5XG5leHBvcnQgY29uc3QgaXNEZW5vID0gKCkgPT4gdHlwZW9mIERlbm8gIT09IFwidW5kZWZpbmVkXCI7XG4vLyBNYXJrIG5vdC1hcy1ub2RlIGlmIGluIFN1cGFiYXNlIEVkZ2UgRnVuY3Rpb25cbmV4cG9ydCBjb25zdCBpc05vZGUgPSAoKSA9PiB0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgIHR5cGVvZiBwcm9jZXNzLnZlcnNpb25zICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgdHlwZW9mIHByb2Nlc3MudmVyc2lvbnMubm9kZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICFpc0Rlbm8oKTtcbmV4cG9ydCBjb25zdCBnZXRFbnYgPSAoKSA9PiB7XG4gICAgbGV0IGVudjtcbiAgICBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgICAgZW52ID0gXCJicm93c2VyXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzTm9kZSgpKSB7XG4gICAgICAgIGVudiA9IFwibm9kZVwiO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1dlYldvcmtlcigpKSB7XG4gICAgICAgIGVudiA9IFwid2Vid29ya2VyXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzSnNEb20oKSkge1xuICAgICAgICBlbnYgPSBcImpzZG9tXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRGVubygpKSB7XG4gICAgICAgIGVudiA9IFwiZGVub1wiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZW52ID0gXCJvdGhlclwiO1xuICAgIH1cbiAgICByZXR1cm4gZW52O1xufTtcbmxldCBydW50aW1lRW52aXJvbm1lbnQ7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UnVudGltZUVudmlyb25tZW50KCkge1xuICAgIGlmIChydW50aW1lRW52aXJvbm1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBlbnYgPSBnZXRFbnYoKTtcbiAgICAgICAgY29uc3QgcmVsZWFzZUVudiA9IGdldFNoYXMoKTtcbiAgICAgICAgcnVudGltZUVudmlyb25tZW50ID0ge1xuICAgICAgICAgICAgbGlicmFyeTogXCJsYW5nc21pdGhcIixcbiAgICAgICAgICAgIHJ1bnRpbWU6IGVudixcbiAgICAgICAgICAgIC4uLnJlbGVhc2VFbnYsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBydW50aW1lRW52aXJvbm1lbnQ7XG59XG4vKipcbiAqIFJldHJpZXZlcyB0aGUgTGFuZ0NoYWluLXNwZWNpZmljIGVudmlyb25tZW50IHZhcmlhYmxlcyBmcm9tIHRoZSBjdXJyZW50IHJ1bnRpbWUgZW52aXJvbm1lbnQuXG4gKiBTZW5zaXRpdmUga2V5cyAoY29udGFpbmluZyB0aGUgd29yZCBcImtleVwiKSBoYXZlIHRoZWlyIHZhbHVlcyByZWRhY3RlZCBmb3Igc2VjdXJpdHkuXG4gKlxuICogQHJldHVybnMge1JlY29yZDxzdHJpbmcsIHN0cmluZz59XG4gKiAgLSBBIHJlY29yZCBvZiBMYW5nQ2hhaW4tc3BlY2lmaWMgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGFuZ0NoYWluRW52VmFycygpIHtcbiAgICBjb25zdCBhbGxFbnZWYXJzID0gZ2V0RW52aXJvbm1lbnRWYXJpYWJsZXMoKSB8fCB7fTtcbiAgICBjb25zdCBlbnZWYXJzID0ge307XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoYWxsRW52VmFycykpIHtcbiAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKFwiTEFOR0NIQUlOX1wiKSAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGVudlZhcnNba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIGVudlZhcnMpIHtcbiAgICAgICAgaWYgKGtleS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwia2V5XCIpICYmIHR5cGVvZiBlbnZWYXJzW2tleV0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZW52VmFyc1trZXldO1xuICAgICAgICAgICAgZW52VmFyc1trZXldID1cbiAgICAgICAgICAgICAgICB2YWx1ZS5zbGljZSgwLCAyKSArIFwiKlwiLnJlcGVhdCh2YWx1ZS5sZW5ndGggLSA0KSArIHZhbHVlLnNsaWNlKC0yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZW52VmFycztcbn1cbi8qKlxuICogUmV0cmlldmVzIHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgZnJvbSB0aGUgY3VycmVudCBydW50aW1lIGVudmlyb25tZW50LlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaXMgZGVzaWduZWQgdG8gb3BlcmF0ZSBpbiBhIHZhcmlldHkgb2YgSlMgZW52aXJvbm1lbnRzLFxuICogaW5jbHVkaW5nIE5vZGUuanMsIERlbm8sIGJyb3dzZXJzLCBldGMuXG4gKlxuICogQHJldHVybnMge1JlY29yZDxzdHJpbmcsIHN0cmluZz4gfCB1bmRlZmluZWR9XG4gKiAgLSBBIHJlY29yZCBvZiBlbnZpcm9ubWVudCB2YXJpYWJsZXMgaWYgYXZhaWxhYmxlLlxuICogIC0gYHVuZGVmaW5lZGAgaWYgdGhlIGVudmlyb25tZW50IGRvZXMgbm90IHN1cHBvcnQgb3IgYWxsb3dzIGFjY2VzcyB0byBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnZpcm9ubWVudFZhcmlhYmxlcygpIHtcbiAgICB0cnkge1xuICAgICAgICAvLyBDaGVjayBmb3IgTm9kZS5qcyBlbnZpcm9ubWVudFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvY2Vzcy1lbnZcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52KSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvY2Vzcy1lbnZcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKHByb2Nlc3MuZW52KS5yZWR1Y2UoKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgICAgYWNjW2tleV0gPSBTdHJpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRm9yIGJyb3dzZXJzIGFuZCBvdGhlciBlbnZpcm9ubWVudHMsIHdlIG1heSBub3QgaGF2ZSBkaXJlY3QgYWNjZXNzIHRvIGVudiB2YXJpYWJsZXNcbiAgICAgICAgLy8gUmV0dXJuIHVuZGVmaW5lZCBvciBhbnkgb3RoZXIgZmFsbGJhY2sgYXMgcmVxdWlyZWQuXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vIENhdGNoIGFueSBlcnJvcnMgdGhhdCBtaWdodCBvY2N1ciB3aGlsZSB0cnlpbmcgdG8gYWNjZXNzIGVudmlyb25tZW50IHZhcmlhYmxlc1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnZpcm9ubWVudFZhcmlhYmxlKG5hbWUpIHtcbiAgICAvLyBDZXJ0YWluIERlbm8gc2V0dXBzIHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgeW91IHRyeSB0byBhY2Nlc3MgZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2h3Y2hhc2UxNy9sYW5nY2hhaW5qcy9pc3N1ZXMvMTQxMlxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICAgPyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvY2Vzcy1lbnZcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmVudj8uW25hbWVdXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc2V0RW52aXJvbm1lbnRWYXJpYWJsZShuYW1lLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvY2Vzcy1lbnZcbiAgICAgICAgcHJvY2Vzcy5lbnZbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG59XG5sZXQgY2FjaGVkQ29tbWl0U0hBcztcbi8qKlxuICogR2V0IHRoZSBHaXQgY29tbWl0IFNIQSBmcm9tIGNvbW1vbiBlbnZpcm9ubWVudCB2YXJpYWJsZXNcbiAqIHVzZWQgYnkgZGlmZmVyZW50IENJL0NEIHBsYXRmb3Jtcy5cbiAqIEByZXR1cm5zIHtzdHJpbmcgfCB1bmRlZmluZWR9IFRoZSBHaXQgY29tbWl0IFNIQSBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hhcygpIHtcbiAgICBpZiAoY2FjaGVkQ29tbWl0U0hBcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBjYWNoZWRDb21taXRTSEFzO1xuICAgIH1cbiAgICBjb25zdCBjb21tb25fcmVsZWFzZV9lbnZzID0gW1xuICAgICAgICBcIlZFUkNFTF9HSVRfQ09NTUlUX1NIQVwiLFxuICAgICAgICBcIk5FWFRfUFVCTElDX1ZFUkNFTF9HSVRfQ09NTUlUX1NIQVwiLFxuICAgICAgICBcIkNPTU1JVF9SRUZcIixcbiAgICAgICAgXCJSRU5ERVJfR0lUX0NPTU1JVFwiLFxuICAgICAgICBcIkNJX0NPTU1JVF9TSEFcIixcbiAgICAgICAgXCJDSVJDTEVfU0hBMVwiLFxuICAgICAgICBcIkNGX1BBR0VTX0NPTU1JVF9TSEFcIixcbiAgICAgICAgXCJSRUFDVF9BUFBfR0lUX1NIQVwiLFxuICAgICAgICBcIlNPVVJDRV9WRVJTSU9OXCIsXG4gICAgICAgIFwiR0lUSFVCX1NIQVwiLFxuICAgICAgICBcIlRSQVZJU19DT01NSVRcIixcbiAgICAgICAgXCJHSVRfQ09NTUlUXCIsXG4gICAgICAgIFwiQlVJTERfVkNTX05VTUJFUlwiLFxuICAgICAgICBcImJhbWJvb19wbGFuUmVwb3NpdG9yeV9yZXZpc2lvblwiLFxuICAgICAgICBcIkJ1aWxkLlNvdXJjZVZlcnNpb25cIixcbiAgICAgICAgXCJCSVRCVUNLRVRfQ09NTUlUXCIsXG4gICAgICAgIFwiRFJPTkVfQ09NTUlUX1NIQVwiLFxuICAgICAgICBcIlNFTUFQSE9SRV9HSVRfU0hBXCIsXG4gICAgICAgIFwiQlVJTERLSVRFX0NPTU1JVFwiLFxuICAgIF07XG4gICAgY29uc3Qgc2hhcyA9IHt9O1xuICAgIGZvciAoY29uc3QgZW52IG9mIGNvbW1vbl9yZWxlYXNlX2VudnMpIHtcbiAgICAgICAgY29uc3QgZW52VmFyID0gZ2V0RW52aXJvbm1lbnRWYXJpYWJsZShlbnYpO1xuICAgICAgICBpZiAoZW52VmFyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNoYXNbZW52XSA9IGVudlZhcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYWNoZWRDb21taXRTSEFzID0gc2hhcztcbiAgICByZXR1cm4gc2hhcztcbn1cbiIsImltcG9ydCAqIGFzIHV1aWQgZnJvbSBcInV1aWRcIjtcbmltcG9ydCB7IGdldEVudmlyb25tZW50VmFyaWFibGUsIGdldFJ1bnRpbWVFbnZpcm9ubWVudCB9IGZyb20gXCIuL3V0aWxzL2Vudi5qc1wiO1xuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4vY2xpZW50LmpzXCI7XG5jb25zdCB3YXJuZWRNZXNzYWdlcyA9IHt9O1xuZnVuY3Rpb24gd2Fybk9uY2UobWVzc2FnZSkge1xuICAgIGlmICghd2FybmVkTWVzc2FnZXNbbWVzc2FnZV0pIHtcbiAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgICAgICB3YXJuZWRNZXNzYWdlc1ttZXNzYWdlXSA9IHRydWU7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFJ1blRyZWUge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJpZFwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJuYW1lXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInJ1bl90eXBlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInByb2plY3RfbmFtZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJwYXJlbnRfcnVuXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImNoaWxkX3J1bnNcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZXhlY3V0aW9uX29yZGVyXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImNoaWxkX2V4ZWN1dGlvbl9vcmRlclwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJzdGFydF90aW1lXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImVuZF90aW1lXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImV4dHJhXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImVycm9yXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInNlcmlhbGl6ZWRcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiaW5wdXRzXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm91dHB1dHNcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwicmVmZXJlbmNlX2V4YW1wbGVfaWRcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiY2xpZW50XCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImV2ZW50c1wiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBkZWZhdWx0Q29uZmlnID0gUnVuVHJlZS5nZXREZWZhdWx0Q29uZmlnKCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgeyAuLi5kZWZhdWx0Q29uZmlnLCAuLi5jb25maWcgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXREZWZhdWx0Q29uZmlnKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHV1aWQudjQoKSxcbiAgICAgICAgICAgIHByb2plY3RfbmFtZTogZ2V0RW52aXJvbm1lbnRWYXJpYWJsZShcIkxBTkdDSEFJTl9QUk9KRUNUXCIpID8/XG4gICAgICAgICAgICAgICAgZ2V0RW52aXJvbm1lbnRWYXJpYWJsZShcIkxBTkdDSEFJTl9TRVNTSU9OXCIpID8/IC8vIFRPRE86IERlcHJlY2F0ZVxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgY2hpbGRfcnVuczogW10sXG4gICAgICAgICAgICBleGVjdXRpb25fb3JkZXI6IDEsXG4gICAgICAgICAgICBjaGlsZF9leGVjdXRpb25fb3JkZXI6IDEsXG4gICAgICAgICAgICBhcGlfdXJsOiBnZXRFbnZpcm9ubWVudFZhcmlhYmxlKFwiTEFOR0NIQUlOX0VORFBPSU5UXCIpID8/IFwiaHR0cDovL2xvY2FsaG9zdDoxOTg0XCIsXG4gICAgICAgICAgICBhcGlfa2V5OiBnZXRFbnZpcm9ubWVudFZhcmlhYmxlKFwiTEFOR0NIQUlOX0FQSV9LRVlcIiksXG4gICAgICAgICAgICBjYWxsZXJfb3B0aW9uczoge30sXG4gICAgICAgICAgICBzdGFydF90aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgc2VyaWFsaXplZDoge30sXG4gICAgICAgICAgICBpbnB1dHM6IHt9LFxuICAgICAgICAgICAgZXh0cmE6IHt9LFxuICAgICAgICAgICAgY2xpZW50OiBuZXcgQ2xpZW50KHt9KSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlQ2hpbGQoY29uZmlnKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gbmV3IFJ1blRyZWUoe1xuICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICAgICAgcGFyZW50X3J1bjogdGhpcyxcbiAgICAgICAgICAgIHByb2plY3RfbmFtZTogdGhpcy5wcm9qZWN0X25hbWUsXG4gICAgICAgICAgICBjbGllbnQ6IHRoaXMuY2xpZW50LFxuICAgICAgICAgICAgZXhlY3V0aW9uX29yZGVyOiB0aGlzLmNoaWxkX2V4ZWN1dGlvbl9vcmRlciArIDEsXG4gICAgICAgICAgICBjaGlsZF9leGVjdXRpb25fb3JkZXI6IHRoaXMuY2hpbGRfZXhlY3V0aW9uX29yZGVyICsgMSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2hpbGRfcnVucy5wdXNoKGNoaWxkKTtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH1cbiAgICBhc3luYyBlbmQob3V0cHV0cywgZXJyb3IsIGVuZFRpbWUgPSBEYXRlLm5vdygpKSB7XG4gICAgICAgIHRoaXMub3V0cHV0cyA9IG91dHB1dHM7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgdGhpcy5lbmRfdGltZSA9IGVuZFRpbWU7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudF9ydW4pIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50X3J1bi5jaGlsZF9leGVjdXRpb25fb3JkZXIgPSBNYXRoLm1heCh0aGlzLnBhcmVudF9ydW4uY2hpbGRfZXhlY3V0aW9uX29yZGVyLCB0aGlzLmNoaWxkX2V4ZWN1dGlvbl9vcmRlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgX2NvbnZlcnRUb0NyZWF0ZShydW4sIGV4Y2x1ZGVDaGlsZFJ1bnMgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHJ1bkV4dHJhID0gcnVuLmV4dHJhID8/IHt9O1xuICAgICAgICBpZiAoIXJ1bkV4dHJhLnJ1bnRpbWUpIHtcbiAgICAgICAgICAgIHJ1bkV4dHJhLnJ1bnRpbWUgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBydW50aW1lRW52ID0gYXdhaXQgZ2V0UnVudGltZUVudmlyb25tZW50KCk7XG4gICAgICAgIGZvciAoY29uc3QgW2ssIHZdIG9mIE9iamVjdC5lbnRyaWVzKHJ1bnRpbWVFbnYpKSB7XG4gICAgICAgICAgICBpZiAoIXJ1bkV4dHJhLnJ1bnRpbWVba10pIHtcbiAgICAgICAgICAgICAgICBydW5FeHRyYS5ydW50aW1lW2tdID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgY2hpbGRfcnVucztcbiAgICAgICAgbGV0IHBhcmVudF9ydW5faWQ7XG4gICAgICAgIGlmICghZXhjbHVkZUNoaWxkUnVucykge1xuICAgICAgICAgICAgY2hpbGRfcnVucyA9IGF3YWl0IFByb21pc2UuYWxsKHJ1bi5jaGlsZF9ydW5zLm1hcCgoY2hpbGRfcnVuKSA9PiB0aGlzLl9jb252ZXJ0VG9DcmVhdGUoY2hpbGRfcnVuLCBleGNsdWRlQ2hpbGRSdW5zKSkpO1xuICAgICAgICAgICAgcGFyZW50X3J1bl9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudF9ydW5faWQgPSBydW4ucGFyZW50X3J1bj8uaWQ7XG4gICAgICAgICAgICBjaGlsZF9ydW5zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGVyc2lzdGVkUnVuID0ge1xuICAgICAgICAgICAgaWQ6IHJ1bi5pZCxcbiAgICAgICAgICAgIG5hbWU6IHJ1bi5uYW1lLFxuICAgICAgICAgICAgc3RhcnRfdGltZTogcnVuLnN0YXJ0X3RpbWUsXG4gICAgICAgICAgICBlbmRfdGltZTogcnVuLmVuZF90aW1lLFxuICAgICAgICAgICAgcnVuX3R5cGU6IHJ1bi5ydW5fdHlwZSxcbiAgICAgICAgICAgIHJlZmVyZW5jZV9leGFtcGxlX2lkOiBydW4ucmVmZXJlbmNlX2V4YW1wbGVfaWQsXG4gICAgICAgICAgICBleHRyYTogcnVuRXh0cmEsXG4gICAgICAgICAgICBleGVjdXRpb25fb3JkZXI6IHJ1bi5leGVjdXRpb25fb3JkZXIsXG4gICAgICAgICAgICBzZXJpYWxpemVkOiBydW4uc2VyaWFsaXplZCxcbiAgICAgICAgICAgIGVycm9yOiBydW4uZXJyb3IsXG4gICAgICAgICAgICBpbnB1dHM6IHJ1bi5pbnB1dHMsXG4gICAgICAgICAgICBvdXRwdXRzOiBydW4ub3V0cHV0cyxcbiAgICAgICAgICAgIHNlc3Npb25fbmFtZTogcnVuLnByb2plY3RfbmFtZSxcbiAgICAgICAgICAgIGNoaWxkX3J1bnM6IGNoaWxkX3J1bnMsXG4gICAgICAgICAgICBwYXJlbnRfcnVuX2lkOiBwYXJlbnRfcnVuX2lkLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcGVyc2lzdGVkUnVuO1xuICAgIH1cbiAgICBhc3luYyBwb3N0UnVuKGV4Y2x1ZGVDaGlsZFJ1bnMgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHJ1bkNyZWF0ZSA9IGF3YWl0IHRoaXMuX2NvbnZlcnRUb0NyZWF0ZSh0aGlzLCB0cnVlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5jbGllbnQuY3JlYXRlUnVuKHJ1bkNyZWF0ZSk7XG4gICAgICAgIGlmICghZXhjbHVkZUNoaWxkUnVucykge1xuICAgICAgICAgICAgd2Fybk9uY2UoXCJQb3N0aW5nIHdpdGggZXhjbHVkZUNoaWxkUnVucz1mYWxzZSBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvbi5cIik7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkUnVuIG9mIHRoaXMuY2hpbGRfcnVucykge1xuICAgICAgICAgICAgICAgIGF3YWl0IGNoaWxkUnVuLnBvc3RSdW4oZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIHBhdGNoUnVuKCkge1xuICAgICAgICBjb25zdCBydW5VcGRhdGUgPSB7XG4gICAgICAgICAgICBlbmRfdGltZTogdGhpcy5lbmRfdGltZSxcbiAgICAgICAgICAgIGVycm9yOiB0aGlzLmVycm9yLFxuICAgICAgICAgICAgb3V0cHV0czogdGhpcy5vdXRwdXRzLFxuICAgICAgICAgICAgcGFyZW50X3J1bl9pZDogdGhpcy5wYXJlbnRfcnVuPy5pZCxcbiAgICAgICAgICAgIHJlZmVyZW5jZV9leGFtcGxlX2lkOiB0aGlzLnJlZmVyZW5jZV9leGFtcGxlX2lkLFxuICAgICAgICAgICAgZXh0cmE6IHRoaXMuZXh0cmEsXG4gICAgICAgICAgICBldmVudHM6IHRoaXMuZXZlbnRzLFxuICAgICAgICB9O1xuICAgICAgICBhd2FpdCB0aGlzLmNsaWVudC51cGRhdGVSdW4odGhpcy5pZCwgcnVuVXBkYXRlKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY29uc3QgaXNCcm93c2VyID0gKCkgPT4gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93LmRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiO1xuZXhwb3J0IGNvbnN0IGlzV2ViV29ya2VyID0gKCkgPT4gdHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIgJiZcbiAgICBnbG9iYWxUaGlzLmNvbnN0cnVjdG9yICYmXG4gICAgZ2xvYmFsVGhpcy5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIkRlZGljYXRlZFdvcmtlckdsb2JhbFNjb3BlXCI7XG5leHBvcnQgY29uc3QgaXNKc0RvbSA9ICgpID0+ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5uYW1lID09PSBcIm5vZGVqc1wiKSB8fFxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIChuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwiTm9kZS5qc1wiKSB8fFxuICAgICAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcImpzZG9tXCIpKSk7XG4vLyBTdXBhYmFzZSBFZGdlIEZ1bmN0aW9uIHByb3ZpZGVzIGEgYERlbm9gIGdsb2JhbCBvYmplY3Rcbi8vIHdpdGhvdXQgYHZlcnNpb25gIHByb3BlcnR5XG5leHBvcnQgY29uc3QgaXNEZW5vID0gKCkgPT4gdHlwZW9mIERlbm8gIT09IFwidW5kZWZpbmVkXCI7XG4vLyBNYXJrIG5vdC1hcy1ub2RlIGlmIGluIFN1cGFiYXNlIEVkZ2UgRnVuY3Rpb25cbmV4cG9ydCBjb25zdCBpc05vZGUgPSAoKSA9PiB0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgIHR5cGVvZiBwcm9jZXNzLnZlcnNpb25zICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgdHlwZW9mIHByb2Nlc3MudmVyc2lvbnMubm9kZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICFpc0Rlbm8oKTtcbmV4cG9ydCBjb25zdCBnZXRFbnYgPSAoKSA9PiB7XG4gICAgbGV0IGVudjtcbiAgICBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgICAgZW52ID0gXCJicm93c2VyXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzTm9kZSgpKSB7XG4gICAgICAgIGVudiA9IFwibm9kZVwiO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1dlYldvcmtlcigpKSB7XG4gICAgICAgIGVudiA9IFwid2Vid29ya2VyXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzSnNEb20oKSkge1xuICAgICAgICBlbnYgPSBcImpzZG9tXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRGVubygpKSB7XG4gICAgICAgIGVudiA9IFwiZGVub1wiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZW52ID0gXCJvdGhlclwiO1xuICAgIH1cbiAgICByZXR1cm4gZW52O1xufTtcbmxldCBydW50aW1lRW52aXJvbm1lbnQ7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UnVudGltZUVudmlyb25tZW50KCkge1xuICAgIGlmIChydW50aW1lRW52aXJvbm1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBlbnYgPSBnZXRFbnYoKTtcbiAgICAgICAgcnVudGltZUVudmlyb25tZW50ID0ge1xuICAgICAgICAgICAgbGlicmFyeTogXCJsYW5nY2hhaW4tanNcIixcbiAgICAgICAgICAgIHJ1bnRpbWU6IGVudixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJ1bnRpbWVFbnZpcm9ubWVudDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnZpcm9ubWVudFZhcmlhYmxlKG5hbWUpIHtcbiAgICAvLyBDZXJ0YWluIERlbm8gc2V0dXBzIHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgeW91IHRyeSB0byBhY2Nlc3MgZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2h3Y2hhc2UxNy9sYW5nY2hhaW5qcy9pc3N1ZXMvMTQxMlxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICAgPyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvY2Vzcy1lbnZcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmVudj8uW25hbWVdXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBnZXRCdWZmZXJTdHJpbmcgfSBmcm9tIFwiLi4vLi4vbWVtb3J5L2Jhc2UuanNcIjtcbmltcG9ydCB7IGdldEVudmlyb25tZW50VmFyaWFibGUgfSBmcm9tIFwiLi4vLi4vdXRpbC9lbnYuanNcIjtcbmltcG9ydCB7IEJhc2VUcmFjZXIgfSBmcm9tIFwiLi90cmFjZXIuanNcIjtcbmV4cG9ydCBjbGFzcyBMYW5nQ2hhaW5UcmFjZXJWMSBleHRlbmRzIEJhc2VUcmFjZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJuYW1lXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBcImxhbmdjaGFpbl90cmFjZXJcIlxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZW5kcG9pbnRcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGdldEVudmlyb25tZW50VmFyaWFibGUoXCJMQU5HQ0hBSU5fRU5EUE9JTlRcIikgfHwgXCJodHRwOi8vbG9jYWxob3N0OjE5ODRcIlxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiaGVhZGVyc1wiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwic2Vzc2lvblwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBhcGlLZXkgPSBnZXRFbnZpcm9ubWVudFZhcmlhYmxlKFwiTEFOR0NIQUlOX0FQSV9LRVlcIik7XG4gICAgICAgIGlmIChhcGlLZXkpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyc1tcIngtYXBpLWtleVwiXSA9IGFwaUtleTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBuZXdTZXNzaW9uKHNlc3Npb25OYW1lKSB7XG4gICAgICAgIGNvbnN0IHNlc3Npb25DcmVhdGUgPSB7XG4gICAgICAgICAgICBzdGFydF90aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgbmFtZTogc2Vzc2lvbk5hbWUsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCB0aGlzLnBlcnNpc3RTZXNzaW9uKHNlc3Npb25DcmVhdGUpO1xuICAgICAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xuICAgICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9XG4gICAgYXN5bmMgbG9hZFNlc3Npb24oc2Vzc2lvbk5hbWUpIHtcbiAgICAgICAgY29uc3QgZW5kcG9pbnQgPSBgJHt0aGlzLmVuZHBvaW50fS9zZXNzaW9ucz9uYW1lPSR7c2Vzc2lvbk5hbWV9YDtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZVNlc3Npb25SZXNwb25zZShlbmRwb2ludCk7XG4gICAgfVxuICAgIGFzeW5jIGxvYWREZWZhdWx0U2Vzc2lvbigpIHtcbiAgICAgICAgY29uc3QgZW5kcG9pbnQgPSBgJHt0aGlzLmVuZHBvaW50fS9zZXNzaW9ucz9uYW1lPWRlZmF1bHRgO1xuICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlU2Vzc2lvblJlc3BvbnNlKGVuZHBvaW50KTtcbiAgICB9XG4gICAgYXN5bmMgY29udmVydFYyUnVuVG9SdW4ocnVuKSB7XG4gICAgICAgIGNvbnN0IHNlc3Npb24gPSB0aGlzLnNlc3Npb24gPz8gKGF3YWl0IHRoaXMubG9hZERlZmF1bHRTZXNzaW9uKCkpO1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkID0gcnVuLnNlcmlhbGl6ZWQ7XG4gICAgICAgIGxldCBydW5SZXN1bHQ7XG4gICAgICAgIGlmIChydW4ucnVuX3R5cGUgPT09IFwibGxtXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb21wdHMgPSBydW4uaW5wdXRzLnByb21wdHNcbiAgICAgICAgICAgICAgICA/IHJ1bi5pbnB1dHMucHJvbXB0c1xuICAgICAgICAgICAgICAgIDogcnVuLmlucHV0cy5tZXNzYWdlcy5tYXAoKHgpID0+IGdldEJ1ZmZlclN0cmluZyh4KSk7XG4gICAgICAgICAgICBjb25zdCBsbG1SdW4gPSB7XG4gICAgICAgICAgICAgICAgdXVpZDogcnVuLmlkLFxuICAgICAgICAgICAgICAgIHN0YXJ0X3RpbWU6IHJ1bi5zdGFydF90aW1lLFxuICAgICAgICAgICAgICAgIGVuZF90aW1lOiBydW4uZW5kX3RpbWUsXG4gICAgICAgICAgICAgICAgZXhlY3V0aW9uX29yZGVyOiBydW4uZXhlY3V0aW9uX29yZGVyLFxuICAgICAgICAgICAgICAgIGNoaWxkX2V4ZWN1dGlvbl9vcmRlcjogcnVuLmNoaWxkX2V4ZWN1dGlvbl9vcmRlcixcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVkLFxuICAgICAgICAgICAgICAgIHR5cGU6IHJ1bi5ydW5fdHlwZSxcbiAgICAgICAgICAgICAgICBzZXNzaW9uX2lkOiBzZXNzaW9uLmlkLFxuICAgICAgICAgICAgICAgIHByb21wdHMsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJ1bi5vdXRwdXRzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJ1blJlc3VsdCA9IGxsbVJ1bjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChydW4ucnVuX3R5cGUgPT09IFwiY2hhaW5cIikge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRfcnVucyA9IGF3YWl0IFByb21pc2UuYWxsKHJ1bi5jaGlsZF9ydW5zLm1hcCgoY2hpbGRfcnVuKSA9PiB0aGlzLmNvbnZlcnRWMlJ1blRvUnVuKGNoaWxkX3J1bikpKTtcbiAgICAgICAgICAgIGNvbnN0IGNoYWluUnVuID0ge1xuICAgICAgICAgICAgICAgIHV1aWQ6IHJ1bi5pZCxcbiAgICAgICAgICAgICAgICBzdGFydF90aW1lOiBydW4uc3RhcnRfdGltZSxcbiAgICAgICAgICAgICAgICBlbmRfdGltZTogcnVuLmVuZF90aW1lLFxuICAgICAgICAgICAgICAgIGV4ZWN1dGlvbl9vcmRlcjogcnVuLmV4ZWN1dGlvbl9vcmRlcixcbiAgICAgICAgICAgICAgICBjaGlsZF9leGVjdXRpb25fb3JkZXI6IHJ1bi5jaGlsZF9leGVjdXRpb25fb3JkZXIsXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplZCxcbiAgICAgICAgICAgICAgICB0eXBlOiBydW4ucnVuX3R5cGUsXG4gICAgICAgICAgICAgICAgc2Vzc2lvbl9pZDogc2Vzc2lvbi5pZCxcbiAgICAgICAgICAgICAgICBpbnB1dHM6IHJ1bi5pbnB1dHMsXG4gICAgICAgICAgICAgICAgb3V0cHV0czogcnVuLm91dHB1dHMsXG4gICAgICAgICAgICAgICAgY2hpbGRfbGxtX3J1bnM6IGNoaWxkX3J1bnMuZmlsdGVyKChjaGlsZF9ydW4pID0+IGNoaWxkX3J1bi50eXBlID09PSBcImxsbVwiKSxcbiAgICAgICAgICAgICAgICBjaGlsZF9jaGFpbl9ydW5zOiBjaGlsZF9ydW5zLmZpbHRlcigoY2hpbGRfcnVuKSA9PiBjaGlsZF9ydW4udHlwZSA9PT0gXCJjaGFpblwiKSxcbiAgICAgICAgICAgICAgICBjaGlsZF90b29sX3J1bnM6IGNoaWxkX3J1bnMuZmlsdGVyKChjaGlsZF9ydW4pID0+IGNoaWxkX3J1bi50eXBlID09PSBcInRvb2xcIiksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcnVuUmVzdWx0ID0gY2hhaW5SdW47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocnVuLnJ1bl90eXBlID09PSBcInRvb2xcIikge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRfcnVucyA9IGF3YWl0IFByb21pc2UuYWxsKHJ1bi5jaGlsZF9ydW5zLm1hcCgoY2hpbGRfcnVuKSA9PiB0aGlzLmNvbnZlcnRWMlJ1blRvUnVuKGNoaWxkX3J1bikpKTtcbiAgICAgICAgICAgIGNvbnN0IHRvb2xSdW4gPSB7XG4gICAgICAgICAgICAgICAgdXVpZDogcnVuLmlkLFxuICAgICAgICAgICAgICAgIHN0YXJ0X3RpbWU6IHJ1bi5zdGFydF90aW1lLFxuICAgICAgICAgICAgICAgIGVuZF90aW1lOiBydW4uZW5kX3RpbWUsXG4gICAgICAgICAgICAgICAgZXhlY3V0aW9uX29yZGVyOiBydW4uZXhlY3V0aW9uX29yZGVyLFxuICAgICAgICAgICAgICAgIGNoaWxkX2V4ZWN1dGlvbl9vcmRlcjogcnVuLmNoaWxkX2V4ZWN1dGlvbl9vcmRlcixcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVkLFxuICAgICAgICAgICAgICAgIHR5cGU6IHJ1bi5ydW5fdHlwZSxcbiAgICAgICAgICAgICAgICBzZXNzaW9uX2lkOiBzZXNzaW9uLmlkLFxuICAgICAgICAgICAgICAgIHRvb2xfaW5wdXQ6IHJ1bi5pbnB1dHMuaW5wdXQsXG4gICAgICAgICAgICAgICAgb3V0cHV0OiBydW4ub3V0cHV0cz8ub3V0cHV0LFxuICAgICAgICAgICAgICAgIGFjdGlvbjogSlNPTi5zdHJpbmdpZnkoc2VyaWFsaXplZCksXG4gICAgICAgICAgICAgICAgY2hpbGRfbGxtX3J1bnM6IGNoaWxkX3J1bnMuZmlsdGVyKChjaGlsZF9ydW4pID0+IGNoaWxkX3J1bi50eXBlID09PSBcImxsbVwiKSxcbiAgICAgICAgICAgICAgICBjaGlsZF9jaGFpbl9ydW5zOiBjaGlsZF9ydW5zLmZpbHRlcigoY2hpbGRfcnVuKSA9PiBjaGlsZF9ydW4udHlwZSA9PT0gXCJjaGFpblwiKSxcbiAgICAgICAgICAgICAgICBjaGlsZF90b29sX3J1bnM6IGNoaWxkX3J1bnMuZmlsdGVyKChjaGlsZF9ydW4pID0+IGNoaWxkX3J1bi50eXBlID09PSBcInRvb2xcIiksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcnVuUmVzdWx0ID0gdG9vbFJ1bjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBydW4gdHlwZTogJHtydW4ucnVuX3R5cGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJ1blJlc3VsdDtcbiAgICB9XG4gICAgYXN5bmMgcGVyc2lzdFJ1bihydW4pIHtcbiAgICAgICAgbGV0IGVuZHBvaW50O1xuICAgICAgICBsZXQgdjFSdW47XG4gICAgICAgIGlmIChydW4ucnVuX3R5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdjFSdW4gPSBhd2FpdCB0aGlzLmNvbnZlcnRWMlJ1blRvUnVuKHJ1bik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2MVJ1biA9IHJ1bjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodjFSdW4udHlwZSA9PT0gXCJsbG1cIikge1xuICAgICAgICAgICAgZW5kcG9pbnQgPSBgJHt0aGlzLmVuZHBvaW50fS9sbG0tcnVuc2A7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodjFSdW4udHlwZSA9PT0gXCJjaGFpblwiKSB7XG4gICAgICAgICAgICBlbmRwb2ludCA9IGAke3RoaXMuZW5kcG9pbnR9L2NoYWluLXJ1bnNgO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW5kcG9pbnQgPSBgJHt0aGlzLmVuZHBvaW50fS90b29sLXJ1bnNgO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZW5kcG9pbnQsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh2MVJ1biksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gcGVyc2lzdCBydW46ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgcGVyc2lzdFNlc3Npb24oc2Vzc2lvbkNyZWF0ZSkge1xuICAgICAgICBjb25zdCBlbmRwb2ludCA9IGAke3RoaXMuZW5kcG9pbnR9L3Nlc3Npb25zYDtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChlbmRwb2ludCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNlc3Npb25DcmVhdGUpLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHBlcnNpc3Qgc2Vzc2lvbjogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH0sIHVzaW5nIGRlZmF1bHQgc2Vzc2lvbi5gKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICAgICAgLi4uc2Vzc2lvbkNyZWF0ZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiAoYXdhaXQgcmVzcG9uc2UuanNvbigpKS5pZCxcbiAgICAgICAgICAgIC4uLnNlc3Npb25DcmVhdGUsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGFzeW5jIF9oYW5kbGVTZXNzaW9uUmVzcG9uc2UoZW5kcG9pbnQpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChlbmRwb2ludCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHRyYWNlclNlc3Npb247XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBsb2FkIHNlc3Npb246ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgICAgICB0cmFjZXJTZXNzaW9uID0ge1xuICAgICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICAgIHN0YXJ0X3RpbWU6IERhdGUubm93KCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uID0gdHJhY2VyU2Vzc2lvbjtcbiAgICAgICAgICAgIHJldHVybiB0cmFjZXJTZXNzaW9uO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3AgPSAoYXdhaXQgcmVzcG9uc2UuanNvbigpKTtcbiAgICAgICAgaWYgKHJlc3AubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0cmFjZXJTZXNzaW9uID0ge1xuICAgICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICAgIHN0YXJ0X3RpbWU6IERhdGUubm93KCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uID0gdHJhY2VyU2Vzc2lvbjtcbiAgICAgICAgICAgIHJldHVybiB0cmFjZXJTZXNzaW9uO1xuICAgICAgICB9XG4gICAgICAgIFt0cmFjZXJTZXNzaW9uXSA9IHJlc3A7XG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IHRyYWNlclNlc3Npb247XG4gICAgICAgIHJldHVybiB0cmFjZXJTZXNzaW9uO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQWJzdHJhY3QgYmFzZSBjbGFzcyBmb3IgbWVtb3J5IGluIExhbmdDaGFpbidzIENoYWlucy4gTWVtb3J5IHJlZmVycyB0b1xuICogdGhlIHN0YXRlIGluIENoYWlucy4gSXQgY2FuIGJlIHVzZWQgdG8gc3RvcmUgaW5mb3JtYXRpb24gYWJvdXQgcGFzdFxuICogZXhlY3V0aW9ucyBvZiBhIENoYWluIGFuZCBpbmplY3QgdGhhdCBpbmZvcm1hdGlvbiBpbnRvIHRoZSBpbnB1dHMgb2ZcbiAqIGZ1dHVyZSBleGVjdXRpb25zIG9mIHRoZSBDaGFpbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEJhc2VNZW1vcnkge1xufVxuY29uc3QgZ2V0VmFsdWUgPSAodmFsdWVzLCBrZXkpID0+IHtcbiAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlc1trZXldO1xuICAgIH1cbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWVzKTtcbiAgICBpZiAoa2V5cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlc1trZXlzWzBdXTtcbiAgICB9XG59O1xuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgYnkgbWVtb3J5IGNsYXNzZXMgdG8gc2VsZWN0IHRoZSBpbnB1dCB2YWx1ZVxuICogdG8gdXNlIGZvciB0aGUgbWVtb3J5LiBJZiB0aGVyZSBpcyBvbmx5IG9uZSBpbnB1dCB2YWx1ZSwgaXQgaXMgdXNlZC5cbiAqIElmIHRoZXJlIGFyZSBtdWx0aXBsZSBpbnB1dCB2YWx1ZXMsIHRoZSBpbnB1dEtleSBtdXN0IGJlIHNwZWNpZmllZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldElucHV0VmFsdWUgPSAoaW5wdXRWYWx1ZXMsIGlucHV0S2V5KSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZShpbnB1dFZhbHVlcywgaW5wdXRLZXkpO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGlucHV0VmFsdWVzKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnB1dCB2YWx1ZXMgaGF2ZSAke2tleXMubGVuZ3RofSBrZXlzLCB5b3UgbXVzdCBzcGVjaWZ5IGFuIGlucHV0IGtleSBvciBwYXNzIG9ubHkgMSBrZXkgYXMgaW5wdXRgKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIGJ5IG1lbW9yeSBjbGFzc2VzIHRvIHNlbGVjdCB0aGUgb3V0cHV0IHZhbHVlXG4gKiB0byB1c2UgZm9yIHRoZSBtZW1vcnkuIElmIHRoZXJlIGlzIG9ubHkgb25lIG91dHB1dCB2YWx1ZSwgaXQgaXMgdXNlZC5cbiAqIElmIHRoZXJlIGFyZSBtdWx0aXBsZSBvdXRwdXQgdmFsdWVzLCB0aGUgb3V0cHV0S2V5IG11c3QgYmUgc3BlY2lmaWVkLlxuICogSWYgbm8gb3V0cHV0S2V5IGlzIHNwZWNpZmllZCwgYW4gZXJyb3IgaXMgdGhyb3duLlxuICovXG5leHBvcnQgY29uc3QgZ2V0T3V0cHV0VmFsdWUgPSAob3V0cHV0VmFsdWVzLCBvdXRwdXRLZXkpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGdldFZhbHVlKG91dHB1dFZhbHVlcywgb3V0cHV0S2V5KTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvdXRwdXRWYWx1ZXMpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG91dHB1dCB2YWx1ZXMgaGF2ZSAke2tleXMubGVuZ3RofSBrZXlzLCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dCBrZXkgb3IgcGFzcyBvbmx5IDEga2V5IGFzIG91dHB1dGApO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgYnkgbWVtb3J5IGNsYXNzZXMgdG8gZ2V0IGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uXG4gKiBvZiB0aGUgY2hhdCBtZXNzYWdlIGhpc3RvcnksIGJhc2VkIG9uIHRoZSBtZXNzYWdlIGNvbnRlbnQgYW5kIHJvbGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCdWZmZXJTdHJpbmcobWVzc2FnZXMsIGh1bWFuUHJlZml4ID0gXCJIdW1hblwiLCBhaVByZWZpeCA9IFwiQUlcIikge1xuICAgIGNvbnN0IHN0cmluZ19tZXNzYWdlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgbSBvZiBtZXNzYWdlcykge1xuICAgICAgICBsZXQgcm9sZTtcbiAgICAgICAgaWYgKG0uX2dldFR5cGUoKSA9PT0gXCJodW1hblwiKSB7XG4gICAgICAgICAgICByb2xlID0gaHVtYW5QcmVmaXg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobS5fZ2V0VHlwZSgpID09PSBcImFpXCIpIHtcbiAgICAgICAgICAgIHJvbGUgPSBhaVByZWZpeDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtLl9nZXRUeXBlKCkgPT09IFwic3lzdGVtXCIpIHtcbiAgICAgICAgICAgIHJvbGUgPSBcIlN5c3RlbVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG0uX2dldFR5cGUoKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICByb2xlID0gXCJGdW5jdGlvblwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG0uX2dldFR5cGUoKSA9PT0gXCJnZW5lcmljXCIpIHtcbiAgICAgICAgICAgIHJvbGUgPSBtLnJvbGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEdvdCB1bnN1cHBvcnRlZCBtZXNzYWdlIHR5cGU6ICR7bX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuYW1lU3RyID0gbS5uYW1lID8gYCR7bS5uYW1lfSwgYCA6IFwiXCI7XG4gICAgICAgIHN0cmluZ19tZXNzYWdlcy5wdXNoKGAke3JvbGV9OiAke25hbWVTdHJ9JHttLmNvbnRlbnR9YCk7XG4gICAgfVxuICAgIHJldHVybiBzdHJpbmdfbWVzc2FnZXMuam9pbihcIlxcblwiKTtcbn1cbi8qKlxuICogRnVuY3Rpb24gdXNlZCBieSBtZW1vcnkgY2xhc3NlcyB0byBnZXQgdGhlIGtleSBvZiB0aGUgcHJvbXB0IGlucHV0LFxuICogZXhjbHVkaW5nIGFueSBrZXlzIHRoYXQgYXJlIG1lbW9yeSB2YXJpYWJsZXMgb3IgdGhlIFwic3RvcFwiIGtleS4gSWZcbiAqIHRoZXJlIGlzIG5vdCBleGFjdGx5IG9uZSBwcm9tcHQgaW5wdXQga2V5LCBhbiBlcnJvciBpcyB0aHJvd24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9tcHRJbnB1dEtleShpbnB1dHMsIG1lbW9yeVZhcmlhYmxlcykge1xuICAgIGNvbnN0IHByb21wdElucHV0S2V5cyA9IE9iamVjdC5rZXlzKGlucHV0cykuZmlsdGVyKChrZXkpID0+ICFtZW1vcnlWYXJpYWJsZXMuaW5jbHVkZXMoa2V5KSAmJiBrZXkgIT09IFwic3RvcFwiKTtcbiAgICBpZiAocHJvbXB0SW5wdXRLZXlzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE9uZSBpbnB1dCBrZXkgZXhwZWN0ZWQsIGJ1dCBnb3QgJHtwcm9tcHRJbnB1dEtleXMubGVuZ3RofWApO1xuICAgIH1cbiAgICByZXR1cm4gcHJvbXB0SW5wdXRLZXlzWzBdO1xufVxuIiwiaW1wb3J0IFBRdWV1ZU1vZCBmcm9tIFwicC1xdWV1ZVwiO1xubGV0IHF1ZXVlO1xuLyoqXG4gKiBDcmVhdGVzIGEgcXVldWUgdXNpbmcgdGhlIHAtcXVldWUgbGlicmFyeS4gVGhlIHF1ZXVlIGlzIGNvbmZpZ3VyZWQgdG9cbiAqIGF1dG8tc3RhcnQgYW5kIGhhcyBhIGNvbmN1cnJlbmN5IG9mIDEsIG1lYW5pbmcgaXQgd2lsbCBwcm9jZXNzIHRhc2tzXG4gKiBvbmUgYXQgYSB0aW1lLlxuICovXG5mdW5jdGlvbiBjcmVhdGVRdWV1ZSgpIHtcbiAgICBjb25zdCBQUXVldWUgPSBcImRlZmF1bHRcIiBpbiBQUXVldWVNb2QgPyBQUXVldWVNb2QuZGVmYXVsdCA6IFBRdWV1ZU1vZDtcbiAgICByZXR1cm4gbmV3IFBRdWV1ZSh7XG4gICAgICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICAgICAgY29uY3VycmVuY3k6IDEsXG4gICAgfSk7XG59XG4vKipcbiAqIENvbnN1bWUgYSBwcm9taXNlLCBlaXRoZXIgYWRkaW5nIGl0IHRvIHRoZSBxdWV1ZSBvciB3YWl0aW5nIGZvciBpdCB0byByZXNvbHZlXG4gKiBAcGFyYW0gcHJvbWlzZSBQcm9taXNlIHRvIGNvbnN1bWVcbiAqIEBwYXJhbSB3YWl0IFdoZXRoZXIgdG8gd2FpdCBmb3IgdGhlIHByb21pc2UgdG8gcmVzb2x2ZSBvciByZXNvbHZlIGltbWVkaWF0ZWx5XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25zdW1lQ2FsbGJhY2socHJvbWlzZUZuLCB3YWl0KSB7XG4gICAgaWYgKHdhaXQgPT09IHRydWUpIHtcbiAgICAgICAgYXdhaXQgcHJvbWlzZUZuKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIHF1ZXVlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBxdWV1ZSA9IGNyZWF0ZVF1ZXVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdm9pZCBxdWV1ZS5hZGQocHJvbWlzZUZuKTtcbiAgICB9XG59XG4vKipcbiAqIFdhaXRzIGZvciBhbGwgcHJvbWlzZXMgaW4gdGhlIHF1ZXVlIHRvIHJlc29sdmUuIElmIHRoZSBxdWV1ZSBpc1xuICogdW5kZWZpbmVkLCBpdCBpbW1lZGlhdGVseSByZXNvbHZlcyBhIHByb21pc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhd2FpdEFsbENhbGxiYWNrcygpIHtcbiAgICByZXR1cm4gdHlwZW9mIHF1ZXVlICE9PSBcInVuZGVmaW5lZFwiID8gcXVldWUub25JZGxlKCkgOiBQcm9taXNlLnJlc29sdmUoKTtcbn1cbiIsIi8qXG4gKiBTdXBwb3J0IGFzeW5jIGl0ZXJhdG9yIHN5bnRheCBmb3IgUmVhZGFibGVTdHJlYW1zIGluIGFsbCBlbnZpcm9ubWVudHMuXG4gKiBTb3VyY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9NYXR0aWFzQnVlbGVucy93ZWItc3RyZWFtcy1wb2x5ZmlsbC9wdWxsLzEyMiNpc3N1ZWNvbW1lbnQtMTYyNzM1NDQ5MFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVhZGFibGVTdHJlYW1Ub0FzeW5jSXRlcmFibGUoXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuc3RyZWFtLCBwcmV2ZW50Q2FuY2VsID0gZmFsc2UpIHtcbiAgICBpZiAoc3RyZWFtW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSkge1xuICAgICAgICByZXR1cm4gc3RyZWFtW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpO1xuICAgIH1cbiAgICBjb25zdCByZWFkZXIgPSBzdHJlYW0uZ2V0UmVhZGVyKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXN5bmMgbmV4dCgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRvbmUpXG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWxlYXNlTG9jaygpOyAvLyByZWxlYXNlIGxvY2sgd2hlbiBzdHJlYW0gYmVjb21lcyBjbG9zZWRcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZWFkZXIucmVsZWFzZUxvY2soKTsgLy8gcmVsZWFzZSBsb2NrIHdoZW4gc3RyZWFtIGJlY29tZXMgZXJyb3JlZFxuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIHJldHVybigpIHtcbiAgICAgICAgICAgIGlmICghcHJldmVudENhbmNlbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhbmNlbFByb21pc2UgPSByZWFkZXIuY2FuY2VsKCk7IC8vIGNhbmNlbCBmaXJzdCwgYnV0IGRvbid0IGF3YWl0IHlldFxuICAgICAgICAgICAgICAgIHJlYWRlci5yZWxlYXNlTG9jaygpOyAvLyByZWxlYXNlIGxvY2sgZmlyc3RcbiAgICAgICAgICAgICAgICBhd2FpdCBjYW5jZWxQcm9taXNlOyAvLyBub3cgYXdhaXQgaXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlYWRlci5yZWxlYXNlTG9jaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IHVuZGVmaW5lZCB9O1xuICAgICAgICB9LFxuICAgICAgICBbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cbmV4cG9ydCBjbGFzcyBJdGVyYWJsZVJlYWRhYmxlU3RyZWFtIGV4dGVuZHMgUmVhZGFibGVTdHJlYW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJyZWFkZXJcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZW5zdXJlUmVhZGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRlciA9IHRoaXMuZ2V0UmVhZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgbmV4dCgpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVSZWFkZXIoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucmVhZGVyLnJlYWQoKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZG9uZSlcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWRlci5yZWxlYXNlTG9jaygpOyAvLyByZWxlYXNlIGxvY2sgd2hlbiBzdHJlYW0gYmVjb21lcyBjbG9zZWRcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZGVyLnJlbGVhc2VMb2NrKCk7IC8vIHJlbGVhc2UgbG9jayB3aGVuIHN0cmVhbSBiZWNvbWVzIGVycm9yZWRcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgcmV0dXJuKCkge1xuICAgICAgICB0aGlzLmVuc3VyZVJlYWRlcigpO1xuICAgICAgICBjb25zdCBjYW5jZWxQcm9taXNlID0gdGhpcy5yZWFkZXIuY2FuY2VsKCk7IC8vIGNhbmNlbCBmaXJzdCwgYnV0IGRvbid0IGF3YWl0IHlldFxuICAgICAgICB0aGlzLnJlYWRlci5yZWxlYXNlTG9jaygpOyAvLyByZWxlYXNlIGxvY2sgZmlyc3RcbiAgICAgICAgYXdhaXQgY2FuY2VsUHJvbWlzZTsgLy8gbm93IGF3YWl0IGl0XG4gICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiB1bmRlZmluZWQgfTtcbiAgICB9XG4gICAgW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tUmVhZGFibGVTdHJlYW0oc3RyZWFtKSB7XG4gICAgICAgIC8vIEZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1N0cmVhbXNfQVBJL1VzaW5nX3JlYWRhYmxlX3N0cmVhbXMjcmVhZGluZ190aGVfc3RyZWFtXG4gICAgICAgIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5nZXRSZWFkZXIoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVyYWJsZVJlYWRhYmxlU3RyZWFtKHtcbiAgICAgICAgICAgIHN0YXJ0KGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHVtcCgpO1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcHVtcCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRlci5yZWFkKCkudGhlbigoeyBkb25lLCB2YWx1ZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIG5vIG1vcmUgZGF0YSBuZWVkcyB0byBiZSBjb25zdW1lZCwgY2xvc2UgdGhlIHN0cmVhbVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW5xdWV1ZSB0aGUgbmV4dCBkYXRhIGNodW5rIGludG8gb3VyIHRhcmdldCBzdHJlYW1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHVtcCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIGZyb21Bc3luY0dlbmVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVyYWJsZVJlYWRhYmxlU3RyZWFtKHtcbiAgICAgICAgICAgIGFzeW5jIHB1bGwoY29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgdmFsdWUsIGRvbmUgfSA9IGF3YWl0IGdlbmVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmVucXVldWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENhbGxiYWNrTWFuYWdlciwgfSBmcm9tIFwiLi4vLi4vY2FsbGJhY2tzL21hbmFnZXIuanNcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDYWxsYmFja01hbmdlckZvckNvbmZpZyhjb25maWcpIHtcbiAgICByZXR1cm4gQ2FsbGJhY2tNYW5hZ2VyLmNvbmZpZ3VyZShjb25maWc/LmNhbGxiYWNrcywgdW5kZWZpbmVkLCBjb25maWc/LnRhZ3MsIHVuZGVmaW5lZCwgY29uZmlnPy5tZXRhZGF0YSk7XG59XG4iLCJpbXBvcnQgcFJldHJ5IGZyb20gXCJwLXJldHJ5XCI7XG5pbXBvcnQgUFF1ZXVlTW9kIGZyb20gXCJwLXF1ZXVlXCI7XG5jb25zdCBTVEFUVVNfTk9fUkVUUlkgPSBbXG4gICAgNDAwLFxuICAgIDQwMSxcbiAgICA0MDIsXG4gICAgNDAzLFxuICAgIDQwNCxcbiAgICA0MDUsXG4gICAgNDA2LFxuICAgIDQwNyxcbiAgICA0MDgsXG4gICAgNDA5LCAvLyBDb25mbGljdFxuXTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5jb25zdCBkZWZhdWx0RmFpbGVkQXR0ZW1wdEhhbmRsZXIgPSAoZXJyb3IpID0+IHtcbiAgICBpZiAoZXJyb3IubWVzc2FnZS5zdGFydHNXaXRoKFwiQ2FuY2VsXCIpIHx8XG4gICAgICAgIGVycm9yLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIlRpbWVvdXRFcnJvclwiKSB8fFxuICAgICAgICBlcnJvci5uYW1lID09PSBcIlRpbWVvdXRFcnJvclwiIHx8XG4gICAgICAgIGVycm9yLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIkFib3J0RXJyb3JcIikgfHxcbiAgICAgICAgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgaWYgKGVycm9yPy5jb2RlID09PSBcIkVDT05OQUJPUlRFRFwiKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICBjb25zdCBzdGF0dXMgPSBcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGVycm9yPy5yZXNwb25zZT8uc3RhdHVzID8/IGVycm9yPy5zdGF0dXM7XG4gICAgaWYgKHN0YXR1cyAmJiBTVEFUVVNfTk9fUkVUUlkuaW5jbHVkZXMoK3N0YXR1cykpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgaWYgKGVycm9yPy5lcnJvcj8uY29kZSA9PT0gXCJpbnN1ZmZpY2llbnRfcXVvdGFcIikge1xuICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoZXJyb3I/Lm1lc3NhZ2UpO1xuICAgICAgICBlcnIubmFtZSA9IFwiSW5zdWZmaWNpZW50UXVvdGFFcnJvclwiO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxufTtcbi8qKlxuICogQSBjbGFzcyB0aGF0IGNhbiBiZSB1c2VkIHRvIG1ha2UgYXN5bmMgY2FsbHMgd2l0aCBjb25jdXJyZW5jeSBhbmQgcmV0cnkgbG9naWMuXG4gKlxuICogVGhpcyBpcyB1c2VmdWwgZm9yIG1ha2luZyBjYWxscyB0byBhbnkga2luZCBvZiBcImV4cGVuc2l2ZVwiIGV4dGVybmFsIHJlc291cmNlLFxuICogYmUgaXQgYmVjYXVzZSBpdCdzIHJhdGUtbGltaXRlZCwgc3ViamVjdCB0byBuZXR3b3JrIGlzc3VlcywgZXRjLlxuICpcbiAqIENvbmN1cnJlbnQgY2FsbHMgYXJlIGxpbWl0ZWQgYnkgdGhlIGBtYXhDb25jdXJyZW5jeWAgcGFyYW1ldGVyLCB3aGljaCBkZWZhdWx0c1xuICogdG8gYEluZmluaXR5YC4gVGhpcyBtZWFucyB0aGF0IGJ5IGRlZmF1bHQsIGFsbCBjYWxscyB3aWxsIGJlIG1hZGUgaW4gcGFyYWxsZWwuXG4gKlxuICogUmV0cmllcyBhcmUgbGltaXRlZCBieSB0aGUgYG1heFJldHJpZXNgIHBhcmFtZXRlciwgd2hpY2ggZGVmYXVsdHMgdG8gNi4gVGhpc1xuICogbWVhbnMgdGhhdCBieSBkZWZhdWx0LCBlYWNoIGNhbGwgd2lsbCBiZSByZXRyaWVkIHVwIHRvIDYgdGltZXMsIHdpdGggYW5cbiAqIGV4cG9uZW50aWFsIGJhY2tvZmYgYmV0d2VlbiBlYWNoIGF0dGVtcHQuXG4gKi9cbmV4cG9ydCBjbGFzcyBBc3luY0NhbGxlciB7XG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm1heENvbmN1cnJlbmN5XCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm1heFJldHJpZXNcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwib25GYWlsZWRBdHRlbXB0XCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInF1ZXVlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubWF4Q29uY3VycmVuY3kgPSBwYXJhbXMubWF4Q29uY3VycmVuY3kgPz8gSW5maW5pdHk7XG4gICAgICAgIHRoaXMubWF4UmV0cmllcyA9IHBhcmFtcy5tYXhSZXRyaWVzID8/IDY7XG4gICAgICAgIHRoaXMub25GYWlsZWRBdHRlbXB0ID1cbiAgICAgICAgICAgIHBhcmFtcy5vbkZhaWxlZEF0dGVtcHQgPz8gZGVmYXVsdEZhaWxlZEF0dGVtcHRIYW5kbGVyO1xuICAgICAgICBjb25zdCBQUXVldWUgPSBcImRlZmF1bHRcIiBpbiBQUXVldWVNb2QgPyBQUXVldWVNb2QuZGVmYXVsdCA6IFBRdWV1ZU1vZDtcbiAgICAgICAgdGhpcy5xdWV1ZSA9IG5ldyBQUXVldWUoeyBjb25jdXJyZW5jeTogdGhpcy5tYXhDb25jdXJyZW5jeSB9KTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBjYWxsKGNhbGxhYmxlLCAuLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXVlLmFkZCgoKSA9PiBwUmV0cnkoKCkgPT4gY2FsbGFibGUoLi4uYXJncykuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8taW5zdGFuY2VvZi9uby1pbnN0YW5jZW9mXG4gICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksIHtcbiAgICAgICAgICAgIG9uRmFpbGVkQXR0ZW1wdDogdGhpcy5vbkZhaWxlZEF0dGVtcHQsXG4gICAgICAgICAgICByZXRyaWVzOiB0aGlzLm1heFJldHJpZXMsXG4gICAgICAgICAgICByYW5kb21pemU6IHRydWUsXG4gICAgICAgICAgICAvLyBJZiBuZWVkZWQgd2UgY2FuIGNoYW5nZSBzb21lIG9mIHRoZSBkZWZhdWx0cyBoZXJlLFxuICAgICAgICAgICAgLy8gYnV0IHRoZXkncmUgcXVpdGUgc2Vuc2libGUuXG4gICAgICAgIH0pLCB7IHRocm93T25UaW1lb3V0OiB0cnVlIH0pO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNhbGxXaXRoT3B0aW9ucyhvcHRpb25zLCBjYWxsYWJsZSwgLi4uYXJncykge1xuICAgICAgICAvLyBOb3RlIHRoaXMgZG9lc24ndCBjYW5jZWwgdGhlIHVuZGVybHlpbmcgcmVxdWVzdCxcbiAgICAgICAgLy8gd2hlbiBhdmFpbGFibGUgcHJlZmVyIHRvIHVzZSB0aGUgc2lnbmFsIG9wdGlvbiBvZiB0aGUgdW5kZXJseWluZyBjYWxsXG4gICAgICAgIGlmIChvcHRpb25zLnNpZ25hbCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmFjZShbXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsKGNhbGxhYmxlLCAuLi5hcmdzKSxcbiAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZSgoXywgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2lnbmFsPy5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkFib3J0RXJyb3JcIikpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGwoY2FsbGFibGUsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBmZXRjaCguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGwoKCkgPT4gZmV0Y2goLi4uYXJncykudGhlbigocmVzKSA9PiAocmVzLm9rID8gcmVzIDogUHJvbWlzZS5yZWplY3QocmVzKSkpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBSdW5uYWJsZSB9IGZyb20gXCIuL2Jhc2UuanNcIjtcbi8qKlxuICogQSBydW5uYWJsZSB0aGF0IHBhc3NlcyB0aHJvdWdoIHRoZSBpbnB1dC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJ1bm5hYmxlUGFzc3Rocm91Z2ggZXh0ZW5kcyBSdW5uYWJsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImxjX25hbWVzcGFjZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogW1wibGFuZ2NoYWluXCIsIFwic2NoZW1hXCIsIFwicnVubmFibGVcIl1cbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImxjX3NlcmlhbGl6YWJsZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIGxjX25hbWUoKSB7XG4gICAgICAgIHJldHVybiBcIlJ1bm5hYmxlUGFzc3Rocm91Z2hcIjtcbiAgICB9XG4gICAgYXN5bmMgaW52b2tlKGlucHV0LCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxsV2l0aENvbmZpZygoaW5wdXQpID0+IFByb21pc2UucmVzb2x2ZShpbnB1dCksIGlucHV0LCBvcHRpb25zKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBSdW5uYWJsZSB9IGZyb20gXCIuL2Jhc2UuanNcIjtcbi8qKlxuICogQSBydW5uYWJsZSB0aGF0IHJvdXRlcyB0byBhIHNldCBvZiBydW5uYWJsZXMgYmFzZWQgb24gSW5wdXRbJ2tleSddLlxuICogUmV0dXJucyB0aGUgb3V0cHV0IG9mIHRoZSBzZWxlY3RlZCBydW5uYWJsZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJvdXRlclJ1bm5hYmxlIGV4dGVuZHMgUnVubmFibGUge1xuICAgIHN0YXRpYyBsY19uYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJSb3V0ZXJSdW5uYWJsZVwiO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihmaWVsZHMpIHtcbiAgICAgICAgc3VwZXIoZmllbGRzKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibGNfbmFtZXNwYWNlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBbXCJsYW5nY2hhaW5cIiwgXCJzY2hlbWFcIiwgXCJydW5uYWJsZVwiXVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibGNfc2VyaWFsaXphYmxlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJydW5uYWJsZXNcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ydW5uYWJsZXMgPSBmaWVsZHMucnVubmFibGVzO1xuICAgIH1cbiAgICBhc3luYyBpbnZva2UoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyBrZXksIGlucHV0OiBhY3R1YWxJbnB1dCB9ID0gaW5wdXQ7XG4gICAgICAgIGNvbnN0IHJ1bm5hYmxlID0gdGhpcy5ydW5uYWJsZXNba2V5XTtcbiAgICAgICAgaWYgKHJ1bm5hYmxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gcnVubmFibGUgYXNzb2NpYXRlZCB3aXRoIGtleSBcIiR7a2V5fVwiLmApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBydW5uYWJsZS5pbnZva2UoYWN0dWFsSW5wdXQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBhc3luYyBiYXRjaChpbnB1dHMsIG9wdGlvbnMsIGJhdGNoT3B0aW9ucykge1xuICAgICAgICBjb25zdCBrZXlzID0gaW5wdXRzLm1hcCgoaW5wdXQpID0+IGlucHV0LmtleSk7XG4gICAgICAgIGNvbnN0IGFjdHVhbElucHV0cyA9IGlucHV0cy5tYXAoKGlucHV0KSA9PiBpbnB1dC5pbnB1dCk7XG4gICAgICAgIGNvbnN0IG1pc3NpbmdLZXkgPSBrZXlzLmZpbmQoKGtleSkgPT4gdGhpcy5ydW5uYWJsZXNba2V5XSA9PT0gdW5kZWZpbmVkKTtcbiAgICAgICAgaWYgKG1pc3NpbmdLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBPbmUgb3IgbW9yZSBrZXlzIGRvIG5vdCBoYXZlIGEgY29ycmVzcG9uZGluZyBydW5uYWJsZS5gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBydW5uYWJsZXMgPSBrZXlzLm1hcCgoa2V5KSA9PiB0aGlzLnJ1bm5hYmxlc1trZXldKTtcbiAgICAgICAgY29uc3Qgb3B0aW9uc0xpc3QgPSB0aGlzLl9nZXRPcHRpb25zTGlzdChvcHRpb25zID8/IHt9LCBpbnB1dHMubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgYmF0Y2hTaXplID0gYmF0Y2hPcHRpb25zPy5tYXhDb25jdXJyZW5jeSAmJiBiYXRjaE9wdGlvbnMubWF4Q29uY3VycmVuY3kgPiAwXG4gICAgICAgICAgICA/IGJhdGNoT3B0aW9ucz8ubWF4Q29uY3VycmVuY3lcbiAgICAgICAgICAgIDogaW5wdXRzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgYmF0Y2hSZXN1bHRzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0dWFsSW5wdXRzLmxlbmd0aDsgaSArPSBiYXRjaFNpemUpIHtcbiAgICAgICAgICAgIGNvbnN0IGJhdGNoUHJvbWlzZXMgPSBhY3R1YWxJbnB1dHNcbiAgICAgICAgICAgICAgICAuc2xpY2UoaSwgaSArIGJhdGNoU2l6ZSlcbiAgICAgICAgICAgICAgICAubWFwKChhY3R1YWxJbnB1dCwgaSkgPT4gcnVubmFibGVzW2ldLmludm9rZShhY3R1YWxJbnB1dCwgb3B0aW9uc0xpc3RbaV0pKTtcbiAgICAgICAgICAgIGNvbnN0IGJhdGNoUmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5hbGwoYmF0Y2hQcm9taXNlcyk7XG4gICAgICAgICAgICBiYXRjaFJlc3VsdHMucHVzaChiYXRjaFJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJhdGNoUmVzdWx0cy5mbGF0KCk7XG4gICAgfVxuICAgIGFzeW5jIHN0cmVhbShpbnB1dCwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCB7IGtleSwgaW5wdXQ6IGFjdHVhbElucHV0IH0gPSBpbnB1dDtcbiAgICAgICAgY29uc3QgcnVubmFibGUgPSB0aGlzLnJ1bm5hYmxlc1trZXldO1xuICAgICAgICBpZiAocnVubmFibGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBydW5uYWJsZSBhc3NvY2lhdGVkIHdpdGgga2V5IFwiJHtrZXl9XCIuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJ1bm5hYmxlLnN0cmVhbShhY3R1YWxJbnB1dCwgb3B0aW9ucyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUnVubmFibGUsIF9jb2VyY2VUb1J1bm5hYmxlIH0gZnJvbSBcIi4vYmFzZS5qc1wiO1xuLyoqXG4gKiBDbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBydW5uYWJsZSBicmFuY2guIFRoZSBSdW5uYWJsZUJyYW5jaCBpc1xuICogaW5pdGlhbGl6ZWQgd2l0aCBhbiBhcnJheSBvZiBicmFuY2hlcyBhbmQgYSBkZWZhdWx0IGJyYW5jaC4gV2hlbiBpbnZva2VkLFxuICogaXQgZXZhbHVhdGVzIHRoZSBjb25kaXRpb24gb2YgZWFjaCBicmFuY2ggaW4gb3JkZXIgYW5kIGV4ZWN1dGVzIHRoZVxuICogY29ycmVzcG9uZGluZyBicmFuY2ggaWYgdGhlIGNvbmRpdGlvbiBpcyB0cnVlLiBJZiBub25lIG9mIHRoZSBjb25kaXRpb25zXG4gKiBhcmUgdHJ1ZSwgaXQgZXhlY3V0ZXMgdGhlIGRlZmF1bHQgYnJhbmNoLlxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZXhwb3J0IGNsYXNzIFJ1bm5hYmxlQnJhbmNoIGV4dGVuZHMgUnVubmFibGUge1xuICAgIHN0YXRpYyBsY19uYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJSdW5uYWJsZUJyYW5jaFwiO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihmaWVsZHMpIHtcbiAgICAgICAgc3VwZXIoZmllbGRzKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibGNfbmFtZXNwYWNlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBbXCJsYW5nY2hhaW5cIiwgXCJydW5uYWJsZVwiLCBcImJyYW5jaFwiXVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibGNfc2VyaWFsaXphYmxlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJkZWZhdWx0XCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImJyYW5jaGVzXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYnJhbmNoZXMgPSBmaWVsZHMuYnJhbmNoZXM7XG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IGZpZWxkcy5kZWZhdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb252ZW5pZW5jZSBtZXRob2QgZm9yIGluc3RhbnRpYXRpbmcgYSBSdW5uYWJsZUJyYW5jaCBmcm9tXG4gICAgICogUnVubmFibGVMaWtlcyAob2JqZWN0cywgZnVuY3Rpb25zLCBvciBSdW5uYWJsZXMpLlxuICAgICAqXG4gICAgICogRWFjaCBpdGVtIGluIHRoZSBpbnB1dCBleGNlcHQgZm9yIHRoZSBsYXN0IG9uZSBzaG91bGQgYmUgYVxuICAgICAqIHR1cGxlIHdpdGggdHdvIGl0ZW1zLiBUaGUgZmlyc3QgaXMgYSBcImNvbmRpdGlvblwiIFJ1bm5hYmxlTGlrZSB0aGF0XG4gICAgICogcmV0dXJucyBcInRydWVcIiBpZiB0aGUgc2Vjb25kIFJ1bm5hYmxlTGlrZSBpbiB0aGUgdHVwbGUgc2hvdWxkIHJ1bi5cbiAgICAgKlxuICAgICAqIFRoZSBmaW5hbCBpdGVtIGluIHRoZSBpbnB1dCBzaG91bGQgYmUgYSBSdW5uYWJsZUxpa2UgdGhhdCBhY3RzIGFzIGFcbiAgICAgKiBkZWZhdWx0IGJyYW5jaCBpZiBubyBvdGhlciBicmFuY2hlcyBtYXRjaC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgdHNcbiAgICAgKiBpbXBvcnQgeyBSdW5uYWJsZUJyYW5jaCB9IGZyb20gXCJsYW5nY2hhaW4vc2NoZW1hL3J1bm5hYmxlXCI7XG4gICAgICpcbiAgICAgKiBjb25zdCBicmFuY2ggPSBSdW5uYWJsZUJyYW5jaC5mcm9tKFtcbiAgICAgKiAgIFsoeDogbnVtYmVyKSA9PiB4ID4gMCwgKHg6IG51bWJlcikgPT4geCArIDFdLFxuICAgICAqICAgWyh4OiBudW1iZXIpID0+IHggPCAwLCAoeDogbnVtYmVyKSA9PiB4IC0gMV0sXG4gICAgICogICAoeDogbnVtYmVyKSA9PiB4XG4gICAgICogXSk7XG4gICAgICogYGBgXG4gICAgICogQHBhcmFtIGJyYW5jaGVzIEFuIGFycmF5IHdoZXJlIHRoZSBldmVyeSBpdGVtIGV4Y2VwdCB0aGUgbGFzdCBpcyBhIHR1cGxlIG9mIFtjb25kaXRpb24sIHJ1bm5hYmxlXVxuICAgICAqICAgcGFpcnMuIFRoZSBsYXN0IGl0ZW0gaXMgYSBkZWZhdWx0IHJ1bm5hYmxlIHdoaWNoIGlzIGludm9rZWQgaWYgbm8gb3RoZXIgY29uZGl0aW9uIG1hdGNoZXMuXG4gICAgICogQHJldHVybnMgQSBuZXcgUnVubmFibGVCcmFuY2guXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBzdGF0aWMgZnJvbShicmFuY2hlcykge1xuICAgICAgICBpZiAoYnJhbmNoZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUnVubmFibGVCcmFuY2ggcmVxdWlyZXMgYXQgbGVhc3Qgb25lIGJyYW5jaFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBicmFuY2hMaWtlcyA9IGJyYW5jaGVzLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgY29uc3QgY29lcmNlZEJyYW5jaGVzID0gYnJhbmNoTGlrZXMubWFwKChbY29uZGl0aW9uLCBydW5uYWJsZV0pID0+IFtcbiAgICAgICAgICAgIF9jb2VyY2VUb1J1bm5hYmxlKGNvbmRpdGlvbiksXG4gICAgICAgICAgICBfY29lcmNlVG9SdW5uYWJsZShydW5uYWJsZSksXG4gICAgICAgIF0pO1xuICAgICAgICBjb25zdCBkZWZhdWx0QnJhbmNoID0gX2NvZXJjZVRvUnVubmFibGUoYnJhbmNoZXNbYnJhbmNoZXMubGVuZ3RoIC0gMV0pO1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoe1xuICAgICAgICAgICAgYnJhbmNoZXM6IGNvZXJjZWRCcmFuY2hlcyxcbiAgICAgICAgICAgIGRlZmF1bHQ6IGRlZmF1bHRCcmFuY2gsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBfaW52b2tlKGlucHV0LCBjb25maWcsIHJ1bk1hbmFnZXIpIHtcbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJyYW5jaGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBbY29uZGl0aW9uLCBicmFuY2hSdW5uYWJsZV0gPSB0aGlzLmJyYW5jaGVzW2ldO1xuICAgICAgICAgICAgY29uc3QgY29uZGl0aW9uVmFsdWUgPSBhd2FpdCBjb25kaXRpb24uaW52b2tlKGlucHV0LCB0aGlzLl9wYXRjaENvbmZpZyhjb25maWcsIHJ1bk1hbmFnZXI/LmdldENoaWxkKGBjb25kaXRpb246JHtpICsgMX1gKSkpO1xuICAgICAgICAgICAgaWYgKGNvbmRpdGlvblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgYnJhbmNoUnVubmFibGUuaW52b2tlKGlucHV0LCB0aGlzLl9wYXRjaENvbmZpZyhjb25maWcsIHJ1bk1hbmFnZXI/LmdldENoaWxkKGBicmFuY2g6JHtpICsgMX1gKSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLmRlZmF1bHQuaW52b2tlKGlucHV0LCB0aGlzLl9wYXRjaENvbmZpZyhjb25maWcsIHJ1bk1hbmFnZXI/LmdldENoaWxkKFwiZGVmYXVsdFwiKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGFzeW5jIGludm9rZShpbnB1dCwgY29uZmlnID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGxXaXRoQ29uZmlnKHRoaXMuX2ludm9rZSwgaW5wdXQsIGNvbmZpZyk7XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSAocmVxdWlyZShcIi4vaGVscGVycy9icm93c2VyL2pzLWxvYWRlclwiKShyZXF1aXJlKCcuL2hlbHBlcnMvYnVuZGxlLXVybCcpLmdldEJ1bmRsZVVSTCgnZUNCME0nKSArIFwicHJvbXB0LmY2NjZmODIxLmpzXCIgKyBcIj9cIiArIERhdGUubm93KCkpLmNhdGNoKGVyciA9PiB7ZGVsZXRlIG1vZHVsZS5idW5kbGUuY2FjaGVbbW9kdWxlLmlkXTsgdGhyb3cgZXJyO30pKS50aGVuKCgpID0+IG1vZHVsZS5idW5kbGUucm9vdCgnYTByVWonKSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjYWNoZUxvYWRlciA9IHJlcXVpcmUoJy4uL2NhY2hlTG9hZGVyJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGNhY2hlTG9hZGVyKGZ1bmN0aW9uIChidW5kbGUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAvLyBEb24ndCBpbnNlcnQgdGhlIHNhbWUgc2NyaXB0IHR3aWNlIChlLmcuIGlmIGl0IHdhcyBhbHJlYWR5IGluIHRoZSBIVE1MKVxuICAgIHZhciBleGlzdGluZ1NjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG4gICAgaWYgKFtdLmNvbmNhdChleGlzdGluZ1NjcmlwdHMpLnNvbWUoZnVuY3Rpb24gaXNDdXJyZW50QnVuZGxlKHNjcmlwdCkge1xuICAgICAgcmV0dXJuIHNjcmlwdC5zcmMgPT09IGJ1bmRsZTtcbiAgICB9KSkge1xuICAgICAgcmVzb2x2ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcHJlbG9hZExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgcHJlbG9hZExpbmsuaHJlZiA9IGJ1bmRsZTtcbiAgICBwcmVsb2FkTGluay5yZWwgPSAncHJlbG9hZCc7XG4gICAgcHJlbG9hZExpbmsuYXMgPSAnc2NyaXB0JztcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHByZWxvYWRMaW5rKTtcbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC5zcmMgPSBidW5kbGU7XG4gICAgc2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIGVycm9yID0gbmV3IFR5cGVFcnJvcihcIkZhaWxlZCB0byBmZXRjaCBkeW5hbWljYWxseSBpbXBvcnRlZCBtb2R1bGU6IFwiLmNvbmNhdChidW5kbGUsIFwiLiBFcnJvcjogXCIpLmNvbmNhdChlLm1lc3NhZ2UpKTtcbiAgICAgIHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gICAgICBzY3JpcHQucmVtb3ZlKCk7XG4gICAgICByZWplY3QoZXJyb3IpO1xuICAgIH07XG4gICAgc2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIH0pO1xufSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjYWNoZWRCdW5kbGVzID0ge307XG52YXIgY2FjaGVkUHJlbG9hZHMgPSB7fTtcbnZhciBjYWNoZWRQcmVmZXRjaGVzID0ge307XG5mdW5jdGlvbiBnZXRDYWNoZSh0eXBlKSB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3ByZWxvYWQnOlxuICAgICAgcmV0dXJuIGNhY2hlZFByZWxvYWRzO1xuICAgIGNhc2UgJ3ByZWZldGNoJzpcbiAgICAgIHJldHVybiBjYWNoZWRQcmVmZXRjaGVzO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gY2FjaGVkQnVuZGxlcztcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobG9hZGVyLCB0eXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYnVuZGxlKSB7XG4gICAgdmFyIGNhY2hlID0gZ2V0Q2FjaGUodHlwZSk7XG4gICAgaWYgKGNhY2hlW2J1bmRsZV0pIHtcbiAgICAgIHJldHVybiBjYWNoZVtidW5kbGVdO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVbYnVuZGxlXSA9IGxvYWRlci5hcHBseShudWxsLCBhcmd1bWVudHMpLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICBkZWxldGUgY2FjaGVbYnVuZGxlXTtcbiAgICAgIHRocm93IGU7XG4gICAgfSk7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYnVuZGxlVVJMID0ge307XG5mdW5jdGlvbiBnZXRCdW5kbGVVUkxDYWNoZWQoaWQpIHtcbiAgdmFyIHZhbHVlID0gYnVuZGxlVVJMW2lkXTtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHZhbHVlID0gZ2V0QnVuZGxlVVJMKCk7XG4gICAgYnVuZGxlVVJMW2lkXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGdldEJ1bmRsZVVSTCgpIHtcbiAgdHJ5IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdmFyIG1hdGNoZXMgPSAoJycgKyBlcnIuc3RhY2spLm1hdGNoKC8oaHR0cHM/fGZpbGV8ZnRwfChjaHJvbWV8bW96fHNhZmFyaS13ZWIpLWV4dGVuc2lvbik6XFwvXFwvW14pXFxuXSsvZyk7XG4gICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgIC8vIFRoZSBmaXJzdCB0d28gc3RhY2sgZnJhbWVzIHdpbGwgYmUgdGhpcyBmdW5jdGlvbiBhbmQgZ2V0QnVuZGxlVVJMQ2FjaGVkLlxuICAgICAgLy8gVXNlIHRoZSAzcmQgb25lLCB3aGljaCB3aWxsIGJlIGEgcnVudGltZSBpbiB0aGUgb3JpZ2luYWwgYnVuZGxlLlxuICAgICAgcmV0dXJuIGdldEJhc2VVUkwobWF0Y2hlc1syXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiAnLyc7XG59XG5mdW5jdGlvbiBnZXRCYXNlVVJMKHVybCkge1xuICByZXR1cm4gKCcnICsgdXJsKS5yZXBsYWNlKC9eKCg/Omh0dHBzP3xmaWxlfGZ0cHwoY2hyb21lfG1venxzYWZhcmktd2ViKS1leHRlbnNpb24pOlxcL1xcLy4rKVxcL1teL10rJC8sICckMScpICsgJy8nO1xufVxuXG4vLyBUT0RPOiBSZXBsYWNlIHVzZXMgd2l0aCBgbmV3IFVSTCh1cmwpLm9yaWdpbmAgd2hlbiBpZTExIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQuXG5mdW5jdGlvbiBnZXRPcmlnaW4odXJsKSB7XG4gIHZhciBtYXRjaGVzID0gKCcnICsgdXJsKS5tYXRjaCgvKGh0dHBzP3xmaWxlfGZ0cHwoY2hyb21lfG1venxzYWZhcmktd2ViKS1leHRlbnNpb24pOlxcL1xcL1teL10rLyk7XG4gIGlmICghbWF0Y2hlcykge1xuICAgIHRocm93IG5ldyBFcnJvcignT3JpZ2luIG5vdCBmb3VuZCcpO1xuICB9XG4gIHJldHVybiBtYXRjaGVzWzBdO1xufVxuZXhwb3J0cy5nZXRCdW5kbGVVUkwgPSBnZXRCdW5kbGVVUkxDYWNoZWQ7XG5leHBvcnRzLmdldEJhc2VVUkwgPSBnZXRCYXNlVVJMO1xuZXhwb3J0cy5nZXRPcmlnaW4gPSBnZXRPcmlnaW47IiwibW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlLmFsbChbcmVxdWlyZShcIi4vaGVscGVycy9icm93c2VyL2pzLWxvYWRlclwiKShyZXF1aXJlKCcuL2hlbHBlcnMvYnVuZGxlLXVybCcpLmdldEJ1bmRsZVVSTCgnZUNCME0nKSArIFwicHJvbXB0LmY2NjZmODIxLmpzXCIgKyBcIj9cIiArIERhdGUubm93KCkpLmNhdGNoKGVyciA9PiB7ZGVsZXRlIG1vZHVsZS5idW5kbGUuY2FjaGVbbW9kdWxlLmlkXTsgdGhyb3cgZXJyO30pLCByZXF1aXJlKFwiLi9oZWxwZXJzL2Jyb3dzZXIvanMtbG9hZGVyXCIpKHJlcXVpcmUoJy4vaGVscGVycy9idW5kbGUtdXJsJykuZ2V0QnVuZGxlVVJMKCdlQ0IwTScpICsgXCJmZXdfc2hvdC4yOTUwZjZjOS5qc1wiICsgXCI/XCIgKyBEYXRlLm5vdygpKS5jYXRjaChlcnIgPT4ge2RlbGV0ZSBtb2R1bGUuYnVuZGxlLmNhY2hlW21vZHVsZS5pZF07IHRocm93IGVycjt9KV0pLnRoZW4oKCkgPT4gbW9kdWxlLmJ1bmRsZS5yb290KCc5R0VtZycpKTsiLCJleHBvcnQgY29uc3QgcGFyc2VGU3RyaW5nID0gKHRlbXBsYXRlKSA9PiB7XG4gICAgLy8gQ29yZSBsb2dpYyByZXBsaWNhdGVkIGZyb20gaW50ZXJuYWxzIG9mIHB5dGhvbnMgYnVpbHQgaW4gRm9ybWF0dGVyIGNsYXNzLlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9weXRob24vY3B5dGhvbi9ibG9iLzEzNWVjN2NlZmJhZmZkNTE2Yjc3MzYyYWQyYjJhZDEwMjVhZjQ2MmUvT2JqZWN0cy9zdHJpbmdsaWIvdW5pY29kZV9mb3JtYXQuaCNMNzAwLUw3MDZcbiAgICBjb25zdCBjaGFycyA9IHRlbXBsYXRlLnNwbGl0KFwiXCIpO1xuICAgIGNvbnN0IG5vZGVzID0gW107XG4gICAgY29uc3QgbmV4dEJyYWNrZXQgPSAoYnJhY2tldCwgc3RhcnQpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgY2hhcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChicmFja2V0LmluY2x1ZGVzKGNoYXJzW2ldKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGNoYXJzLmxlbmd0aCkge1xuICAgICAgICBpZiAoY2hhcnNbaV0gPT09IFwie1wiICYmIGkgKyAxIDwgY2hhcnMubGVuZ3RoICYmIGNoYXJzW2kgKyAxXSA9PT0gXCJ7XCIpIHtcbiAgICAgICAgICAgIG5vZGVzLnB1c2goeyB0eXBlOiBcImxpdGVyYWxcIiwgdGV4dDogXCJ7XCIgfSk7XG4gICAgICAgICAgICBpICs9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hhcnNbaV0gPT09IFwifVwiICYmXG4gICAgICAgICAgICBpICsgMSA8IGNoYXJzLmxlbmd0aCAmJlxuICAgICAgICAgICAgY2hhcnNbaSArIDFdID09PSBcIn1cIikge1xuICAgICAgICAgICAgbm9kZXMucHVzaCh7IHR5cGU6IFwibGl0ZXJhbFwiLCB0ZXh0OiBcIn1cIiB9KTtcbiAgICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjaGFyc1tpXSA9PT0gXCJ7XCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGogPSBuZXh0QnJhY2tldChcIn1cIiwgaSk7XG4gICAgICAgICAgICBpZiAoaiA8IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmNsb3NlZCAneycgaW4gdGVtcGxhdGUuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJ2YXJpYWJsZVwiLFxuICAgICAgICAgICAgICAgIG5hbWU6IGNoYXJzLnNsaWNlKGkgKyAxLCBqKS5qb2luKFwiXCIpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpID0gaiArIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hhcnNbaV0gPT09IFwifVwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaW5nbGUgJ30nIGluIHRlbXBsYXRlLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHQgPSBuZXh0QnJhY2tldChcInt9XCIsIGkpO1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IChuZXh0IDwgMCA/IGNoYXJzLnNsaWNlKGkpIDogY2hhcnMuc2xpY2UoaSwgbmV4dCkpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICBub2Rlcy5wdXNoKHsgdHlwZTogXCJsaXRlcmFsXCIsIHRleHQgfSk7XG4gICAgICAgICAgICBpID0gbmV4dCA8IDAgPyBjaGFycy5sZW5ndGggOiBuZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2Rlcztcbn07XG5leHBvcnQgY29uc3QgaW50ZXJwb2xhdGVGU3RyaW5nID0gKHRlbXBsYXRlLCB2YWx1ZXMpID0+IHBhcnNlRlN0cmluZyh0ZW1wbGF0ZSkucmVkdWNlKChyZXMsIG5vZGUpID0+IHtcbiAgICBpZiAobm9kZS50eXBlID09PSBcInZhcmlhYmxlXCIpIHtcbiAgICAgICAgaWYgKG5vZGUubmFtZSBpbiB2YWx1ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMgKyB2YWx1ZXNbbm9kZS5uYW1lXTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgdmFsdWUgZm9yIGlucHV0ICR7bm9kZS5uYW1lfWApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzICsgbm9kZS50ZXh0O1xufSwgXCJcIik7XG5leHBvcnQgY29uc3QgREVGQVVMVF9GT1JNQVRURVJfTUFQUElORyA9IHtcbiAgICBcImYtc3RyaW5nXCI6IGludGVycG9sYXRlRlN0cmluZyxcbiAgICBqaW5qYTI6IChfLCBfXykgPT4gXCJcIixcbn07XG5leHBvcnQgY29uc3QgREVGQVVMVF9QQVJTRVJfTUFQUElORyA9IHtcbiAgICBcImYtc3RyaW5nXCI6IHBhcnNlRlN0cmluZyxcbiAgICBqaW5qYTI6IChfKSA9PiBbXSxcbn07XG5leHBvcnQgY29uc3QgcmVuZGVyVGVtcGxhdGUgPSAodGVtcGxhdGUsIHRlbXBsYXRlRm9ybWF0LCBpbnB1dFZhbHVlcykgPT4gREVGQVVMVF9GT1JNQVRURVJfTUFQUElOR1t0ZW1wbGF0ZUZvcm1hdF0odGVtcGxhdGUsIGlucHV0VmFsdWVzKTtcbmV4cG9ydCBjb25zdCBwYXJzZVRlbXBsYXRlID0gKHRlbXBsYXRlLCB0ZW1wbGF0ZUZvcm1hdCkgPT4gREVGQVVMVF9QQVJTRVJfTUFQUElOR1t0ZW1wbGF0ZUZvcm1hdF0odGVtcGxhdGUpO1xuZXhwb3J0IGNvbnN0IGNoZWNrVmFsaWRUZW1wbGF0ZSA9ICh0ZW1wbGF0ZSwgdGVtcGxhdGVGb3JtYXQsIGlucHV0VmFyaWFibGVzKSA9PiB7XG4gICAgaWYgKCEodGVtcGxhdGVGb3JtYXQgaW4gREVGQVVMVF9GT1JNQVRURVJfTUFQUElORykpIHtcbiAgICAgICAgY29uc3QgdmFsaWRGb3JtYXRzID0gT2JqZWN0LmtleXMoREVGQVVMVF9GT1JNQVRURVJfTUFQUElORyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB0ZW1wbGF0ZSBmb3JtYXQuIEdvdCBcXGAke3RlbXBsYXRlRm9ybWF0fVxcYDtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzaG91bGQgYmUgb25lIG9mICR7dmFsaWRGb3JtYXRzfWApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkdW1teUlucHV0cyA9IGlucHV0VmFyaWFibGVzLnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgICAgICBhY2Nbdl0gPSBcImZvb1wiO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgICAgICByZW5kZXJUZW1wbGF0ZSh0ZW1wbGF0ZSwgdGVtcGxhdGVGb3JtYXQsIGR1bW15SW5wdXRzKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHByb21wdCBzY2hlbWE6ICR7ZS5tZXNzYWdlfWApO1xuICAgIH1cbn07XG4iXSwibmFtZXMiOltdLCJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbXB0LmY2NjZmODIxLmpzLm1hcCJ9
 globalThis.define=__define;  })(globalThis.define);