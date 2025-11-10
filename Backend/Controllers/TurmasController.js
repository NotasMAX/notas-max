import Turmas from "../Models/Turma.js";
import { Types } from "mongoose";

export default class TurmasController {
    static async create(req, res) {
        const { serie, ano } = req.body;

        if (!serie) {
            return res.status(422).json({ message: "Preencha a série da turma.", campo: "serie" });
        }
        if (isNaN(serie)) {
            return res.status(422).json({ message: "A série deve ser um número.", campo: "serie" });
        }
        if (serie.toString().length != 1) {
            return res.status(422).json({ message: "A série deve ter apenas 1 dígito.", campo: "serie" });
        }


        if (!ano) {
            return res.status(422).json({ message: "Preencha o ano da turma.", campo: "ano" });
        }
        if (isNaN(ano)) {
            return res.status(422).json({ message: "O ano deve ser um número.", campo: "ano" });
        }
        const currentYear = new Date().getFullYear();
        if (ano < currentYear - 50 || ano > currentYear + 1) {
            return res.status(422).json({ message: `Insira um ano entre ${currentYear - 50} e ${currentYear + 1}.`, campo: "ano" });
        }

        const turmaExists = await Turmas.findOne({ serie, ano });
        if (turmaExists) {
            return res.status(422).json({ message: `Já existe uma turma ${serie}º EM de ${ano}.`, campo: "geral" });
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
            const turmas = await Turmas.find().where({ ano: ano }).sort("serie");

            if (!turmas || turmas.length === 0) {
                return res.status(404).json({ message: "Nenhuma turma encontrada para o ano especificado." });
            }

            return res.status(200).json({ turmas });

        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar as Turmas", error });
        }
    }
}

