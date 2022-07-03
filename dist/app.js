"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./shared/database");
const middleware_1 = require("./middleware");
const config_1 = require("./config");
const api_1 = require("./api");
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.basePath = config_1.BASE_PATH || "";
        this.boot();
    }
    boot() {
        this.initDB();
        this.registerMiddlewares();
        this.mountRoutes();
    }
    initDB() {
        database_1.DB.authenticate()
            .then(() => {
            console.log("Database connection has been established successfully.");
        })
            .catch((err) => {
            console.log(err);
        });
    }
    mountRoutes() {
        this.express.use(`${this.basePath}/dispatch`, api_1.DispatchRouter);
    }
    registerMiddlewares() {
        (0, middleware_1.global)(this.express);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map