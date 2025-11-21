import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AlunoForm from '../components/AlunoForm';
import api from '../api/usuariosapi';
import Style from '../styles/AlunoForm.module.css';

export default function AlunoCadastrar() {

    useEffect(() => {
        document.title = 'NotasMAX - Cadastrar Aluno';
    }, []);

    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        try {
            // Como não há endpoint específico de cadastro na API fornecida,
            // você precisará criar ou usar o endpoint apropriado
            await api.post('/Usuarios/CadastrarAluno', formData);
            navigate('/Usuarios/CadastrarAluno');
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