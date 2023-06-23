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
    const { nome, limite_diario, rua, bairro, cidade, numero, cnpj } = req.body;
    const obj = await Filial.create({ nome, limite_diario, rua, bairro, cidade, numero, cnpj});
    return await Filial.findByPk(obj.id, { include: { all: true, nested: true }});
  }

  static async update(req) {
    const { id } = req.params;
    const { nome, limite_diario, rua, bairro, cidade, numero, cnpj } = req.body;
    const obj = await Filial.findByPk(id, { include: { all: true, nested: true }});
    if (obj == null) throw 'Filial não encontrada!';
    Object.assign(obj, { nome, limite_diario, rua, bairro, cidade, numero, cnpj });
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