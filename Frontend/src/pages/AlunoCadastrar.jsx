import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AlunoForm from '../components/AlunoForm';
import { createAluno } from '../api/usuariosapi';
import Style from '../styles/AlunoForm.module.css';
import { Toast } from 'primereact/toast';
import { useToast } from '../hooks/useToast';
import StyleTitle from '../styles/Title.module.css';

export default function AlunoCadastrar() {

    useEffect(() => {
        document.title = 'NotasMAX - Cadastrar Aluno';
    }, []);

    const navigate = useNavigate();
    const { toast, showError, showSuccessOnRedirect } = useToast();

    const handleCreate = async (formData) => {
        try {
            await createAluno(formData);
            showSuccessOnRedirect('Aluno cadastrado com sucesso!');
            navigate('/Alunos');
        } catch (error) {
            console.error("Erro ao cadastrar aluno:", error);
            showError(error.response?.data?.error || "Erro ao cadastrar aluno.");
        }
    };

    return (
        <div>

            <Toast ref={toast} />
            <h2 className={StyleTitle.titlePage}>Cadastrar Aluno</h2>
            <AlunoForm onSubmit={handleCreate} />
        </div>
    );
}