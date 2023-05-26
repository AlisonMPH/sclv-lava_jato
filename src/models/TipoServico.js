//CAMILA ALISON

import { Model, DataTypes } from "sequelize";

class TipoServico extends Model {
  static init(sequelize) {
    super.init({
        nome: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: "Nome do Serviço deve ser preenchido!" },
            len: {
              args: [2, 30],
              msg: "Nome do Serviço deve ter entre 2 e 10 letras!"
            }
          }
        },
        preco: {
          type: DataTypes.FLOAT,
          validate: {
            notEmpty: { msg: "Preco do Serviço deve ser preenchido!" },
            len: {
              args: [2, 50],
              msg: "A Marca do Serviço deve ter entre 2 e 50 letras!"
            }
          }
        },
        descricao: {
          type: DataTypes.STRING,
        },
        tempo_medio: {
          type: DataTypes.INTEGER,
          validate: {
            notEmpty: { msg: "Tempo do Serviço deve ser preenchido!" }
          }
        }
    }, { sequelize, modelName: "tipo_servico", tableName: "tipo_servicos" });
  }
}

export { TipoServico };
