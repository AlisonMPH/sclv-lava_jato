//CAMILA

import { Model, DataTypes } from "sequelize";

class AgendamentoServico extends Model {
  static init(sequelize) {
    super.init({
        DATA_ENTRADA: {
          type: DataTypes.DATEONLY,
          validate: {
          }
        },
        OBSERVACOES_ENTRADA: {
          type: DataTypes.STRING,
          validate: {
            
          }
        }

    }, { sequelize, modelName: "AGENDAMENTO_SERVICO", tableName: "AGENDAMENTO_SERVICO" });
  }

static associate(models) {
    this.belongsTo(models.FUNCIONARIO, {as: 'FUNCIONARIO', foreignKey: {name: 'IDFUNCIONARIO' , allowNull: false, validate: {notNull: {msg: 'Funcionario deve ser preenchido!'}}}});
    this.belongsTo(models.VEICULO, {as: 'VEICULO', foreignKey: {name: 'IDVEICULO' , allowNull: false, validate: {notNull: {msg: 'Veiculo deve ser preenchido!'}}}});
    this.belongsTo(models.TIPO_SERVICO, {as: 'TIPO_SERVICO', foreignKey: {name: 'IDTIPO_SERVICO' , allowNull: false, validate: {notNull: {msg: 'Tipo Serviço deve ser preenchido!'}}}});
    }
}

export { AgendamentoServico };
