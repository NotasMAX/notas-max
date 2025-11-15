import Materia from '../Models/Materia.js';

import { Types } from 'mongoose';

export default class MateriasController {

    static async criarMateria(req, res) {
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({ message: "O nome da materia é obrigatório" });
        }

        try {
            const materia = new Materia({ nome });
            await materia.save();
            res.status(201).json({ message: "Materia criada com sucesso", materia });
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar materia", error: error.message });
        }
    }// fim do criarMateria

    static async listarMaterias(req, res) {
        try {
            const materias = await Materia.find().sort({ nome: 1 });
            res.status(200).json({materias});
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar materias", error: error.message });
        }
    }// fim do listarMaterias

    static async buscarMateriaPorId(req, res) {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        try {
            const materia = await Materia.findById(id);
            if (!materia) {
                return res.status(404).json({ message: "Materia não encontrada" });
            }
            res.status(200).json(materia);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar materia", error: error.message });
        }
    }// fim do buscarMateriaPorId

    static async editarMateria(req, res) {
        const { id } = req.params;
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({ message: "O nome da materia é obrigatório" });
        }

        try {
            const materia = await Materia.findByIdAndUpdate(id, { nome }, { new: true });
            if (!materia) {
                return res.status(404).json({ message: "Materia não encontrada" });
            }
            res.status(200).json({ message: "Materia atualizada com sucesso", materia });
        } catch (error) {
            res.status(500).json({ message: "Erro ao editar materia", error: error.message });
        }
    }// fim do editarMateria

    static async getMateriaByName(req, res) {
        const { text } = req.query;
        if (!text || typeof text !== 'string' || text.trim() === '') {
            return res.status(422).json({ message: "Texto de busca inválido" });
        }
        try {
            const materias = await Materia.find({ nome: { $regex: text, $options: "i" } }).sort("nome");
            res.status(200).json({ materias });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar a Matéria", error });
        }
    }
}
