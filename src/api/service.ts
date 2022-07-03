import { IDrone } from "interfaces/IDrone";
import { DroneModel } from "./"


export class Service {

    public index = async () => {
        return await DroneModel.findAll();
    }

    public create = async (drone: IDrone) => {
        let _data = {
            serial_number: drone.serial_number,
            model: drone.model,
            weight_limit: drone.weight_limit,
            battery_capacity: drone.battery_capacity,
            state: 'IDLE'
        };
        return await DroneModel.create(_data);
    }
}