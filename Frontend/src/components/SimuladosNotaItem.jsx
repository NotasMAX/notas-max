import React, { use, useState, useEffect } from 'react'
import Style from "../styles/SimuladosNotasItem.module.css";
import { getOneDisciplina } from '../api/turmasapi';


export default function SimuladosNotaItem({ conteudo, onUpdate, aluno, toast }) {
    const [Disciplina, setDisciplina] = useState(null);
    const [acertos, setAcertos] = useState(conteudo?.resultados?.acertos || 0);

    useEffect(() => {
        if (conteudo) {
            fetchDisciplina(conteudo.turma_disciplina_id);
            setAcertos(conteudo.resultados?.acertos || 0);
        }
    }, [conteudo]);

    const handleChange = (e) => {
        const { value } = e.target;
        if (value < 0 || value > conteudo.quantidade_questoes) {
            if (toast && toast.current) {
                toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'O número de acertos deve estar entre 0 e ' + conteudo.quantidade_questoes + '.', life: 3000 });
            } else {
                alert(`O número de acertos deve estar entre 0 e ${conteudo.quantidade_questoes}.`);
            }
            return;
        }
        const newAcertos = parseInt(value) || 0;
        setAcertos(newAcertos);
        onUpdate({ ...conteudo, resultados: { ...conteudo.resultados, acertos: newAcertos, aluno_id: aluno._id } });
    }

    const fetchDisciplina = async (id) => {
        try {
            const disciplinaResponse = await getOneDisciplina(id);
            setDisciplina(disciplinaResponse.data.disciplina);
        } catch (error) {
            console.error("Erro ao buscar disciplina:", error);
        }
    }

    return (
        <div className={Style.ContainerRow}>
            <div className={Style.ContainerCol} >
                {Disciplina?.materia.nome}
            </div>
            <div className={Style.ContainerCol} >
                {Disciplina?.professor.nome}
            </div>
            <div className={Style.ContainerCol} >
                <input name='quantidade_questoes' type="number" min="0" max="10" value={acertos} className={Style.QuestoesInput} onChange={handleChange} />
            </div>
            <div className={Style.ContainerColAcoes}>
                / {String(conteudo?.quantidade_questoes).padStart(2, '0')}
            </div>
        </div>
    )
}