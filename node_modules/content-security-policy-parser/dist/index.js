"use strict";
module.exports = (policy) => {
    const result = {};
    policy.split(";").forEach((directive) => {
        const [directiveKey, ...directiveValue] = directive.trim().split(/\s+/g);
        if (directiveKey &&
            !Object.prototype.hasOwnProperty.call(result, directiveKey)) {
            result[directiveKey] = directiveValue;
        }
    });
    return result;
};
