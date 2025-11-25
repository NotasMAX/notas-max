import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ProfessorForm from '../components/ProfessorForm';
import { createProfessor } from '../api/usuariosapi';
import Style from '../styles/ProfessorForm.module.css';
import { Toast } from 'primereact/toast';
import { useToast } from '../hooks/useToast';

export default function ProfessorCadastrar() {

    useEffect(() => {
        document.title = 'NotasMAX - Cadastrar Professor';
    }, []);

    const navigate = useNavigate();
    const { toast, showError, showSuccessOnRedirect } = useToast();

    const handleCreate = async (formData) => {
        try {
            await createProfessor(formData);
            showSuccessOnRedirect('Professor cadastrado com sucesso!');
            navigate('/Professores');
        } catch (error) {
            console.error("Erro ao cadastrar professor:", error);
            showError(error.response?.data?.error || "Erro ao cadastrar professor.");
        }
    };

    return (
        <div>
            <Toast ref={toast} />
            <h2 className={Style.pageTitle}>Cadastrar Professor</h2>
            <ProfessorForm onSubmit={handleCreate} />
        </div>
    );
}