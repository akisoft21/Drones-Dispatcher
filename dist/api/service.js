"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const app_error_1 = require("../util/app-error");
const _1 = require("./");
class Service {
    constructor() {
        this.index = async () => {
            return await _1.DroneModel.findAll();
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
        this.findCreateMedication = async (medication) => {
            let singleMedication = await _1.MedicationModel.findOne({ where: { name: medication.name, code: medication.code } });
            return singleMedication ? singleMedication : await _1.MedicationModel.create({
                name: medication.name,
                code: medication.code,
                weight: medication.weight,
                image: medication.image
            });
        };
        this.loadDrone = async (droneSerial, data) => {
            // check the drone
            let drone = await _1.DroneModel.findOne({ where: { serial_number: droneSerial } });
            if (!drone) {
                throw new app_error_1.AppError("Could not find drone", 400);
            }
            if (drone.state !== 'IDLE') {
                throw new app_error_1.AppError("Drone is not IDLE", 400);
            }
            let medication = data.medications;
            console.log(medication);
            for (let index = 0; index < medication.length; index++) {
                const element = medication[index];
                console.log("medication.........");
                console.log(element.name);
                console.log("medication..........");
            }
            //loop through objects of items. 
        };
    }
}
exports.Service = Service;
//# sourceMappingURL=service.js.map