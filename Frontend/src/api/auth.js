import api from "../utils/api.js";

export const login = async (email, senha) => {
  const res = await api.post("/Auth/login", { email, senha });
  return res.data;
};

export const logout = async () => {
  await api.post("/Auth/logout");
};

export const getProfile = async () => {
  const res = await api.get("/Auth/me");
  return res.data;
};

export const forgot = async (email) => {
  const res = await api.post("/Auth/forgot", { email });
  return res.data;
};
export const reset = async (token, senha) => {
  const res = await api.post("/Auth/reset", { token, novaSenha: senha });
  return res.data;
};