import { TipoServico } from "../models/TipoServico.js";

class TipoServicoService {

  static async findAll() {
    const objs = await TipoServico.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await TipoServico.findByPk(id, { include: { all: true, nested: true }});
    return obj;
  }

  static async create(req) {
    const { NOME, PRECO, DESCRICAO, TEMPO_MEDIO } = req.body;
    const obj = await TipoServico.create({ NOME, PRECO, DESCRICAO, TEMPO_MEDIO });
    return await TipoServico.findByPk(obj.id, { include: { all: true, nested: true }});
  }

  static async update(req) {
    const { id } = req.params;
    const { NOME, PRECO, DESCRICAO, TEMPO_MEDIO } = req.body;
    const obj = await TipoServico.findByPk(id, { include: { all: true, nested: true }});
    if (obj == null) throw 'TipoServico não encontrado!';
    Object.assign(obj, { NOME, PRECO, DESCRICAO, TEMPO_MEDIO });
    await obj.save();
    return await TipoServico.findByPk(id, { include: { all: true, nested: true }});
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await TipoServico.findByPk(id, { include: { all: true, nested: true }});
    if (obj == null) throw 'TipoServico não encontrado!';
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "Não é possível remover um TipoServico associado a Agendamento de Serviço!";
    }
  }

}

export { TipoServicoService };