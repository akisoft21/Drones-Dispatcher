"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const sqlite3_1 = __importDefault(require("sqlite3"));
exports.DB = new sequelize_1.Sequelize(config_1.DB_NAME, config_1.DB_USER, config_1.DB_PASSWORD, {
    host: config_1.DB_HOST,
    dialect: "sqlite",
    storage: 'drones.sqlite',
    logging: false,
    typeValidation: true,
    dialectOptions: {
        mode: sqlite3_1.default.OPEN_READWRITE | sqlite3_1.default.OPEN_CREATE | sqlite3_1.default.OPEN_FULLMUTEX,
    },
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true,
        underscored: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});
//# sourceMappingURL=database.js.map