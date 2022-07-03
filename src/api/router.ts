
import express, { NextFunction } from "express";
import { controllerHandler, } from "../shared/controllerHandler";
import  {Controller} from "./controller";
import { validation } from "../middleware/validation";
import { DroneValidationSchema } from "./validationSchemas";

const router = express.Router();
const call = controllerHandler;
const dispatchController = new Controller();
router.use(validation(DroneValidationSchema))

router.get("/", call(dispatchController.index, (req: Request, res: Response, next: NextFunction) => []));
router.post("/create-drone", call(dispatchController.createDrone, (req: Request, res: Response, next: NextFunction) => [req.body]));

export const DispatchRouter = router;



