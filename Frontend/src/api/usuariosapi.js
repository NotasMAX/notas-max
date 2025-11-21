import api from "../utils/api";

export const getProfessores = () => api.get("/Usuarios/Professores");
export const getAlunos = () => api.get("/Usuarios/Alunos");
export const getUsuario = (id) => api.get(`/Usuarios/Detalhes/${id}`);
export const updateUsuario = (id, data) => api.put(`/Usuarios/Editar/${id}`, data);
export const createProfessor = (data) => api.post("/Usuarios/Professor", data);
export const createAluno = (data) => api.post("/Usuarios/Aluno", data);

export const buscarAlunosPorNomeOuEmail = (text) => api.get(`/Usuarios/Buscar/Alunos?text=${encodeURIComponent(text)}`);
export const buscarProfessoresPorNomeOuEmail = (text) => api.get(`/Usuarios/Buscar/Professores?text=${encodeURIComponent(text)}`);

export default api;
