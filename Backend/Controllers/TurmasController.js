import Turmas from "../Models/Turma.js";
import Simulado from "../Models/Simulado.js";
import SimuladosController from "./SimuladosController.js";
import UsuariosController from "./UsuariosController.js";
import { Types } from "mongoose";

export default class TurmasController {
    static async create(req, res) {
        const { serie, ano } = req.body;

        if (!serie) {
            return res.status(422).json({ message: "Preencha a série da turma." });
        }
        if (isNaN(serie)) {
            return res.status(422).json({ message: "A série deve ser um número." });
        }
        if (serie.toString().length != 1) {
            return res.status(422).json({ message: "A série deve ter apenas 1 dígito." });
        }

        if (!ano) {
            return res.status(422).json({ message: "Preencha o ano da turma." });
        }
        if (isNaN(ano)) {
            return res.status(422).json({ message: "O ano deve ser um número." });
        }
        const currentYear = new Date().getFullYear();
        if (ano < currentYear - 50 || ano > currentYear + 1) {
            return res.status(422).json({ message: `Insira um ano entre ${currentYear - 50} e ${currentYear + 1}.`, campo: "ano" });
        }
        try {
            const turmaExists = await Turmas.findOne({ serie, ano });
            if (turmaExists) {
                return res.status(422).json({ message: `Já existe uma turma ${serie}º EM de ${ano}.` });
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
            const turmas = await Turmas.find({}).sort("-ano serie");
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
                    $lookup: {
                        from: 'turmadisciplinas',
                        localField: '_id',
                        foreignField: 'turma_id',
                        as: 'disciplinas'
                    }
                },
                {
                    $unwind: {
                        path: '$disciplinas',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'usuarios',
                        localField: 'disciplinas.professor_id',
                        foreignField: '_id',
                        as: 'disciplinas.professor'
                    }
                },
                {
                    $lookup: {
                        from: 'materias',
                        localField: 'disciplinas.materia_id',
                        foreignField: '_id',
                        as: 'disciplinas.materia'
                    }
                },
                {
                    $unwind: {
                        path: '$disciplinas.professor',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: '$disciplinas.materia',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        serie: { $first: '$serie' },
                        ano: { $first: '$ano' },
                        alunos: { $first: '$alunos' },
                        disciplinas: { $push: '$disciplinas' }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        serie: 1,
                        ano: 1,
                        alunos: {
                            $map: {
                                input: '$alunos',
                                as: 'aluno',
                                in: { _id: '$$aluno._id', nome: '$$aluno.nome', email: '$$aluno.email' }
                            }
                        },
                        disciplinas: {
                            $map: {
                                input: '$disciplinas',
                                as: 'disc',
                                in: {
                                    _id: '$$disc._id',
                                    professor: { _id: '$$disc.professor._id', nome: '$$disc.professor.nome', email: '$$disc.professor.email' },
                                    materia: { _id: '$$disc.materia._id', nome: '$$disc.materia.nome' }
                                }
                            }
                        }
                    }
                }
            ]);
            if (!turma || turma.length === 0) {
                return res.status(404).json({ message: "Turma não encontrada." });
            }
            const turmaData = turma[0];
            res.status(200).json({ turma: turmaData });
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

            const turmaComAluno = await Turmas.findOne({
                ano: turma.ano,
                alunos: alunoId,
                _id: { $ne: turmaId }
            });

            if (turmaComAluno) {
                return res.status(422).json({ message: `Aluno já está matriculado em outra turma no ano ${turma.ano}.` });
            }
            const aluno = await UsuariosController.findUsuarioById(alunoId);

            if (!aluno) {
                return res.status(404).json({ message: "Aluno não encontrado." });
            }
            console.log("passo 5");
            if (aluno.tipo_usuario !== "aluno") {
                return res.status(422).json({ message: "O usuário informado não é um aluno." });
            }
            turma.alunos.push(alunoId);
            await turma.save();
            res.status(200).json({ message: "Aluno adicionado com sucesso", turma });
        } catch (error) {
            res.status(500).json({ message: "Erro ao adicionar aluno na turma", error });
        }
    }
    static async removeAluno(req, res) {
        const { aluno_id, turma_id } = req.query;

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

            const simuladosComAluno = await SimuladosController.findSimuladoByAlunoId(aluno_id);
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

    static async getDesempenhoByTurma(req, res) {
        const turmaId = req.params.id;
        const ObjectId = Types.ObjectId;

        if (!ObjectId.isValid(turmaId))
            return res.status(422).json({ message: "ID da turma inválido" });

        try {
            const turma = await Turmas.findById(turmaId);
            if (!turma) return res.status(404).json({ message: "Turma não encontrada" });

            const medias = await Simulado.aggregate([
                { $match: { turma_id: new ObjectId(turmaId) } },
                { $unwind: "$conteudos" },
                { $unwind: "$conteudos.resultados" },
                {
                    $group: {
                        _id: "$bimestre",
                        media: { $avg: "$conteudos.resultados.nota" }
                    }
                },
                { $sort: { _id: 1 } }
            ]);

            const desempenho = [1, 2, 3, 4].map(bi => {
                const f = medias.find(m => m._id === bi);
                return {
                    bimestre: bi,
                    media: f?.media ?? 0
                };
            });

            res.status(200).json({
                turma: {
                    ano: turma.ano,
                    serie: turma.serie
                },
                desempenho
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erro ao buscar desempenho da turma", error });
        }
    }

    static async BuscarTurma(id) {
        try {
            return await Turmas.findById(id);
        } catch (error) {
            throw error;
        }
    }
}