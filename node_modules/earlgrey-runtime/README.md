
Earl Grey runtime
=================

This package defines global variables and functions for the Earl Grey
language:

    require("earlgrey-runtime/5"); // es5
    require("earlgrey-runtime/6"); // es6

EG compiles to ES6 and therefore the runtime includes
[babel](https://babeljs.io/)'s polyfill when requiring
`earlgrey-runtime/5`.

See [Earl Grey](https://github.com/breuleux/earl-grey).

