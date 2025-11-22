import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import logo from "../imgs/logo.svg";
import { Link } from "react-router-dom";


export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMensagem("Por favor, insira seu e-mail institucional.");
      return;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2 className={styles.title}>Recuperação de Senha</h2>

        {mensagem && <p className={styles.error}>{mensagem}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Informe o E-mail institucional</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="exemplo@email.com"
            required
          />
<button type="submit" className={styles.button}>
  <Link to="/reset-senha">Enviar Link</Link> </button>
        </form>

        <div className={styles.recover}>
          <a href="/login">Voltar</a>
        </div>
      </div>
    </div>
  );
}
