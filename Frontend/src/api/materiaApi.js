import api from "../utils/api";

export const listarMaterias = () => api.get("/Materias");
export const cadastrarMateria = (data) => api.post("/Materias/Cadastrar", data);
export const getMateriaById = (id) => api.get(`/Materia/${id}`);
export const editarMateria = (id, data) => api.put(`/Materias/Editar/${id}`, data);
export const buscarMateriasPorNome = (nome) => api.get(`/Materias/Buscar?text=${encodeURIComponent(nome)}`);

export default api;