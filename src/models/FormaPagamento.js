//ALISON

import { Model, DataTypes } from "sequelize";

class FormaPagamento extends Model {
  static init(sequelize) {
    super.init({
        forma_pag: {
          type: DataTypes.STRING,
        }
        
        }, { sequelize, modelName: "forma_pagamento", tableName: "forma_pagamentos" });
  
    }
}
export { FormaPagamento };
