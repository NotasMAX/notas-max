
import { useNavigate } from 'react-router-dom';
import TurmasForm from '../components/TurmasForm';
import { cadastrarTurma } from '../api/turmasapi';
import { useState, useEffect } from 'react';
import Style from '../styles/TurmasCadastrar.module.css';

export default function TurmasCadastrar() {

    useEffect(() => {
        document.title = 'NotasMAX - Cadastrar Turma';
    }, []);

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
        <div className={Style.TurmasCadastrarContainer}>
            <h2 className={Style.TurmasCadastrarTitle} >Cadastrar Nova Turma</h2>
            <TurmasForm onSubmit={handleCreate} response={response} />
        </div>
    );
}