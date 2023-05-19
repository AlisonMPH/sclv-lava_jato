import { FinalizacaoServicoService } from "../services/FinalizacaoServicoService.js";

class FinalizacaoServicoController {
  
  static async findAll(req, res, next) {
    FinalizacaoServicoService.findAll()
        .then(objs => res.json(objs))
        .catch(next);
  }

  static async findByPk(req, res, next) {
    FinalizacaoServicoService.findByPk(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async create(req, res, next) {
    FinalizacaoServicoService.create(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async update(req, res, next) {
    FinalizacaoServicoService.update(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async delete(req, res, next) {
    FinalizacaoServicoService.delete(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

}

export { FinalizacaoServicoController };