import { Finalizacoes } from "../models/Finalizacoes.js";
//import { AgendamentoServico } from "../models/AgendamentoServico.js";
import { ClienteService } from "../services/ClienteService.js";
//import { FuncionarioService } from "../models/Funcionario.js";
//import { FormaPagamento } from "../models/FormaPagamento.js";
//import { Status } from "../models/Status.js";

import sequelize from '../config/database-inserts.js';
import { QueryTypes } from 'sequelize';

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
    const { data_saida, observacoes_saida, conf_pag, valortotal } = req.body;
    const { id_agendamento, idforma_pagamento, idstatus } = req.body;

    var desconto1 = 0;
    var desconto2 = 0;
    if ( this.verificarRegrasDeNegocio01(req) ){
      desconto1 = valortotal * 0.2;
    }

    if ( this.verificarRegrasDeNegocio02(req) ){
      desconto2 = valortotal * 0.1;
    }

    valortotal = valortotal - desconto1 - desconto2;

    // Criar a finalização
    const finalizacao = await Finalizacoes.create({
      data_saida,
      observacoes_saida,
      conf_pag,
      valortotal,
      id_agendamento,
      idforma_pagamento,
      idstatus
    });

    return finalizacao;
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Finalizacoes.findByPk(id);
    if (obj == null) throw 'Finalizacao não encontrada!';
    await obj.destroy();
    return obj;
  }

  static async verificarRegrasDeNegocio01(req) {
    const { cliente } = req.body;
    // Verificar se o cliente é um funcionário
    const clienteFuncionario = await ClienteService.findClienteFuncionario(cliente.id);
    if (clienteFuncionario) {
      return true;
    }else{
      return false;
    }
  }
  
  static async verificarRegrasDeNegocio02(req) {
      // Verificar se é a terceira lavagem
    const terceiraLavagem = await ClienteService.verificaTerceiraLavagem(req);
    return terceiraLavagem;
  }
   
}

export { FinalizacoesService };