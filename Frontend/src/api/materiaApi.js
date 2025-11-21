import api from "../utils/api.js";

export const cadastrarMateria = (payload) => api.post("/Materias/Cadastrar", payload);
export const listarMaterias = () => api.get("/Materias");
export const getMateriaById = (id) => api.get(`/Materia/${id}`);
export const editarMateria = (id, payload) => api.put(`/Materias/Editar/${id}`, payload);
export const buscarMateriasPorNome = (text) => api.get(`/Materias/Buscar?text=${encodeURIComponent(text)}`);

export default api;
