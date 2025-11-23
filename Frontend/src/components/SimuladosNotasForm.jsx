import React, { useState, useEffect, useRef, use } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../styles/SimuladosNotasForm.module.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import SimuladosNotaItem from "./SimuladosNotaItem";
import { Tooltip } from "primereact/tooltip";

export default function SimuladosForm({ initialData, onSubmit, response, conteudosRecebidos, aluno, proximoAluno, AlunoAnterior }) {
    const [formData, setFormData] = useState(initialData || {
        conteudos: conteudosRecebidos
    });
    const tooltipVoltar = useRef(null);
    const tooltipAvancar = useRef(null);
    const toast = useRef(null);
    const navigate = useNavigate();
    const [NumeroQuestoes, setNumeroQuestoes] = useState();
    const [NumeroAcertos, setNumeroAcertos] = useState();

    useEffect(() => {
        setFormData({ ...formData, conteudos: conteudosRecebidos });
        setNumeroQuestoes(conteudosRecebidos.reduce((total, conteudo) => total + (conteudo.quantidade_questoes || 0), 0));
    }, [conteudosRecebidos]);

    useEffect(() => {
        if (response) {
            if (toast && toast.current) {
                toast.current.show({ severity: 'error', summary: 'Erro', detail: response.message, life: 5000 });
            }
        }
    }, [response]);

    useEffect(() => {
        setNumeroAcertos(formData.conteudos.reduce((total, conteudo) => total + (conteudo.resultados?.acertos || 0), 0));
    }, [formData.conteudos]);

    const handleChange = (e) => {
        const updatedConteudos = formData.conteudos.map((conteudo) =>
            conteudo.turma_disciplina_id === e.turma_disciplina_id
                ? e
                : conteudo
        );
        const newFormData = { ...formData, conteudos: updatedConteudos };
        setFormData(newFormData);
    }

    const handleSubmit = (e) => {
        console.log("proxximo", proximoAluno, "anterior", AlunoAnterior)
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <div>
            <Toast ref={toast} />
            <Tooltip target={tooltipVoltar} className="text-center" />
            <Tooltip target={tooltipAvancar} className="text-center" />

            <ConfirmDialog />
            <form onSubmit={handleSubmit} className={Style.FormContainer}>
                <div className={Style.ContainerHeader}>
                    <div className={Style.ContainerCol}>
                        Disciplina
                    </div>
                    <div className={Style.ContainerCol}>
                        Professor
                    </div>
                    <div className={Style.ContainerCol}>
                        Resultado
                    </div>
                    <div className={Style.ContainerColAcoes}>
                    </div>
                </div>
                {formData.conteudos && formData.conteudos.length === 0 && (
                    <div className={Style.ContainerEmpty}>
                        Nenhum simulado encontrado.
                    </div>
                )}
                {formData.conteudos && formData.conteudos.map((conteudo, index) => (
                    <SimuladosNotaItem
                        key={index}
                        conteudo={conteudo}
                        aluno={aluno}
                        onUpdate={handleChange}
                        toast={toast}
                    />
                ))}
                <div className={Style.ContainerFooter}>
                    <div className={Style.ContainerCol}>
                        Total
                    </div>
                    <div className={Style.ContainerCol}>

                    </div>
                    <div className={Style.ContainerCol}>
                        {String(NumeroAcertos).padStart(2, '0')}
                    </div>
                    <div className={Style.ContainerColAcoes}>
                        / {String(NumeroQuestoes).padStart(2, '0')}
                    </div>
                </div>
                <div className={Style.buttonGroup}>
                    <button
                        type="button"
                        ref={tooltipVoltar}
                        data-pr-tooltip={(!AlunoAnterior) ? "Cancelar as Alterações" : "Cancelar as alterações e voltar ao aluno anterior"}
                        data-pr-position="bottom"
                        className={Style.buttonSecondary}
                        onClick={() => {
                            confirmDialog({
                                message: `Deseja realmente ${(!AlunoAnterior) ? "cancelar as alterações?" : "voltar? As alterações não serão salvas."}`,
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
                        {(!AlunoAnterior) ? "Cancelar" : "Voltar ao anterior"}
                    </button>
                    <button
                        type="submit"
                        className={Style.buttonPrimary}
                        ref={tooltipAvancar}
                        data-pr-tooltip={ (!proximoAluno) ? "Salvar as notas" : "Salvar as notas e avançar para o próximo aluno"}
                        data-pr-position="bottom"  >
                        {(!proximoAluno) ? "Salvar" : "Salvar e avançar"}
                    </button>
                </div>
            </form >
        </div >
    );
}