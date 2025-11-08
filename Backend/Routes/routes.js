import { Router } from "express";
import TurmasController from "../Controllers/TurmasController.js";

const routes = Router();

routes.get("/Turmas", TurmasController.getAll);
routes.get("/Turma/:id", TurmasController.getOne);
routes.get("/Turmas/Pesquisar/:ano", TurmasController.getByAno);
routes.post("/Turmas/Cadastrar", TurmasController.create);

export default routes;