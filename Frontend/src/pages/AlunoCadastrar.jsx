import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AlunoForm from '../components/AlunoForm';
import { createAluno } from '../api/usuariosapi';
import Style from '../styles/AlunoForm.module.css';

export default function AlunoCadastrar() {

    useEffect(() => {
        document.title = 'NotasMAX - Cadastrar Aluno';
    }, []);

    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        try {
            await createAluno(formData);
            navigate('/Alunos');
        } catch (error) {
            console.error("Erro ao cadastrar aluno:", error);
            alert("Erro ao cadastrar aluno.");
        }
    };

    return (
        <div className={Style.pageContainer}>
            <h2 className={Style.pageTitle}>Cadastrar Aluno</h2>
            <AlunoForm onSubmit={handleCreate} />
        </div>
    );
}