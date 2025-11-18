import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/NotasMax",
    headers: {
        "Content-Type": "application/json"
    }
})

export const cadastrarTurma = (payload) => api.post("/Turmas/Cadastrar", payload);
export const getOne = (id) => api.get(`/Turma/${id}`);
export const getTurmasPorAno = (ano) => api.get(`/Turmas/Pesquisar/${ano}`);
export const getTurmaById = (id) => api.get(`/Turma/${id}`);
export const addAluno = (payload) => api.patch(`/Turmas/Adicionar/Aluno`, payload);
export const removeAluno = (turma_id, aluno_id) => api.delete(`/Turmas/Remover/Aluno?turma_id=${turma_id}&aluno_id=${aluno_id}`);
export const addDisciplina = (payload) => api.post(`/Turmas/Adicionar/Disciplina`, payload);
export const removeDisciplina = (id) => api.delete(`/Turmas/Remover/Disciplina?id=${id}`);

export default api;