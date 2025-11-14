import { Router } from "express";
import SimuladoController from '../Controllers/simuladoController.js';

const routes = Router();

routes.post('/Simulado/Create', SimuladoController.create);
routes.get('/Simulado/:id', SimuladoController.getOne);
routes.get('/Simulados', SimuladoController.getAll);
routes.get('/Turma/Simulado/:id', SimuladoController.getTurma);

export default routes;