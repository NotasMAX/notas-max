
import { useNavigate } from 'react-router-dom';
import SimuladosForm from '../components/SimuladosForm';
// import { cadastrarTurma } from '../api/turmasapi';
import { useState, useEffect } from 'react';
import Style from '../styles/SimuladosCadastrar.module.css';

export default function SimuladosCadastrar() {

    // useEffect(() => {
    //     document.title = 'NotasMAX - Cadastrar Simulado';
    // }, []);

    const navigate = useNavigate();
    const [response, setResponse] = useState(null);

    const handleCreate = async (formData) => {

        try {
            const result = await cadastrarTurma(formData);
            navigate(`/Turmas/${formData.ano}`, { replace: true, state: { message: result.data?.message || 'Turma cadastrada com sucesso', type: 'success' } });
        } catch (error) {
            setResponse(error.response.data);
        }
    };

    return (
        <div className={Style.SimuladosCadastrarContainer}>
            <h2 className={Style.SimuladosHeader} >Cadastrar Novo Simulado</h2>
            <SimuladosForm onSubmit={handleCreate} response={response} />
        </div>
    );
}