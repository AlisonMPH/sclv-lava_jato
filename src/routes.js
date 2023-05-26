import express from "express";

import { FilialController } from "./controllers/FilialController.js";
import { FuncionarioController } from "./controllers/FuncionarioController.js";
import { TipoServicoController } from "./controllers/TipoServicoController.js";
import { ClienteController } from "./controllers/ClienteController.js";
import { VeiculoController } from "./controllers/VeiculoController.js";
import { AgendamentoController } from "./controllers/AgendamentoController.js";

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

routes.get('/cliente', ClienteController.findAll);
routes.get('/cliente/:id', ClienteController.findByPk);
routes.post('/cliente', ClienteController.create);
routes.put('/cliente/:id', ClienteController.update);
routes.delete('/cliente/:id', ClienteController.delete);

routes.get('/veiculo', VeiculoController.findAll);
routes.get('/veiculo/:id', VeiculoController.findByPk);
routes.post('/veiculo', VeiculoController.create);
routes.put('/veiculo/:id', VeiculoController.update);
routes.delete('/veiculo/:id', VeiculoController.delete);

routes.get('/agendamento', AgendamentoController.findAll);
routes.get('/agendamento/:id', AgendamentoController.findByPk);
routes.post('/agendamento', AgendamentoController.create);
routes.put('/agendamento/:id', AgendamentoController.update);
routes.delete('/agendamento/:id', AgendamentoController.delete);

export default routes;