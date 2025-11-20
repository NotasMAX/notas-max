import React, { useState, useEffect } from "react";
import NotasCard from "../components/NotasCard";
import { getAll as getAllSimulados } from "../api/simuladoApi.js";
import { getAllForId as getAllConteudos } from "../api/simuladoConteudoApi.js";
import { getAllForId as getAllResultados } from "../api/simuladoResultadoApi.js";
import { useLocation, useNavigate } from 'react-router-dom';

export default function NotasList({ }) {

    const [simulado, setSimulados] = useState([]);
    const [simuladoConteudo, setSimuladoConteudo] = useState([]);
    const [simuladoResult, setSimuladoResult] = useState([]);
    const [simuladoId, setSimuladoId] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const { alunoNome, aluno } = location.state || {};

    const fetch = async () => {

        try {

            const res = await getAllSimulados();

            const data = res?.data ?? res;

            setSimulados(data || []);

            if ((data || []).length > 0 && simulado == null) {
                setSimuladoId(data[0].id ?? 1);
            }

        } catch (err) {

            console.error("Erro ao carregar simulados", err);

        }

    }

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        if (simuladoId == null) return;

        async function loadBySimulado() {
            try {
                const resC = await getAllConteudos(simuladoId);
                const resR = await getAllResultados(simuladoId);

                setSimuladoResult(resR?.data ?? resR ?? []);
                setSimuladoConteudo(resC?.data ?? resC ?? []);
            } catch (err) {
                console.error('Erro ao carregar Conteudos / Resultados dos simulados', err);
            }
        }

        loadBySimulado();

    }, [simuladoId]);

    const quantQuestoes = simuladoConteudo.reduce(acc, c => acc + (Number(c.quantidade_questoes || 0), 0));

    const quantAcertos = simuladoResult.reduce(acc, r => acc + (Number(r.acertos || 0), 0));

    return (
        <div>
            <div className="mb-5">
                <h1 className="text-2xl font-bold text-[#043666]">
                    Notas Aluno(a) - {alunoNome ?? aluno?.nome ?? "—"}
                </h1>
                <p className="text-sm font-normal text-gray-800">Lista com o números de acertos, separado pelas materias</p>
            </div>

            {/* Botoes de acoes */}
            <div className="mb-5">
                <button className="cursor-pointer rounded-sm border border-gray-300 bg-white px-3 py-1 text-center text-sm text-gray-800 transition hover:bg-gray-200">Lançar Notas Simulado</button>
                <button className="cursor-pointer rounded-sm border border-gray-300 bg-white px-3 py-1 text-center text-sm text-gray-800 transition hover:bg-gray-200">Importar Notas excel</button>
                <button className="cursor-pointer rounded-sm border border-gray-300 bg-white px-3 py-1 text-center text-sm text-gray-800 transition hover:bg-gray-200">Média Materia</button>
                <button className="cursor-pointer rounded-sm border border-gray-300 bg-white px-3 py-1 text-center text-sm text-gray-800 transition hover:bg-gray-200">Editar Acertos do Aluno</button>
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