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
exports.MedicationModel = void 0;
const sequelize_1 = __importStar(require("sequelize"));
const database_1 = require("../shared/database");
class MedicationModel extends sequelize_1.Model {
}
exports.MedicationModel = MedicationModel;
MedicationModel.init({
    name: {
        type: sequelize_1.default.STRING(100),
        unique: {
            name: "name",
            msg: "medication  already exist",
        },
        validate: {
            validateName: function (value) {
                if (/^[a-zA-Z0-9._-]{3,16}$/i.test(value)) {
                    throw new Error('invalid name format, allowed only letters, numbers, ‘-‘, ‘_’');
                }
            }
        },
    },
    weight: {
        type: sequelize_1.default.FLOAT,
    },
    code: {
        type: sequelize_1.default.STRING(100),
        unique: {
            name: "code",
            msg: "medication  already exist",
        },
        validate: {
            validateCode: function (value) {
                if (/^[A-Z0-9._]{3,16}$/i.test(value)) {
                    throw new Error('invalid code format, allowed only upper case letters, underscore and numbers');
                }
            }
        },
    },
    image: {
        type: sequelize_1.default.STRING(500),
    }
}, {
    sequelize: database_1.DB,
    modelName: "medication_table",
});
const options = {
    alter: true,
};
// force: true will drop the table if it already exists
MedicationModel.sync(options).then(() => {
    console.log(" medication_table migrated");
    // Table created
});
//# sourceMappingURL=medicationModel.js.map