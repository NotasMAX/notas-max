import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/NotasMax",
    headers: {
        "Content-Type": "application/json"
    }
})

export const getProfessores = () => api.get("/Usuarios/Professores");
export const getAlunos = () => api.get("/Usuarios/Alunos");
export const getUsuario = (id) => api.get(`/Usuarios/Detalhes/${id}`);
export const updateUsuario = (id, data) => api.put(`/Usuarios/Editar/${id}`, data);
export const createProfessor = (data) => api.post("/Usuarios/Professor", data);
export const createAluno = (data) => api.post("/Usuarios/Aluno", data);

export const buscarAlunosPorNomeOuEmail = (text) => api.get(`/Usuarios/Buscar/Alunos?text=${encodeURIComponent(text)}`);
export const buscarProfessoresPorNomeOuEmail = (text) => api.get(`/Usuarios/Buscar/Professores?text=${encodeURIComponent(text)}`);
export const cadastrarAluno = (payload) => api.post("/Usuarios/CadastrarAluno", payload);

export default api;
