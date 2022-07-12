"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const app_error_1 = require("../util/app-error");
const _1 = require("./");
const crypto_1 = __importDefault(require("crypto"));
const dispatchModel_1 = require("./dispatchModel");
class Service {
    constructor() {
        this.index = async () => {
            return await dispatchModel_1.DispatchModel.findAll();
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
            return singleMedication !== null ? singleMedication : await _1.MedicationModel.create({
                name: medication.name,
                code: medication.code,
                weight: medication.weight,
                image: medication.image
            });
        };
        this.loadDrone = async (droneSerial, data) => {
            // let that = this
            try {
                // First, we start a transaction and save it into a variable
                // check the drone
                let drone = await _1.DroneModel.findOne({ where: { serial_number: droneSerial } });
                console.log("Drones", drone.id);
                if (!drone) {
                    throw new app_error_1.AppError("Could not find drone", 400);
                }
                //check drone status 
                if (drone.state !== 'IDLE') {
                    throw new app_error_1.AppError("Drone is not IDLE", 400);
                }
                //check drone battery level 
                if (drone.battery_capacity < 25) {
                    throw new app_error_1.AppError(`Drone battery level (${drone.battery_capacity}) is too low`, 400);
                }
                //set drone to be loading 
                await _1.DroneModel.update({ state: 'LOADING' }, { where: { id: drone.id } });
                //check the weight of the items 
                let medication = data.medications;
                let total_weight = await medication.map(item => item.weight).reduce((prev, next) => prev + next);
                console.log(total_weight);
                if (total_weight > drone.weight_limit) {
                    throw new app_error_1.AppError("Item weight is more than drone capacity", 400);
                }
                let dispatch = await dispatchModel_1.DispatchModel.create({ dispatch_id: this.generateCashRefCode() }, { transaction: this.transaction });
                // dispatch.addDrone_table(drone);
                drone.addDispatch(dispatch);
                let all_medication = [];
                for (let index = 0; index < medication.length; index++) {
                    const element = medication[index];
                    let single_medication = await this.findCreateMedication(element);
                    all_medication.push(single_medication);
                    // dispatch.addMedication(single_medication, { through: "dispatch_medication" });
                }
                dispatch.addMedications(all_medication, { through: "dispatch_medication" });
                console.log(all_medication);
                // this.transaction.commit();
                //set drone to be loaded
                await _1.DroneModel.update({ state: 'LOADED', battery_capacity: drone.battery_capacity - 25 }, { where: { id: drone.id } });
                return { message: "Drone has been loaded successfully" };
            }
            catch (error) {
                console.log(error);
                // that.transaction.rollback();
                throw error;
            }
        };
        this.droneMedications = async (droneSerial) => {
            // let that = this
            try {
                // check the drone
                let drone = await _1.DroneModel.findOne({ where: { serial_number: droneSerial } });
                if (!drone) {
                    throw new app_error_1.AppError("Could not find drone", 400);
                }
                //check drone status 
                if (drone.state == 'IDLE') {
                    throw new app_error_1.AppError("Drone is IDLE, so there cannot be any medication", 400);
                }
                return await ((await drone.getDispatches()).pop()).getMedications();
            }
            catch (error) {
                console.log(error);
                // that.transaction.rollback();
                throw error;
            }
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
        this.generateCashRefCode = () => {
            return crypto_1.default.randomBytes(3).toString("hex");
        };
    }
}
exports.Service = Service;
//# sourceMappingURL=service.js.map