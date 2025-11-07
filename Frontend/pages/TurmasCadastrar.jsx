
import { useNavigate } from 'react-router-dom';
import TurmasForm from '../components/TurmasForm';
import { cadastrarTurma } from '../api/turmasapi';

export default function CadastrarTurma() {
    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        try {
            await cadastrarTurma(formData);
            navigate('/');
        } catch (error) {
            console.error("Erro ao criar a turma:", error);
            alert("Erro ao criar a turma.");
        }
    };

    return (
        <div className="p-4 bg-white">
            <h2>Nova Turma</h2>
            <TurmasForm onSubmit={handleCreate} />
        </div>
    );
}