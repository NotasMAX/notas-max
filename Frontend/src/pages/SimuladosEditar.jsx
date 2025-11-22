
import { useNavigate } from 'react-router-dom';
import SimuladosEditarForm from '../components/SimuladosEditarForm';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Style from '../styles/SimuladosCadastrar.module.css';
import { getOne, updateSimulado } from '../api/simuladoApi';
import { getOne as getOneTurma } from '../api/turmasapi';


export default function SimuladosEditar() {
    const { id } = useParams();
    const [simulado, setSimulado] = useState(null);

    useEffect(() => {
        document.title = 'NotasMAX - Editar Simulado';
    }, []);

    const navigate = useNavigate();
    const [response, setResponse] = useState(null);


    const fetchSimulado = async () => {
        try {
            const result = await getOne(id);
            setSimulado(result.data.simulado);
        } catch (error) {
            setResponse(
                error.response?.data?.message || 'Erro ao carregar simulado'
            );
        }
    }

    useEffect(() => {
        fetchSimulado();
    }, [id]);

    const handleCreate = async (formData) => {
        try {
            const result = await updateSimulado(id, formData);
            const turma = await getOneTurma(formData.turma_id);
            navigate(`/Simulados/${formData.bimestre}/${turma.data.turma.ano}/${turma.data.turma.serie}`, { state: { message: result.data?.message || 'Simulado atualizado com sucesso', type: 'success' } });
        } catch (error) {
            setResponse({
                success: false,
                message: error.response?.data?.message || 'Erro ao editar simulado'
            });
        }
    };

    return (
        <div className={Style.SimuladosCadastrarContainer}>
            <h2 className={Style.SimuladosHeader} >Editar Simulado</h2>
            <SimuladosEditarForm onSubmit={handleCreate} response={response} simulado={simulado} />
        </div>
    );
}