import { BaseController } from "../../shared/baseController";
import { DispatchService } from "./dispatchService";


export class DispatchController extends BaseController {
    private dispatchService = new DispatchService();
    public index = async () => {
        this.dispatchService.index()
        return this.sendResponse(await this.dispatchService.index());
    }
    public loadDrone = async (medications: any, droneSerial: string) => {
        return this.sendResponse(await this.dispatchService.loadDrone(droneSerial, medications));
    }
    public droneMedications = async (droneSerial: string) => {
        return this.sendResponse(await this.dispatchService.droneMedications(droneSerial));
    }
}
