import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AlunoForm from '../components/AlunoForm';
import { getUsuario, updateUsuario } from '../api/usuariosapi';
import Style from '../styles/AlunoForm.module.css';
import { Toast } from 'primereact/toast';
import { useToast } from '../hooks/useToast';

export default function AlunoEditar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast, showError, showSuccessOnRedirect } = useToast();
    const [aluno, setAluno] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = 'NotasMAX - Editar Aluno';
    }, []);

    useEffect(() => {
        const fetchAluno = async () => {
            try {
                const res = await getUsuario(id);
                setAluno(res.data);
            } catch (err) {
                console.error('Erro ao buscar aluno:', err);
                setError('Erro ao carregar aluno.');
                showError('Erro ao carregar aluno.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAluno();
        }
    }, [id]);

    const handleUpdate = async (formData) => {
        try {
            await updateUsuario(id, formData);
            showSuccessOnRedirect('Aluno atualizado com sucesso!');
            navigate('/Alunos');
        } catch (error) {
            console.error("Erro ao atualizar aluno:", error);
            showError(error.response?.data?.error || "Erro ao atualizar aluno.");
        }
    };

    if (loading) return <div className="p-4">Carregando...</div>;
    if (error) return <div className="p-4 text-red-600">{error}</div>;

    return (
        <div>
            <Toast ref={toast} />
            <h2 className={Style.pageTitle}>Editar Aluno</h2>
            {aluno && <AlunoForm initialData={aluno} onSubmit={handleUpdate} />}
        </div>
    );
}