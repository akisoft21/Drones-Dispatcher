import { IDrone } from "interfaces/IDrone";
import { AppError } from "../../util/app-error";
import { Transaction } from "sequelize";
import { DispatchModel } from "../../api/dispatches";
import { DroneModel } from ".";

export class DroneService {
    transaction: Transaction;
    public index = async () => {
        return await DispatchModel.findAll();
    }
    public createDrone = async (drone: IDrone) => {

        //check if drone exist
        const isDrone = await DroneModel.findOne({ where: { serial_number: drone.serial_number } })
        console.log(isDrone);
        if (isDrone) {
            throw new AppError("Drone Already exist", 400);
        }
        let _data = {
            serial_number: drone.serial_number,
            model: drone.model,
            weight_limit: drone.weight_limit,
            battery_capacity: drone.battery_capacity,
            state: 'IDLE'
        };
        return await DroneModel.create(_data);
    }
    public getIdleDrone = async () => {
        // let that = this
        try {
            // check the drone
            let drones: any = await DroneModel.findAll({ where: { state: 'IDLE' } })
            if (drones.length < 1) {
                throw new AppError("There are no IDLE drones", 400);
            }
            return drones

        } catch (error) {
            throw error;
        }
    }
    public droneBattery = async (droneSerial) => {
        // let that = this
        try {
            // check the drone
            let drone: any = await DroneModel.findOne({ where: { serial_number: droneSerial } })
            if (!drone) {
                throw new AppError("Could not find drone", 400);
            }
            return drone.battery_capacity

        } catch (error) {
            throw error;
        }
    }

}