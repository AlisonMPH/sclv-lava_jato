import { Cliente } from "../models/Cliente.js";
import sequelize from '../config/database-inserts.js';
import { QueryTypes } from 'sequelize';

class ClienteService {
    static async findAll() {
        const objs = await Cliente.findAll({ include: { all: true, nested: true } });
        return objs;
    }

    static async findByPk(req) {
        const { id } = req.params;
        const obj = await Cliente.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async create(req) {
        const { NOME, CPF, TELEFONE, EMAIL, SENHA, RUA, NUMERO, CIDADE, BAIRRO, DATA_NASCIMENTO } = req.body;
        if (BAIRRO == null) throw 'O Bairro do Cliente deve ser preenchido!';
        const obj = await Cliente.create({ NOME, CPF, TELEFONE, EMAIL, SENHA, RUA, NUMERO, CIDADE, BAIRRO, DATA_NASCIMENTO });
        return await Cliente.findByPk(obj.id, { include: { all: true, nested: true } });
    }

    static async update(req) {
        const { id } = req.params;
        const { NOME, CPF, TELEFONE, EMAIL, SENHA, RUA, NUMERO, CIDADE, BAIRRO, DATA_NASCIMENTO } = req.body;
        if (BAIRRO == null) throw 'O Bairro do Cliente deve ser preenchido!';
        const obj = await Cliente.findByPk(id, { include: { all: true, nested: true } });
        if (obj == null) throw 'Cliente não encontrado!';
        Object.assign(obj, { NOME, CPF, TELEFONE, EMAIL, SENHA, RUA, NUMERO, CIDADE, BAIRRO, DATA_NASCIMENTO });
        await obj.save();
        return await Cliente.findByPk(obj.id, { include: { all: true, nested: true } });
    }

    static async delete(req) {
        const { id } = req.params;
        const obj = await Cliente.findByPk(id);
        if (obj == null) throw 'Cliente não encontrado!';
        try {
            await obj.destroy();
            return obj;
        } catch (error) {
            throw "Não é possível remover um cliente associado a empréstimos ou reservas!";
        }
    }

    static async findDevedores() {
        const objs = await sequelize.query("SELECT clientes.*  FROM clientes WHERE is_devedor = true", { type: QueryTypes.SELECT }); 
        console.log(objs); 
        return objs;
      }
}

export { ClienteService };