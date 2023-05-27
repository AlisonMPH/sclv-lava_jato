//CAMILA

import { Model, DataTypes, Sequelize } from "sequelize";

class AgendamentoServico extends Model {
  static init(sequelize) {
    super.init({
        data_entrada: {
          type: DataTypes.DATEONLY,
          validate: {
          }
        },
        observacoes_entrada: {
          type: DataTypes.STRING,
          validate: {
            
          }
        }

    }, { sequelize, modelName: "agendamento", tableName: "agendamentos" });
  }

static associate(models) {
    this.belongsTo(models.funcionario, {as: 'funcionario', foreignKey: {name: 'idfuncionario' , allowNull: false, validate: {notNull: {msg: 'Funcionario deve ser preenchido!'}}}});
    this.belongsTo(models.veiculo, {as: 'veiculo', foreignKey: {name: 'idveiculo' , allowNull: false, validate: {notNull: {msg: 'Veiculo deve ser preenchido!'}}}});
    this.belongsTo(models.tipo_servico, {as: 'tipo_servico', foreignKey: {name: 'idtipo_servico' , allowNull: false, validate: {notNull: {msg: 'Tipo Serviço deve ser preenchido!'}}}});
    }
}

export { AgendamentoServico };
