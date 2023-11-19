
function dir(arg) {
    function helper(arg) {
        if (typeof(arg) === "number")
            return helper(Number.prototype);
        else if (typeof(arg) === "string")
            return helper(String.prototype);
        else if (arg === true || arg === false)
            return helper(Boolean.prototype);
        else {
            var curr = arg;
            var results = [];
            while (curr && (arg === Object || curr !== Object)) {
                var props = Object.getOwnPropertyNames(curr);
                for (var i = 0; i < props.length; i++) {
                    var k = props[i];
                    if (!k.match(/^toString|^__|^::/)) {
                        try {
                            results.push([k, arg[k]]);
                        }
                        catch (e) {
                            results.push([k, e]);
                        }
                    }
                }
                curr = Object.getPrototypeOf(curr);
            }
            return object(results.sort());
        }
    }
    return helper(arg);
}

module.exports = dir;
