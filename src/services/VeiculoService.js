import { Veiculo } from "../models/Veiculo.js";

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
        if (CLIENTE == null) throw 'O Cliente do Veiculo deve ser preenchido!';
        const obj = await Veiculo.create({ PLACA, MARCA, MODELO, COR, ANO, IDCLIENTE: CLIENTE.id });
        return await Veiculo.findByPk(obj.id, { include: { all: true, nested: true } });
    }

    static async update(req) {
        const { id } = req.params;
        const { PLACA, MARCA, MODELO, COR, ANO, CLIENTE } = req.body;
        if (CLIENTE == null) throw 'O CLIENTE do Veiculo deve ser preenchido!';
        const obj = await Veiculo.findByPk(id, { include: { all: true, nested: true } });
        if (obj == null) throw 'Veiculo não encontrado!';
        Object.assign(obj, { PLACA, MARCA, MODELO, COR, ANO, CLIENTE: CLIENTE.id });
        return await Veiculo.findByPk(obj.id, { include: { all: true, nested: true } });
    }

    static async delete(req) {
        const { id } = req.params;
        const obj = await Veiculo.findByPk(id);
        if (obj == null) throw 'Veiculo não encontrado!';
        try {
            await obj.destroy();
            return obj;
        } catch (error) {
            throw "Não é possível remover um Veiculo associado a empréstimos ou reservas!";
        }
    }

    static async findCliente(req) {
        const cliente = req.CLIENTE
        const objs = await sequelize.query(`SELECT veiculos.*  FROM veiculos WHERE idcliente = ${cliente}`, { type: QueryTypes.SELECT }); 
        console.log(objs); 
        return objs;
      }
}

export { VeiculoService };