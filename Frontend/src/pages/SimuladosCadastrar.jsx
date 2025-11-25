
import { useNavigate } from 'react-router-dom';
import SimuladosForm from '../components/SimuladosForm';
import { useState, useEffect } from 'react';
import Style from '../styles/SimuladosCadastrar.module.css';
import StyleTitle from '../styles/Title.module.css';
import { cadastrarSimulado } from '../api/simuladoApi';
import { getOne } from '../api/turmasapi';


export default function SimuladosCadastrar() {

    useEffect(() => {
        document.title = 'NotasMAX - Cadastrar Simulado';
    }, []);

    const navigate = useNavigate();
    const [response, setResponse] = useState(null);

    const handleCreate = async (formData) => {
        try {
            const result = await cadastrarSimulado(formData);
            const turma = await getOne(formData.turma_id);
            navigate(`/Simulados/${formData.bimestre}/${turma.data.turma.ano}/${turma.data.turma.serie}`, { replace: true, state: { message: result.data?.message || 'Simulado cadastrado com sucesso', type: 'success' } });
        } catch (error) {
            setResponse({
                success: false,
                message: error.response?.data?.message || 'Erro ao cadastrar simulado'
            });
        }
    };

    return (
        <div className={Style.SimuladosCadastrarContainer}>
            <h2 className={StyleTitle.titlePage} >Cadastrar Novo Simulado</h2>
            <SimuladosForm onSubmit={handleCreate} response={response} />
        </div>
    );
}