import React, { useState, useEffect, useRef } from 'react'
import Style from "../styles/SimuladosDisciplinaForm.module.css";
import { confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { getOne } from "../api/turmasapi";

export default function SimuladosDisciplinaForm({ initialData, onSubmit, toast, turma_id, overlayRef }) {
    const [formData, setFormData] = useState(initialData || {
        text: ""
    });
    const [Disciplinas, setDisciplinas] = useState([]);

    const fetch = async () => {
        try {
            const res = await getOne(turma_id);
            setDisciplinas(res.data.turma.disciplinas);
        } catch (err) {
            console.error("Erro ao buscar disciplinas:", err);
        }
    };

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
        fetch();
    }, [initialData]);


    const handleClickDisciplina = (disciplina) => {
        confirmDialog({
            message: `Deseja adicionar a disciplina: [${disciplina.materia.nome} - ${disciplina.professor.nome}] no simulado?`,
            header: 'Confirmação',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24"><g fill="none"><path stroke="#FFCC00" strokeLinecap="round" strokeWidth="1.5" d="M12 7v6" /><circle cx="12" cy="16" r="1" fill="#FFCC00" /><path stroke="#FFCC00" strokeLinecap="round" strokeWidth="1.5" d="M9.216 3c1.18-.667 1.954-1 2.784-1c1.114 0 2.128.6 4.157 1.802l.686.406c2.029 1.202 3.043 1.803 3.6 2.792c.557.99.557 2.19.557 4.594v.812c0 2.403 0 3.605-.557 4.594c-.557.99-1.571 1.59-3.6 2.791l-.686.407C14.128 21.399 13.114 22 12 22c-1.114 0-2.128-.6-4.157-1.802l-.686-.407c-2.029-1.2-3.043-1.802-3.6-2.791C3 16.01 3 14.81 3 12.406v-.812C3 9.19 3 7.989 3.557 7C3.996 6.22 4.719 5.682 6 4.9" /></g></svg>,
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => { accept(disciplina); },
            reject: () => { reject(); }
        });
    }

    const accept = (disciplina) => {
        overlayRef.current.hide();
        onSubmit(disciplina);
    }

    const reject = () => {
        overlayRef.current.hide();
        if (toast && toast.current) {
            toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Adição cancelada', life: 3000 });
        }
    }

    return (
        <form className={Style.SimuladosDisciplinaForm} onSubmit={(e) => e.preventDefault()}>
            <div className={Style.SimuladosDisciplinaContainer} >
                <h2 className={Style.SimuladosDisciplinaFormHeader}>Escolha uma disciplina</h2>
                <InputText
                    type="text"
                    name="text"
                    // onChange={handleChangeProfessor}
                    value={formData.text}
                    placeholder="Digite o nome da disciplina ou do professor"
                    className={Style.SimuladosDisciplinaFormInput}
                />
                <div className={Style.SimuladosDisciplinaFormList}>
                    {(!Disciplinas || Disciplinas.length === 0 || Disciplinas[0]?._id == null) ? (
                        <span className={Style.SimuladosDisciplinaFormAlert}>Nenhuma disciplina encontrada.</span>
                    ) : (
                        Disciplinas.map(disciplina => (
                            <div
                                key={disciplina._id}
                                className={Style.SimuladosDisciplinaFormListItem}
                                onClick={() => handleClickDisciplina(disciplina)}
                            >
                                {disciplina.materia?.nome || 'Disciplina'} [{disciplina.professor?.nome || '—'}]
                            </div>
                        ))
                    )}

                </div>
            </div>
        </form>
    );
}