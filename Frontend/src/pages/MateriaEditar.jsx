import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MateriasForm from '../components/MateriaForm';
import { getMateriaById, editarMateria } from '../api/materiaApi';
import Style from '../styles/MateriaForm.module.css';
import { Toast } from 'primereact/toast';
import { useToast } from '../hooks/useToast';

export default function MateriaEditar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast, showSuccess, showError } = useToast();

    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = 'NotasMAX - Editar Matéria';
    }, []);

    useEffect(() => {
        let mounted = true;
        const fetchMateria = async () => {
            try {
                const res = await getMateriaById(id);
                if (mounted) setInitialData(res.data || null);
            } catch (err) {
                console.error('Erro ao carregar matéria:', err);
                if (mounted) {
                    setError('Erro ao carregar matéria.');
                    showError('Erro ao carregar matéria.');
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };

        if (id) fetchMateria();
        else {
            setError('ID de matéria inválido.');
            setLoading(false);
            showError('ID de matéria inválido.');
        }

        return () => { mounted = false; };
    }, [id]);

    const handleUpdate = async (formData) => {
        try {
            await editarMateria(id, formData);
            showSuccess('Matéria atualizada com sucesso!');
            
            // Aguarda 1 segundo antes de redirecionar para o usuário ver o toast
            setTimeout(() => {
                navigate('/Materias');
            }, 1000);
        } catch (err) {
            console.error('Erro ao atualizar matéria:', err);
            
            // Verifica se é erro de duplicata (409)
            if (err.response?.status === 409) {
                showError(err.response.data.error || 'Já existe uma matéria cadastrada com este nome.');
            } else {
                showError('Erro ao atualizar matéria.');
            }
        }
    };

    if (loading) return <div className="p-4">Carregando...</div>;
    if (error) return <div className="p-4 text-red-600">{error}</div>;

    return (
        <div className={Style.pageContainer}>
            <Toast ref={toast} />
            <h2 className={Style.pageTitle}>Editar Matéria</h2>
            {initialData ? (
                <MateriasForm initialData={initialData} onSubmit={handleUpdate} />
            ) : (
                <p>Matéria não encontrada.</p>
            )}
        </div>
    );
}