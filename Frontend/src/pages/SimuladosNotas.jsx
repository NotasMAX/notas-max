import React, { useEffect, useState, useRef, use } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Style from '../styles/SimuladosNotas.module.css';;
import { Toast } from 'primereact/toast';
import { getOne as getOneSimulado } from '../api/simuladoApi';
import { getUsuario as getOneAluno } from '../api/usuariosapi';
import { getOne as getOneTurma } from '../api/turmasapi';
import SimuladosNotasForm from '../components/SimuladosNotasForm';

export default function SimuladosNotas() {
    const {
        simulado: simuladoURL,
        aluno: alunoURL
    } = useParams();
    const [Simulado, setSimulado] = useState(null);
    const [Aluno, setAluno] = useState(null);
    const [Turma, setTurma] = useState(null);
    const [Response, setResponse] = useState(null);
    const toast = useRef(null);
    const toastShown = useRef(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.title = `NotasMAX - Lançamento de Notas`;
    }, []);

    useEffect(() => {
        if (simuladoURL && alunoURL) {
            fetchSimulado();
            fetchAluno();
        }
         else{
            console.log("Parâmetros de URL ausentes.");
         }
    }, [simuladoURL, alunoURL]);

    useEffect(() => {
        if (Simulado?.turma_id) {
            fetchTurma(Simulado.turma_id);
        }
    }, [Simulado]);

    const fetchSimulado = async () => {
        try {
            const simuladoResponse = await getOneSimulado(simuladoURL);
            setSimulado(simuladoResponse.data.simulado || []);
        } catch (error) {
            console.error("Erro ao buscar simulados:", error);
        }
    }

    const fetchAluno = async () => {
        try {
            const alunoResponse = await getOneAluno(alunoURL);
            setAluno(alunoResponse.data || []);
        } catch (error) {
            console.error("Erro ao buscar aluno:", error);
        }
    }

    const fetchTurma = async (id) => {
        try {
            const turmaResponse = await getOneTurma(id);
            setTurma(turmaResponse.data.turma || []);
        } catch (error) {
            console.error("Erro ao buscar turma:", error);
            return null;
        }
    }

    const handleFormSubmit = async (formData) => {
        console.log(formData);
        alert("Formulário submetido!");
        // Implementar lógica de submissão do formulário de notas
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
                <p className={Style.SimuladosAlert}>Lançamento de notas individual.</p>
                <h3 className={Style.SimuladosSubHeader}>{Aluno ? `${Aluno.nome} (${Aluno.email})` : 'Carregando aluno...'}</h3>
            </div>

            <SimuladosNotasForm
                initialData={Simulado}
                response={Response}
                conteudosRecebidos={Simulado ? Simulado.conteudos : []}
                onSubmit={handleFormSubmit}
                aluno={Aluno}
            />

        </div>
    );
}