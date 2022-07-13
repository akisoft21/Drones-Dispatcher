"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllerHandler_1 = require("../../shared/controllerHandler");
const validation_1 = require("../../middleware/validation");
const dispatchController_1 = require("./dispatchController");
const validationSchemas_1 = require("../validationSchemas");
const Router = express_1.default.Router();
const call = controllerHandler_1.controllerHandler;
const dispatchController = new dispatchController_1.DispatchController();
Router.get("/", call(dispatchController.index, (req, res, next) => []));
Router.use((0, validation_1.validation)(validationSchemas_1.MedicationValidationSchema));
Router.post("/load-drone/:serial_number", call(dispatchController.loadDrone, (req, res, next) => [req.body, req.params.serial_number]));
Router.get("/drone/:serial_number", call(dispatchController.droneMedications, (req, res, next) => [req.params.serial_number]));
exports.DispatchRouter = Router;
//# sourceMappingURL=dispatchRouter.js.map