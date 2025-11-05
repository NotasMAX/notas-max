import Professor from "../Models/Professor.js";
import {Types} from 'mongoose';

export default class professorController {

    static async criarProfessor(req, res) {
        const { nome, email, telefone } = req.body;
        if (!nome || !email || !telefone) {
            return res.status(400).json({message: "Todos os campos são obrigatórios"});
        }

        try {
            const professor = new Professor({ nome, email, telefone });
            await professor.save();
            res.status(201).json({message: "Professor criado com sucesso", professor});
        } catch (error) {
            res.status(500).json({message: "Erro ao criar professor", error: error.message});
        }
    }// fim do criarProfessor

    static async listarProfessores(req, res) {
        try {
            const professores = await Professor.find();
            res.status(200).json(professores);
        } catch (error) {
            res.status(500).json({message: "Erro ao listar professores", error: error.message});
        }
    }// fim do listarProfessores

    static async editarProfessor(req, res) {
        const { id } = req.params;
        const { nome, email, telefone } = req.body;
        if (!nome || !email || !telefone) {
            return res.status(400).json({message: "Todos os campos são obrigatórios"});
        }
        try {
            const professor = await Professor.findByIdAndUpdate(id, { nome, email, telefone }, { new: true });
            if (!professor) {
                return res.status(404).json({message: "Professor não encontrado"});
            }
            res.status(200).json({message: "Professor atualizado com sucesso", professor});
        } catch (error) {
            res.status(500).json({message: "Erro ao editar professor", error: error.message});
        }
    }// fim do editarProfessor
}