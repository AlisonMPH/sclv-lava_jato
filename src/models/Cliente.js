//CAMILA

import { Model, DataTypes } from 'sequelize';

class Cliente extends Model {

  static init(sequelize) {
    super.init({
      nome: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Nome do Cliente deve ser preenchido!" },
          len: { args: [2, 50], msg: "Nome do Cliente deve ter entre 2 e 50 letras!" }
        }
      },
      cpf: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "CPF do Cliente deve ser preenchido!" },
          is: {args: ["[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}"], msg: "cpf do Cliente deve seguir o padrão NNN.NNN.NNN-NN!" },
        }
      },
      telefone: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Telefone do Cliente deve ser preenchido!" }
        }
      },
      email: { 
        type: DataTypes.STRING, 
        validate: {
          isEmail: true,
          notEmpty: { msg: "Email do Cliente deve ser preenchido!" },
          len: { args: [2, 50], msg: "Email do Cliente deve ter entre 2 e 20 caracteres!" }
        }
      },
      qtd_lavagem: { 
        type: DataTypes.INTEGER
      },
      senha: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Senha do Cliente deve ser preenchida!" },
          len: { args: [6, 10], msg: "Senha do Cliente deve ter entre 6 e 10 caracteres!" }
        }
      },
      rua: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Rua do Cliente deve ser preenchida!" }
        }
      },
      numero: { 
        type: DataTypes.INTEGER, 
        validate: {
          isInt: { msg: "Número da Casa do Cliente deve ser preenchido com um valor inteiro!" }
        }
      },
      cidade: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: { msg: "Definir o nome da Cidade do Cliente!" },
            len: { args: [3, 30], msg: "A Cidade do Cliente deve ter entre 3 e 30 letras!" }

        }
    },
      bairro: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: { msg: "Definir o nome do Bairro do Cliente!" },
            len: { args: [3, 30], msg: "O Bairro do Cliente deve ter entre 3 e 30 letras!" }

        }
    },
    data_nascimento: { 
      type: DataTypes.DATEONLY, 
      validate: {
        isDate: { msg: "Nascimento do Cliente deve ser preenchido!" },
        is: {args: ["[0-9]{4}\-[0-9]{2}\-[0-9]{2}"], msg: "Nascimento do Cliente deve seguir o padrão yyyy-MM-dd!" }
      }
    },
    is_devedor: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
    }, { sequelize, modelName: 'cliente', tableName: 'clientes' })
  }
  
}

export { Cliente };