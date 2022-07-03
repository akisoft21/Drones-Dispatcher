"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllerHandler_1 = require("../shared/controllerHandler");
const controller_1 = require("./controller");
const validation_1 = require("../middleware/validation");
const validationSchemas_1 = require("./validationSchemas");
const router = express_1.default.Router();
const call = controllerHandler_1.controllerHandler;
const dispatchController = new controller_1.Controller();
router.use((0, validation_1.validation)(validationSchemas_1.DroneValidationSchema));
router.get("/", call(dispatchController.index, (req, res, next) => []));
router.post("/create-drone", call(dispatchController.createDrone, (req, res, next) => [req.body]));
exports.DispatchRouter = router;
//# sourceMappingURL=router.js.map