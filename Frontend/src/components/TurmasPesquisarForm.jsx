import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../styles/TurmasPesquisarForm.module.css";


export default function TurmasPesquisaForm({ initialData, onSubmit }) {
    const anoAtual = new Date().getFullYear();

    const [formData, setFormData] = useState(initialData || {
        ano: 0,
    });

    const gerarAnos = () => {
        const anos = [];
        for (let i = anoAtual + 1; i >= anoAtual - 50; i--) {
            anos.push(i);
        }
        return anos;
    };

    useEffect(() => {

        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        const ano = Number(value);
        const turma = { ano: ano };
        setFormData(prevData => ({ ...prevData, [name]: ano }));
        onSubmit(turma);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className={Style.formContainer}>
            <a href="/Turmas/Cadastrar" className={Style.LinkCadastrar}>
                <svg className={Style.LinkCadastrarIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z"  />
                </svg>
                Cadastrar Nova Turma
            </a>
            <div className={Style.formSelectContainer}> 
            <select
                required
                name="ano"
                value={String(formData.ano)}
                className={Style.formSelect}
                onChange={handleChange}
            >
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
        </form>
    );
}