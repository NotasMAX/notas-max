import React, { useState, useEffect, useRef, use } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../styles/SimuladosForm.module.css";
import { getAllTurmas, getOne } from "../api/turmasapi";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import SimuladosDisciplinaItem from "./SimuladosDisciplinaItem";

export default function SimuladosForm({ initialData, onSubmit, response }) {
    const [formData, setFormData] = useState(initialData || {
        numero: 0,
        tipo: "",
        bimestre: 0,
        data_realizacao: "",
        turma_id: "",
        Disciplinas: [],
    });
    const navigate = useNavigate();
    const [Turmas, setTurmas] = useState([]);
    const toast = useRef(null);

    const removeDisciplina = (disciplinaToRemove) => {
        setFormData(prevData => ({
            ...prevData,
            Disciplinas: prevData.Disciplinas.filter(disciplina => disciplina._id !== disciplinaToRemove._id)
        }));
        if (toast && toast.current) {
            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Disciplina excluída com sucesso', life: 3000 });
        }
    };

    const fetchTurmas = async () => {
        try {
            const response = await getAllTurmas();
            setTurmas(response.data.turmas);
        } catch (error) {
            console.error('Error fetching turmas:', error);
        }
    };

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
        fetchTurmas();
    }, [initialData]);

    useEffect(() => {
    }, [formData]);

    const fetchDisciplinas = async (e) => {
        e.preventDefault();
        const oldFormData = { ...formData };
        if (!formData.turma_id) {
            toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Selecione uma turma antes de buscar disciplinas.', life: 3000 });
            return;
        }
        try {
            const response = await getOne(formData.turma_id);
            if (!response.data.turma.disciplinas[0]._id) {
                toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'A turma selecionada não possui disciplinas.', life: 3000 });
                return;
            }
            const newDisciplinas = [];
            response.data.turma.disciplinas.forEach(element => {
                newDisciplinas.push(
                    {
                        _id: element._id,
                        materia: element.materia,
                        professor: element.professor,
                        quantidade_questoes: 0,
                        peso: 0
                    }
                );
            });
            setFormData(prevData => ({
                ...prevData,
                Disciplinas: newDisciplinas
            }));
            if (JSON.stringify(oldFormData.Disciplinas) !== JSON.stringify(newDisciplinas)) {
                if (toast && toast.current) {
                    toast.current.show({ severity: 'success', summary: 'Aviso', detail: 'Disciplinas carregadas com sucesso', life: 3000 });
                }
            }
        } catch (error) {
            console.error('Error fetching turma:', error);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleChangeTurma = (e) => {
        const { name, value } = e.target;
        if (formData.turma_id !== value) {
            if (formData.Disciplinas.length > 0 && formData.Disciplinas[0]._id) {
                confirmDialog({
                    message: 'Alterar a turma irá limpar as disciplinas selecionadas. Deseja continuar?',
                    header: 'Confirmação',
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24"><g fill="none"><path stroke="#ee4544" strokeLinecap="round" strokeWidth="1.5" d="M12 7v6" /><circle cx="12" cy="16" r="1" fill="#ee4544" /><path stroke="#ee4544" strokeLinecap="round" strokeWidth="1.5" d="M9.216 3c1.18-.667 1.954-1 2.784-1c1.114 0 2.128.6 4.157 1.802l.686.406c2.029 1.202 3.043 1.803 3.6 2.792c.557.99.557 2.19.557 4.594v.812c0 2.403 0 3.605-.557 4.594c-.557.99-1.571 1.59-3.6 2.791l-.686.407C14.128 21.399 13.114 22 12 22c-1.114 0-2.128-.6-4.157-1.802l-.686-.407c-2.029-1.2-3.043-1.802-3.6-2.791C3 16.01 3 14.81 3 12.406v-.812C3 9.19 3 7.989 3.557 7C3.996 6.22 4.719 5.682 6 4.9" /></g></svg>,
                    acceptClassName: 'p-button-danger',
                    acceptLabel: 'Sim',
                    rejectLabel: 'Não',
                    accept: () => {
                        if (toast && toast.current) {
                            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Turma alterada com sucesso', life: 3000 });
                        }
                        setFormData(prevData => ({ ...prevData, [name]: value, Disciplinas: [] }));
                    },
                    reject: () => {
                        if (toast && toast.current) {
                            toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Alteração cancelada', life: 3000 });
                        }
                    }
                });
            }
            else {
                setFormData(prevData => ({ ...prevData, [name]: value, Disciplinas: [] }));
            }
        };
    };

    const handleChangeDate = (e) => {
        if (e.target.value < new Date().toISOString().split("T")[0]) {
            toast.current.show({ severity: 'error', summary: 'Erro', detail: 'A data não pode ser anterior à atual.', life: 3000 });
            return;
        }
        if (e.target.value === new Date().toISOString().split("T")[0]) {
            toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'A data é igual à data atual.', life: 3000 });
        }
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        console.log('Submitting form data:', formData);
        e.preventDefault();
        let questoesValidas = true;
        let pesosValidos = true;
        formData.Disciplinas.forEach(element => {
            if (element.quantidade_questoes <= 0) {
                questoesValidas = false;
            }
            if (element.peso <= 0) {
                pesosValidos = false;
            }
        });
        if (!questoesValidas) {
            toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Todas as disciplinas devem ter uma quantidade de questões maior que zero.', life: 3000 });
        }
        if (!pesosValidos) {
            toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Todas as disciplinas devem ter um peso maior que zero.', life: 3000 });
        }
        if (!questoesValidas || !pesosValidos) {
            return;
        }
        // onSubmit(formData);
    };

    const handleAddDisciplina = (e, type) => {
        if (type === "one") {
        } else if (type === "all") {
        }
        e.preventDefault();
    }

    return (
        <div>
            <Toast ref={toast} />
            <ConfirmDialog />
            <form>
                {response && (
                    <div id="error" className={Style.spanError}>{response.message}</div>
                )}
                <div className={Style.formGroup}>
                    <div className={Style.formSelectContainerLarge}>
                        <select
                            required
                            name="turma_id"
                            value={String(formData.turma_id)}
                            className={Style.formSelect}
                            onChange={handleChangeTurma}
                        >
                            <option className={Style.formOption} value="">Turma</option>
                            {Turmas.map((turma) => (
                                <option className={Style.formOption} key={turma._id} value={turma._id}>
                                    {turma.ano} - {turma.serie}º EM
                                </option>
                            ))}
                        </select>
                        <svg className={Style.formSelectArrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" />
                        </svg>
                    </div>
                    <div className={Style.formSelectContainerLarge}>
                        <select
                            required
                            name="bimestre"
                            value={String(formData.bimestre)}
                            className={Style.formSelect}
                            onChange={handleChange}
                        >
                            <option className={Style.formOption} value=""> Bimestre</option>
                            {[1, 2, 3, 4].map(bimestre => (
                                <option className={Style.formOption} key={bimestre} value={bimestre}>
                                    {bimestre}º Bimestre
                                </option>
                            ))}
                        </select>
                        <svg className={Style.formSelectArrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" />
                        </svg>
                    </div>
                </div>
                <div className={Style.formGroup}>
                    <div className={Style.formSelectContainerLarge}>
                        <select
                            required
                            name="tipo"
                            value={String(formData.tipo)}
                            className={Style.formSelect}
                            onChange={handleChange}
                        >
                            <option className={Style.formOption} value=""> Tipo</option>
                            <option className={Style.formOption} key="dissertativo" value="Dissertativo">
                                Dissertativo
                            </option>
                            <option className={Style.formOption} key="objetivo" value="Objetivo">
                                Objetivo
                            </option>
                        </select>
                        <svg className={Style.formSelectArrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" />
                        </svg>
                    </div>
                    <div className={Style.formSelectContainerLarge}>
                        <select
                            required
                            className={Style.formSelect}
                            id="numero" name="numero"
                            value={formData.numero}
                            onChange={handleChange}>
                            <option className={Style.formOption} value=""> Numeração</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <option className={Style.formOption} key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                        <svg className={Style.formSelectArrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" />
                        </svg>
                    </div>
                    <div className={Style.formSelectContainer}>
                        <input
                            type="date"
                            required
                            name="data_realizacao"
                            value={formData.data_realizacao}
                            className={Style.formInput}
                            onChange={handleChangeDate}
                        />
                    </div>
                </div>
                <div className={Style.formGroupDisciplinas}>
                    <button onClick={(e) => handleAddDisciplina(e)} className={Style.buttonDisciplinas}>
                        <svg className={Style.buttonDisciplinasIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z" />
                        </svg>
                        Adicionar uma disciplina
                    </button>

                    <button onClick={fetchDisciplinas} className={Style.buttonDisciplinasLarge}>
                        <svg className={Style.buttonDisciplinasIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z" />
                        </svg>
                        Adicionar todas as disciplinas
                    </button>
                </div>
                <div className={Style.SimuladoContainerDisciplinas}>
                    <div className={Style.ContainerDisciplinasHeader}>
                        <div className={Style.ContainerDisciplinasCol}>
                            Disciplina
                        </div>
                        <div className={Style.ContainerDisciplinasCol}>
                            Professor
                        </div>
                        <div className={Style.ContainerDisciplinasCol}>
                            Nº Questões
                        </div>
                        <div className={Style.ContainerDisciplinasCol}>
                            Peso
                        </div>
                        <div className={Style.ContainerDisciplinasColAcoes}>
                        </div>
                    </div>
                    {formData.Disciplinas.length === 0 || !formData.Disciplinas[0]._id ? (
                        <div className={Style.ContainerDisciplinasEmpty}>
                            Nenhuma disciplina adicionada.
                        </div>
                    ) : (
                        [...formData.Disciplinas].sort((a, b) => (a.materia.nome || '').localeCompare(b.materia.nome || '')).map((disciplina, index) => (
                            <SimuladosDisciplinaItem
                                key={disciplina._id || index}
                                disciplina={disciplina}
                                removeDisciplina={removeDisciplina}
                            />
                        ))
                    )}
                </div>
                <div className={Style.buttonGroup}>
                    <div className={Style.buttonGroup}>
                        <button type="submit" className={Style.buttonPrimary} onClick={handleSubmit}>
                            Cadastrar Simulado
                        </button>
                        <button
                            type="button"
                            className={Style.buttonSecondary}
                            onClick={() => {
                                confirmDialog({
                                    message: 'Deseja realmente cancelar o cadastro do simulado? As alterações não serão salvas.',
                                    header: 'Confirmação',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24"><g fill="none"><path stroke="#ee4544" strokeLinecap="round" strokeWidth="1.5" d="M12 7v6" /><circle cx="12" cy="16" r="1" fill="#ee4544" /><path stroke="#ee4544" strokeLinecap="round" strokeWidth="1.5" d="M9.216 3c1.18-.667 1.954-1 2.784-1c1.114 0 2.128.6 4.157 1.802l.686.406c2.029 1.202 3.043 1.803 3.6 2.792c.557.99.557 2.19.557 4.594v.812c0 2.403 0 3.605-.557 4.594c-.557.99-1.571 1.59-3.6 2.791l-.686.407C14.128 21.399 13.114 22 12 22c-1.114 0-2.128-.6-4.157-1.802l-.686-.407c-2.029-1.2-3.043-1.802-3.6-2.791C3 16.01 3 14.81 3 12.406v-.812C3 9.19 3 7.989 3.557 7C3.996 6.22 4.719 5.682 6 4.9" /></g></svg>,
                                    acceptClassName: 'p-button-danger',
                                    acceptLabel: 'Sim',
                                    rejectLabel: 'Não',
                                    accept: () => {
                                        navigate(-1)
                                    },
                                    reject: () => {
                                        if (toast && toast.current) {
                                            toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Mudança de página cancelada', life: 3000 });
                                        }
                                    }
                                });
                            }}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </form >
        </div >
    );
}