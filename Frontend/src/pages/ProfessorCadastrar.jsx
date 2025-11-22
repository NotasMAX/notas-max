import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ProfessorForm from '../components/ProfessorForm';
import { createProfessor } from '../api/usuariosapi';
import Style from '../styles/ProfessorForm.module.css';

export default function ProfessorCadastrar() {

    useEffect(() => {
        document.title = 'NotasMAX - Cadastrar Professor';
    }, []);

    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        try {
            await createProfessor(formData);
            navigate('/Professores');
        } catch (error) {
            console.error("Erro ao cadastrar professor:", error);
            alert("Erro ao cadastrar professor.");
        }
    };

    return (
        <div className={Style.pageContainer}>
            <h2 className={Style.pageTitle}>Cadastrar Professor</h2>
            <ProfessorForm onSubmit={handleCreate} />
        </div>
    );
}