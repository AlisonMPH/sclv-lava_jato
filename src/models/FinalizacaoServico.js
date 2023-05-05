//ALISON

import { Model, DataTypes } from "sequelize";

class FinalizacaoServico extends Model {
  static init(sequelize) {
    super.init({
        DATA_SAIDA: {
          type: DataTypes.DATEONLY,
          validate: {
          }
        },
        OBSERVACOES_SAIDA: {
          type: DataTypes.STRING,
          validate: {
            
          }
        },
        CONF_PAG: {
          type: DataTypes.INTEGER,
          validate: {
            
          }
        }

    }, { sequelize, modelName: "FINALIZACAO_SERVICO", tableName: "FINALIZACAO_SERVICO" });
  }

static associate(models) {
    this.belongsTo(models.AGENDAMENTO_SERVICO, {as: 'AGENDAMENTO_SERVICO', foreignKey: {name: 'IDAGENDAMENTO_SERVICO' , allowNull: false, validate: {notNull: {msg: 'Funcionario deve ser preenchido!'}}}});
    this.belongsTo(models.FORMA_PAGAMENTO, {as: 'FORMA_PAGAMENTO', foreignKey: {name: 'IDFORMA_PAGAMENTO' , allowNull: false, validate: {notNull: {msg: 'Veiculo deve ser preenchido!'}}}});
    this.belongsTo(models.STATUS, {as: 'STATUS', foreignKey: {name: 'IDSTATUS' , allowNull: false, validate: {notNull: {msg: 'Tipo Serviço deve ser preenchido!'}}}});
    }
}

export { FinalizacaoServico };
