"use strict";

require("earlgrey-runtime/5");var $targ$0 = undefined;var $targ$1 = undefined;var $targ$2 = undefined;var $targ$3 = undefined;var $targ$4 = undefined;var $targ$5 = undefined;var $targ$6 = undefined;var $targ$7 = undefined;var $targ$8 = undefined;var $targ$9 = undefined;var inquirer$0 = undefined;var prompt$0 = undefined;var question$0 = undefined;var input$0 = undefined;var confirm$0 = undefined;var list$0 = undefined;var rawlist$0 = undefined;var expand$0 = undefined;var checkbox$0 = undefined;var password$0 = undefined;inquirer$0 = require("inquirer");prompt$0 = function prompt(ph$0$0) {
  var question$1 = undefined;var questions$0 = undefined;var t0$0 = undefined;t0$0 = ph$0$0;if (Array.isArray(t0$0)) {
    questions$0 = t0$0;return new Promise(function (resolve$0, reject$0) {
      var rval$0 = undefined;rval$0 = false;try {
        rval$0 = inquirer$0.prompt(questions$0, resolve$0);rval$0;
      } catch (excv$0) {
        var e$0 = undefined;e$0 = excv$0;rval$0 = reject$0(e$0);rval$0;
      }return rval$0;
    });
  } else {
    question$1 = ph$0$0;return prompt$0([question$1]);
  }
};question$0 = function question(q$0) {
  return spawn.call(this, regeneratorRuntime.mark(function callee$1$0() {
    var res$0;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          res$0 = undefined;
          context$2$0.next = 3;
          return prompt$0(__amp__(q$0, { name: "result" }));

        case 3:
          res$0 = context$2$0.sent;
          return context$2$0.abrupt("return", res$0.result);

        case 5:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  }));
};input$0 = function input() {
  var message$0 = undefined;var options$0 = undefined;var t0$1 = undefined;var m$0$0 = undefined;m$0$0 = arguments;t0$1 = m$0$0.length;if (t0$1 >= 1 && t0$1 <= 2) {
    message$0 = m$0$0[0];if (1 >= t0$1) {
      options$0 = {};
    } else {
      options$0 = m$0$0[1];
    }return question$0(__amp__(options$0, { type: "input", message: message$0 }));
  } else {
    return ___match_error(m$0$0, "{message, options = {=}}");
  }
};confirm$0 = function confirm() {
  var message$1 = undefined;var options$1 = undefined;var t0$2 = undefined;var m$1$0 = undefined;m$1$0 = arguments;t0$2 = m$1$0.length;if (t0$2 >= 1 && t0$2 <= 2) {
    message$1 = m$1$0[0];if (1 >= t0$2) {
      options$1 = {};
    } else {
      options$1 = m$1$0[1];
    }return question$0(__amp__(options$1, { type: "confirm", message: message$1 }));
  } else {
    return ___match_error(m$1$0, "{message, options = {=}}");
  }
};list$0 = function list() {
  var message$2 = undefined;var choices$0 = undefined;var options$2 = undefined;var t0$3 = undefined;var m$2$0 = undefined;m$2$0 = arguments;t0$3 = m$2$0.length;if (t0$3 >= 2 && t0$3 <= 3) {
    message$2 = m$2$0[0];choices$0 = m$2$0[1];if (2 >= t0$3) {
      options$2 = {};
    } else {
      options$2 = m$2$0[2];
    }return question$0(__amp__(options$2, { type: "list", message: message$2, choices: choices$0 }));
  } else {
    return ___match_error(m$2$0, "{message, choices, options = {=}}");
  }
};rawlist$0 = function rawlist() {
  var message$3 = undefined;var choices$1 = undefined;var options$3 = undefined;var t0$4 = undefined;var m$3$0 = undefined;m$3$0 = arguments;t0$4 = m$3$0.length;if (t0$4 >= 2 && t0$4 <= 3) {
    message$3 = m$3$0[0];choices$1 = m$3$0[1];if (2 >= t0$4) {
      options$3 = {};
    } else {
      options$3 = m$3$0[2];
    }return question$0(__amp__(options$3, { type: "rawlist", message: message$3, choices: choices$1 }));
  } else {
    return ___match_error(m$3$0, "{message, choices, options = {=}}");
  }
};expand$0 = function expand() {
  var message$4 = undefined;var choices$2 = undefined;var options$4 = undefined;var t0$5 = undefined;var m$4$0 = undefined;m$4$0 = arguments;t0$5 = m$4$0.length;if (t0$5 >= 2 && t0$5 <= 3) {
    message$4 = m$4$0[0];choices$2 = m$4$0[1];if (2 >= t0$5) {
      options$4 = {};
    } else {
      options$4 = m$4$0[2];
    }return question$0(__amp__(options$4, { type: "expand", message: message$4, choices: choices$2 }));
  } else {
    return ___match_error(m$4$0, "{message, choices, options = {=}}");
  }
};checkbox$0 = function checkbox() {
  var message$5 = undefined;var choices$3 = undefined;var options$5 = undefined;var t0$6 = undefined;var m$5$0 = undefined;m$5$0 = arguments;t0$6 = m$5$0.length;if (t0$6 >= 2 && t0$6 <= 3) {
    message$5 = m$5$0[0];choices$3 = m$5$0[1];if (2 >= t0$6) {
      options$5 = {};
    } else {
      options$5 = m$5$0[2];
    }return question$0(__amp__(options$5, { type: "checkbox", message: message$5, choices: choices$3 }));
  } else {
    return ___match_error(m$5$0, "{message, choices, options = {=}}");
  }
};password$0 = function password() {
  var message$6 = undefined;var options$6 = undefined;var t0$7 = undefined;var m$6$0 = undefined;m$6$0 = arguments;t0$7 = m$6$0.length;if (t0$7 >= 1 && t0$7 <= 2) {
    message$6 = m$6$0[0];if (1 >= t0$7) {
      options$6 = {};
    } else {
      options$6 = m$6$0[1];
    }return question$0(__amp__(options$6, { type: "password", message: message$6 }));
  } else {
    return ___match_error(m$6$0, "{message, options = {=}}");
  }
};$targ$0 = prompt$0;exports.prompt = $targ$0;$targ$1 = question$0;exports.question = $targ$1;$targ$2 = input$0;exports.input = $targ$2;$targ$3 = confirm$0;exports.confirm = $targ$3;$targ$4 = list$0;exports.list = $targ$4;$targ$5 = rawlist$0;exports.rawlist = $targ$5;$targ$6 = checkbox$0;exports.checkbox = $targ$6;$targ$7 = expand$0;exports.expand = $targ$7;$targ$8 = password$0;exports.password = $targ$8;$targ$9 = inquirer$0.Separator;exports.Separator = $targ$9;void 0;
//# sourceMappingURL=index.js.map

