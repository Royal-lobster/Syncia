"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNullableDef = void 0;
const parseDef_1 = require("../parseDef");
const union_1 = require("./union");
function parseNullableDef(def, refs) {
    if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) &&
        (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
        if (refs.target === "openApi3") {
            return {
                type: union_1.primitiveMappings[def.innerType._def.typeName],
                nullable: true,
            };
        }
        return {
            type: [
                union_1.primitiveMappings[def.innerType._def.typeName],
                "null",
            ],
        };
    }
    if (refs.target === "openApi3") {
        const base = (0, parseDef_1.parseDef)(def.innerType._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath] }));
        return base && Object.assign(Object.assign({}, base), { nullable: true });
    }
    const base = (0, parseDef_1.parseDef)(def.innerType._def, Object.assign(Object.assign({}, refs), { currentPath: [...refs.currentPath, "anyOf", "0"] }));
    return base && { anyOf: [base, { type: "null" }] };
}
exports.parseNullableDef = parseNullableDef;
