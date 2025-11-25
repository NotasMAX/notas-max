import React, { useEffect, useState, useRef, use } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Style from '../styles/SimuladosNotas.module.css';;
import { Toast } from 'primereact/toast';
import { getOne as getOneSimulado, getSimuladosByTurma, atualizarConteudos } from '../api/simuladoApi';
import { getUsuario as getOneAluno } from '../api/usuariosapi';
import { getOne as getOneTurma } from '../api/turmasapi';
import SimuladosNotasForm from '../components/SimuladosNotasForm';
import SimuladosNotasPesquisarForm from '../components/SimuladosNotasPesquisarForm';

export default function SimuladosNotas() {
    const {
        turma: turmaURL,
        simulado: simuladoURL,
        aluno: alunoURL
    } = useParams();
    const [Simulado, setSimulado] = useState(null);
    const [Simulados, setSimulados] = useState([]);
    const [Aluno, setAluno] = useState(null);
    const [Turma, setTurma] = useState(null);
    const [Response, setResponse] = useState(null);
    const [proximoAluno, setProximoAluno] = useState(null);
    const [anteriorAluno, setAnteriorAluno] = useState(null);
    const toast = useRef(null);
    const toastShown = useRef(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.title = `NotasMAX - Lançamento de Notas`;
    }, []);

    useEffect(() => {
        toastShown.current = false;
        if (location.state && location.state.message && !toastShown.current) {
            const { message, type } = location.state;
            if (toast && toast.current) {
                toast.current.show({ severity: type, summary: 'Sucesso', detail: message, life: 3000 });
                toastShown.current = true;
            }
            window.history.replaceState({}, '')
        }
    }, [location.state]);

    useEffect(() => {
        if (turmaURL) {
            fetchTurma(turmaURL);
            fetchSimuladosByTurma(turmaURL);
        }
    }, [turmaURL]);

    useEffect(() => {
        if (simuladoURL && alunoURL) {
            fetchSimulado();
            fetchAluno();
        }
    }, [simuladoURL, alunoURL]);

    const fetchSimulado = async () => {
        try {
            const simuladoResponse = await getOneSimulado(simuladoURL);
            setSimulado(simuladoResponse.data.simulado || []);
        } catch (error) {
            navigate("/404");
        }
    }

    const fetchSimuladosByTurma = async (id) => {
        try {
            const simuladosResponse = await getSimuladosByTurma(id);
            setSimulados(simuladosResponse.data.simulados || []);
        } catch (error) {
            navigate("/404");
        }
    }

    const fetchAluno = async () => {
        try {
            const alunoResponse = await getOneAluno(alunoURL);
            setAluno(alunoResponse.data || []);
        } catch (error) {
            navigate("/404");
        }
    }

    const fetchTurma = async (id) => {
        try {
            const turmaResponse = await getOneTurma(id);
            setTurma(turmaResponse.data.turma || []);
        } catch (error) {
            navigate("/404");
        }
    }

    useEffect(() => {
        if (!Turma) return;
        Turma.alunos.sort((a, b) => a.nome.localeCompare(b.nome));
        setProximoAluno(Turma.alunos[Turma.alunos.findIndex(a => a._id === alunoURL) + 1] || null);
        setAnteriorAluno(Turma.alunos[Turma.alunos.findIndex(a => a._id === alunoURL) - 1] || null);
        if (!simuladoURL && !alunoURL) {
            getSimuladosByTurma(turmaURL)
                .then((response) => {
                    const simulados = response.data.simulados;
                    if (simulados.length > 0) {
                        const firstSimuladoId = simulados[0]._id;
                        navigate(`/Turmas/${turmaURL}/Simulados/${firstSimuladoId}/Notas/${Turma.alunos[0]._id || ''}`);
                    }
                });
        }
        if (simuladoURL && !alunoURL) {
            navigate(`/Turmas/${turmaURL}/Simulados/${simuladoURL}/Notas/${Turma.alunos[0]._id || ''}`);
        }
    }, [Turma, simuladoURL, alunoURL]);

    const handleFormSubmit = async (formData) => {
        try {
            const resultado = await atualizarConteudos(Simulado._id, { conteudos: formData.conteudos })
            if (proximoAluno) {
                navigate(`/Turmas/${turmaURL}/Simulados/${simuladoURL}/Notas/${proximoAluno._id}`, { replace: true, state: { message: resultado.data?.message || 'Notas atualizadas com sucesso', type: 'success' } });
            }
            else {
                navigate(`/Turmas/Info/${turmaURL}`, { replace: true, state: { message: resultado.data?.message || 'Notas atualizadas com sucesso', type: 'success' } });
                return;
            }
        } catch (error) {
            setResponse(error.response.data);
        }
    }

    return (
        <div>
            <Toast ref={toast} />
            <div className={Style.SimuladosInfo}>
                {Simulado && Turma && (
                    <>
                        <p>{Simulado.bimestre}º Bimestre - {Turma.ano}</p>
                    </>
                )}
            </div>
            <div className={Style.SimuladosHeaderContainer}>
                <h2 className={Style.SimuladosHeader}>Lançamento de Notas - {Turma?.serie}º EM</h2>
                <p className={Style.SimuladosAlert}>Lançamento de notas em lote, insira o numero de acerto do aluno e clique em Salvar para ir para o proximo aluno da turma</p>
            </div>
            <div className={Style.SubHeaderContainer}>
                <h3 className={Style.SimuladosSubHeader}>{Aluno ? `${Aluno.nome} (${Aluno.email})` : 'Carregando aluno...'}</h3>
                <SimuladosNotasPesquisarForm
                    simulados={Simulados}
                    simulado={Simulado}
                    turma_id={turmaURL}
                />
            </div>

            <SimuladosNotasForm
                initialData={Simulado}
                response={Response}
                conteudosRecebidos={Simulado ? Simulado.conteudos : []}
                onSubmit={handleFormSubmit}
                aluno={Aluno}
                proximoAluno={proximoAluno}
                AlunoAnterior={anteriorAluno}
                quantidadeAlunos={Turma ? Turma.alunos.length : 0}
                alunoAtual={Turma ? Turma.alunos.findIndex(a => a._id === alunoURL) + 1 : 0}
            />
        </div>
    );
}