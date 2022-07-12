"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchDroneModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../shared/database");
class DispatchDroneModel extends sequelize_1.Model {
}
exports.DispatchDroneModel = DispatchDroneModel;
DispatchDroneModel.init({}, {
    sequelize: database_1.DB,
    modelName: "dispatch_drone",
});
const options = {
    alter: true,
};
// force: true will drop the table if it already exists
DispatchDroneModel.sync(options).then(() => {
    console.log("dispatch_drone table migrated");
    // Table created
});
//# sourceMappingURL=dispatchDroneModel.js.map