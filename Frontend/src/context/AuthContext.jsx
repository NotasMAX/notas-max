import React, { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, getProfile } from '../api/auth';

export const AuthContext = createContext(null);

export const useAuth = () => {
  const c = useContext(AuthContext);
  if (!c) throw new Error('useAuth must be used within AuthProvider');
  return c;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega o usuário logado via cookie (/auth/me)
  const refreshUser = async () => {
    try {
      const data = await getProfile();
      if (data?.usuario) {
        setUser(data.usuario);
      } else {
        setUser(null);
      }
    } catch (err) {
      // 401 é esperado quando não há sessão - não é erro
      if (err?.response?.status !== 401) {
        console.error("Erro ao buscar perfil:", err);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const loginUser = async (email, senha) => {
    try {
      const data = await login(email, senha);
      if (data?.usuario) {
        setUser(data.usuario);
        return { ok: true };
      }
      return { ok: false, message: data?.message || 'Erro no login' };
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.response?.data?.error || 'Erro de conexão';
      return { ok: false, message };
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
