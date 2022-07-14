"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = exports.uploadStrategy = exports.global = void 0;
const global_1 = __importDefault(require("./global"));
exports.global = global_1.default;
const uploads_1 = require("./uploads");
Object.defineProperty(exports, "uploadStrategy", { enumerable: true, get: function () { return uploads_1.uploadStrategy; } });
const validation_1 = require("./validation");
Object.defineProperty(exports, "validation", { enumerable: true, get: function () { return validation_1.validation; } });
//# sourceMappingURL=index.js.map