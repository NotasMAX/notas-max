import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../styles/TurmasPesquisarForm.module.css";


export default function TurmasPesquisaForm({ initialData, onSubmit }) {
    const anoAtual = new Date().getFullYear();

    const [formData, setFormData] = useState(initialData || {
        ano: anoAtual,
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
        const novoAno = Number(value);
        setFormData(prevData => ({ ...prevData, [name]: novoAno }));
        onSubmit(novoAno);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className={Style.formContainer}>
                <select 
                    required
                    name="ano"
                    value={String(formData.ano)}
                    className={Style.formSelect}
                    onChange={handleChange}
                >
                    {gerarAnos().map(ano => (
                        <option key={ano} value={ano}>
                            {ano}
                        </option>
                    ))}
                </select>
        </form>
    );
}