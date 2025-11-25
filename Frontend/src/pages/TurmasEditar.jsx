import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getTurmaById } from '../api/turmasapi';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { OverlayPanel } from 'primereact/overlaypanel';
import Style from '../styles/TurmasEditar.module.css';
import TurmaAlunoForm from '../components/TurmaAlunoForm';
import TurmaAlunoItem from '../components/TurmaAlunoItem';
import TurmaDisciplinaForm from '../components/TurmaDisciplinaForm';
import TurmaDisciplinaItem from '../components/TurmaDisciplinaItem';
import { Toast } from 'primereact/toast';


export default function TurmasEditar() {
    const { id } = useParams();
    const [turma, setTurma] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const opAluno = useRef(null);
    const opDisciplina = useRef(null);
    const toast = useRef(null);
    const toastShown = useRef(false);
    const location = useLocation();


    const fetch = async () => {
        try {
            setLoading(true);
            const res = await getTurmaById(id);
            setTurma(res.data.turma);
        } catch (err) {
            setError(err.message || 'Erro ao buscar turma');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (location.state && location.state.message) {
            const { message, type } = location.state;
            if (toast && toast.current && !toastShown.current) {
                toast.current.show({ severity: type, summary: 'Sucesso', detail: message, life: 3000 });
                toastShown.current = true;
            }
            window.history.replaceState({}, '')
        }
    }, [location.state]);

    useEffect(() => {
        document.title = 'NotasMAX - Editar Turma';

        if (id) {
            fetch();
        }
    }, [id]);

    const handleSuccess = () => {
        fetch();
    }

    if (error) return <p>Erro: {error}</p>;

    return (
        <div>
            <Toast ref={toast} />
            {loading ? (
                <p>Carregando turma...</p>
            ) : (
                <div>
                    <ConfirmDialog />
                    <OverlayPanel ref={opAluno} dismissable>
                        <TurmaAlunoForm turma={turma} toast={toast} onSubmit={handleSuccess}  overlayRef={opAluno} />
                    </OverlayPanel>
                    <OverlayPanel ref={opDisciplina} dismissable>
                        <TurmaDisciplinaForm turma={turma} toast={toast} onSubmit={handleSuccess} overlayRef={opDisciplina} />
                    </OverlayPanel>
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
                            <button className={Style.TurmaContainerButton} onClick={(e) => opAluno.current.toggle(e)}>
                                <svg className={Style.TurmaContainerButtonIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13L13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16L11 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={Style.TurmaContainerDados}>
                        {turma.alunos.length === 0 ? (
                            <p>Nenhum aluno encontrado.</p>
                        ) : (
                            turma.alunos.map(aluno => (
                                <TurmaAlunoItem key={aluno._id} aluno={aluno} toast={toast} turma_id={turma._id} onClick={handleSuccess} />
                            ))
                        )}
                    </div>
                    <div className={Style.TurmaContainer}>
                        <div className={Style.TurmaContainerHeader}>
                            <h3 className={Style.TurmaContainerTitle}>
                                Disciplinas
                            </h3>
                            <button className={Style.TurmaContainerButton} onClick={(e) => opDisciplina.current.toggle(e)}>
                                <svg className={Style.TurmaContainerButtonIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13L13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16L11 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={Style.TurmaContainerDados}>
                        {!turma.disciplinas[0]._id || turma.disciplinas.length === 0 ? (
                            <p>Nenhuma disciplina encontrada.</p>
                        ) : (
                        turma.disciplinas.sort((a, b) => a.materia.nome.localeCompare(b.materia.nome)).map(disciplina => (
                            <TurmaDisciplinaItem key={disciplina._id} toast={toast} disciplina={disciplina} onClick={handleSuccess} />
                        ))
                        )}
                    </div>
                    <button
                        type="button"
                        className={Style.buttonBack}
                        onClick={() => navigate(-1)}>
                        Voltar
                    </button>
                </div>
            )}
        </div>
    );
}