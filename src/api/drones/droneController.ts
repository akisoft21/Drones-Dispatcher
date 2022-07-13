import { IDrone } from "interfaces/IDrone";
import { BaseController } from "../../shared/baseController";
import { DroneService } from "./droneService";

export class DroneController extends BaseController {
    private dispatchService = new DroneService();
    public index = async () => {
        this.dispatchService.index()
        return this.sendResponse(await this.dispatchService.index());
    }
    public createDrone = async (data: IDrone) => {
        return this.sendResponse(await this.dispatchService.createDrone(data));
    }
    public getIdleDrone = async () => {
        return this.sendResponse(await this.dispatchService.getIdleDrone());
    }
    public droneBattery = async (droneSerial) => {
        return this.sendResponse(await this.dispatchService.droneBattery(droneSerial));
    }
    

    
}
