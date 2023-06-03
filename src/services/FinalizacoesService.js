//ALISON

import { Finalizacoes } from "../models/Finalizacoes.js";
import { AgendamentoServico } from "../models/AgendamentoServico.js";
import { FormaPagamento } from "../models/FormaPagamento.js";
import sequelize from '../config/database-inserts.js';
import { QueryTypes } from 'sequelize';
import { ClienteService } from "./ClienteService.js";
import { AgendamentoService } from "./AgendamentoService.js";

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
    const { data_saida, observacoes_saida, conf_pag, agendamento, forma_pagamento } = req.body;
    console.log(req.body);
    if (agendamento == null) throw 'agendamento deve ser preenchido!';
    if (forma_pagamento == null) throw 'forma_pagamento deve ser preenchido!';

    const valorTotal = await AgendamentoService.calcularTotal(agendamento.id);

    if (await this.verificarRegrasDeNegocio(req)) {
        const t = await sequelize.transaction();
        const obj = await Finalizacoes.create(
          {
            data_saida,
            observacoes_saida,
            conf_pag,
            id_agendamento: agendamento.id,
            idforma_pagamento: forma_pagamento.id,
            valor_total: valorTotal[0].total
          },
          { transaction: t }
      );
        try {
            await t.commit();
            return await Finalizacoes.findByPk(obj.id, { include: { all: true, nested: true } });
        } catch (error) {
            await t.rollback();
            throw "Pelo menos uma das fitas informadas não foi encontrada!";
        }
    }
  }

  static async update(req) {
    const { id } = req.params;
    const { data_saida, observacoes_saida, conf_pag, agendamento, forma_pagamento } = req.body;
    const obj = await Finalizacoes.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Finalização não encontrado!';
    Object.assign(obj, { data_saida, observacoes_saida, conf_pag, VALOR_TOTAL,
    idagendamento: agendamento.id, idforma_pagamento : forma_pagamento.id});
    await obj.save();
    return await Finalizacoes.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Finalizacoes.findByPk(id);
    if (obj == null) throw 'Finalização de serviço não encontrada!';
    await obj.destroy();
    return obj;
  }

  static async updateDescontoLavagem(req) {
    const { id } = req.params;
    const { data_saida, observacoes_saida, conf_pag, agendamento, forma_pagamento, status, VALOR_TOTAL } = req.body;
    if (FILIAL == null) throw 'A Filial do Funcionário deve ser preenchido!';
    const obj = await Finalizacoes.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Funcionário não encontrado!';
    Object.assign(obj, { data_saida, observacoes_saida, conf_pag, VALOR_TOTAL, 
    idagendamento: agendamento.ID, idforma_pagamento : forma_pagamento.ID, idstatus : status.id  });
    await obj.save();
    return await Finalizacoes.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async verificarRegrasDeNegocio(req) {
    // Regra de Negocio 1 -> Aplicar desconto de 20% no valor final caso o cliente seja um funcionário.
    const { data_saida, observacoes_saida, conf_pag, agendamento, forma_pagamento } = req.body;
    return true;


    const clienteFuncionario = await ClienteService.findClienteFuncionario()
    const agendamentos = await agendamentoervico.findByPk(agendamento.id, { include: { all: true, nested: true } });
    const finalizacao = await Finalizacoes.findByPk(finalizacoes.id, { include: { all: true, nested: true } });
    const cliente = a.VEICULO.CLIENTE;
    const qtd_lavagem = cliente.QTD_LAVAGEM;
    const clienteCPF = cliente.CPF;
    const valor = a.TIPO_SERVICO.PRECO;
    //const funcionario_cliente = Funcionario.findAll({where: {cpf == cliente.CPF}});
    const funcionario_cliente = await sequelize.query("SELECT * FROM FUNCIONARIO WHERE FUNCIONARIO.CPF = :clienteCPF ", { replacements: { clienteCPF: clienteCPF }, type: QueryTypes.SELECT });
    // REGRA 1

    }

    // Relatórios
    static async relatorioDeReceitaPorFilial(req) {
      const { inicio, termino, nome } = req.params;
      const objs = await sequelize.query("SELECT agendamentos.idtipo_servico AS tipo_servico_id, tipo_servicos.nome AS tipo_servico_nome, SUM(finalizacoes.valor_total) AS receita FROM agendamentos INNER JOIN finalizacoes ON agendamentos.id = finalizacoes.id_agendamento INNER JOIN funcionarios ON agendamentos.idfuncionario = funcionarios.id INNER JOIN filiais ON funcionarios.idfilial = filiais.id INNER JOIN tipo_servicos ON agendamentos.idtipo_servico = tipo_servicos.id WHERE filiais.nome = :nome AND agendamentos.created_at BETWEEN :inicio AND :termino AND finalizacoes.conf_pag IS true GROUP BY agendamentos.idtipo_servico, tipo_servicos.nome", { replacements: { inicio: inicio, termino: termino, nome: nome }, type: QueryTypes.SELECT });
      return objs;
    }

    static async relatorioDeReceitaTotal(req) {
      const { inicio, termino } = req.params;
      const objs = await sequelize.query("SELECT filiais.nome AS nome_filial, COUNT(agendamentos.id) AS quantidade_agendamentos, SUM(finalizacoes.valor_total) AS valor_total_servicos FROM agendamentos INNER JOIN finalizacoes ON agendamentos.id = finalizacoes.id_agendamento INNER JOIN funcionarios ON agendamentos.idfuncionario = funcionarios.id INNER JOIN filiais ON funcionarios.idfilial = filiais.id WHERE agendamentos.created_at BETWEEN :inicio AND :termino AND finalizacoes.conf_pag IS true GROUP BY filiais.nome", { replacements: { inicio: inicio, termino: termino }, type: QueryTypes.SELECT });
      return objs;
    }


}

export { FinalizacoesService };