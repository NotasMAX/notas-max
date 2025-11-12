import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Style from '../styles/TurmasEditar.module.css';
// import TurmasForm from '../components/TurmasForm';
import TurmaAlunoItem from '../components/TurmaAlunoItem';
import { getTurmaById } from '../api/turmasapi';
import { useNavigate } from 'react-router-dom';

export default function TurmasEditar() {
    const { id } = useParams();
    const [turma, setTurma] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
        const navigate = useNavigate();

    const fetch = async () => {
        try {
            setLoading(true);
            const res = await getTurmaById(id);
            setTurma(res.data);
        } catch (err) {
            setError(err.message || 'Erro ao buscar turma');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        document.title = 'NotasMAX - Editar Turma';

        if (id) {
            fetch();
        }
    }, [id]);

    // const handleEdit = async (formData) => {
    //     try {
    //         await editarTurma(id, formData);
    //         alert('Turma editada com sucesso!');
    //     } catch (err) {
    //         setError(err.message || 'Erro ao editar turma');
    //     }
    // };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div>
            <h2 className={Style.TurmasEditarHeader}>
                Editar Turma - {turma.serie}º EM
            </h2>
            <div className={Style.TurmaDadosContainer}>
                <div className={Style.TurmaDados}>
                    {turma.serie}º EM
                </div>
                <div className={Style.TurmaDados}>
                    {turma.ano}
                </div>
            </div>
            <div className={Style.TurmaContainer}>
                <div className={Style.TurmaContainerHeader}>
                    <h3 className={Style.TurmaContainerTitle}>
                        Alunos
                    </h3>
                    <button className={Style.TurmaContainerButton}>
                        <svg className={Style.TurmaContainerButtonIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13L13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16L11 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z" />
                        </svg>

                    </button>
                </div>
            </div>
            <div className={Style.TurmaContainerDados}>
              <TurmaAlunoItem aluno={
                { nome: "Nome do Aluno", email: "email@exemplo.com" }
              }></TurmaAlunoItem>
            </div>
            <div className={Style.TurmaContainer}>
                <div className={Style.TurmaContainerHeader}>
                    <h3 className={Style.TurmaContainerTitle}>
                        Materias
                    </h3>
                    <button className={Style.TurmaContainerButton}>
                        <svg className={Style.TurmaContainerButtonIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13L13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16L11 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z" />
                        </svg>

                    </button>
                </div>
            </div>
            <div className={Style.TurmaContainerDados}>
                <div className={Style.TurmaContainerRow}>
                    <div className={Style.TurmaContainerCol}>
                        Nome da Matéria
                    </div>
                    <div className={Style.TurmaContainerCol}>
                        Nome do Professor
                    </div>
                    <div className={Style.TurmaContainerColExcluir}>
                        <svg className={Style.TurmaContainerColIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <button
                type="button"
                className={Style.buttonBack}
                onClick={() => navigate(-1)}>
                Voltar
            </button>
        </div >
    );
}