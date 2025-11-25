import TurmaDisciplina from "../Models/TurmaDisciplina.js";
import UsuariosController from "./UsuariosController.js";
import SimuladosController from "./SimuladosController.js";
import { Types } from "mongoose";

export default class TurmaDisciplinasController {
    static async create(req, res) {
        const {
            turma_id,
            professor_id,
            materia_id } = req.body;

        if (!turma_id) {
            return res.status(422).json({ message: "Preencha o id turma." });
        }
        if (!professor_id) {
            return res.status(422).json({ message: "Preencha o id do professor." });
        }
        if (!materia_id) {
            return res.status(422).json({ message: "Preencha o id da matéria." });
        }

        const id = req.params.id;
        const ObjectId = Types.ObjectId;
        if (!ObjectId.isValid(turma_id)) {
            return res.status(422).json({ message: "Id da turma inválido" });
        }
        if (!ObjectId.isValid(professor_id)) {
            return res.status(422).json({ message: "Id do professor inválido" });
        }
        if (!ObjectId.isValid(materia_id)) {
            return res.status(422).json({ message: "Id da matéria inválido" });
        }

        const professor = await UsuariosController.findUsuarioById(professor_id);
        if (!professor) {
            return res.status(404).json({ message: "Professor não encontrado." });
        }

        try {
            const disciplinaExists = await TurmaDisciplina.findOne({ turma_id, materia_id, professor_id });
            if (disciplinaExists) {
                return res.status(422).json({ message: `Já existe essa disciplina na turma.` });
            }

            const disciplina = new TurmaDisciplina({
                turma_id,
                professor_id,
                materia_id
            });

            const novaDisciplina = await disciplina.save();
            res.status(200).json({ message: "Disciplina inserida com sucesso!", novaDisciplina });
        }
        catch (error) {
            res.status(500).json({ message: "Problema ao inserir a disciplina", error });
        }
    }

    static async getAll(req, res) {
        try {
            const disciplinas = await TurmaDisciplina.find({}).sort("-creatdAt");
            res.status(200).json({ disciplinas });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar todas as disciplinas", error });
        }
    }

    static async remove(req, res) {
        const { id } = req.query;

        if (!id) {
            return res.status(422).json({ message: "Preencha o id da disciplina." });
        }
        const ObjectId = Types.ObjectId;
        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: "Id da disciplina inválido" });
        }

        try {
            const disciplina = await TurmaDisciplina.findById(id);
            if (!disciplina) {
                return res.status(404).json({ message: "Disciplina não encontrada." });
            }
            const simuladosComDisciplina = await SimuladosController.findSimuladoByDisciplinaId(id);
            if (simuladosComDisciplina && simuladosComDisciplina.length > 0) {
                return res.status(422).json({
                    message: "Não é possível remover a disciplina pois ela possui simulados associados."
                });
            }

            await TurmaDisciplina.findByIdAndDelete(id);
            res.status(200).json({ message: "Disciplina removida com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro ao remover disciplina", error });
        }
    }

    static async getOne(req, res) {
        const { turma_disciplina_id } = req.params;
        const ObjectId = Types.ObjectId;

        if (!turma_disciplina_id) {
            return res.status(422).json({ message: "Preencha o id da disciplina." });
        }
        if (!ObjectId.isValid(turma_disciplina_id)) {
            return res.status(422).json({ message: "Id da disciplina inválido" });
        }

        try {
            const disciplina = await TurmaDisciplina.aggregate([
                {
                    $match: { _id: new ObjectId(turma_disciplina_id) }
                },
                {
                    $lookup: {
                        from: "usuarios",
                        localField: "professor_id",
                        foreignField: "_id",
                        as: "professor"
                    }
                },
                {
                    $lookup: {
                        from: "materias",
                        localField: "materia_id",
                        foreignField: "_id",
                        as: "materia"
                    }
                },
                {
                    $unwind: {
                        path: "$professor",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: "$materia",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 1,
                        turma_id: 1,
                        professor: {
                            _id: "$professor._id",
                            nome: "$professor.nome"
                        },
                        materia: {
                            _id: "$materia._id",
                            nome: "$materia.nome"
                        },
                        createdAt: 1,
                        updatedAt: 1
                    }
                }
            ]);

            if (!disciplina || disciplina.length === 0) {
                return res.status(404).json({ message: "Disciplina não encontrada." });
            }
            res.status(200).json({ disciplina: disciplina[0] });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar a disciplina", error });
        }
    }
}