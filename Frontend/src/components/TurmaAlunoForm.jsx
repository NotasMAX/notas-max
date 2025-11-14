import React, { useState, useEffect } from 'react'
import Style from "../styles/TurmasAlunoForm.module.css";
import { confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { getAlunos, addAluno, buscarAlunosPorNomeOuEmail } from '../api/turmasapi';

export default function TurmaAlunoForm({ initialData, onSubmit, toast, turma }) {
    const [formData, setFormData] = useState(initialData || {
        text: ""
    });
    const [Alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAlunos().then(response => {
            setAlunos(response.data.alunos);
        }).catch(error => {
            console.error("Erro ao buscar alunos:", error);
        }).finally(() => {
            setLoading(false);
        });
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = async (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        if (event.target.value.trim() !== "") {
            await buscarAlunosPorNomeOuEmail(event.target.value).then(response => {
                setAlunos(response.data.alunos);
            })
                .catch(error => {
                    if (toast && toast.current) {
                        toast.current.show({ severity: 'error', summary: 'Erro', detail: `${error.response.data.message || "Falha ao buscar aluno"}`, life: 3000 });
                    }
                    else {
                        alert("Erro ao buscar aluno.");
                    }
                });
        }
    }

    const handleClick = (e) => {
        confirmDialog({
            message: `Deseja adicionar ${e.nome} na turma ${turma.serie}º EM ${turma.ano}?`,
            header: 'Confirmação',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24"><g fill="none"><path stroke="#FFCC00" strokeLinecap="round" strokeWidth="1.5" d="M12 7v6" /><circle cx="12" cy="16" r="1" fill="#FFCC00" /><path stroke="#FFCC00" strokeLinecap="round" strokeWidth="1.5" d="M9.216 3c1.18-.667 1.954-1 2.784-1c1.114 0 2.128.6 4.157 1.802l.686.406c2.029 1.202 3.043 1.803 3.6 2.792c.557.99.557 2.19.557 4.594v.812c0 2.403 0 3.605-.557 4.594c-.557.99-1.571 1.59-3.6 2.791l-.686.407C14.128 21.399 13.114 22 12 22c-1.114 0-2.128-.6-4.157-1.802l-.686-.407c-2.029-1.2-3.043-1.802-3.6-2.791C3 16.01 3 14.81 3 12.406v-.812C3 9.19 3 7.989 3.557 7C3.996 6.22 4.719 5.682 6 4.9" /></g></svg>,
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => { accept(e); },
            reject: () => { reject(); }
        });
    }

    const accept = async (e) => {
        try {
            const res = await addAluno({ turmaId: turma._id, alunoId: e._id });
            if (toast && toast.current) {
                toast.current.show({ severity: 'success', summary: 'Sucesso', detail: res.data.message || "Aluno adicionado com sucesso", life: 3000 });
            }
            onSubmit();
        } catch (error) {
            if (toast && toast.current) {
                toast.current.show({ severity: 'error', summary: 'Erro', detail: `${error.response.data.message || "Falha ao adicionar aluno"}`, life: 3000 });
            }
            else {
                alert("Erro ao adicionar aluno na turma.");
            }
        }
    }

    const reject = () => {
        if (toast && toast.current) {
            toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Adição cancelada', life: 3000 });
        }
    }

    return (
        <form className={Style.TurmasAlunoForm} onSubmit={(e) => e.preventDefault()}>
            <h2 className={Style.TurmasAlunoFormHeader}>Adicionar aluno na turma {turma.nome}</h2>
            <InputText
                type="text"
                name="text"
                onChange={handleChange}
                value={formData.text}
                placeholder="Digite o nome ou email do aluno"
                className={Style.TurmasAlunoFormInput}
            />
            <div className={Style.TurmasAlunoFormList}>
                {loading ? (<p>Carregando alunos...</p>) : (
                    !Alunos || Alunos.length === 0 ? (
                        <span className={Style.TurmasAlunoFormAlert} >Nenhum aluno encontrado.</span>
                    ) : (
                        Alunos.map(aluno => (
                            <div key={aluno._id} className={Style.TurmasAlunoFormListItem} onClick={() => handleClick(aluno)}>
                                {aluno.nome}  [{aluno.email}]
                            </div>
                        ))
                    )
                )}
            </div>
        </form>
    );
}