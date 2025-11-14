import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Style from '../styles/Turmas.module.css';
import TurmasPesquisarForm from '../components/TurmasPesquisarForm';
import TurmaItem from '../components/TurmaItem';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';


import { getTurmasPorAno } from '../api/turmasapi';

export default function Turmas() {
    const { ano: anoURL } = useParams();
    const [Turmas, setTurmas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const anoAtual = new Date().getFullYear();
    const [ano, setAno] = useState(() => anoURL ? parseInt(anoURL) : anoAtual);
    const toast = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
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
        if (ano) {
            navigate(`/Turmas/${ano}`, { replace: true });
        }
    }, [ano]);

    useEffect(() => {
        document.title = `NotasMAX - Turmas ${ano}`;
        fetch(ano);
        if (location.state) {
            const { message, type } = location.state;
            if (message && type === 'success') {
                if (toast && toast.current) {
                    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: message, life: 3000 });
                }
            }
            window.history.replaceState({}, '')
        }
    }, [navigate]);

    return (
        <div>
            <h2 className={Style.TurmasHeader}>Alunos</h2>
            <TurmasPesquisarForm onSubmit={handleSearch} initialData={{ ano }} />
            <Toast ref={toast} />
            {loading ? (
                <div className={Style.TurmasList}>
                    <Skeleton className="mb-2" width='21.87rem' height='12.25rem'></Skeleton>
                    <Skeleton className="mb-2" width='21.87rem' height='12.25rem'></Skeleton>
                    <Skeleton className="mb-2" width='21.87rem' height='12.25rem'></Skeleton>
                </div>
            ) : (
                Turmas && (
                    <div>
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
                )
            )}
        </div>
    );
}