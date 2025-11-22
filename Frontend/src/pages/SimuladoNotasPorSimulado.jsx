import React, { useEffect, useState } from "react";
import { getOne } from '../api/simuladoApi.js';
import { getAlunos } from '../api/usuariosapi.js';
import { useParams, useNavigate } from 'react-router-dom';
import NotasCard from "../components/NotasCard";
import BimestreAtual from '../components/BimestreAtual';
import StyleTitle from '../styles/Title.module.css';
import ButtonStyle from '../styles/ButtonGroup.module.css';

export default function SimuladoNotasPorSimulado({ }) {

    const navigate = useNavigate();
    const { simuladoId, alunoId } = useParams();

    const [simulado, setSimulado] = useState(null);
    const [aluno, setAluno] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!simuladoId) return;
        const loadSimulado = async () => {

            setLoading(true);
            setError(null);

            try {
                const res = await getOne(simuladoId);
                setSimulado(res.data.simulado);
                console.log(res.data.simulado);
            }
            catch (e) {
                setError(e.message || 'Erro ao carregar simulado');
            }
            finally {
                setLoading(false);
            }

        };

        loadSimulado();

    }, [simuladoId]);

    useEffect(() => {

        if (!alunoId) return;

        const loadAluno = async () => {
            try {
                const res = await getAlunos(alunoId);
                setAluno(res.data.aluno);
                console.log(res.data.aluno);
            } catch (e) {
                setError(e.message || 'Erro ao carregar informações de aluno');
            }
        }

        loadAluno();
    }, [alunoId]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!simulado) return <p>Simulado não encontrado.</p>;

    return (
        <div className='flex flex-col gap-y-2'>
            <div className={StyleTitle.titleContent}>
                <div>
                    <h1 className={StyleTitle.titlePage}>Turma {simulado.turma.serie}º EM - Simulado {simulado.numero}</h1>
                    <p className={StyleTitle.subtitlePage}>Lista de alunos que realizaram o simulado {simulado.numero}, no {simulado.bimestre}º Bimestre de {simulado.turma.ano}</p>
                </div>

                <div>
                    <BimestreAtual bimestre={simulado.bimestre} ano={simulado.turma.ano} />
                </div>
            </div>

            {/* Botoes de acoes */}
            <div className="mb-5">
                <button>Lançar Notas Simulado</button>
                <button>Importar Notas excel</button>
                <button>Média Materia</button>
                <button>Editar Acertos do Aluno</button>
            </div>

            {/* select Nº do simulado */}
            <div className="mb-2 flex justify-between">
                <select
                    className="rounded-sm border border-gray-300 bg-gray-50/20 px-2 py-1 text-lg text-gray-800"
                    value={simuladoId ?? "Selecione um simulado"}
                    onChange={(e) => setSimuladoId(Number(e.target.value))}
                >
                    {simulados.length > 0
                        ? simulados.map(s => <option key={s.id} value={s.id}>{s.name ?? `Simulado ${s.id}`}</option>)
                        : <>
                            <p>Simulados não encontrados...</p>
                        </>
                    }
                </select>
            </div>

            {/* inicio tabela */}
            <div className="flex gap-2 rounded-sm border border-gray-300 bg-gray-100 p-2">
                <div className="w-1/3">Disciplina</div>
                <div className="w-1/3">Professor</div>
                <div className="w-1/3">Resultado</div>
            </div>


            <NotasCard
                simuladoResult={simuladoResult}
                simuladoConteudo={simuladoConteudo}

            />

            <div className="mb-5 flex rounded-sm border border-gray-300 bg-gray-100 p-2">
                <div className="w-1/2">Total de Acertos</div>
                <div className="w-1/2">{quantAcertos} / {quantQuestoes}</div>
            </div>

            {/* btns de voltar ou mudar forma de vizualizar */}
            <div className="flex items-center justify-end">
                <div className="flex justify-end gap-3">
                    <button className="cursor-pointer rounded-sm border border-gray-300 bg-white px-3 py-1 text-center text-sm text-gray-800 transition hover:bg-gray-200">Voltar a lista de alunos</button>

                    <button className="cursor-pointer rounded-sm border border-blue-600 bg-[#1C86EB] px-4 py-1 text-center text-sm text-white transition hover:bg-[#50AAFF]">Visualização individualmente por materia</button>
                </div>
            </div>
        </div>

    )
}