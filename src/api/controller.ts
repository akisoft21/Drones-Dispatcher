import { BaseController } from "../shared/baseController";
import { Service } from "./service";


export class Controller extends BaseController {

    private dispatchService = new Service();
    public index = async () => {
        this.dispatchService.index()
        return this.sendResponse(await this.dispatchService.index());
    }

}
