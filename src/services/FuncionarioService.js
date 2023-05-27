import { Funcionario } from "../models/Funcionario.js";
import { Filial } from "../models/Filial.js";
import sequelize from '../config/database-inserts.js';
import { QueryTypes } from 'sequelize';


class FuncionarioService {

  static async findAll() {
    const objs = await Funcionario.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Funcionario.findByPk(id, { include: { all: true, nested: true } });
    return obj;
  }

  static async create(req) {
    const { NOME, CPF, TELEFONE, EMAIL, SENHA, RUA, NUMERO, CIDADE, BAIRRO, DATA_NASCIMENTO, FILIAL } = req.body;
    if (FILIAL == null) throw 'A Filial do Funcionário deve ser preenchido!';
    const obj = await Funcionario.create({ NOME, CPF, TELEFONE, EMAIL, SENHA, RUA, NUMERO, CIDADE, BAIRRO, DATA_NASCIMENTO, IDFILIAL: FILIAL.ID });
    return await Funcionario.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async update(req) {
    const { id } = req.params;
    const { NOME, CPF, TELEFONE, EMAIL, SENHA, RUA, NUMERO, CIDADE, BAIRRO, DATA_NASCIMENTO, FILIAL } = req.body;
    if (FILIAL == null) throw 'A Filial do Funcionário deve ser preenchido!';
    const obj = await Funcionario.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Funcionário não encontrado!';
    Object.assign(obj, { NOME, CPF, TELEFONE, EMAIL, SENHA, RUA, NUMERO, CIDADE, BAIRRO, DATA_NASCIMENTO, IDFILIAL: FILIAL.ID });
    await obj.save();
    return await Funcionario.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Funcionario.findByPk(id);
    if (obj == null) throw 'Funcionário não encontrado!';
    await obj.destroy();
    return obj;
  }

  static async findFuncionario(req) {
    const { idfuncionario } = req.body
    const funcionario = await sequelize.query("SELECT funcionarios.*  FROM funcionarios WHERE id = :idfuncionario", { replacements: { idfuncionario: idfuncionario }, type: QueryTypes.SELECT });

    return funcionario;
  }


}

export { FuncionarioService };