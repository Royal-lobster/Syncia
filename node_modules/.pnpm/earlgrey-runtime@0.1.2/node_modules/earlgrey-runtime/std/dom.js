
var _util = require("../util");
var convertHTML = _util.convertHTML;
var normalize = _util.normalize;


function toDOM(tag, classes, attrs, children, raw) {

    if (tag === null) {
        if (children instanceof Node)
            return children;
        else
            return document.createTextNode(String(children));
    }
    
    if (tag == "top") tag = "";

    if (!tag && (equal(classes, []) && equal(attrs, {}))) {
        if (children.length == 1)
            return children[0];
        else {
            var node = document.createElement("div");
            children.forEach(function (x) {
                node.appendChild(x);
            });
            return node;
        }
    }

    tag = tag || "div";

    if (attrs.namespace)
        var node = document.createElementNS(attrs.namespace, tag);
    else
        var node = document.createElement(tag);

    if (attrs.id)
        node.id = attrs.id;

    if (classes.length > 0)
        node.className = classes.join(" ");

    if (raw) {
        node.innerHTML = raw;
    }

    items(attrs).forEach(function (kv) {
        if (kv[0].startsWith("on"))
            node[kv[0]] = kv[1];
        else if (kv[1] === true)
            node.setAttribute(kv[0], "");
        else if (kv[1] !== false)
            node.setAttribute(kv[0], kv[1]);
    });

    children.forEach(function (c) {
        node.appendChild(c);
    });

    return node;
}


function DOM(enode, converter) {
    if (!converter)
        converter = toDOM;
    var res = convertHTML(enode, converter);
    if (Array.isArray(res))
        res = converter("top", [], {}, res, null);
    return res;
}

function DOMNode(tags, props, children) {
    if (!Array.isArray(children))
        children = [children];
    return toDOM.apply(null, normalize(tags, props, children));
}

function percentMacro(expr) {
    var DOMNode = this.deps.DOMNode;
    return ["multi",
            ["send", ["symbol", "="],
             ["data",
              ["send", ["symbol", "let"], ["symbol", "ENode"]],
              DOMNode]],
            ["send",
             ["symbol", "%"],
             ["data", expr[1], expr[2]]]]
}
percentMacro.__deps = {DOMNode: "ENode"};
percentMacro.__path = __filename;

module.exports = DOM;
DOM.DOM = DOM;
DOM.toDOM = toDOM;
DOM.ENode = DOMNode;
DOM["%"] = percentMacro;
DOM.normalize = normalize;
