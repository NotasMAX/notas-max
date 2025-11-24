import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MateriasForm from '../components/MateriaForm';
import { cadastrarMateria } from '../api/materiaApi';
import Style from '../styles/MateriaForm.module.css';
import { Toast } from 'primereact/toast';
import { useToast } from '../hooks/useToast';

export default function MateriasCadastrar() {

    useEffect(() => {
        document.title = 'NotasMAX - Cadastrar Matéria';
    }, []);

    const navigate = useNavigate();
    const { toast, showSuccess, showError } = useToast();

    const handleCreate = async (formData) => {
        try {
            await cadastrarMateria(formData);
            showSuccess('Matéria cadastrada com sucesso!');
            
            // Aguarda 1 segundo antes de redirecionar para o usuário ver o toast
            setTimeout(() => {
                navigate('/Materias');
            }, 1000);
        } catch (error) {
            console.error("Erro ao criar a matéria:", error);
            
            // Verifica se é erro de duplicata (409)
            if (error.response?.status === 409) {
                showError(error.response.data.error || "Já existe uma matéria cadastrada com este nome.");
            } else {
                showError("Erro ao criar a matéria.");
            }
        }
    };

    return (
        <div className={Style.pageContainer}>
            <Toast ref={toast} />
            <h2 className={Style.pageTitle}>Cadastrar Materia</h2>
            <MateriasForm onSubmit={handleCreate} />
        </div>
    );
}