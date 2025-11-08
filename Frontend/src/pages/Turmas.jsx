import React, { useEffect, useState } from 'react';
import styles from '../styles/Turmas.module.css';
import TurmasPesquisarForm from '../components/TurmasPesquisarForm';
import TurmaItem from '../components/TurmaItem';

import { getTurmasPorAno } from '../api/turmasapi';

export default function Turmas() {
    const [Turmas, setTurmas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ano, setAno] = useState(new Date().getFullYear());

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
            <div>
                <h2>Turmas</h2>
                <br />
                <TurmasPesquisarForm onSubmit={handleSearch} />
                {loading && <p>Carregando resultados...</p>}
                {Turmas && (
                    <div>
                        {Turmas.length === 0 ? (
                            <p>Nenhuma turma encontrada para o ano fornecido.</p>
                        ) : (
                            <div className={styles.container}>
                                {Turmas.map(Turma => (
                                    <TurmaItem
                                        key={Turma._id}
                                        turma={Turma}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}