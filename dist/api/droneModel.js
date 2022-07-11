"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneModel = void 0;
const sequelize_1 = __importStar(require("sequelize"));
const database_1 = require("../shared/database");
class DroneModel extends sequelize_1.Model {
}
exports.DroneModel = DroneModel;
// - model (Lightweight, Middleweight, Cruiserweight, Heavyweight);
// - weight limit (500gr max);
// - battery capacity (percentage);
// - state (IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING).
DroneModel.init({
    serial_number: {
        type: sequelize_1.default.STRING(100),
        unique: {
            name: "serial_number",
            msg: "Drone with serial number already exist",
        },
        validate: {
            max: 100,
        },
    },
    model: {
        type: sequelize_1.default.ENUM({ values: ["Lightweight", "Middleweight", "Cruiserweight", "Heavyweight"] }),
        defaultValue: "Lightweight",
    },
    weight_limit: {
        type: sequelize_1.default.FLOAT,
        validate: {
            max: 500,
        },
    },
    battery_capacity: {
        type: sequelize_1.default.FLOAT,
        validate: {
            max: 100,
        },
    },
    state: {
        type: sequelize_1.default.ENUM({ values: ["IDLE", "LOADING", "LOADED", "DELIVERING", "RETURNING"] }),
        defaultValue: "IDLE",
    },
}, {
    sequelize: database_1.DB,
    modelName: "drone_table",
});
const options = {
    alter: true,
};
// force: true will drop the table if it already exists
DroneModel.sync(options).then(() => {
    console.log("drone_table migrated");
    // Table created
});
//# sourceMappingURL=droneModel.js.map