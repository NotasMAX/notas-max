import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/NotasMax",
    headers: {
        "Content-Type": "application/json"
    }
})

export const getAllMaterias = () => api.get("/Materias");
export const getMateriaById = (id) => api.get(`/Materia/${id}`);
export const buscarMateriasPorNome = (text) => api.get(`/Materias/Buscar?text=${encodeURIComponent(text)}`);

export default api;
