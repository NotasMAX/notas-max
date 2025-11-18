import React, { useEffect, useState } from 'react';
import { getOne } from '../api/simuladoApi';
import SimuladoAlunoItem from '../components/SimuladoAlunoItem';
import StyleTitle from '../styles/Title.module.css';
import ButtonStyle from '../styles/ButtonGroup.module.css';
import BimestreAtual from '../components/BimestreAtual';

export default function SimuladosAlunosList() {

    const [simulado, setSimulado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSimulado = async () => {
            try {
                const res = await getOne(id);
                setSimulado(res.data.simulado);

            } catch (err) {
                console.error('Erro ao buscar simulado:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSimulado();

        document.title = `NotasMAX - Lista de Alunos do Simulado ${simulado.numero}`;

    }, []);

    return (
        <div>
            <div>
                <div>
                    <h1>Turma {simulado.turma.serie} - Simulado  {simulado.numero}</h1>
                    <p>Lista de alunos que realizaram o simulado 1, no {simulado.bimestre}º Bimestre de {simulado.data_realizacao}</p>
                </div>

                <div>
                    <BimestreAtual />
                </div>
            </div>

            <div>
                <button>Editar Turma</button>
                <button>Editar Simulado</button>
                <button>Acertos por materia</button>
            </div>

            <div>

                <div>
                    <div>Nome do Aluno</div>
                    <div>Ultima Alteração</div>
                    <div>Nº de Acertos</div>
                    <div>Ações</div>
                </div>

                {error && <p className="text-red-600">Erro ao carregar resultados dos alunos.</p>}
                {loading && <p>Carregando resultados dos alunos...</p>}

                {simulado.conteudos.resultados.length === 0 ? (
                    <p>Nenhum aluno realizou este simulado.</p>
                ) : (
                    simulado.conteudos.resultados.map((a) => (
                        <SimuladoAlunoItem
                            key={a._id}
                            alunoResultado={a}
                            numerosQuestoes={simulado.conteudos.quantidade_questoes}
                        />
                    ))

                )}
            </div>
        </div>
    );
}