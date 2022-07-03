"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./shared/database");
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.boot();
    }
    boot() {
        this.initDB();
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
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map