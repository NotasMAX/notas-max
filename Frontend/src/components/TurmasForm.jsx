import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../styles/TurmasForm.module.css";

export default function TurmasForm({ initialData, onSubmit, response }) {
    const [formData, setFormData] = useState(initialData || {
        serie: 0,
        ano: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const gerarAnos = () => {
        const anos = [];
        const anoAtual = new Date().getFullYear()
        for (let i = anoAtual + 1; i >= anoAtual - 50; i--) {
            anos.push(i);
        }
        return anos;
    };

    return (
        <form onSubmit={handleSubmit}>
            {response && (
                <div id="error" className={Style.spanError}>{response.message}</div>
            )}
            <div className={Style.formGroup}>
                <div className={Style.formSelectContainer}>
                    <select
                        required
                        className={Style.formSelect}
                        id="serie" name="serie"
                        value={formData.serie}
                        onChange={handleChange}>
                        <option className={Style.formOption} value="">Série</option>
                        <option className={Style.formOption} value="1">1º EM</option>
                        <option className={Style.formOption} value="2">2º EM</option>
                        <option className={Style.formOption} value="3">3º EM</option>
                    </select>
                    <svg className={Style.formSelectArrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" />
                    </svg>
                </div>
                <div className={Style.formSelectContainer}>
                    <select
                        required
                        name="ano"
                        value={String(formData.ano)}
                        className={Style.formSelect}
                        onChange={handleChange}
                    >
                        <option className={Style.formOption} value=""> Ano</option>
                        {gerarAnos().map(ano => (
                            <option className={Style.formOption} key={ano} value={ano}>
                                {ano}
                            </option>
                        ))}
                    </select>
                    <svg className={Style.formSelectArrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" />
                    </svg>
                </div>
            </div>
            <div className={Style.buttonGroup}>
                <button type="submit" className={Style.buttonPrimary}>
                    Cadastrar Turma
                </button>
                <button
                    type="button"
                    className={Style.buttonSecondary}
                    onClick={() => navigate(-1)}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}