"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const _1 = require("./");
class Service {
    constructor() {
        this.index = async () => {
            return await _1.DroneModel.findAll();
        };
        this.create = async (drone) => {
            let _data = {
                serial_number: drone.serial_number,
                model: drone.model,
                weight_limit: drone.weight_limit,
                battery_capacity: drone.battery_capacity,
                state: 'IDLE'
            };
            return await _1.DroneModel.create(_data);
        };
    }
}
exports.Service = Service;
//# sourceMappingURL=service.js.map