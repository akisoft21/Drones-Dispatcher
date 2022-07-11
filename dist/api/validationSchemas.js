"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationValidationSchema = exports.DroneValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.DroneValidationSchema = joi_1.default.object().keys({
    serial_number: joi_1.default.string().required(),
    model: joi_1.default.string().required(),
    weight_limit: joi_1.default.number().max(500).required(),
    battery_capacity: joi_1.default.number().max(100).required(),
    state: joi_1.default.string()
});
let medication = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    weight: joi_1.default.number().required(),
    code: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
});
exports.MedicationValidationSchema = joi_1.default.object().keys({
    medications: joi_1.default.array().items(medication)
});
//# sourceMappingURL=validationSchemas.js.map