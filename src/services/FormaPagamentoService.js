import { FormaPagamento } from "../models/FormaPagamento.js";

class FormaPagamentoService {
    static async findAll() {
        const objs = await FormaPagamento.findAll({ include: { all: true, nested: true } });
        return objs;
    }
}

export { FormaPagamentoService };