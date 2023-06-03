//ALISON

import { Model, Sequelize } from "sequelize";

class Status extends Model {
  static init(sequelize) {
    super.init({
      status: {
        type: Sequelize.ENUM("AGENDADO", "EM ANDAMENTO", "FINALIZADO"),
        defaultValue: "AGENDADO"
      }

    }, { sequelize, modelName: "status", tableName: "status" });

  }

  // static associate(models) {
  //   this.belongsTo(models.agendamento, { as: 'agendamento', foreignKey: { name: 'idagendamento' } });
  //   this.belongsTo(models.finalizacao, { as: 'finalizacao', foreignKey: { name: 'idfinalizacao' } });
  // }
}
export { Status };
