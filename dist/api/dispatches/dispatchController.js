"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchController = void 0;
const baseController_1 = require("../../shared/baseController");
const dispatchService_1 = require("./dispatchService");
class DispatchController extends baseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.dispatchService = new dispatchService_1.DispatchService();
        this.index = async () => {
            this.dispatchService.index();
            return this.sendResponse(await this.dispatchService.index());
        };
        this.loadDrone = async (medications, droneSerial) => {
            return this.sendResponse(await this.dispatchService.loadDrone(droneSerial, medications));
        };
        this.droneMedications = async (droneSerial) => {
            return this.sendResponse(await this.dispatchService.droneMedications(droneSerial));
        };
        this.medicationImage = async (res) => {
            const profile = await this.dispatchService.processImage(res);
            return this.sendResponse(profile);
        };
    }
}
exports.DispatchController = DispatchController;
//# sourceMappingURL=dispatchController.js.map