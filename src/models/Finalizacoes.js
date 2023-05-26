//ALISON

import { Model, DataTypes } from "sequelize";

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
        }

    }, { sequelize, modelName: "Finalizacoes", tableName: "finalizacoes" });
  }

static associate(models) {
    this.belongsTo(models.agendamento, {as: 'agendamento', foreignKey: {name: 'id_agendamento' , allowNull: false, validate: {notNull: {msg: 'Funcionario deve ser preenchido!'}}}});
    this.belongsTo(models.forma_pagamento, {as: 'forma_pagamento', foreignKey: {name: 'idforma_pagamento' , allowNull: false, validate: {notNull: {msg: 'Veiculo deve ser preenchido!'}}}});
    this.belongsTo(models.status, {as: 'status', foreignKey: {name: 'idstatus' , allowNull: false, validate: {notNull: {msg: 'Tipo Serviço deve ser preenchido!'}}}});
    }
}

export { Finalizacoes };
