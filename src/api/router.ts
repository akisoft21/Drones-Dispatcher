
import express, { Request, Response, NextFunction } from "express";
import { controllerHandler, } from "../shared/controllerHandler";
import { Controller } from "./controller";
import { validation } from "../middleware/validation";
import { DroneValidationSchema, MedicationValidationSchema } from "./validationSchemas";

const DroneRouter = express.Router();
const DroneLoadRouter = express.Router();

const call = controllerHandler;
const dispatchController = new Controller();

DroneRouter.get("/", call(dispatchController.index, (req: Request, res: Response, next: NextFunction) => []));
DroneRouter.use(validation(DroneValidationSchema)),
DroneRouter.post("/create-drone", call(dispatchController.createDrone, (req: Request, res: Response, next: NextFunction) => [req.body]));
DroneLoadRouter.use(validation(MedicationValidationSchema))
DroneLoadRouter.post("/load-drone/:serial_number", call(dispatchController.loadDrone, (req: Request, res: Response, next: NextFunction) => [req.body, req.params.serial_number]));
DroneLoadRouter.get("/drone/:serial_number", call(dispatchController.droneMedications, (req: Request, res: Response, next: NextFunction) => [req.params.serial_number]));
DroneLoadRouter.get("/idle-drone", call(dispatchController.getIdleDrone, (req: Request, res: Response, next: NextFunction) => []));
DroneLoadRouter.get("/drone-battery/:serial_number", call(dispatchController.droneBattery, (req: Request, res: Response, next: NextFunction) => [req.params.serial_number]));



export const DispatchRouter = { DroneRouter, DroneLoadRouter };



