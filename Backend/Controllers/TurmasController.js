import Turmas from "../Models/Turma.js";
import Usuarios from "../Models/Usuario.js";
import Simulado from "../Models/Simulado.js";
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
        try {
            const turmaExists = await Turmas.findOne({ serie, ano });
            if (turmaExists) {
                return res.status(422).json({ message: `Já existe uma turma ${serie}º EM de ${ano}.`, campo: "geral" });
            }

            const turma = new Turmas({
                serie,
                ano
            });

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

            const turma = await Turmas.aggregate([
                { $match: { _id: new Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: 'usuarios',
                        localField: 'alunos',
                        foreignField: '_id',
                        as: 'alunos'
                    }
                },
                {
                    $project: {
                        nome: 1,
                        serie: 1,
                        ano: 1,
                        alunos: { _id: 1, nome: 1, email: 1 }
                    }
                },
                { $sort: { "alunos.nome": 1 } }
            ]);
            if (!turma || turma.length === 0) {
                return res.status(404).json({ message: "Turma não encontrada." });
            }
            res.status(200).json({ turma: turma[0] });
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

    static async addAluno(req, res) {
        const
            { turmaId, alunoId } = req.body;

        if (!turmaId) {
            return res.status(422).json({ message: "Id da turma é obrigatório." });
        }
        if (!alunoId) {
            return res.status(422).json({ message: "Id do aluno é obrigatório." });
        }

        const ObjectId = Types.ObjectId;
        if (!ObjectId.isValid(turmaId)) {
            return res.status(422).json({ message: "Id da turma inválido" });
        }
        if (!ObjectId.isValid(alunoId)) {
            return res.status(422).json({ message: "Id do aluno inválido" });
        }

        try {
            const turma = await Turmas.findById(turmaId);
            if (!turma) {
                return res.status(404).json({ message: "Turma não encontrada." });
            }
            if (turma.alunos.includes(alunoId)) {
                return res.status(422).json({ message: "Aluno já está na turma." });
            }

            const aluno = await Usuarios.findById(alunoId);
            if (!aluno) {
                return res.status(404).json({ message: "Aluno não encontrado." });
            }

            turma.alunos.push(alunoId);
            await turma.save();

            res.status(200).json({ message: "Aluno adicionado com sucesso", turma });
        } catch (error) {
            res.status(500).json({ message: "Erro ao adicionar aluno na turma", error });
        }
    }
    static async removeAluno(req, res) {
        const { aluno_id, turma_id } = req.body;
        const ObjectId = Types.ObjectId;
        if (!ObjectId.isValid(turma_id)) {
            return res.status(422).json({ message: "Id da turma inválido" });
        }
        if (!ObjectId.isValid(aluno_id)) {
            return res.status(422).json({ message: "Id do aluno inválido" });
        }

        try {
            const turma = await Turmas.findById(turma_id);
            if (!turma) {
                return res.status(404).json({ message: "Turma não encontrada." });
            }

            if (!turma.alunos.includes(aluno_id)) {
                return res.status(422).json({ message: "Aluno não está nesta turma." });
            }

            const simuladosComAluno = await Simulado.find({
                "conteudos.resultados.aluno_id": aluno_id
            });

            if (!simuladosComAluno || simuladosComAluno.length > 0) {
                return res.status(422).json({
                    message: "Não é possível remover o aluno pois ele possui resultados em simulados."
                });
            }

            turma.alunos.pull(aluno_id);
            await turma.save();

            res.status(200).json({ message: "Aluno removido com sucesso da turma", turma });
        } catch (error) {
            res.status(500).json({ message: "Erro ao remover aluno da turma", error });
        }
    }
}