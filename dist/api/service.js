"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const _1 = require("./");
class Service {
    constructor() {
        this.index = async () => {
            return await _1.DroneModel.findAll();
        };
        this.create = async () => {
            let data = {
                serial_number: 'sfjhdskf',
                model: 'Lightweight',
                weight_limit: 499,
                battery_capacity: 99,
                state: 'IDLE'
            };
            return await _1.DroneModel.create(data);
        };
    }
}
exports.Service = Service;
//# sourceMappingURL=service.js.map