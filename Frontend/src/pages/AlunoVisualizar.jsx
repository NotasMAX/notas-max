import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/usuariosapi';
import Style from '../styles/AlunoForm.module.css';

export default function AlunoVisualizar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [aluno, setAluno] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = 'NotasMAX - Informações do Aluno';
    }, []);

    useEffect(() => {
        const fetchAluno = async () => {
            try {
                const res = await api.get(`/Usuarios/${id}`);
                setAluno(res.data);
            } catch (err) {
                console.error('Erro ao buscar aluno:', err);
                setError('Erro ao carregar informações do aluno.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAluno();
        }
    }, [id]);

    if (loading) return <div className="p-4">Carregando informações...</div>;
    if (error) return <div className="p-4 text-red-600">{error}</div>;
    if (!aluno) return <div className="p-4">Aluno não encontrado.</div>;

    return (
        <div className={Style.pageContainer}>
            <h2 className={Style.pageTitle}>Informações Aluno</h2>

            <div className={Style.form}>
                {/* Nome Completo */}
                <div className={Style.formGroup}>
                    <label className={Style.formLabel}>Nome Completo</label>
                    <div className={Style.formInputReadonly}>
                        {aluno.nome}
                    </div>
                </div>

                {/* E-mail e Telefone - Lado a lado */}
                <div className={Style.formRow}>
                    <div className={Style.formGroup}>
                        <label className={Style.formLabel}>E-mail institucional</label>
                        <div className={Style.formInputReadonly}>
                            {aluno.email}
                        </div>
                    </div>

                    <div className={Style.formGroup}>
                        <label className={Style.formLabel}>Telefone</label>
                        <div className={Style.formInputReadonly}>
                            {aluno.telefone_contato}
                        </div>
                    </div>
                </div>

                {/* Nome Responsável e Telefone Responsável - Lado a lado */}
                <div className={Style.formRow}>
                    <div className={Style.formGroup}>
                        <label className={Style.formLabel}>Nome responsavel</label>
                        <div className={Style.formInputReadonly}>
                            {aluno.nome_responsavel || '-'}
                        </div>
                    </div>

                    <div className={Style.formGroup}>
                        <label className={Style.formLabel}>Telefone Responsavel</label>
                        <div className={Style.formInputReadonly}>
                            {aluno.telefone_responsavel || '-'}
                        </div>
                    </div>
                </div>

                {/* Botões */}
                <div className={Style.buttonGroup}>
                    <button
                        type="button"
                        className={Style.buttonSecondary}
                        onClick={() => navigate(-1)}
                    >
                        Voltar
                    </button>
                    <button 
                        type="button"
                        className={Style.buttonPrimary}
                        onClick={() => navigate(`/Alunos/Editar/${id}`)}
                    >
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
}