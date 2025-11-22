import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:30005/NotasMax",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;