"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const baseController_1 = require("../shared/baseController");
const service_1 = require("./service");
class Controller extends baseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.dispatchService = new service_1.Service();
        this.index = async () => {
            this.dispatchService.index();
            return this.sendResponse(await this.dispatchService.index());
        };
        this.createDrone = async (data) => {
            return this.sendResponse(await this.dispatchService.createDrone(data));
        };
        this.loadDrone = async (medications, droneSerial) => {
            return this.sendResponse(await this.dispatchService.loadDrone(droneSerial, medications));
        };
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map