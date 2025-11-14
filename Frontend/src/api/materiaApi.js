import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/NotasMax",
    headers: {
        "Content-Type": "application/json"
    }
});

export const cadastrarMateria = (payload) => api.post("/Materias/Cadastrar", payload);

export default api;
