"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const config_1 = require("./config");
const port = config_1.PORT || 3000;
const server = new http_1.Server(app_1.default);
server.listen(config_1.PORT);
console.log(`Server is listening on port: ${port}`);
//# sourceMappingURL=index.js.map