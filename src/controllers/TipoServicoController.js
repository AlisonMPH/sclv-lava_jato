import { TipoServicoService } from "../services/TipoServicoService.js";

class TipoServicoController {
  
  static async findAll(req, res, next) {
    TipoServicoService.findAll()
        .then(objs => res.json(objs))
        .catch(next);
  }

  static async findByPk(req, res, next) {
    TipoServicoService.findByPk(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async create(req, res, next) {
    TipoServicoService.create(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async update(req, res, next) {
    TipoServicoService.update(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async delete(req, res, next) {
    TipoServicoService.delete(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

}

export { TipoServicoController };