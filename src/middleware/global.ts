import bodyParser = require("body-parser");
import cors = require("cors");
import { Express } from "express";
export default (app: Express) => {
    app.use(cors({ maxAge: 1728000 }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
};
