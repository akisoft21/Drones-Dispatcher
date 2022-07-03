"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.DroneValidationSchema = joi_1.default.object().keys({
    serial_number: joi_1.default.string().required(),
    model: joi_1.default.string().required(),
    weight_limit: joi_1.default.number().max(500).required(),
    battery_capacity: joi_1.default.number().max(100).required(),
    state: joi_1.default.string()
});
//# sourceMappingURL=validationSchemas.js.map