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
exports.DispatchModel = void 0;
const sequelize_1 = __importStar(require("sequelize"));
const database_1 = require("../shared/database");
// import { DispatchDroneModel } from "./dispatchDroneModel";
// import { DroneModel } from "./droneModel";
const medicationModel_1 = require("./medicationModel");
class DispatchModel extends sequelize_1.Model {
}
exports.DispatchModel = DispatchModel;
DispatchModel.init({
    dispatch_id: {
        type: sequelize_1.default.STRING(100),
        unique: {
            name: "dispatch_id",
            msg: "dispatch_id with id already exist",
        },
    },
}, {
    sequelize: database_1.DB,
    modelName: "dispatch_table",
});
DispatchModel.hasMany(medicationModel_1.MedicationModel);
medicationModel_1.MedicationModel.belongsToMany(DispatchModel, { through: "dispatch_medication" });
const options = {
    alter: true,
};
// force: true will drop the table if it already exists
DispatchModel.sync(options).then(() => {
    console.log("dispatch table migrated");
    // Table created
});
//# sourceMappingURL=dispactchModel.js.map