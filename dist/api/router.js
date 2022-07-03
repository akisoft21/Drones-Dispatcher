"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllerHandler_1 = require("../shared/controllerHandler");
const controller_1 = require("./controller");
const router = express_1.default.Router();
const call = controllerHandler_1.controllerHandler;
const dispatchController = new controller_1.Controller();
router.get("/", call(dispatchController.index, (req, res, next) => []));
exports.DispatchRouter = router;
//# sourceMappingURL=router.js.map