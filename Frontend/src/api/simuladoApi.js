import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/NotasMax",
    headers: {
        "Content-Type": "application/json"
    }
})

export const cadastrarSimulado = (payload) => api.post('/Simulados/Create', payload);
export const getOne = (id) => api.get(`/Simulado/${id}`);
export const getAll = () => api.get('/Simulados');
export const getTurma = (id) => api.get(`/Turmas/Simulado/${id}`)
export const getByTurma = (turma_id) => api.get(`/Turmas/ByTurma/${turma_id}`)

export default api;