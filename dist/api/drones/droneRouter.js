"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllerHandler_1 = require("../../shared/controllerHandler");
const validation_1 = require("../../middleware/validation");
const validationSchemas_1 = require("../validationSchemas");
const droneController_1 = require("./droneController");
const Router = express_1.default.Router();
const call = controllerHandler_1.controllerHandler;
const droneController = new droneController_1.DroneController();
Router.get("/", call(droneController.index, () => []));
Router.use((0, validation_1.validation)(validationSchemas_1.DroneValidationSchema)),
    Router.post("/create-drone", call(droneController.createDrone, (req, next) => [req.body]));
Router.get("/idle-drone", call(droneController.getIdleDrone, () => []));
Router.get("/drone-battery/:serial_number", call(droneController.droneBattery, (req, next) => [req.params.serial_number]));
exports.DroneRouter = Router;
//# sourceMappingURL=droneRouter.js.map