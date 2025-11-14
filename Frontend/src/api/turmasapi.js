import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/NotasMax",
    headers: {
        "Content-Type": "application/json"
    }
})

export const cadastrarTurma = (payload) => api.post("/Turmas/Cadastrar", payload);
export const getTurmasPorAno = (ano) => api.get(`/Turmas/Pesquisar/${ano}`);
export const getTurmaById = (id) => api.get(`/Turma/${id}`);
export const addAluno = (payload) => api.post(`/Turmas/Adicionar/Aluno`, payload);
export const buscarAlunosPorNomeOuEmail = (text) => api.post(`/Usuarios/Buscar/Alunos`, { text });

export const getAlunos = () => api.get("/Usuarios/Alunos");
export const getOne = (id) => api.get(`/Usuarios/Aluno/${id}`);

export default api;
