import React, { useEffect, useState } from "react";
import { getProfessores as getProfessor } from "../api/usuariosapi.js";
import { getMateriaById as getMateria } from "../api/materiaApi.js";

export default function NotasCard({ simuladoResult, simuladoConteudo }) {
    const [materias, setMaterias] = useState({});
    const [professores, setProfessores] = useState({});

    useEffect(() => {
        const materiaIds = [...new Set(simuladoConteudo.map(c => c.materia_id).filter(Boolean))]
            .filter(id => !(id in materias));
        const professorIds = [...new Set(simuladoConteudo.map(c => c.professor_id).filter(Boolean))]
            .filter(id => !(id in professores));

        if (materiaIds.length === 0 && professorIds.length === 0) return;

        let cancelled = false;

        async function load() {
            try {
                const matPromises = materiaIds.map(id =>
                    getMateria(id).then(res => res?.data ?? res).then(data => ({ id, data }))
                );
                const profPromises = professorIds.map(id =>
                    getProfessor(id).then(res => res?.data ?? res).then(data => ({ id, data }))
                );
                const matRes = await Promise.all(matPromises);
                const profRes = await Promise.all(profPromises);
                if (cancelled) return;
                setMaterias(prev => {
                    const next = { ...prev };
                    matRes.forEach(({ id, data }) => next[id] = data ?? null);
                    return next;
                });
                setProfessores(prev => {
                    const next = { ...prev };
                    profRes.forEach(({ id, data }) => next[id] = data ?? null);
                    return next;
                });
            } catch (err) {
                console.error("Erro ao carregar materias/professores", err);
            }
        }
        load();
        return () => { cancelled = true; };
    }, [simuladoConteudo]);

    return (
        <div className="mb-2">
            {(simuladoConteudo || []).map(conteudo => {
                const materia = materias[conteudo.materia_id] || {};
                const professor = professores[conteudo.professor_id] || {};
                const resultado = (simuladoResult || []).find(r => r.materia_id === conteudo.materia_id) || {};
                const acertos = Number(resultado.acertos || 0);
                const quantidade = Number(conteudo.quantidade_questoes || 0);
                return (
                    <div key={conteudo.id ?? `${conteudo.materia_id}-${conteudo.professor_id}`} className="mt-2 flex items-center gap-2 rounded-sm border border-gray-200 bg-white p-2">
                        <div className="w-1/3">{materia.nome ?? "—"}</div>
                        <div className="w-1/3">{professor.nome ?? "—"}</div>
                        <div className="flex w-1/3 items-center gap-3">
                            <p>{acertos} / {quantidade}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}