import { Veiculo } from "../models/Veiculo.js";
import { Cliente } from "../models/Cliente.js";

import sequelize from '../config/database-inserts.js';

class VeiculoService {
    static async findAll() {
        const objs = await Veiculo.findAll({ include: { all: true, nested: true } });
        return objs;
    }

    static async findByPk(req) {
        const { id } = req.params;
        const obj = await Veiculo.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async create(req) {
        const { PLACA, MARCA, MODELO, COR, ANO, CLIENTE } = req.body;
        if (CLIENTE == null) throw 'O Cliente do Veículo deve ser preenchido!';
        const t = await sequelize.transaction();
        const obj = await Veiculo.create({ PLACA, MARCA, MODELO, COR, ANO, IDCLIENTE: CLIENTE.id }, { transaction: t });
        await t.commit();
        return await Veiculo.findByPk(obj.id, { include: { all: true, nested: true } });
      }
    
    static async update(req) {
        const { id } = req.params;
        const { PLACA, MARCA, MODELO, COR, ANO, CLIENTE } = req.body;
        if (CLIENTE == null) throw 'O CLIENTE do Veículo deve ser preenchido!';
        const obj = await Veiculo.findByPk(id, { include: { all: true, nested: true } });
        if (obj == null) throw 'Veículo não encontrado!';
        const t = await sequelize.transaction();
        Object.assign(obj, { PLACA, MARCA, MODELO, COR, ANO, CLIENTE: CLIENTE.id });
        await obj.save({ transaction: t });
        await t.commit();
        return await Veiculo.findByPk(obj.id, { include: { all: true, nested: true } });
    }

    static async delete(req) {
        const { id } = req.params;
        const obj = await Veiculo.findByPk(id);
        if (obj == null) throw 'Veículo não encontrado!';
        try {
            await obj.destroy();
            return obj;
        } catch (error) {
            throw "Não é possível remover um Veículo associado a empréstimos ou reservas!";
        }
    }
}

export { VeiculoService };