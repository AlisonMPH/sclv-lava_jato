import { Cliente } from "../models/Cliente.js";
import sequelize from '../config/database-inserts.js';

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
        const t = await sequelize.transaction();
        const obj = await Cliente.create({ NOME, CPF, TELEFONE, EMAIL, SENHA, RUA, NUMERO, CIDADE, BAIRRO, DATA_NASCIMENTO }, { transaction: t });
        await t.commit();
        return await Cliente.findByPk(obj.id, { include: { all: true, nested: true } });
    }

    static async update(req) {
        const { id } = req.params;
        const { NOME, CPF, TELEFONE, EMAIL, SENHA, RUA, NUMERO, CIDADE, BAIRRO, DATA_NASCIMENTO } = req.body;
        if (BAIRRO == null) throw 'O Bairro do Cliente deve ser preenchido!';
        const obj = await Cliente.findByPk(id, { include: { all: true, nested: true } });
        if (obj == null) throw 'Cliente não encontrado!';
        const t = await sequelize.transaction();
        Object.assign(obj, { NOME, CPF, TELEFONE, EMAIL, SENHA, RUA, NUMERO, CIDADE, BAIRRO, DATA_NASCIMENTO });
        await obj.save({ transaction: t });
        await t.commit();
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
    
    static async findClienteFuncionario(id) {
        const { clienteId } = req.params;
        const objs = await sequelize.query("SELECT * FROM CLIENTE C, FUNCIONARIO F WHERE C.CPF = F.CPF AND C.ID= :clienteId", { replacements: { clienteId: clienteId }, type: QueryTypes.SELECT });
        if (objs != null)
        return objs;
    }
}

export { ClienteService };