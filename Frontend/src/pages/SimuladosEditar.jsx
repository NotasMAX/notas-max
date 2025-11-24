
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
    const [loading, setLoading] = useState(true);


    const fetchSimulado = async () => {
        try {
            const result = await getOne(id);
            const simulado = result.data.simulado;

            if (!(Date.now() - new Date(simulado.createdAt).getTime() < (16 * 24 * 60 * 60 * 1000))) {
                navigate(`/Simulados/`);
                return;
            }
            setSimulado(simulado);
        } catch (error) {
            navigate(`/Simulados/`);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchSimulado();
        setLoading(false);
    }, [id]);

    const handleEdit = async (formData) => {
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
        (loading ? <p>Loading...</p> :
            <div className={Style.SimuladosCadastrarContainer}>
                <h2 className={Style.SimuladosHeader} >Editar Simulado</h2>
                <SimuladosEditarForm onSubmit={handleEdit} response={response} simulado={simulado} />
            </div>)
    );
}