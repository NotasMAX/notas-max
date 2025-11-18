import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:30005/NotasMax",
    headers: {
        "Content-Type": "application/json"
    }
})

export const getAlunos = () => api.get("/Usuarios/Alunos");
export const getProfessores = () => api.get("/Usuarios/Professores");
export const buscarAlunosPorNomeOuEmail = (text) => api.get(`/Usuarios/Buscar/Alunos?text=${encodeURIComponent(text)}`);
export const buscarProfessoresPorNomeOuEmail = (text) => api.get(`/Usuarios/Buscar/Professores?text=${encodeURIComponent(text)}`);

export default api;
