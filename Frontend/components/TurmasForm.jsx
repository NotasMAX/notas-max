import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../src/styles/TurmasForm.module.css";

export default function TurmasForm({ initialData, onSubmit }) {
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
        if (formData.serie > 0) {
            const serieError = document.getElementById("serieError");
            serieError.textContent = " ";
        }
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.serie == 0) {
            const serieError = document.getElementById("serieError");
            serieError.textContent = " Campo Obrigatório ";
            return;
        }
        formData.serie = parseInt(formData.serie);
        console.log(formData);
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className={Style.formLabel}>Série:</label>
                <select name="serie" value={formData.serie} onChange={handleChange} className={Style.formInput}>
                    <option value="0">Selecione a série</option>
                    <option value="1">1º EM</option>
                    <option value="2">2º EM</option>
                    <option value="3">3º EM</option>
                </select>
            </div>
            <span className="spanError" id="serieError"></span>
            <div>
                <label className="formLabel">Ano:</label>
                <input
                    type="number"
                    required
                    name="ano"
                    value={formData.ano}
                    className={Style.formInput}
                    onChange={handleChange}
                />
            </div>
            <div className={Style.buttonGroup}>
                <button type="submit" className={Style.buttonPrimary}>
                    Salvar
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