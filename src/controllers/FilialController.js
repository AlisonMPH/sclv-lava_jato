import { FilialService } from "../services/FilialService.js";

class FilialController {
  
  static async findAll(req, res, next) {
    FilialService.findAll()
        .then(objs => res.json(objs))
        .catch(next);
  }

  static async findByPk(req, res, next) {
    FilialService.findByPk(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async create(req, res, next) {
    FilialService.create(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async update(req, res, next) {
    FilialService.update(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async delete(req, res, next) {
    FilialService.delete(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

}

export { FilialController };