import { Veiculo } from "../models/Veiculo.js";
import sequelize from '../config/database-inserts.js';
import { QueryTypes } from 'sequelize';

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
        const { placa, marca, modelo, cor, ano, cliente } = req.body;
        if (cliente == null) throw 'O cliente do Veiculo deve ser preenchido!';
        const obj = await Veiculo.create({ placa, marca, modelo, cor, ano, idcliente: cliente.id });
        return await Veiculo.findByPk(obj.id, { include: { all: true, nested: true } });
    }

    static async update(req) {
        const { id } = req.params;
        const { placa, marca, modelo, cor, ano, cliente } = req.body;
        if (cliente == null) throw 'O cliente do Veiculo deve ser preenchido!';
        const obj = await Veiculo.findByPk(id, { include: { all: true, nested: true } });
        if (obj == null) throw 'Veiculo não encontrado!';
        Object.assign(obj, { placa, marca, modelo, cor, ano, cliente: cliente.id });
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

    static async findcliente(req) {
        const { idveiculo } = req.body

        const veiculos = await sequelize.query("SELECT veiculos.*  FROM veiculos WHERE id = :idveiculo", { replacements: { idveiculo: idveiculo }, type: QueryTypes.SELECT }); 

        // console.log(veiculos)
        const idcliente = veiculos[0].idcliente

        // console.log(veiculos[0].idcliente)

        const clientes = await sequelize.query("SELECT clientes.*  FROM clientes WHERE id = :idcliente", { replacements: { idcliente: idcliente }, type: QueryTypes.SELECT }); 
            
        
        // console.log(clientes); 
        return clientes;
      }
}

export { VeiculoService };