import { IMedication } from "interfaces/IMedication";
import { AppError } from "../../util/app-error";
import crypto from "crypto";
import { Transaction } from "sequelize";
import { DroneModel } from "../drones";
import { DispatchModel, MedicationModel } from ".";
import { _getBlobStream } from "../../middleware/uploads";
import { BlockBlobClient } from '@azure/storage-blob';
import { AZURE_CONNECTION_STRING, AZURE_CONTAINER_NAME } from "../../config";

export class DispatchService {
    transaction: Transaction;
    public index = async () => {
        return await DispatchModel.findAll();
    }
    public loadDrone = async (droneSerial: string, data: any) => {
        try {
            // check the drone
            const drone = await DroneModel.findOne({ where: { serial_number: droneSerial } })
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
            //create a drop dispatch
            let dispatch = await DispatchModel.create({ dispatch_id: this.generateCashRefCode() }, { transaction: this.transaction })
            drone.addDispatch(dispatch)

            let all_medication = [];
            //find or create each medication 
            for (let index = 0; index < medication.length; index++) {
                const element = medication[index];
                let single_medication: any = await this.findCreateMedication(element)
                all_medication.push(single_medication);
            }
            dispatch.addMedications(all_medication, { through: "dispatch_medication" });
            console.log(all_medication);
            //set drone to be loaded
            await DroneModel.update({ state: 'LOADED', battery_capacity: drone.battery_capacity - 25 }, { where: { id: drone.id } })
            return { message: "Drone has been loaded successfully" };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public droneMedications = async (droneSerial: string) => {
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
            throw error;
        }

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

    public getBlobName = async (originalName) => {
        const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
        return `${identifier}-${originalName}`;
    };
    public getBlobStream = async (req: any,) => {
        return await _getBlobStream(req);
    };
    public processImage = async (req: any) => {
        try {
            const
                blobName = await this.getBlobName(req.file.originalname)
                , blobService = new BlockBlobClient(AZURE_CONNECTION_STRING, AZURE_CONTAINER_NAME, blobName)
                , streamLength = req.file.buffer.length
            let stream = await this.getBlobStream(req);
            await blobService.uploadStream(stream, streamLength)
            return await blobName;

        } catch (error) {
            console.log(error);
            throw new AppError(`could not update image`);
        }
    }

    private generateCashRefCode = () => {
        return crypto.randomBytes(3).toString("hex");
    }

}