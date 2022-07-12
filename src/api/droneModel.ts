import Sequelize, { Model } from "sequelize";
import { DB } from "../shared/database";

export class DroneModel extends Model { }
// - model (Lightweight, Middleweight, Cruiserweight, Heavyweight);
// - weight limit (500gr max);
// - battery capacity (percentage);
// - state (IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING).
DroneModel.init(
    {
        serial_number: {
            type: Sequelize.STRING(100),
            unique: {
                name: "serial_number",
                msg: "Drone with serial number already exist",
            },
            validate: {
                max: 100,
            },
        },
        model: {
            type: Sequelize.ENUM({ values: ["Lightweight", "Middleweight", "Cruiserweight", "Heavyweight"] }),
            defaultValue: "Lightweight",
        },
        weight_limit: {
            type: Sequelize.FLOAT,
            validate: {
                max: 500,
            },
        },
        battery_capacity: {
            type: Sequelize.FLOAT,
            validate: {
                max: 100,
            },
        },
        state: {
            type: Sequelize.ENUM({ values: ["IDLE", "LOADING", "LOADED", "DELIVERING", "RETURNING"] }),
            defaultValue: "IDLE",
        },

    },
    {
        sequelize: DB,
        modelName: "drone",
    },
)


const options: any = {
    alter: true,
};



// force: true will drop the table if it already exists
DroneModel.sync(options).then(() => {
    console.log("drone_table migrated");
    // Table created
});