import React, { use, useState, useEffect } from 'react'
import Style from "../styles/SimuladosNotasItem.module.css";
import { getOneDisciplina } from '../api/turmasapi';

export default function SimuladosNotaItem({ conteudo, onUpdate }) {
    const [Disciplina, setDisciplina] = useState(null);

    const handleChange = (e) => {
        onUpdate(e.conteudo_id, e.target.name, e.target.value);
    }

    useEffect(() => {
        if (conteudo) {
            fetchDisciplina(conteudo.turma_disciplina_id);
        }
    }, [conteudo]);

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
                <input name='quantidade_questoes' type="number" min="0" max="10" className={Style.QuestoesInput} onChange={handleChange} />
            </div>
            <div className={Style.ContainerColAcoes}>
                / {String(conteudo?.quantidade_questoes).padStart(2, '0')}
            </div>
        </div>
    )
}