import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MateriasForm from '../components/MateriaForm';
import { cadastrarMateria } from '../api/materiaApi';
import Style from '../styles/MateriaForm.module.css';

export default function MateriasCadastrar() {

    useEffect(() => {
        document.title = 'NotasMAX - Cadastrar Matéria';
    }, []);

    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        try {
            await cadastrarMateria(formData);
            navigate('/');
        } catch (error) {
            console.error("Erro ao criar a matéria:", error);
            alert("Erro ao criar a matéria.");
        }
    };

    return (
        <div className={Style.pageContainer}>
            <h2 className={Style.pageTitle}>Cadastrar Materia</h2>
            <MateriasForm onSubmit={handleCreate} />
        </div>
    );
}