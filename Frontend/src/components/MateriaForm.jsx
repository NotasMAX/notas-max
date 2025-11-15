import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../styles/MateriaForm.module.css";

export default function MateriasForm({ initialData, onSubmit }) {
    const [formData, setFormData] = useState(initialData || {
        nome: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Limpa o erro se o usuário começar a digitar
        if (value.trim() !== "") {
            const nomeError = document.getElementById("nomeError");
            if (nomeError) nomeError.textContent = " ";
        }

        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação simples
        if (!formData.nome.trim()) {
            const nomeError = document.getElementById("nomeError");
            nomeError.textContent = " Campo Obrigatório ";
            return;
        }

        // Remove espaços extras
        formData.nome = formData.nome.trim();

        console.log(formData);
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className={Style.formLabel}>Descritivo:</label>
                <input
                    type="text"
                    required
                    name="nome"
                    value={formData.nome}
                    className={Style.formInput}
                    onChange={handleChange}
                    placeholder="Digite o nome da matéria"
                />
            </div>
            <span className="spanError" id="nomeError"></span>

            <div className={Style.buttonGroup}>
                <button type="submit" className={Style.buttonPrimary}>
                    Salvar
                </button>
                <button
                    type="button"
                    className={Style.buttonSecondary}
                    onClick={() => navigate(-1)}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}
