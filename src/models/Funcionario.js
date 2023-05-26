//ALISON

import { Model, DataTypes } from 'sequelize';

class Funcionario extends Model {

  static init(sequelize) {
    super.init({
      nome: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Nome do Funcionário deve ser preenchido!" },
          len: { args: [2, 50], msg: "Nome do Funcionário deve ter entre 2 e 50 letras!" }
        }
      },
      cpf: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "CPF do Funcionário deve ser preenchido!" },
          is: {args: ["[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}"], msg: "CPF do Funcionário deve seguir o padrão NNN.NNN.NNN-NN!" },
        }
      },
      telefone: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Telefone do Funcionário deve ser preenchido!" }
        }
      },
      email: { 
        type: DataTypes.STRING, 
        validate: {
          isEmail: { msg: "Email do Funcionário deve ser preenchido 'exemplo@exemplo.com'!" },
          notEmpty: { msg: "Email do Funcionário deve ser preenchido!" },
          len: { args: [2, 40], msg: "Email do Funcionário deve ter entre 2 e 20 caracteres!" }
        }
      },
      senha: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Senha do Funcionário deve ser preenchida!" },
          len: { args: [6, 10], msg: "Senha do Funcionário deve ter entre 6 e 10 caracteres!" }
        }
      },
      rua: { 
        type: DataTypes.STRING, 
        validate: {
          notEmpty: { msg: "Rua do Funcionário deve ser preenchida!" }
        }
      },
      numero: { 
        type: DataTypes.INTEGER, 
        validate: {
          isInt: { msg: "Número da Casa do Funcionário deve ser preenchido com um valor inteiro!" }
        }
      },
      cidade: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: { msg: "Definir o nome da Cidade do Funcionario!" },
            len: { args: [3, 30], msg: "A Cidade do Funcionario deve ter entre 3 e 30 letras!" }

        }
    },
      bairro: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: { msg: "Definir o nome do Bairro do Funcionario!" },
            len: { args: [3, 30], msg: "O Bairro do Funcionario deve ter entre 3 e 30 letras!" }

        }
    },
    data_nascimento: { 
      type: DataTypes.DATEONLY, 
      validate: {
        isDate: { msg: "Nascimento do Funcionario deve ser preenchido!" },
        is: {args: ["[0-9]{4}\-[0-9]{2}\-[0-9]{2}"], msg: "Nascimento do Funcionario deve seguir o padrão yyyy-MM-dd!" }
      }
    }
      
    }, { sequelize, modelName: 'funcionario', tableName: 'funcionarios' })
  }

  static associate(models) {
    this.belongsTo(models.filial, {as: 'filial', foreignKey: {name: 'idfilial' , allowNull: false, validate: {notNull: {msg: 'Filial do Funcionário deve ser preenchido!'}}}});
  }
  
}

export { Funcionario };