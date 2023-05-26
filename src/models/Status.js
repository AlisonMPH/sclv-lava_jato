//ALISON

import { Model, DataTypes } from "sequelize";

class Status extends Model {
  static init(sequelize) {
    super.init({
        status: {
          type: DataTypes.STRING,
        }
        
        }, { sequelize, modelName: "status", tableName: "status" });
  
    }
}
export { Status };
