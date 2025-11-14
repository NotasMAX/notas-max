import { Router } from "express";
import TurmasController from "../Controllers/TurmasController.js";
import materiaController from "../Controllers/materiaController.js";
import alunoController from "../Controllers/alunoController.js";
import professorController from "../Controllers/professorController.js";

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

//rotas de Alunos
routes.post("/Alunos/Cadastrar", alunoController.criarAluno);

routes.get("/Alunos", alunoController.listarAlunos);
routes.get("/Alunos/:id", alunoController.buscarAlunoPorId);
routes.put("/Alunos/Editar/:id", alunoController.editarAluno);

//rotas de Professores
routes.post("/Professores/Cadastrar", professorController.criarProfessor);

routes.get("/Professores", professorController.listarProfessores);
routes.get("/Professores/:id", professorController.buscarProfessorPorId);
routes.put("/Professores/Editar/:id", professorController.editarProfessor);
export default routes;