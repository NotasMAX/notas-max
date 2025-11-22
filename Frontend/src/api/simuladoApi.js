import api from "../utils/api.js";

const api = axios.create({
    baseURL: "http://localhost:5000/NotasMax",
    headers: {
        "Content-Type": "application/json"
    }
})

export const getByTurma = (turma_id) => api.get(`/Turmas/ByTurma/${turma_id}`)
export const cadastrarSimulado = (payload) => api.post('/Simulado/Create', payload);
export const getOne = (id) => api.get(`/Simulado/${id}`);
export const getAll = () => api.get('/Simulados');
export const getTurma = (id) => api.get(`/Turma/Simulado/${id}`)
export const findSimuladoByBimestreAnoSerie = (bimestre, ano, serie) => api.get(`/Simulados/FindByBimestreAnoSerie/${bimestre}/${ano}/${serie}`);
export const updateSimulado = (id, payload) => api.patch(`/Simulado/Editar/${id}`, payload);

export default api;