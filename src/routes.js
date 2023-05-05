import express from "express";

import { FilialController } from "./controllers/FilialController.js"
import { FuncionarioController } from "./controllers/FuncionarioController.js"
import { TipoServicoController } from "./controllers/TipoServicoController.js"

const routes = express.Router();

routes.get('/filial', FilialController.findAll);
routes.get('/filial/:id', FilialController.findByPk);
routes.post('/filial', FilialController.create);
routes.put('/filial/:id', FilialController.update);
routes.delete('/filial/:id', FilialController.delete);

routes.get('/funcionario', FuncionarioController.findAll);
routes.get('/funcionario/:id', FuncionarioController.findByPk);
routes.post('/funcionario', FuncionarioController.create);
routes.put('/funcionario/:id', FuncionarioController.update);
routes.delete('/funcionario/:id', FuncionarioController.delete);

routes.get('/tiposervico', TipoServicoController.findAll);
routes.get('/tiposervico/:id', TipoServicoController.findByPk);
routes.post('/tiposervico', TipoServicoController.create);
routes.put('/tiposervico/:id', TipoServicoController.update);
routes.delete('/tiposervico/:id', TipoServicoController.delete);

export default routes;