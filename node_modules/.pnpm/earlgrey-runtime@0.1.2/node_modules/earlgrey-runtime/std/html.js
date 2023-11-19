
var _util = require("../util");
var convertHTML = _util.convertHTML;
var normalize = _util.normalize;

function escapeHTML(s) {
    var repl = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;"
    }
    return s.replace(/[&<>]/g, function (x) { return repl[x]; });
}

function quotify(s) {
    return '"' + s.replace(/["\\]/g, function (x) { return "\\" + x; }) + '"';
}

var voidTags = [
    "area", "base", "br", "col", "command", "embed", "hr",
    "img", "input", "keygen", "link", "meta", "param", "source",
    "track", "wbr"
]

function toHTML(tag, classes, attrs, children, raw) {
    if (tag === null)
        return escapeHTML(String(children));

    var result = "";

    if (tag == "top") tag = "";

    if (!equal(classes, [])) {
        attrs["class"] = classes.join(" ");
    }
    if (!tag && (!equal(classes, []) || !equal(attrs, {}))) {
        tag = "div";
    }

    if (tag) result += "<" + tag;
    items(attrs).forEach(function (kv) {
        if (kv[1] === true) {
            result += " " + kv[0];
        }
        else if (kv[1] !== false) {
            result += " " + kv[0] + "=" + quotify(String(kv[1]));
        }
    });
    if (tag) result += ">";

    var closeTag = tag && voidTags.indexOf(tag) == -1;

    if (raw !== null) {
        result += raw;
        closeTag = !!tag;
    }
    else if (children.length > 0) {
        children.forEach(function (c) {
            result += c;
        });
        closeTag = !!tag;
    }

    if (closeTag)
        result += "</" + tag + ">"

    return result;
}

function HTML(enode, converter) {
    if (!converter)
        converter = toHTML;
    var res = convertHTML(enode, converter);
    if (Array.isArray(res))
        res = converter("top", [], {}, res, null);
    return res;
}

function HTMLNode(tags, props, children) {
    if (!Array.isArray(children))
        children = [children];
    return toHTML.apply(null, normalize(tags, props, children));
}

function percentMacro(expr) {
    var HTMLNode = this.deps.HTMLNode;
    return ["multi",
            ["send", ["symbol", "="],
             ["data",
              ["send", ["symbol", "let"], ["symbol", "ENode"]],
              HTMLNode]],
            ["send",
             ["symbol", "%"],
             ["data", expr[1], expr[2]]]]
}
percentMacro.__deps = {HTMLNode: "ENode"};
percentMacro.__path = __filename;

module.exports = HTML;
HTML.HTML = HTML;
HTML.toHTML = toHTML;
HTML.ENode = HTMLNode;
HTML["%"] = percentMacro;
HTML.normalize = normalize;
