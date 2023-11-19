
if (!global._egruntime_installed) {
    global._egruntime_installed = 5;
    require("core-js/shim");
    require("regenerator-runtime/runtime");
    require("./lib");
}
else if (global._egruntime_installed == 6) {
    global._egruntime_installed = 5;
    require("core-js/shim");
    require("regenerator-runtime/runtime");
}
