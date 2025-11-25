import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfessorForm from '../components/ProfessorForm';
import { getUsuario, updateUsuario } from '../api/usuariosapi';
import Style from '../styles/ProfessorForm.module.css';
import { Toast } from 'primereact/toast';
import { useToast } from '../hooks/useToast';

export default function ProfessorEditar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast, showError, showSuccessOnRedirect } = useToast();
    const [professor, setProfessor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = 'NotasMAX - Editar Professor';
    }, []);

    useEffect(() => {
        const fetchProfessor = async () => {
            try {
                const res = await getUsuario(id);
                setProfessor(res.data);
            } catch (err) {
                console.error('Erro ao buscar professor:', err);
                setError('Erro ao carregar professor.');
                showError('Erro ao carregar professor.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProfessor();
        }
    }, [id]);

    const handleUpdate = async (formData) => {
        try {
            await updateUsuario(id, formData);
            showSuccessOnRedirect('Professor atualizado com sucesso!');
            navigate('/Professores');
        } catch (error) {
            console.error("Erro ao atualizar professor:", error);
            showError(error.response?.data?.error || "Erro ao atualizar professor.");
        }
    };

    if (loading) return <div className="p-4">Carregando...</div>;
    if (error) return <div className="p-4 text-red-600">{error}</div>;

    return (
        <div className={Style.pageContainer}>
            <Toast ref={toast} />
            <h2 className={Style.pageTitle}>Editar Professor</h2>
            {professor && <ProfessorForm initialData={professor} onSubmit={handleUpdate} />}
        </div>
    );
}