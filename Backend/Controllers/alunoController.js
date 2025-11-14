import Aluno from "../Models/Aluno.js";
import { Types } from "mongoose";

export default class alunoController {

    static async criarAluno(req, res) {
        const { nome, telefone, email, nome_responsavel, telefone_responsavel } = req.body;

        if (!nome || !telefone || !email || !nome_responsavel || !telefone_responsavel) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        try {
            const aluno = new Aluno({ nome, telefone, email, nome_responsavel, telefone_responsavel });
            await aluno.save();
            res.status(201).json({ message: "Aluno criado com sucesso", aluno });
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar aluno", error: error.message });
        }
    }// fim do criarAluno

    static async listarAlunos(req, res) {
        try {
            const alunos = await Aluno.find();
            res.status(200).json(alunos);
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar alunos", error: error.message });
        }
    }// fim do listarAlunos

    static async buscarAlunoPorId(req, res) {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        try {
            const aluno = await Aluno.findById(id);
            if (!aluno) {
                return res.status(404).json({ message: "Aluno não encontrado" });
            }
            res.status(200).json(aluno);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar aluno", error: error.message });
        }
    }// fim do buscarAlunoPorId

    static async editarAluno(req, res) {
        const { id } = req.params;
        const { nome, telefone, email, nome_responsavel, telefone_responsavel } = req.body;

        if (!nome || !telefone || !email || !nome_responsavel || !telefone_responsavel) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        try {
            const aluno = await Aluno.findByIdAndUpdate(id, { nome, telefone, email, nome_responsavel, telefone_responsavel }, { new: true });
            if (!aluno) {
                return res.status(404).json({ message: "Aluno não encontrado" });
            }
            res.status(200).json({ message: "Aluno atualizado com sucesso", aluno });
        } catch (error) {
            res.status(500).json({ message: "Erro ao editar aluno", error: error.message });
        }
    }// fim do editarAluno
}// fim do alunoController