import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import logo from '../imgs/logo.svg';

export default function ResetSenha() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!novaSenha || !confirmarSenha) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagem('As senhas não coincidem.');
      return;
    }

    // Fetch para o backend
    setMensagem('Senha redefinida com sucesso! Você pode fechar esta guia.');
    setNovaSenha('');
    setConfirmarSenha('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="logo" className={styles.logo} />

        <h2 className={styles.title}>Recuperação de Senha</h2>

        {mensagem && <p className={styles.error}>{mensagem}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Digite a nova senha</label>
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            className={styles.input}
            placeholder="Digite sua nova senha"
            required
          />

          <label className={styles.label}>Confirme a nova senha</label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className={styles.input}
            placeholder="Confirme sua nova senha"
            required
          />

          <button type="submit" className={styles.button}>
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
