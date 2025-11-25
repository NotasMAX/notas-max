import React, { useState, useRef } from "react";
import styles from "../styles/Login.module.css";
import logo from "../imgs/logo.svg";
import { useNavigate } from 'react-router-dom';
import RecuperarSenhaForm from "../components/RecuperarSenhaForm";
import { Toast } from 'primereact/toast';
import { forgot } from "../api/auth";


export default function RecuperarSenha() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (dados) => {
    if (loading) return;
    try {
      setLoading(true);
      if (toast.current) {
        toast.current.clear();
        toast.current.show({ severity: 'info', summary: 'Processando', detail: 'Por favor, aguarde um instante enquanto processamos suas informações...', life: 3000 });
      }
      await forgot(dados.email);
      navigate('/login', { state: { message: 'Se o e-mail informado for válido, um token de recuperação de senha foi enviado para sua caixa de entrada.', type: 'info' } });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao processar requisição';
      const errorType = error.response?.data?.errorType;
      toast.current?.clear();
      if (errorType === 'CONNECTION_ERROR' || error.response?.status === 503) {
        toast.current?.show({ severity: 'error', summary: 'Erro de Conexão', detail: 'Sem conexão com a internet. Verifique sua conexão e tente novamente.', life: 5000 });
      } else {
        toast.current?.show({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 5000 });
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Toast ref={toast} />
      <div className={styles.card}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2 className={styles.title}>Recuperação de Senha</h2>
        <RecuperarSenhaForm onSubmit={handleSubmit}/>
        <div className={styles.recover}>
          <a href="/login">Voltar</a>
        </div>
      </div>
    </div>
  );
}
