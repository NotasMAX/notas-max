import { Router } from "express";
import TurmasController from "../Controllers/TurmasController.js";
import TurmaDisciplinasController from "../Controllers/TurmaDisciplinasController.js";
import UsuariosController from "../Controllers/UsuariosController.js";
import MateriasController from "../Controllers/MateriasController.js";

const routes = Router();

routes.get("/Turmas", TurmasController.getAll);
routes.get("/Turma/:id", TurmasController.getOne);
routes.get("/Turmas/Pesquisar/:ano", TurmasController.getByAno);
routes.post("/Turmas/Cadastrar", TurmasController.create);
routes.patch("/Turmas/Adicionar/Aluno", TurmasController.addAluno);
routes.delete("/Turmas/Remover/Aluno", TurmasController.removeAluno);
routes.post("/Turmas/Adicionar/Disciplina", TurmaDisciplinasController.create);

routes.post("/Usuarios/CadastrarAluno", UsuariosController.createAluno); //Somente para testes
routes.get("/Usuarios/Buscar/Alunos", UsuariosController.getAlunoByNameOrEmail);
routes.get("/Usuarios/Buscar/Professores", UsuariosController.getProfessorByNameOrEmail);
routes.get("/Usuarios/Alunos", UsuariosController.getAllAlunos); 
routes.get("/Usuarios/Professores", UsuariosController.getAllProfessores);
routes.get("/Usuarios/:id", UsuariosController.getOne);

routes.post("/Materias/Cadastrar", MateriasController.criarMateria);
routes.get("/Materias", MateriasController.listarMaterias);
routes.get("/Materia/:id", MateriasController.buscarMateriaPorId);
routes.put("/Materias/Editar/:id", MateriasController.editarMateria);
routes.get("/Materias/Buscar", MateriasController.getMateriaByName);

routes.delete("/Turmas/Remover/Disciplina", TurmaDisciplinasController.remove);

export default routes;