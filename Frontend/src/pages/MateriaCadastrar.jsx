import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MateriasForm from '../components/MateriaForm';
import { cadastrarMateria } from '../api/materiaApi';

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
        <div className="p-4 bg-white">
            <h2>Nova Matéria</h2>
            <MateriasForm onSubmit={handleCreate} />
        </div>
    );
}
