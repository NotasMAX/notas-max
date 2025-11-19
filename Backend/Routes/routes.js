import { Router } from "express";
import TurmasController from "../Controllers/TurmasController.js";
import TurmaDisciplinasController from "../Controllers/TurmaDisciplinasController.js";
import UsuariosController from "../Controllers/UsuariosController.js";
import MateriasController from "../Controllers/MateriasController.js";
import SimuladosController from '../Controllers/SimuladosController.js';


const routes = Router();

//rotas de Turmas
routes.get("/Turmas", TurmasController.getAll);
routes.get("/Turma/:id", TurmasController.getOne);
routes.get("/Turmas/Pesquisar/:ano", TurmasController.getByAno);
routes.post("/Turmas/Cadastrar", TurmasController.create);
routes.patch("/Turmas/Adicionar/Aluno", TurmasController.addAluno);
routes.delete("/Turmas/Remover/Aluno", TurmasController.removeAluno);
routes.post("/Turmas/Adicionar/Disciplina", TurmaDisciplinasController.create);
routes.delete("/Turmas/Remover/Disciplina", TurmaDisciplinasController.remove);


routes.get("/Usuarios/Professores", UsuariosController.listarProfessores);
routes.get("/Usuarios/Alunos", UsuariosController.listarAlunos);
routes.get("/Usuarios/Detalhes/:id", UsuariosController.getUsuario);
routes.put("/Usuarios/Editar/:id", UsuariosController.atualizarUsuario);


routes.post("/Usuarios/Professor", UsuariosController.cadastrarProfessor);
routes.post("/Usuarios/Aluno", UsuariosController.cadastrarAluno);

routes.post("/Materias/Cadastrar", MateriasController.criarMateria);
routes.get("/Materias", MateriasController.listarMaterias);
routes.get("/Materia/:id", MateriasController.buscarMateriaPorId);
routes.put("/Materias/Editar/:id", MateriasController.editarMateria);
routes.get("/Materias/Buscar", MateriasController.getMateriaByName);

routes.post('/Simulado/Create', SimuladosController.create);
routes.get('/Simulado/:id', SimuladosController.getOne);
routes.get('/Simulados', SimuladosController.getAll);
routes.get('/Turma/Simulado/:id', SimuladosController.getTurma);

export default routes;

