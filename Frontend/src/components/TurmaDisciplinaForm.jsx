import React, { useState, useEffect, useRef } from 'react'
import Style from "../styles/TurmasDisciplinaForm.module.css";
import { confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { getProfessores, buscarProfessoresPorNomeOuEmail } from '../api/usuariosapi';
import { listarMaterias, buscarMateriasPorNome } from '../api/materiaApi';
import { addDisciplina } from '../api/turmasapi';

export default function TurmaDisciplinaForm({ initialData, onSubmit, toast, turma, overlayRef }) {
    const [formData, setFormData] = useState(initialData || {
        text: ""
    });
    const [loading, setLoading] = useState(false);
    const [Professores, setProfessores] = useState([]);
    const [ProfessorSelecionado, setProfessorSelecionado] = useState(null);
    const professorSection = useRef(null);
    const [Materias, setMaterias] = useState([]);
    const materiaSection = useRef(null);

    useEffect(() => {
        setLoading(true);
        getProfessores().then(response => {
            setProfessores(response.data);
        }).catch(error => {
            console.error("Erro ao buscar professores:", error);
        }).finally(() => {
            setLoading(false);
        });

        listarMaterias().then(response => {
            setMaterias(response.data.materias);
        }).catch(error => {
            console.error("Erro ao buscar matérias:", error);
        }).finally(() => {
            setLoading(false);
        });

        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChangeProfessor = async (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        if (event.target.value.trim() !== "") {
            await buscarProfessoresPorNomeOuEmail(event.target.value).then(response => {
                setProfessores(response.data.professores);
            })
                .catch(error => {
                    if (toast && toast.current) {
                        toast.current.show({ severity: 'error', summary: 'Erro', detail: `${error.response.data.message || "Falha ao buscar professor"}`, life: 3000 });
                    }
                    else {
                        alert("Erro ao buscar professor.");
                    }
                });
        }
        else {
            getProfessores().then(response => {
                setProfessores(response.data.professores);
            }).catch(error => {
                console.error("Erro ao buscar professores:", error);
            });
        }
    }

    const handleChangeMateria = async (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        if (event.target.value.trim() !== "") {
            await buscarMateriasPorNome(event.target.value).then(response => {
                setMaterias(response.data.materias);
            })
                .catch(error => {
                    if (toast && toast.current) {
                        toast.current.show({ severity: 'error', summary: 'Erro', detail: `${error.response.data.message || "Falha ao buscar matéria"}`, life: 3000 });
                    }
                    else {
                        alert("Erro ao buscar matéria.");
                    }
                });
        }
        else {
            listarMaterias().then(response => {
                setMaterias(response.data.materias);
            }).catch(error => {
                console.error("Erro ao buscar matérias:", error);
            });
        }
    }

    const handleClickMateria = (materia) => {
        confirmDialog({
            message: `Deseja adicionar a disciplina: [${materia.nome} - ${ProfessorSelecionado.nome}] na turma ${turma.serie}º EM ${turma.ano}?`,
            header: 'Confirmação',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24"><g fill="none"><path stroke="#FFCC00" strokeLinecap="round" strokeWidth="1.5" d="M12 7v6" /><circle cx="12" cy="16" r="1" fill="#FFCC00" /><path stroke="#FFCC00" strokeLinecap="round" strokeWidth="1.5" d="M9.216 3c1.18-.667 1.954-1 2.784-1c1.114 0 2.128.6 4.157 1.802l.686.406c2.029 1.202 3.043 1.803 3.6 2.792c.557.99.557 2.19.557 4.594v.812c0 2.403 0 3.605-.557 4.594c-.557.99-1.571 1.59-3.6 2.791l-.686.407C14.128 21.399 13.114 22 12 22c-1.114 0-2.128-.6-4.157-1.802l-.686-.407c-2.029-1.2-3.043-1.802-3.6-2.791C3 16.01 3 14.81 3 12.406v-.812C3 9.19 3 7.989 3.557 7C3.996 6.22 4.719 5.682 6 4.9" /></g></svg>,
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => { accept(materia); },
            reject: () => { reject(); }
        });
    }

    const accept = async (materia) => {
        overlayRef.current.hide();
        try {
            const res = await addDisciplina({ turma_id: turma._id, professor_id: ProfessorSelecionado._id, materia_id: materia._id });
            if (toast && toast.current) {
                toast.current.show({ severity: 'success', summary: 'Sucesso', detail: res.data.message || "Disciplina adicionada com sucesso", life: 3000 });
            }
            onSubmit();
        } catch (error) {
            if (toast && toast.current) {
                toast.current.show({ severity: 'error', summary: 'Erro', detail: `${error.response.data.message || "Falha ao adicionar disciplina"}`, life: 3000 });
            }
            else {
                alert("Erro ao adicionar disciplina na turma.");
            }
        }
    }

    const reject = () => {
        overlayRef.current.hide();
        if (toast && toast.current) {
            toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Adição cancelada', life: 3000 });
        }
    }

    const handleClickProfessor = (e) => {
        professorSection.current.style.display = 'none';
        setProfessorSelecionado(e);
        materiaSection.current.hidden = false;
    }

    return (
        <form className={Style.TurmasDisciplinaForm} onSubmit={(e) => e.preventDefault()}>
            <div className={Style.TurmasDisciplinaProfessorContainer} ref={professorSection}>
                <h2 className={Style.TurmasDisciplinaFormHeader}>Escolha um professor para a nova disciplina {turma.nome}</h2>
                <InputText
                    type="text"
                    name="text"
                    onChange={handleChangeProfessor}
                    value={formData.text}
                    placeholder="Digite o nome ou email do professor"
                    className={Style.TurmasDisciplinaFormInput}
                />
                <div className={Style.TurmasDisciplinaFormList}>
                    {loading ? (<p>Carregando professores...</p>) : (
                        !Professores || Professores.length === 0 ? (
                            <span className={Style.TurmasDisciplinaFormAlert} >Nenhum professor encontrado.</span>
                        ) : (
                            Professores.map(professor => (
                                <div key={professor._id} className={Style.TurmasDisciplinaFormListItem} onClick={() => handleClickProfessor(professor)}>
                                    {professor.nome}  [{professor.email}]
                                </div>
                            ))
                        )
                    )}
                </div>
            </div>
            <div className={Style.TurmasDisciplinaMateriaContainer} ref={materiaSection} hidden>
                <h2 className={Style.TurmasDisciplinaFormHeader}>Escolha uma matéria para a nova disciplina {turma.nome}</h2>
                <InputText
                    type="text"
                    name="text"
                    onChange={handleChangeMateria}
                    value={formData.text}
                    placeholder="Digite o nome da matéria"
                    className={Style.TurmasDisciplinaFormInput}
                />
                <div className={Style.TurmasDisciplinaFormList}>
                    {loading ? (<p>Carregando professores...</p>) : (
                        !Materias || Materias.length === 0 ? (
                            <span className={Style.TurmasDisciplinaFormAlert} >Nenhuma matéria encontrada.</span>
                        ) : (
                            Materias.map(materia => (
                                <div key={materia._id} className={Style.TurmasDisciplinaFormListItem} onClick={() => handleClickMateria(materia)}>
                                    {materia.nome}
                                </div>
                            ))
                        )
                    )}
                </div>
            </div>
        </form>
    );
}