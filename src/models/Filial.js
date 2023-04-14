import { Model, DataTypes } from 'sequelize';

class Filial extends Model {

    static init(sequelize){
        super.init({
            NOME: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: "Definir o Nome da Filial!" },
                    len: { args: [3, 30], msg: "O Nome da Filial deve ter entre 3 e 30 letras!" }
                }
            },
            LIMITE_DIARIO: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: { msg: "Definir o limite diario da Filial!" }
                }
            },
            RUA: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: "Definir o nome da Rua da Filial!" },
                    len: { args: [3, 30], msg: "A Rua da Filial deve ter entre 3 e 30 letras!" }

                }
            },
            BAIRRO: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: "Definir o nome do Bairro da Filial!" },
                    len: { args: [3, 30], msg: "O Bairro da Filial deve ter entre 3 e 30 letras!" }

                }
            },
            CIDADE: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: "Definir o nome da Cidade da Filial!" },
                    len: { args: [3, 30], msg: "A Cidade da Filial deve ter entre 3 e 30 letras!" }

                }
            },
            NUMERO: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: { msg: "Definir o Numero da Filial!" }
                }
            },
            CNPJ: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: "Definir o CNPJ da Filial!" },
                    is: {args: ["[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9{2}]"], msg: "CNPJ da Filial seguir o formato: nn.nnn.nnn/nnnn–nn" }
                }
            }


        } , { sequelize, modelName: 'FILIAL', tableName: 'FILIAL' })
    }
}

export { Filial };