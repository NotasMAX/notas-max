import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5000/NotasMax",
    headers:{
        "Content-Type":"application/json"
    }
})

export const cadastrarTurma = (payload)=>api.post("/Turmas/Cadastrar", payload);
export const getTurmasPorAno = (ano) => api.get(`/Turmas/Pesquisar/${ano}`);
export const getTurmaById = (id) => api.get(`/Turma/${id}`);
export const editarTurma = (id, payload) => api.put(`/Turma/${id}`, payload);

    export default api;
