import { DroneModel } from "./"


export class Service {

    public index = async () => {
       
        return await DroneModel.findAll();
    }

    public create = async () => {
        let data = {
            serial_number: 'sfjhdskf',
            model:'Lightweight',
            weight_limit: 499,
            battery_capacity: 99,
            state:'IDLE'
        };
        return await DroneModel.create(data);
    }
}