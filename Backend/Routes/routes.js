import { Router } from "express";
import TurmasController from "../Controllers/TurmasController.js";
import UsuariosController from "../Controllers/UsuariosController.js";

const routes = Router();

routes.get("/Turmas", TurmasController.getAll);
routes.get("/Turma/:id", TurmasController.getOne);
routes.get("/Turmas/Pesquisar/:ano", TurmasController.getByAno);
routes.post("/Turmas/Cadastrar", TurmasController.create);
routes.post("/Turmas/Adicionar/Aluno", TurmasController.addAluno);
routes.post("/Turmas/Remover/Aluno", TurmasController.removeAluno);

routes.post("/Usuarios/CadastrarAluno", UsuariosController.createAluno); //Somente para testes
routes.post("/Usuarios/Buscar/Alunos", UsuariosController.getAlunoByNameOrEmail);
routes.get("/Usuarios/Alunos", UsuariosController.getAllAlunos); 
routes.get("/Usuarios/:id", UsuariosController.getOne);

export default routes;