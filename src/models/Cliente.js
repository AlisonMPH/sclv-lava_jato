import { Model, DataTypes } from 'sequelize';

class Cliente extends Model {

  static init(sequelize) {
    super.init({
      NOME: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Nome do Cliente deve ser preenchido!" },
          len: { args: [2, 50], msg: "Nome do Cliente deve ter entre 2 e 50 letras!" }
        }
      },
      CPF: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "CPF do Cliente deve ser preenchido!" },
          is: {args: ["[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}"], msg: "CPF do Cliente deve seguir o padrão NNN.NNN.NNN-NN!" },
        }
      },
      TELEFONE: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Telefone do Cliente deve ser preenchido!" }
        }
      },
      EMAIL: { 
        type: DataTypes.STRING, 
        validate: {
          isEmail: true,
          notEmpty: { msg: "Email do Cliente deve ser preenchido!" },
          len: { args: [2, 20], msg: "Email do Cliente deve ter entre 2 e 20 caracteres!" }
        }
      },
      QTD_LAVAGEM: { 
        type: DataTypes.INTEGER
      },
      SENHA: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Senha do Cliente deve ser preenchida!" },
          len: { args: [6, 10], msg: "Senha do Cliente deve ter entre 6 e 10 caracteres!" }
        }
      },
      RUA: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Rua do Cliente deve ser preenchida!" }
        }
      },
      NUMERO: { 
        type: DataTypes.INTEGER, 
        validate: {
          isInt: { msg: "Número da Casa do Cliente deve ser preenchido com um valor inteiro!" }
        }
      },
      CIDADE: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: { msg: "Definir o nome da Cidade do Cliente!" },
            len: { args: [3, 30], msg: "A Cidade do Cliente deve ter entre 3 e 30 letras!" }

        }
    },
      BAIRRO: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: { msg: "Definir o nome do Bairro do Cliente!" },
            len: { args: [3, 30], msg: "O Bairro do Cliente deve ter entre 3 e 30 letras!" }

        }
    },
    DATA_NASCIMENTO: { 
      type: DataTypes.DATEONLY, 
      validate: {
        isDate: { msg: "Nascimento do Cliente deve ser preenchido!" },
        is: {args: ["[0-9]{4}\-[0-9]{2}\-[0-9]{2}"], msg: "Nascimento do Cliente deve seguir o padrão yyyy-MM-dd!" }
      }
    }
    }, { sequelize, modelName: 'CLIENTE', tableName: 'CLIENTE' })
  }
  
}

export { Cliente };