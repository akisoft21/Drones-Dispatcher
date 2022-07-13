import { DroneModel } from "../drones/droneModel";
import Sequelize, { Model } from "sequelize";
import { DB } from "../../shared/database";
export class DispatchModel extends Model {
    addMedications: any;
}
DispatchModel.init({
    dispatch_id: {
        type: Sequelize.STRING(100),
        unique: {
            name: "dispatch_id",
            msg: "dispatch_id with id already exist",
        },
    },
}, {
    sequelize: DB,
    modelName: "dispatch",
});

DroneModel.hasMany(DispatchModel)
DispatchModel.belongsTo(DroneModel)

const options: any = {
    alter: true,
};

// force: true will drop the table if it already exists
DispatchModel.sync(options).then(() => {
    console.log("dispatch table migrated");
    // Table created
});