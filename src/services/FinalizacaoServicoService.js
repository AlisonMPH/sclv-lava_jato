import { FinalizacaoServico } from "../models/FinalizacaoServico.js";
import { AgendamentoServico } from "../models/AgendamentoServico.js";
import { FormaPagamento } from "../models/FormaPagamento.js";
import { Status } from "../models/Status.js";

import sequelize from '../config/database-inserts.js';
import { QueryTypes } from 'sequelize';

class FinalizacaoServicoService {

  static async findAll() {
    const objs = await FinalizacaoServico.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await FinalizacaoServico.findByPk(id, { include: { all: true, nested: true } });
    return obj;
  }

  static async create(req) {
    const { DATA_SAIDA, OBSERVACOES_SAIDA, CONF_PAG, AGENDAMENTO_SERVICO, FORMA_PAGAMENTO, STATUS, ITENS } = req.body;
    if (AGENDAMENTO_SERVICO == null) throw 'AGENDAMENTO_SERVICO deve ser preenchido!';
    if (FORMA_PAGAMENTO == null) throw 'FORMA_PAGAMENTO deve ser preenchido!';
    if (STATUS == null) throw 'STATUS deve ser preenchido!';
    if (await this.verificarRegrasDeNegocio(req)) {
        const t = await sequelize.transaction();
        try {
            const obj = await FinalizacaoServico.create(
                {
                    DATA_SAIDA,
                    OBSERVACOES_SAIDA,
                    CONF_PAG,
                    IDAGENDAMENTO_SERVICO: AGENDAMENTO_SERVICO.ID,
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
    //return await FinalizacaoServico.findByPk(obj.id, { include: { all: true, nested: true } });
}

  static async update(req) {
    const { id } = req.params;
    const { DATA_SAIDA, OBSERVACOES_SAIDA, CONF_PAG, AGENDAMENTO_SERVICO, FORMA_PAGAMENTO, STATUS } = req.body;
    if (FILIAL == null) throw 'A Filial do Funcionário deve ser preenchido!';
    const obj = await FinalizacaoServico.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Funcionário não encontrado!';
    Object.assign(obj, { DATA_SAIDA, OBSERVACOES_SAIDA, CONF_PAG, 
    IDAGENDAMENTO_SERVICO: AGENDAMENTO_SERVICO.ID, IDFORMA_PAGAMENTO : FORMA_PAGAMENTO.ID, IDSTATUS : STATUS.ID  });
    await obj.save();
    return await FinalizacaoServico.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await FinalizacaoServico.findByPk(id);
    if (obj == null) throw 'Funcionário não encontrado!';
    await obj.destroy();
    return obj;
  }

  static async verificarRegrasDeNegocio(req){

  }


}

export { FinalizacaoServicoService };