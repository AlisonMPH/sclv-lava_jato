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
        const { nome, cpf, telefone, email, senha, rua, numero, cidade, bairro, data_nascimento } = req.body;
        if (bairro == null) throw 'O bairro do Cliente deve ser preenchido!';
        const obj = await Cliente.create({ nome, cpf, telefone, email, senha, rua, numero, cidade, bairro, data_nascimento });
        return await Cliente.findByPk(obj.id, { include: { all: true, nested: true } });
    }

    static async update(req) {
        const { id } = req.params;
        const { nome, cpf, telefone, email, senha, rua, numero, cidade, bairro, data_nascimento } = req.body;
        if (bairro == null) throw 'O bairro do Cliente deve ser preenchido!';
        const obj = await Cliente.findByPk(id, { include: { all: true, nested: true } });
        if (obj == null) throw 'Cliente não encontrado!';
        Object.assign(obj, { nome, cpf, telefone, email, senha, rua, numero, cidade, bairro, data_nascimento });
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
     
      static async findClienteFuncionario(id) {
        const { clienteId } = req.params;
        const objs = await sequelize.query(
            "SELECT * FROM cliente C, funcionario F WHERE C.cpf = F.cpf AND C.id = :clienteId",
            { replacements: { clienteId: clienteId }, type: QueryTypes.SELECT }
        );

        if (objs != null) {
            return objs;
        }
    }

    static async verificaTerceiraLavagem(req) {
        const { cliente } = req.body;
        const qtd_lavagem = await ClienteService.findByPk(cliente.id, { include: { all: true, nested: true } });
        const qtdLavagem = qtd_lavagem.cliente.qtd_lavagem;

        if (qtdLavagem % 3 == 0) {
            return true;
        } else {
            return false;
        }
    }
}

export { ClienteService };