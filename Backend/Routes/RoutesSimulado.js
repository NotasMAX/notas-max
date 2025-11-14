import {Router} from "express";
import SimuladoController from '../Controller/SimuladoController.js';

const routes = Router();

routes.post('/Simulado/Create', SimuladoController.create);