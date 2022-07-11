import { IDrone } from "interfaces/IDrone";
import { IMedication } from "interfaces/IMedication";
import { AppError } from "../util/app-error";
import { DroneModel, MedicationModel } from "./"


export class Service {

    public index = async () => {

        return await DroneModel.findAll();
    }
    public createDrone = async (drone: IDrone) => {

        //check if drone exist
        const isDrone = DroneModel.findOne({ where: { serial_number: drone.serial_number } })
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
        let singleMedication = await MedicationModel.findOne({ where: { name: medication.name, code: medication.code } })
        return singleMedication ? singleMedication : await MedicationModel.create({
            name: medication.name,
            code: medication.code,
            weight: medication.weight,
            image: medication.image
        })
    }

    public loadDrone = async (droneSerial: string, data: any) => {

        // check the drone
        let drone: any = await DroneModel.findOne({ where: { serial_number: droneSerial } })
        if (!drone) {
            throw new AppError("Could not find drone", 400);
        }

        if (drone.state !== 'IDLE') {
            throw new AppError("Drone is not IDLE", 400);
        }

        let medication = data.medications
        console.log(medication);

        for (let index = 0; index < medication.length; index++) {
            const element = medication[index];
            console.log("medication.........");
            console.log(element.name);
            console.log("medication..........");
        }

        //loop through objects of items. 




    }

}