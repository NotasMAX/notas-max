import React, { useEffect, useState } from 'react';
import Style from '../styles/Turmas.module.css';
import TurmasPesquisarForm from '../components/TurmasPesquisarForm';
import TurmaItem from '../components/TurmaItem';

import { getTurmasPorAno } from '../api/turmasapi';

export default function Turmas() {
    const [Turmas, setTurmas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ano, setAno] = useState(new Date().getFullYear());
    let position = 0;

    const fetch = async (anoPesquisar) => {
        try {
            setLoading(true);
            setError(null);
            const res = await getTurmasPorAno(anoPesquisar);
            setTurmas(res.data.turmas || []);
        } catch (err) {
            setError(err.message || 'Erro ao buscar turmas');
            setTurmas([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (anoSelecionado) => {
        setAno(anoSelecionado);
        fetch(anoSelecionado);
    };

    useEffect(() => {
        if (ano) {
            fetch(ano);
        }
    }, [ano]);


    return (
        <div>
            <h2 className={Style.TurmasHeader}>Turmas</h2>
            <TurmasPesquisarForm onSubmit={handleSearch} />
            {loading && <p>Carregando resultados...</p>}
            {Turmas && (
                <div >
                    {Turmas.length === 0 ? (
                        <p>Nenhuma turma encontrada para o ano fornecido.</p>
                    ) : (
                        <div className="flex justify-start align-middle sm:flex-col  lg:space-x-8 lg:flex-row">
                            {Turmas.map(Turma => (
                                <TurmaItem
                                    key={Turma._id}
                                    turma={Turma}
                                    position={position++}
                                />
                            ))}
                        </div>
                    )}
                </div>  
            )}
        </div>
    );
}