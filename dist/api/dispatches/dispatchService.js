"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchService = void 0;
const app_error_1 = require("../../util/app-error");
const crypto_1 = __importDefault(require("crypto"));
const drones_1 = require("../drones");
const _1 = require(".");
// import { IDrone } from "../../interfaces/IDrone";
class DispatchService {
    constructor() {
        this.index = async () => {
            return await _1.DispatchModel.findAll();
        };
        this.loadDrone = async (droneSerial, data) => {
            try {
                // check the drone
                const drone = await drones_1.DroneModel.findOne({ where: { serial_number: droneSerial } });
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
                await drones_1.DroneModel.update({ state: 'LOADING' }, { where: { id: drone.id } });
                //check the weight of the items 
                let medication = data.medications;
                let total_weight = await medication.map(item => item.weight).reduce((prev, next) => prev + next);
                console.log(total_weight);
                if (total_weight > drone.weight_limit) {
                    throw new app_error_1.AppError("Item weight is more than drone capacity", 400);
                }
                let dispatch = await _1.DispatchModel.create({ dispatch_id: this.generateCashRefCode() }, { transaction: this.transaction });
                drone.addDispatch(dispatch);
                let all_medication = [];
                for (let index = 0; index < medication.length; index++) {
                    const element = medication[index];
                    let single_medication = await this.findCreateMedication(element);
                    all_medication.push(single_medication);
                }
                dispatch.addMedications(all_medication, { through: "dispatch_medication" });
                console.log(all_medication);
                //set drone to be loaded
                await drones_1.DroneModel.update({ state: 'LOADED', battery_capacity: drone.battery_capacity - 25 }, { where: { id: drone.id } });
                return { message: "Drone has been loaded successfully" };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        };
        this.droneMedications = async (droneSerial) => {
            try {
                // check the drone
                let drone = await drones_1.DroneModel.findOne({ where: { serial_number: droneSerial } });
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
                throw error;
            }
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
        this.generateCashRefCode = () => {
            return crypto_1.default.randomBytes(3).toString("hex");
        };
    }
}
exports.DispatchService = DispatchService;
//# sourceMappingURL=dispatchService.js.map