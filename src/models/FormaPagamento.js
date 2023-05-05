//ALISON

import { Model, DataTypes } from "sequelize";

class FormaPagamento extends Model {
  static init(sequelize) {
    super.init({
        FORMA_PAG: {
          type: DataTypes.STRING,
        }
        
        }, { sequelize, modelName: "FORMA_PAGAMENTO", tableName: "FORMA_PAGAMENTO" });
  
    }
}
export { FormaPagamento };
