import { Router } from "express";
import TurmasController from "../Controllers/TurmasController.js";
import { upload, importarNotas } from "../Controllers/ImportacaoController.js";

const routes = Router();

routes.post("/Importar", upload.single("arquivo"), importarNotas);
routes.get("/Turmas", TurmasController.getAll);
routes.get("/Turma/:id", TurmasController.getOne);
routes.post("/Turmas/Cadastrar", TurmasController.create);

export default routes;