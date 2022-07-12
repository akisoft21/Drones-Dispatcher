import { IDrone } from "interfaces/IDrone";
import { IMedication } from "interfaces/IMedication";
import { AppError } from "../util/app-error";
import { DroneModel, MedicationModel } from "./"
import crypto from "crypto";
import { DispatchModel } from "./dispatchModel";

import { Transaction } from "sequelize";






export class Service {
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
    public findCreateMedication = async (medication: IMedication) => {
        let singleMedication: any = await MedicationModel.findOne({ where: { name: medication.name, code: medication.code } })
        return singleMedication !== null ? singleMedication : await MedicationModel.create({
            name: medication.name,
            code: medication.code,
            weight: medication.weight,
            image: medication.image
        })
    }

    public loadDrone = async (droneSerial: string, data: any) => {
        // let that = this
        try {
            // First, we start a transaction and save it into a variable


            // check the drone
            let drone: any = await DroneModel.findOne({ where: { serial_number: droneSerial } })
            console.log("Drones", drone.id);

            if (!drone) {
                throw new AppError("Could not find drone", 400);
            }
            //check drone status 
            if (drone.state !== 'IDLE') {
                throw new AppError("Drone is not IDLE", 400);
            }

            //check drone battery level 
            if (drone.battery_capacity < 25) {
                throw new AppError(`Drone battery level (${drone.battery_capacity}) is too low`, 400);
            }

            //set drone to be loading 
            await DroneModel.update({ state: 'LOADING' }, { where: { id: drone.id } })

            //check the weight of the items 
            let medication = data.medications
            let total_weight = await medication.map(item => item.weight).reduce((prev, next) => prev + next);
            console.log(total_weight);
            if (total_weight > drone.weight_limit) {
                throw new AppError("Item weight is more than drone capacity", 400);
            }
            let dispatch: any = await DispatchModel.create({ dispatch_id: this.generateCashRefCode() }, { transaction: this.transaction })
            // dispatch.addDrone_table(drone);
            drone.addDispatch(dispatch)
            let all_medication = [];

            for (let index = 0; index < medication.length; index++) {
                const element = medication[index];
                let single_medication: any = await this.findCreateMedication(element)
                all_medication.push(single_medication);
                // dispatch.addMedication(single_medication, { through: "dispatch_medication" });
            }
            dispatch.addMedications(all_medication, { through: "dispatch_medication" });
            console.log(all_medication);
            // this.transaction.commit();

            //set drone to be loaded
            await DroneModel.update({ state: 'LOADED', battery_capacity: drone.battery_capacity - 25 }, { where: { id: drone.id } })

            return { message: "Drone has been loaded successfully" };


        } catch (error) {
            console.log(error);
            // that.transaction.rollback();
            throw error;


        }


    }

    public droneMedications = async (droneSerial: string) => {
        // let that = this
        try {
            // check the drone
            let drone: any = await DroneModel.findOne({ where: { serial_number: droneSerial } })
            if (!drone) {
                throw new AppError("Could not find drone", 400);
            }
            //check drone status 
            if (drone.state == 'IDLE') {
                throw new AppError("Drone is IDLE, so there cannot be any medication", 400);
            }

            return await ((await drone.getDispatches()).pop()).getMedications()

        } catch (error) {
            console.log(error);
            // that.transaction.rollback();
            throw error;
        }


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





    private generateCashRefCode = () => {
        return crypto.randomBytes(3).toString("hex");
    }


}