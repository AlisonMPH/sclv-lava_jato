//CAMILA ALISON

import { Model, DataTypes } from "sequelize";

class TipoServico extends Model {
  static init(sequelize) {
    super.init({
        NOME: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: "Nome do Serviço deve ser preenchido!" },
            len: {
              args: [2, 30],
              msg: "Nome do Serviço deve ter entre 2 e 10 letras!"
            }
          }
        },
        PRECO: {
          type: DataTypes.FLOAT,
          validate: {
            notEmpty: { msg: "Preco do Serviço deve ser preenchido!" },
            len: {
              args: [2, 50],
              msg: "A Marca do Serviço deve ter entre 2 e 50 letras!"
            }
          }
        },
        DESCRICAO: {
          type: DataTypes.STRING,
        },
        TEMPO_MEDIO: {
          type: DataTypes.INTEGER,
          validate: {
            notEmpty: { msg: "Tempo do Serviço deve ser preenchido!" }
          }
        }
    }, { sequelize, modelName: "TIPO_SERVICO", tableName: "TIPO_SERVICO" });
  }
}

export { TipoServico };
