import express from "express";
import { DB } from "./shared/database";
import { global } from './middleware'
import { BASE_PATH } from "./config";
import errorHandler from "./middleware/errorHandler";
import { DroneRouter } from "./api/drones";
import { DispatchRouter } from "./api/dispatches";

class App {
    public express = express();
    public basePath = BASE_PATH || "";
    constructor() {
        this.boot()
    }
    private boot() {
        this.initDB();
        this.registerMiddlewares();
        this.mountRoutes();
        this.handleErrors()
    }
    private initDB() {
        DB.authenticate()
            .then(() => {
                console.log("Database connection has been established successfully.");
            })
            .catch((err) => {
                console.log(err);
            });
    }
    private mountRoutes() {
        this.express.use(`${this.basePath}/drone`, DroneRouter);
        this.express.use(`${this.basePath}/dispatch`, DispatchRouter);
    }
    private registerMiddlewares() {
        global(this.express);
    }
    private handleErrors() {
        process.on("unhandledRejection", (reason, promise) => {
            throw reason;
        });
        process.on("uncaughtException", (error) => {
            console.log(`Uncaught Exception: ${500} - ${error.message}, Stack: ${error.stack}`);
            process.exit(1);
        });
        process.on("SIGINT", () => {
            console.log(" Alright! Bye bye!");
            process.exit();
        });
        this.express.use(errorHandler);
    }
}

export default new App().express;