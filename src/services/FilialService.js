import { Filial } from "../models/Filial.js";

class FilialService {

  static async findAll() {
    const objs = await Filial.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Filial.findByPk(id, { include: { all: true, nested: true }});
    return obj;
  }

  static async create(req) {
    const { NOME, LIMITE_DIARIO, RUA, BAIRRO, CIDADE, NUMERO, CNPJ } = req.body;
    const obj = await Filial.create({ NOME, LIMITE_DIARIO, RUA, BAIRRO, CIDADE, NUMERO, CNPJ});
    return await Filial.findByPk(obj.id, { include: { all: true, nested: true }});
  }

  static async update(req) {
    const { id } = req.params;
    const { NOME, LIMITE_DIARIO, RUA, BAIRRO, CIDADE, NUMERO, CNPJ } = req.body;
    const obj = await Filial.findByPk(id, { include: { all: true, nested: true }});
    if (obj == null) throw 'Filial não encontrada!';
    Object.assign(obj, { NOME, LIMITE_DIARIO, RUA, BAIRRO, CIDADE, NUMERO, CNPJ });
    await obj.save();
    return await Filial.findByPk(id, { include: { all: true, nested: true }});
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Filial.findByPk(id, { include: { all: true, nested: true }});
    if (obj == null) throw 'Filial não encontrada!';
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "Não é possível remover uma Filial associada a funcionarios!";
    }
  }

}

export { FilialService };