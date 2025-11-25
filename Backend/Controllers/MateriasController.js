import Materia from "../Models/Materia.js";
import { Types } from "mongoose";

export default class MateriasController {
    
    // Criar nova matéria
    static async criarMateria(req, res) {
        try {
            const { nome } = req.body;

            if (!nome || !nome.trim()) {
                return res.status(400).json({ error: "O nome da matéria é obrigatório." });
            }

            // Verifica se já existe matéria com mesmo nome (case-insensitive)
            const materiaExistente = await Materia.findOne({ 
                nome: { $regex: new RegExp(`^${nome.trim()}$`, 'i') } 
            });

            if (materiaExistente) {
                return res.status(409).json({ 
                    error: "Já existe uma matéria cadastrada com este nome." 
                });
            }

            const novaMateria = await Materia.create({ nome: nome.trim() });
            return res.status(201).json(novaMateria);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar matéria." });
        }
    }

    // Listar todas as matérias
    static async listarMaterias(req, res) {
        try {
            const materias = await Materia.find().sort("nome");
            return res.status(200).json({ materias });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao listar matérias." });
        }
    }

    // Buscar matéria por ID
    static async buscarMateriaPorId(req, res) {
        try {
            const id = req.params.id?.trim();
            
            if (!Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID inválido." });
            }

            const materia = await Materia.findById(id);

            if (!materia) {
                return res.status(404).json({ error: "Matéria não encontrada." });
            }

            return res.status(200).json(materia);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar matéria." });
        }
    }

    // Editar matéria
    static async editarMateria(req, res) {
        try {
            const id = req.params.id?.trim();
            const { nome } = req.body;

            if (!Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID inválido." });
            }

            if (!nome || !nome.trim()) {
                return res.status(400).json({ error: "O nome da matéria é obrigatório." });
            }

            // Verifica se já existe outra matéria com mesmo nome (excluindo a atual)
            const materiaExistente = await Materia.findOne({ 
                nome: { $regex: new RegExp(`^${nome.trim()}$`, 'i') },
                _id: { $ne: id }
            });

            if (materiaExistente) {
                return res.status(409).json({ 
                    error: "Já existe uma matéria cadastrada com este nome." 
                });
            }

            const materiaAtualizada = await Materia.findByIdAndUpdate(
                id,
                { nome: nome.trim() },
                { new: true, runValidators: true }
            );

            if (!materiaAtualizada) {
                return res.status(404).json({ error: "Matéria não encontrada." });
            }

            return res.status(200).json(materiaAtualizada);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao editar matéria." });
        }
    }

    // Buscar matéria por nome (para pesquisa)
    static async getMateriaByName(req, res) {
        try {
            const { text } = req.query;

            if (!text || typeof text !== 'string' || text.trim() === '') {
                return res.status(422).json({ message: "Texto de busca inválido" });
            }

            const materias = await Materia.find({ 
                nome: { $regex: text, $options: "i" } 
            }).sort("nome");

            return res.status(200).json({ materias });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar matéria." });
        }
    }
}