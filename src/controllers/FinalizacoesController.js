import { FinalizacoesService } from "../services/FinalizacoesService.js";

class FinalizacoesController {
  
  static async findAll(req, res, next) {
    FinalizacoesService.findAll()
        .then(objs => res.json(objs))
        .catch(next);
  }

  static async findByPk(req, res, next) {
    FinalizacoesService.findByPk(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async create(req, res, next) {
    FinalizacoesService.create(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async update(req, res, next) {
    FinalizacoesService.update(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async delete(req, res, next) {
    FinalizacoesService.delete(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

}

export { FinalizacoesController };