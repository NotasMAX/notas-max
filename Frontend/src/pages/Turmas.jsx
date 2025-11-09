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

    const handleSearch = (turma) => {
        setAno(turma.ano);
        fetch(turma.ano);
    };

    useEffect(() => {
        document.title = `NotasMAX - Turmas ${ano}`;
        if (ano) {
            fetch(ano);
        }
    }, [ano]);


    return (
        <div>
            <h2 className={Style.TurmasHeader}>Turmas</h2>
            <TurmasPesquisarForm onSubmit={handleSearch} />
            {Turmas && (
                <div >
                    {Turmas.length === 0 ? (
                        <p className={Style.TurmasAlert}>Nenhuma turma encontrada para o ano fornecido.</p>
                    ) : (
                        <div className={Style.TurmasList}>
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