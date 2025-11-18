import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:30005/NotasMax",
    headers: {
        "Content-Type": "application/json"
    }
})

export const cadastrarSimulado = (payload) => api.post('/Simulado/Create', payload);
export const getOne = (id) => api.get(`/Simulados/${id}`);
export const getAll = () => api.get('/Simulados');
export const getTurma = (id) => api.get(`/Turma/Simulado/${id}`)

export default api;