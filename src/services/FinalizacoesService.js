import { Finalizacoes } from "../models/Finalizacoes.js";
import { AgendamentoServico } from "../models/AgendamentoServico.js";
import { FormaPagamento } from "../models/FormaPagamento.js";
import { Status } from "../models/Status.js";

import sequelize from '../config/database-inserts.js';
import { QueryTypes } from 'sequelize';
import { ClienteService } from "./ClienteService.js";

class FinalizacoesService {

  static async findAll() {
    const objs = await Finalizacoes.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Finalizacoes.findByPk(id, { include: { all: true, nested: true } });
    return obj;
  }

  static async create(req) {
    const { DATA_SAIDA, OBSERVACOES_SAIDA, CONF_PAG, agendamentos, FORMA_PAGAMENTO, STATUS, ITENS } = req.body;
    if (agendamentos == null) throw 'agendamentos deve ser preenchido!';
    if (FORMA_PAGAMENTO == null) throw 'FORMA_PAGAMENTO deve ser preenchido!';
    if (STATUS == null) throw 'STATUS deve ser preenchido!';
    if (await this.verificarRegrasDeNegocio(req)) {
        const t = await sequelize.transaction();
        try {
            const obj = await Finalizacoes.create(
                {
                    DATA_SAIDA,
                    OBSERVACOES_SAIDA,
                    CONF_PAG,
                    IDagendamentos: agendamentos.ID,
                    IDFORMA_PAGAMENTO: FORMA_PAGAMENTO.ID,
                    IDSTATUS: STATUS.ID
                },
                { transaction: t }
            );

            await Promise.all(
                ITENS.map(async (item) => {
                    const newItem = await obj.createItem(
                        {
                            DATA_SAIDA: item.DATA_SAIDA,
                            OBSERVACOES_SAIDA: item.OBSERVACOES_SAIDA,
                            CONF_PAG: item.CONF_PAG
                        },
                        { transaction: t }
                    );
                    await (await Fita.findByPk(item.fita.id)).update({ disponivel: 0 }, { transaction: t });
                    return newItem;
                })
            );

            await t.commit();
            return await Emprestimo.findByPk(obj.id, { include: { all: true, nested: true } });
        } catch (error) {
            await t.rollback();
            throw "Pelo menos uma das fitas informadas não foi encontrada!";
        }
    }
    //return await Finalizacoes.findByPk(obj.id, { include: { all: true, nested: true } });
}

  static async update(req) {
    const { id } = req.params;
    const { DATA_SAIDA, OBSERVACOES_SAIDA, CONF_PAG, agendamentos, FORMA_PAGAMENTO, STATUS } = req.body;
    if (FILIAL == null) throw 'A Filial do Funcionário deve ser preenchido!';
    const obj = await Finalizacoes.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Funcionário não encontrado!';
    Object.assign(obj, { DATA_SAIDA, OBSERVACOES_SAIDA, CONF_PAG, VALOR_TOTAL,
    IDagendamentos: agendamentos.ID, IDFORMA_PAGAMENTO : FORMA_PAGAMENTO.ID, IDSTATUS : STATUS.ID  });
    await obj.save();
    return await Finalizacoes.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Finalizacoes.findByPk(id);
    if (obj == null) throw 'Funcionário não encontrado!';
    await obj.destroy();
    return obj;
  }

  static async updateDescontoLavagem(req) {
    const { id } = req.params;
    const { DATA_SAIDA, OBSERVACOES_SAIDA, CONF_PAG, agendamentos, FORMA_PAGAMENTO, STATUS, VALOR_TOTAL } = req.body;
    if (FILIAL == null) throw 'A Filial do Funcionário deve ser preenchido!';
    const obj = await Finalizacoes.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Funcionário não encontrado!';
    Object.assign(obj, { DATA_SAIDA, OBSERVACOES_SAIDA, CONF_PAG, VALOR_TOTAL, 
    IDagendamentos: agendamentos.ID, IDFORMA_PAGAMENTO : FORMA_PAGAMENTO.ID, IDSTATUS : STATUS.ID  });
    await obj.save();
    return await Finalizacoes.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async verificarRegrasDeNegocio(req){
    // Regra de Negocio 1 -> Aplicar desconto de 20% no valor final caso o cliente seja um funcionário.
    const clienteFuncionario = await ClienteService.findClienteFuncionario()
    const { agendamentos } = req.body;
    const { finalizacoes } = req.body;
    const agendamento = await AgendamentoServico.findByPk(agendamentos.id, { include: { all: true, nested: true } });
    const finalizacao = await Finalizacoes.findByPk(finalizacoes.id, { include: { all: true, nested: true } });
    const cliente = a.VEICULO.CLIENTE;
    const qtd_lavagem = cliente.QTD_LAVAGEM;
    const clienteCPF = cliente.CPF;
    const valor = a.TIPO_SERVICO.PRECO;
    //const funcionario_cliente = Funcionario.findAll({where: {cpf == cliente.CPF}});
    const funcionario_cliente = await sequelize.query("SELECT * FROM FUNCIONARIO WHERE FUNCIONARIO.CPF = :clienteCPF ", { replacements: { clienteCPF: clienteCPF }, type: QueryTypes.SELECT });
    // REGRA 1
  

    }


}

export { FinalizacoesService };