import Sequelize, { Model } from "sequelize";
import { DB } from "../../shared/database";
import { DispatchMedicationModel } from "./dispatchMedicationModel";
import { DispatchModel } from "./dispatchModel";
export class MedicationModel extends Model {
    /* 
        Each **Medication** has: 
- name (allowed only letters, numbers, ‘-‘, ‘_’);
- weight;
- code (allowed only upper case letters, underscore and numbers);
- image (picture of the medication case).
    */
}

MedicationModel.init(
    {
        name: {
            type: Sequelize.STRING(100),
            unique: {
                name: "name",
                msg: "medication  already exist",
            },
            validate: {
                validateName: function (value) {
                    if (!(/^[a-zA-Z0-9._-]{3,16}$/i.test(value))) {
                        throw new Error('invalid name format, allowed only letters, numbers, ‘-‘, ‘_’')
                    }
                }
            },
        },
        weight: {
            type: Sequelize.FLOAT,
        },
        code: {
            type: Sequelize.STRING(100),
            unique: {
                name: "code",
                msg: "medication  already exist",
            },
            
        },
        image: {
            type: Sequelize.STRING(500),
        }

    },
    {
        sequelize: DB,
        modelName: "medication",
    },
);


DispatchModel.belongsToMany(MedicationModel, { through: DispatchMedicationModel })
MedicationModel.belongsToMany(DispatchModel, { through: DispatchMedicationModel })
const options: any = {
    alter: true,
};



// force: true will drop the table if it already exists
MedicationModel.sync(options).then(() => {
    console.log("medication_table migrated");
    // Table created
});
