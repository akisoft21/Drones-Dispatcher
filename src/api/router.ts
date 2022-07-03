
import express, { NextFunction } from "express";
import { controllerHandler } from "../shared/controllerHandler";
import  {Controller} from "./controller";

const router = express.Router();
const call = controllerHandler;
const dispatchController = new Controller();

router.get("/", call(dispatchController.index, (req: Request, res: Response, next: NextFunction) => []));

export const DispatchRouter = router;



