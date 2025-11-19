import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/NotasMax",
    headers: {
        "Content-Type": "application/json"
    }
})

export const getProfessores = () => api.get("/Usuarios/Professores");
export const getAlunos = () => api.get("/Usuarios/Alunos");
export const getUsuario = (id) => api.get(`/Usuarios/Detalhes/${id}`);
export const updateUsuario = (id, data) => api.put(`/Usuarios/Editar/${id}`, data);
export const createProfessor = (data) => api.post("/Usuarios/Professores", data);
export const createAluno = (data) => api.post("/Usuarios/Alunos", data);



export default api;
