import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import logo from "../imgs/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    const result = await loginUser(email, senha);
    if (!result.ok) {
      setErro(result.message || 'Erro ao fazer login');
    } else {
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="logo" className={styles.logo} />

        {erro && (
          <p className="text-red-600 text-center font-semibold mb-3">{erro}</p>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>E-mail institucional</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Exemplo@gmail.com"
            required
          />

          <label className={styles.label}>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.input}
            placeholder="••••••••"
            required
          />

          <div className={styles.recover}>
            <Link to="/recuperar-senha">Recuperar senha</Link>
          </div>

          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
