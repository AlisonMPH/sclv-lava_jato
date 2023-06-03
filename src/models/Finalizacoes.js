//ALISON

import { Model, DataTypes, Sequelize } from "sequelize";

class Finalizacoes extends Model {
  static init(sequelize) {
    super.init({
        data_saida: {
          type: DataTypes.DATEONLY,
          validate: {
          }
        },
        observacoes_saida: {
          type: DataTypes.STRING,
          validate: {
            
          }
        },
        conf_pag: {
          type: DataTypes.INTEGER,
          validate: {
            
          }
        },
        valor_total: {
          type: DataTypes.FLOAT,
          validate: {
            
          }
        },
        status: {
           type: Sequelize.ENUM("FINALIZADO", "CANCELADO"),
           defaultValue: "FINALIZADO"
        },
        desconto: {
          type: DataTypes.FLOAT,
          defaultValue: 0.00
        }

    }, { sequelize, modelName: "Finalizacoes", tableName: "finalizacoes" });
  }

static associate(models) {
    this.belongsTo(models.agendamento, {as: 'agendamento', foreignKey: {name: 'id_agendamento' , allowNull: false, validate: {notNull: {msg: 'Agendamento deve ser preenchido!'}}}});
    this.belongsTo(models.forma_pagamento, {as: 'forma_pagamento', foreignKey: {name: 'idforma_pagamento' , allowNull: false, validate: {notNull: {msg: 'Forma de Pagamento deve ser preenchida!'}}}});
    }
}

export { Finalizacoes };
