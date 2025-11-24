import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AlunoForm from '../components/AlunoForm';
import { createAluno } from '../api/usuariosapi';
import Style from '../styles/AlunoForm.module.css';
import { Toast } from 'primereact/toast';
import { useToast } from '../hooks/useToast';

export default function AlunoCadastrar() {

    useEffect(() => {
        document.title = 'NotasMAX - Cadastrar Aluno';
    }, []);

    const navigate = useNavigate();
    const { toast, showSuccess, showError } = useToast();

    const handleCreate = async (formData) => {
        try {
            await createAluno(formData);
            showSuccess('Aluno cadastrado com sucesso!');
            
            setTimeout(() => {
                navigate('/Alunos');
            }, 1000);
        } catch (error) {
            console.error("Erro ao cadastrar aluno:", error);
            showError(error.response?.data?.error || "Erro ao cadastrar aluno.");
        }
    };

    return (
        <div className={Style.pageContainer}>
            <Toast ref={toast} />
            <h2 className={Style.pageTitle}>Cadastrar Aluno</h2>
            <AlunoForm onSubmit={handleCreate} />
        </div>
    );
}