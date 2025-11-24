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
    const { toast, showSuccess, showError } = useToast();

    const handleCreate = async (formData) => {
        try {
            await createProfessor(formData);
            showSuccess('Professor cadastrado com sucesso!');
            
            setTimeout(() => {
                navigate('/Professores');
            }, 1000);
        } catch (error) {
            console.error("Erro ao cadastrar professor:", error);
            showError(error.response?.data?.error || "Erro ao cadastrar professor.");
        }
    };

    return (
        <div className={Style.pageContainer}>
            <Toast ref={toast} />
            <h2 className={Style.pageTitle}>Cadastrar Professor</h2>
            <ProfessorForm onSubmit={handleCreate} />
        </div>
    );
}