import express from "express";
import { DB } from "./shared/database";

class App {
    public express  = express();
    constructor(){
        this.boot()
    }
    private boot(){
        this.initDB();
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
}

export default new App().express;