"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneService = void 0;
const app_error_1 = require("../../util/app-error");
const dispatches_1 = require("../../api/dispatches");
const _1 = require(".");
class DroneService {
    constructor() {
        this.index = async () => {
            return await dispatches_1.DispatchModel.findAll();
        };
        this.createDrone = async (drone) => {
            //check if drone exist
            const isDrone = await _1.DroneModel.findOne({ where: { serial_number: drone.serial_number } });
            console.log(isDrone);
            if (isDrone) {
                throw new app_error_1.AppError("Drone Already exist", 400);
            }
            let _data = {
                serial_number: drone.serial_number,
                model: drone.model,
                weight_limit: drone.weight_limit,
                battery_capacity: drone.battery_capacity,
                state: 'IDLE'
            };
            return await _1.DroneModel.create(_data);
        };
        this.getIdleDrone = async () => {
            // let that = this
            try {
                // check the drone
                let drones = await _1.DroneModel.findAll({ where: { state: 'IDLE' } });
                if (drones.length < 1) {
                    throw new app_error_1.AppError("There are no IDLE drones", 400);
                }
                return drones;
            }
            catch (error) {
                throw error;
            }
        };
        this.droneBattery = async (droneSerial) => {
            // let that = this
            try {
                // check the drone
                let drone = await _1.DroneModel.findOne({ where: { serial_number: droneSerial } });
                if (!drone) {
                    throw new app_error_1.AppError("Could not find drone", 400);
                }
                return drone.battery_capacity;
            }
            catch (error) {
                throw error;
            }
        };
    }
}
exports.DroneService = DroneService;
//# sourceMappingURL=droneService.js.map