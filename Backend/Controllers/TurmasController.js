import Turmas from "../Models/Turma.js";
import { Types } from "mongoose";

export default class TurmasController {
    static async create(req, res) {
        const { serie, ano } = req.body;

        if (!serie) {
            return res.status(422).json({ message: "Preencha a série da turma." });
        }
        if (!ano) {
            return res.status(422).json({ message: "Preencha o ano da turma." });
        }

        const turmaExists = await Turmas.findOne({ serie, ano });
        if (turmaExists) {
            return res.status(422).json({ message: "Já existe uma turma cadastrada com essa série e ano." });
        }

        console.log(req.body);
        const turma = new Turmas({
            serie,
            ano
        });

        try {
            const novaTurma = await turma.save();
            res.status(200).json({ message: "Turma inserida com sucesso!", novaTurma });
        }
        catch (error) {
            res.status(500).json({ message: "Problema ao inserir a Turma", error });
        }
    }

    static async getAll(req, res) {
        try {
            const turmas = await Turmas.find({}).sort("-createdAt");
            res.status(200).json({ turmas });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar todas as Turmas", error });
        }
    }

    static async getOne(req, res) {

        const id = req.params.id;
        const ObjectId = Types.ObjectId;
        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: "Id da turma inválido" });
        }
        try {
            const turma = await Turmas.findById(id);
            if (!turma) {
                return res.status(404).json({ message: "Turma não encontrada." });
            }
            res.status(200).json(turma);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar a Turma", error });
        }
    }

    static async getByAno(req, res) {

        const ano = req.params.ano;

        try {
            const turmas = await Turmas.find().where({ ano: ano });

            if (!turmas || turmas.length === 0) {
                return res.status(404).json({ message: "Nenhuma turma encontrada para o ano especificado." });
            }

            return res.status(200).json(turmas);

        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar as Turmas", error });
        }
    }
}

