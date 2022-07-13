"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneController = void 0;
const baseController_1 = require("../../shared/baseController");
const droneService_1 = require("./droneService");
class DroneController extends baseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.dispatchService = new droneService_1.DroneService();
        this.index = async () => {
            this.dispatchService.index();
            return this.sendResponse(await this.dispatchService.index());
        };
        this.createDrone = async (data) => {
            return this.sendResponse(await this.dispatchService.createDrone(data));
        };
        this.getIdleDrone = async () => {
            return this.sendResponse(await this.dispatchService.getIdleDrone());
        };
        this.droneBattery = async (droneSerial) => {
            return this.sendResponse(await this.dispatchService.droneBattery(droneSerial));
        };
    }
}
exports.DroneController = DroneController;
//# sourceMappingURL=droneController.js.map