import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import logo from '../imgs/logo.svg';
import { reset } from '../api/auth';

export default function ResetSenha() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      navigate('/Login', { state: { message: 'Token inválido ou ausente. Solicite um novo link de redefinição.', type: 'warn' } });
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    if (!novaSenha || !confirmarSenha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    if (novaSenha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    if (!token) {
      setErro('Token inválido. Solicite um novo link de redefinição.');
      return;
    }

    try {
      setCarregando(true);
      await reset(token, novaSenha);
      setNovaSenha('');
      setConfirmarSenha('');
      navigate('/Login', { state: { message: 'Senha redefinida com sucesso! Você já pode fazer login com sua nova senha.', type: 'success' } });
    } catch (err) {
      setErro(err.response?.data?.message || 'Erro ao redefinir senha. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="logo" className={styles.logo} />

        <h2 className={styles.title}>Recuperação de Senha</h2>

        {erro && <p className="text-red-600 text-center">{erro}</p>}
        {mensagem && <p style={{color: 'green', marginBottom: '10px'}}>{mensagem}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Digite a nova senha</label>
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            className={styles.input}
            placeholder="Digite sua nova senha"
            required
            disabled={carregando}
          />

          <label className={styles.label}>Confirme a nova senha</label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className={styles.input}
            placeholder="Confirme sua nova senha"
            required
            disabled={carregando}
          />

          <button type="submit" className={styles.button} disabled={carregando}>
            {carregando ? 'Salvando...' : 'Salvar'}
          </button>
        </form>
      </div>
    </div>
  );
}
