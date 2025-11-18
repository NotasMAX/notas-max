import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../styles/SimuladosPesquisarForm.module.css";

export default function SimuladosPesquisarForm({ initialData, onSubmit }) {
    const [formData, setFormData] = useState(initialData || {
        ano: 0,
        serie: 0,
        bimestre: 0,
    });

    const years = Array.from({ length: new Date().getFullYear() + 1 - 1950 + 1 }, (_, i) => 1950 + i);

    useEffect(() => {

        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        onSubmit(formData);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form className={Style.SimuladosFilters}>
            <div className={Style.formContainer}>
                <label htmlFor="bimestre" className={Style.formLabel}>Bimestre</label>
                <div className={Style.formSelectContainerBimestre}>
                    <select
                        required
                        name="bimestre"
                        value={String(formData.bimestre)}
                        className={Style.formSelect}
                        onChange={handleChange}
                    >
                        {[1, 2, 3, 4].map(bimestre => (
                            <option className={Style.formOption} key={bimestre} value={bimestre}>
                                {bimestre}º Bimestre
                            </option>
                        ))}
                    </select>
                    <svg className={Style.formSelectArrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" />
                    </svg>
                </div>
            </div>
            <div className={Style.formContainer}>
                <label htmlFor="serie" className={Style.formLabel}>Série</label>
                <div className={Style.formSelectContainer}>
                    <select
                        required
                        name="serie"
                        value={String(formData.serie)}
                        className={Style.formSelect}
                        onChange={handleChange}
                    >   
                    <option className={Style.formOption} value={0}>Todos</option>
                        {[1, 2, 3].map(serie => (
                            <option className={Style.formOption} key={serie} value={serie}>
                                {serie}º EM
                            </option>
                        ))}
                    </select>
                    <svg className={Style.formSelectArrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" />
                    </svg>
                </div>
            </div>
            <div className={Style.formContainer}>
                <label htmlFor="ano" className={Style.formLabel}>Ano</label>
                <div className={Style.formSelectContainer}>
                    <select
                        required
                        name="ano"
                        value={String(formData.ano)}
                        className={Style.formSelect}
                        onChange={handleChange}
                    >
                        {years.map(ano => (
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
        </form>
    );
}