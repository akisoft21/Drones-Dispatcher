import Sequelize, { Model } from "sequelize";
import { DB } from "../../shared/database";
export class DispatchMedicationModel extends Model { }
DispatchMedicationModel.init({
    MedicationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'medications', 
          key: 'id'
        }
      },
      DispatchId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'dispatches', 
          key: 'id'
        }
      }
}, {
    sequelize: DB,
    modelName: "dispatchMedication",
});



const options: any = {
    alter: true,
};

// force: true will drop the table if it already exists
DispatchMedicationModel.sync(options).then(() => {
    console.log("dispatch medication table migrated");
    // Table created
});