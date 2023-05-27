import { Funcionario } from "../models/funcionario.js";
import { Veiculo } from "../models/veiculo.js";
import { TipoServico } from "../models/TipoServico.js";
import { AgendamentoServico } from "../models/AgendamentoServico.js";
import { ClienteService } from "./ClienteService.js";
import { VeiculoService } from "./VeiculoService.js";
import sequelize from '../config/database-inserts.js';
import { Status } from "../models/Status.js";
import { QueryTypes } from 'sequelize';
import { FuncionarioService } from "./FuncionarioService.js";

class AgendamentoService {
    static async findAll() {
        const objs = await AgendamentoServico.findAll({ include: { all: true, nested: true } });
        return objs;

    }

    static async findByPk(req) {
        const { id } = req.params;
        const obj = await AgendamentoServico.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async create(req) {
        const { data_entrada, observacoes_entrada, funcionario, veiculo, tipo_servico } = req.body;

        if (await this.validaRegras(req)) {
            const t = await sequelize.transaction();
            const obj = await AgendamentoServico.create({ data_entrada, observacoes_entrada, idfuncionario: funcionario.id, idveiculo: veiculo.id, idtipo_servico: tipo_servico.id }, { transaction: t });
            try {
                await Status.create({ status: "AGENDADO", idagendamento: obj.id }, { transaction: t }) // Adiciona status inical para o agendamento
                await t.commit();
                return await AgendamentoServico.findByPk(obj.id, { include: { all: true, nested: true } });
            } catch (error) {
                await t.rollback();
                throw "Ocorreu um erro ao realizar o agendamento.";
            }
        }

    }

    static async update(req) {
        const { id } = req.params;
        const { data_entrada, observacoes_entrada, funcionario, veiculo, tipo_servico } = req.body;

        if (await this.canUpdate(req)) {
            const obj = await AgendamentoServico.findByPk(id, { include: { all: true, nested: true } });
            if (obj == null) throw 'Agendamento não encontrado!';
            const t = await sequelize.transaction();
            Object.assign(obj, { data_entrada, observacoes_entrada, idfuncionario: funcionario.id, idveiculo: veiculo.id, idtipo_servico: tipo_servico.id });
            await obj.save({ transaction: t }); // Salvando os dados simples do objeto agendamento
            try {
                await t.commit();
                return await AgendamentoServico.findByPk(obj.id, { include: { all: true, nested: true } });
            } catch (error) {
                await t.rollback();
                throw "Pelo menos uma das fitas informadas não foi encontrada!";
            }
        }

    }

    static async delete(req) {
        const { id } = req.params;
        const obj = await AgendamentoServico.findByPk(id);
        if (obj == null) throw 'Agendamento não encontrado!';
        try {
            await obj.destroy();
            return obj;
        } catch (error) {
            throw "Não é possível remover o agendamento!";
        }
    }

    // Regra de Negócio 1 - Se o cliente é devedor do lava jato, não poderá realizar o agendamento.
    // Regra de Negócio 2 - Funcionário não pode agendar o serviço para ele mesmo.
    // Regra de Negócio 3 - Se o serviço já foi iniciado, o cliente não pode alterar o agendamento.

    static async validaRegras(req) {
        const { data_entrada, observacoes_entrada, funcionario, veiculo, tipo_servico } = req.body;
        const cliente = await VeiculoService.findCliente(req) // Busca o cliente atraves do veiculo
        const func = await FuncionarioService.findFuncionario(req) // Busca o funcionário através do id

        if (cliente[0].is_devedor) { // Valida se o cliente é devedor
            throw 'Agendamento não pode ser realizado. Cliente possui débito a ser pago.'
        }

        if (cliente[0].cpf === func[0].cpf) { // Valida se o funcionário que irá realizar o serviço é diferente do cliente que está solicitando.
            throw "Cliente não pode realizar o serviço para ele mesmo."
        }

        return true
    }

    // Regra de Negócio 3 - Se o serviço já foi iniciado, o cliente não pode alterar o agendamento.
    static async canUpdate(req) {
        const { id } = req.params

        const status = await sequelize.query("SELECT status.*  FROM status WHERE id = :idagendamento", { replacements: { idagendamento: id }, type: QueryTypes.SELECT });

        if (status[0].status !== "AGENDADO") { // Valida se o status do agendamento permite a alteração.
            throw "Não é possível alterar esse agendamento.";
        }

        return true;
    }

}

export { AgendamentoService };
