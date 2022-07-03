import express from "express";
import { DB } from "./shared/database";
import {global} from './middleware'
import { BASE_PATH } from "./config";
import { DispatchRouter } from "./api"

class App {
    public express  = express();
    public basePath = BASE_PATH || "";
    constructor(){
        this.boot()
    }
    private boot(){
        this.initDB();
        this.registerMiddlewares();
        this.mountRoutes();
    }
    private initDB(){
        DB.authenticate()
            .then(() => {
                console.log("Database connection has been established successfully.");
            })
            .catch((err) => {
                console.log(err);
            });

    }
    private mountRoutes() {
        this.express.use(`${this.basePath}/dispatch`, DispatchRouter);
    }
    private registerMiddlewares() {
        global(this.express);
    }
}

export default new App().express;