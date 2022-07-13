
import express, { Request, Response, NextFunction } from "express";
import { controllerHandler, } from "../../shared/controllerHandler";
import { validation } from "../../middleware/validation";
import { DispatchController } from "./dispatchController";
import { MedicationValidationSchema } from "../validationSchemas";

const Router = express.Router();

const call = controllerHandler;
const dispatchController = new DispatchController();

Router.get("/", call(dispatchController.index, (req: Request, res: Response, next: NextFunction) => []));
Router.use(validation(MedicationValidationSchema))
Router.post("/load-drone/:serial_number", call(dispatchController.loadDrone, (req: Request, res: Response, next: NextFunction) => [req.body, req.params.serial_number]));
Router.get("/drone/:serial_number", call(dispatchController.droneMedications, (req: Request, res: Response, next: NextFunction) => [req.params.serial_number]));

export const DispatchRouter = Router;



