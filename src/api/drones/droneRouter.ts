
import express, { Request, NextFunction } from "express";
import { controllerHandler, } from "../../shared/controllerHandler";
import { validation } from "../../middleware/validation";
import { DroneValidationSchema } from "../validationSchemas";
import { DroneController } from "./droneController";

const Router = express.Router();

const call = controllerHandler;
const droneController = new DroneController();

Router.get("/", call(droneController.index, () => []));
Router.use(validation(DroneValidationSchema)),
Router.post("/create-drone", call(droneController.createDrone, (req: Request,  next: NextFunction) => [req.body]));
Router.get("/idle-drone", call(droneController.getIdleDrone, () => []));
Router.get("/drone-battery/:serial_number", call(droneController.droneBattery, (req: Request,  next: NextFunction) => [req.params.serial_number]));

export const DroneRouter = Router;



