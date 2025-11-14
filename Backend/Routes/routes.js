import { Router } from "express";
import TurmasController from "../Controllers/TurmasController.js";
import materiaController from "../Controllers/materiaController.js";

const routes = Router();

//rotas de Turmas
routes.get("/Turmas", TurmasController.getAll);
routes.get("/Turma/:id", TurmasController.getOne);

routes.post("/Turmas/Cadastrar", TurmasController.create);

//rotas de Materias
routes.post("/Materias/Cadastrar", materiaController.criarMateria);

routes.get("/Materias", materiaController.listarMaterias);
routes.get("/Materias/:id", materiaController.buscarMateriaPorId);
routes.put("/Materias/Editar/:id", materiaController.editarMateria);

export default routes;