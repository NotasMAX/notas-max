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

  const handleSubmit = async (dados) => {
    try {
      await forgot(dados.email);
    } finally {
      navigate('/login', { state: { message: 'Se o e-mail informado for válido, um token de recuperação de senha será enviado para sua caixa de entrada.', type: 'info' } });
    };
  }
  return (
    <div className={styles.container}>
      <Toast ref={toast} />
      <div className={styles.card}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2 className={styles.title}>Recuperação de Senha</h2>
        <RecuperarSenhaForm onSubmit={handleSubmit} />
        <div className={styles.recover}>
          <a href="/login">Voltar</a>
        </div>
      </div>
    </div>
  );
}
