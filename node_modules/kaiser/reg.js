var K = "@@KAISER";
var g = global;
if (!g[K]) {
    var w = [];
    k = {loaded: 0, waitingList: w};
    ["", "All", "Singleton", "Singletons", "Function", "Functions"].map(function (f) {
        var n = "register" + f;
        k[n] = function() {
            if (g[K].loaded) {
                g[K][n].apply(null, arguments);
            }
            else {
                w.push([n, [].slice.call(arguments)]);
            }
        };
     });
    g[K] = k;
}
module.exports = g[K];
