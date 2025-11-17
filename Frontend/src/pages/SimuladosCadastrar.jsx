
import { useNavigate } from 'react-router-dom';
import SimuladosForm from '../components/SimuladosForm';
import { useState, useEffect } from 'react';
import Style from '../styles/SimuladosCadastrar.module.css';
import { cadastrarSimulado } from '../api/simuladoApi';

export default function SimuladosCadastrar() {

    useEffect(() => {
        document.title = 'NotasMAX - Cadastrar Simulado';
    }, []);

    const navigate = useNavigate();
    const [response, setResponse] = useState(null);

    const handleCreate = async (formData) => {
        try {
            const result = await cadastrarSimulado(formData);
            navigate(`/Simulados`, { replace: true, state: { message: result.data?.message || 'Simulado cadastrado com sucesso', type: 'success' } });
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div className={Style.SimuladosCadastrarContainer}>
            <h2 className={Style.SimuladosHeader} >Cadastrar Novo Simulado</h2>
            <SimuladosForm onSubmit={handleCreate} response={response} />
        </div>
    );
}