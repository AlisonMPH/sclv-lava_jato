import { FormaPagamentoService } from "../services/FormaPagamentoService.js";

class FormaPagamentoController {
  static async findAll(req, res, next) {
    FormaPagamentoService.findAll()
      .then(objs => res.json(objs))
      .catch(next);
  }

}

export { FormaPagamentoController };