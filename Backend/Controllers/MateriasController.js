import Materias from "../Models/Materia.js";
import { Types } from "mongoose";

export default class MateriasController {
    static async create(req, res) { //Somente para testes
        const {
            nome,
        } = req.body;

        if (!nome) {
            return res.status(422).json({ message: "Preencha o nome da matéria." });
        }
        const materia = new Materias({
            nome
        });
        try {
            const existingMateria = await Materias.findOne({ nome });
            if (existingMateria) {
                return res.status(409).json({ message: "Já existe uma matéria com esse nome." });
            }
            const novaMateria = await materia.save();
            res.status(200).json({ message: "Matéria inserida com sucesso!", novaMateria });
        }
        catch (error) {
            res.status(500).json({ message: "Problema ao inserir a Matéria", error });
        }
    }

    static async getAll(req, res) {
        try {
            const materias = await Materias.find({}).sort("nome");
            if (!materias || materias.length === 0) {
                return res.status(404).json({ message: "Nenhuma matéria encontrada." });
            }
            res.status(200).json({ materias });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar todas as matérias", error });
        }
    }

    static async getOne(req, res) {

        const id = req.params.id;
        const ObjectId = Types.ObjectId;
        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: "Id da matéria inválido" });
        }
        try {
            const materia = await Materias.findById(id);
            if (!materia) {
                return res.status(404).json({ message: "Matéria não encontrada." });
            }
            res.status(200).json(materia);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar a Matéria", error });
        }
    }


    static async getMateriaByName(req, res) {
        const { text } = req.query;
        if (!text || typeof text !== 'string' || text.trim() === '') {
            return res.status(422).json({ message: "Texto de busca inválido" });
        }
        try {
            const materias = await Materias.find({ nome: { $regex: text, $options: "i" } }).sort("nome");
            res.status(200).json({ materias });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar a Matéria", error });
        }
    }
}

