import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import logo from "../imgs/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await axios.post(
        "http://localhost:5000/NotasMax/Auth/login",
        { email, senha },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(email, senha)
      const { token, usuario } = response.data;

      // Salva o token e o usuário no localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Redireciona para a home
      navigate("/home");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErro("E-mail ou senha incorretos.");
      } else {
        setErro("Erro no servidor. Tente novamente mais tarde.");
      }
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
