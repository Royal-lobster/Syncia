
function normalize(tags, _attrs, _children) {

    var raw = null;
    var tag = "";
    var attrs = clone(_attrs);
    var classes = attrs["class"] ? [attrs["class"]] : [];
    delete attrs["class"];
    var children = [];

    tags.forEach(function (t) {
        if (t[0] === ".")
            classes.push(t.slice(1));
        else if (t[0] === "#")
            attrs.id = t.slice(1);
        else if (t === "raw")
            raw = true;
        else
            tag = t;
    });

    if (attrs.innerHTML) {
        raw = attrs.innerHTML;
        delete attrs.innerHTML;
    }

    if (raw) {
        raw = collapse(_children).map(function (x) { return String(x); }).join("");
    }
    else {
        children = collapse(_children);
    }

    return [tag, classes, attrs, children, raw];
}

exports.normalize = normalize

function collapse(x) {
    if (Array.isArray(x)) {
        var res = [];
        x.forEach(function (y) {
            if (Array.isArray(y))
                res = res.concat(collapse(y));
            else
                res.push(y);
        });
        return res;
    }
    else {
        return x;
    }
}

function convertHTML(x, create) {
    if (Array.isArray(x)) {
        return collapse(x.map(function (x) { return convertHTML(x, create); }));
    }
    else if (x instanceof ENode) {
        var norm = normalize(x.tags, x.props, x.children);
        norm[3] = norm[3].map(function (x) {
            return convertHTML(x, create)
        });
        return create.apply(x, norm);
    }
    else {
        return create.call(x, null, [], {}, x, null);
    }
}

exports.convertHTML = convertHTML

