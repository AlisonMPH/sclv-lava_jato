import { Funcionario } from "../models/funcionario.js";
import { Veiculo } from "../models/veiculo.js";
import { TipoServico } from "../models/TipoServico.js";
import { AgendamentoServico } from "../models/AgendamentoServico.js";
import { ClienteService}  from "./ClienteService.js";
import sequelize from '../config/database-inserts.js';

class AgendamentoService {
    static async findAll() {
        const objs = await AgendamentoServico.findAll({ include: { all: true, nested: true } });
        // console.log(objs[0].veiculo.CLIENTE.IS_DEVEDOR)
        return objs;

    }

    static async findByPk(req) {
        const { id } = req.params;
        const obj = await AgendamentoServico.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async create(req) {
        const { data_entrada, observacoes_entrada, funcionario, veiculo, tipo_servico } = req.body;

        // this.validaRegras(req)
        // console.log(veiculo.CLIENTE)

        // if (await this.verificarRegrasDeNegocio(req)) {
            // const t = await sequelize.transaction();
            const obj = await AgendamentoServico.create({ data_entrada, observacoes_entrada, idfuncionario: funcionario.id, idveiculo: veiculo.id, idtipo_servico: tipo_servico.id });
            this.validaRegras(req)
            return await AgendamentoServico.findByPk(obj.id, { include: { all: true, nested: true } });
            
            try {
                await Promise.all(itens.map(item => obj.createItem({ valor: item.valor, entrega: item.entrega, emprestimoId: obj.id, fitaId: item.fita.id }, { transaction: t })));
                await Promise.all(itens.map(async item => (await Fita.findByPk(item.fita.id)).update({ disponivel: 0 }, { transaction: t })));
                await t.commit();
                return await Emprestimo.findByPk(obj.id, { include: { all: true, nested: true } });
            } catch (error) {
                await t.rollback();
            }
        // }

    }

    static async update() {

    }

    static async delete() {

    }

    // 1 - Se o cliente é devedor do lava jato, não poderá realizar o agendamento.
    static async validaRegras(req) {
        const { data_entrada, observacoes_entrada, funcionario, veiculo, tipo_servico } = req.body;
        
        const devedores = await ClienteService.findDevedores();
        console.log(devedores); 
        console.log(veiculo);

        const clienteDono = await VeiculoService.findCliente();

        let clienteDevedor = false;
        for (let devedor of devedores) {
            if (devedor.id == veiculo.cliente.id) {
                clienteDevedor = true;
            }
        }
        if (clienteDevedor) {
            throw "Este cliente não pode realizar o agendamento";
        }
    }

}

export { AgendamentoService };
