//CAMILA

import { Model, DataTypes } from "sequelize";

class Veiculo extends Model {
  static init(sequelize) {
    super.init({
      PLACA: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "A Placa do Veiculo deve ser preenchido!" },
          len: {
            args: [8],
            msg: "A Placa do Veiculo deve ter 8 caracteres!"
          }
        },
        set(value) {
          this.setDataValue('PLACA', value.toUpperCase().replace(/(.{3})(.{4})/, "$1-$2"));
        }
      },
        MARCA: {
          type: DataTypes.STRING,
          validate: {
            len: {
              args: [2, 50],
              msg: "A Marca do Veiculo deve ter entre 2 e 50 letras!"
            }
          }
        },
        MODELO: {
          type: DataTypes.STRING,
          validate: {
            len: {
              args: [2, 50],
              msg: "O Modelo do Veiculo deve ter entre 2 e 50 letras!"
            }
          }
        },
        COR: {
          type: DataTypes.STRING,
          validate: {
            len: {
              args: [2, 50],
              msg: "A Cor do Veiculo deve ter entre 2 e 50 letras!"
            }
          }
        },
        ANO: {
            type: DataTypes.INTEGER,
            validate: {
              isNumeric:{ msg: "O Ano do Veiculo deve ser preenchido por apenas numeros!" },
              len: {
                args: [4],
                msg: "Nome do Cliente deve ter entre 4 Numero!"}
            }
        }
    }, { sequelize, modelName: "VEICULO", tableName: "VEICULO" });
  }
  static associate(models) {
    Veiculo.belongsTo(models.CLIENTE, {as: 'CLIENTE', foreignKey: {name: 'IDCLIENTE' , allowNull: false, validate: {notNull: {msg: 'Cliente do Veiculo deve ser preenchido!'}}}});
  }
}

export { Veiculo };
