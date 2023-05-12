//ALISON

import { Model, DataTypes } from "sequelize";

class Status extends Model {
  static init(sequelize) {
    super.init({
        STATUS: {
          type: DataTypes.STRING,
        }
        
        }, { sequelize, modelName: "STATUS", tableName: "STATUS" });
  
    }
}

export { Status };
