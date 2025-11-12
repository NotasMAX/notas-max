import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import logo from "../imgs/logo.png";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tentando login com:", email, senha);
    setErro("Login desativado temporariamente para teste");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="logo" className={styles.logo} />
        {erro && <p className="text-red-600 text-center font-semibold mb-3">{erro}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>E-mail institucional</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Meuemailinstitucional@gmail.com"
          required/>
          <label className={styles.label}>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.input}
            placeholder="••••••••"
            required/>
          <div className={styles.recover}>
            <a href="#recuperar-senha">Recuperar senha</a>
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



/* import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import logo from '../imgs/logo.png';

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, senha);
    if (!result.ok) {
      setErro(result.message || 'Erro ao fazer login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="logo" className={styles.logo} />

        {erro && <p className={styles.error}>{erro}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>E-mail institucional</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Meuemailinstitucional@gmail.com"
          />

          <label className={styles.label}>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.input}
            placeholder="••••••••"
          />

          <div className={styles.recover}>
            <a href="#recuperar-senha">Recuperar senha</a>
          </div>

          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
} */ 
