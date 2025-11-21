import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MateriasForm from '../components/MateriaForm';
import { getMateriaById, editarMateria } from '../api/materiaApi';
import Style from '../styles/MateriaForm.module.css';

export default function MateriaEditar() {
    const { id } = useParams();
    const navigate = useNavigate();

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
                if (mounted) setError('Erro ao carregar matéria.');
            } finally {
                if (mounted) setLoading(false);
            }
        };

        if (id) fetchMateria();
        else {
            setError('ID de matéria inválido.');
            setLoading(false);
        }

        return () => { mounted = false; };
    }, [id]);

    const handleUpdate = async (formData) => {
        try {
            await editarMateria(id, formData);
            navigate('/Materias');
        } catch (err) {
            console.error('Erro ao atualizar matéria:', err);
            alert('Erro ao atualizar matéria.');
        }
    };

    if (loading) return <div className="p-4">Carregando...</div>;
    if (error) return <div className="p-4 text-red-600">{error}</div>;

    return (
        <div className={Style.pageContainer}>
            <h2 className={Style.pageTitle}>Editar Matéria</h2>
            {initialData ? (
                <MateriasForm initialData={initialData} onSubmit={handleUpdate} />
            ) : (
                <p>Matéria não encontrada.</p>
            )}
        </div>
    );
}
