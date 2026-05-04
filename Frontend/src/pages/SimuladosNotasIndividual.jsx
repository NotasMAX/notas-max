import React, { useEffect, useState, useRef, use } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Style from '../styles/SimuladosNotas.module.css';;
import { Toast } from 'primereact/toast';
import { getOne as getOneSimulado, getSimuladosByTurma, atualizarConteudos } from '../api/simuladoApi';
import { getUsuario as getOneAluno } from '../api/usuariosapi';
import { getOne as getOneTurma } from '../api/turmasapi';
import SimuladosNotasForm from '../components/SimuladosNotasIndividualForm';
import SimuladosNotasPesquisarIndividualForm from '../components/SimuladosNotasPesquisarIndividualForm';

export default function SimuladosNotasIndividual() {
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
    const toast = useRef(null);
    const toastShown = useRef(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.title = `NotasMAX - Lançamento de Notas Individual`;
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
        if (turmaURL && simuladoURL && alunoURL) {
            fetchTurma(turmaURL);
            fetchSimuladosByTurma(turmaURL);
            fetchSimulado();
            fetchAluno();
        }
    }, [turmaURL, simuladoURL, alunoURL]);

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

    const handleFormSubmit = async (formData) => {
        try {
            const resultado = await atualizarConteudos(Simulado._id, { conteudos: formData.conteudos })
            navigate(`/Simulados/Notas/${Simulado._id}/${Simulado.bimestre}/${Aluno._id}`, { replace: true, state: { message: resultado.data?.message || 'Notas atualizadas com sucesso', type: 'success' } });
            return;
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
                <p className={Style.SimuladosAlert}>Lançamento de notas individual</p>
            </div>
            <div className={Style.SubHeaderContainer}>
                <h3 className={Style.SimuladosSubHeader}>{Aluno ? `${Aluno.nome} (${Aluno.email})` : 'Carregando aluno...'}</h3>
                <SimuladosNotasPesquisarIndividualForm
                    simulados={Simulados}
                    simulado={Simulado}
                    turma_id={turmaURL}
                    aluno_id={Aluno ? Aluno._id : alunoURL}
                />
            </div>

            <SimuladosNotasForm
                initialData={Simulado}
                response={Response}
                conteudosRecebidos={Simulado ? Simulado.conteudos : []}
                onSubmit={handleFormSubmit}
                aluno={Aluno}
                simulado_id={simuladoURL}
                bimestre={Simulado ? Simulado.bimestre : null}
            />
        </div>
    );
}