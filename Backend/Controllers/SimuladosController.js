import Simulado from '../Models/Simulado.js';
import Turmas from "../Models/Turma.js";
import { Types } from 'mongoose';

export default class SimuladosController {
    static async create(req, res) {
        const { numero, tipo, bimestre, data_realizacao, turma_id, conteudos } = req.body;

        if (!numero)
            return res.status(422).json({ message: "Informe o número do simulado" });
        if (!tipo)
            return res.status(422).json({ message: "Informe o tipo do simulado" });
        if (!bimestre)
            return res.status(422).json({ message: "Informe o bimestre" });
        if (!data_realizacao)
            return res.status(422).json({ message: "Informe a data de realização" });
        if (!turma_id)
            return res.status(422).json({ message: "Informe a turma" });
        if (!conteudos || conteudos.length <= 0)
            return res.status(422).json({ message: "Informe as materias e número de questões" });

        // valida turma corretamente
        const turmaExists = await Turmas.exists({ _id: turma_id });
        if (!turmaExists)
            return res.status(422).json({ message: "Turma não encontrada" });

        const simulado = new Simulado({
            numero,
            tipo,
            bimestre,
            data_realizacao,
            turma_id,
            conteudos,
        })

        try {

            const simuladoSave = await simulado.save();
            res.status(200).json({ message: 'sucesso ao inserir o simulado', simuladoSave });

        } catch (error) {
            res.status(500).json({ message: 'erro ao inserir simulado', error });
        }
    }// fim create

    static async getAll(req, res) {

        try {
            const simulados = await Simulado.find({}).sort("+createdAt");
            res.status(200).json({ simulados });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar simulados', error })
        }

    }// fim getAll

    static async getOne(req, res) {

        const id = req.params.id;
        const ObjectId = Types.ObjectId;

        if (!ObjectId.isValid(id))
            return res.status(422).json({ message: "Id de simulado invalido", id });

        try {
            const simulado = await Simulado.aggregate([
                { $match: { _id: new ObjectId(id) } },
                {
                    $lookup: {
                        from: 'turmas',
                        localField: 'turma_id',
                        foreignField: '_id',
                        as: 'turma'
                    }
                },
                { $unwind: { path: "$turma", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'usuarios',
                        localField: 'turma.alunos',
                        foreignField: '_id',
                        as: 'turma.alunosDetalhes'
                    }
                },
                {
                    $unwind: {
                        path: "$conteudos",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'turmasdisciplinas',
                        localField: 'conteudos.turma_disciplina_id',
                        foreignField: '_id',
                        as: 'conteudos.disciplina'
                    }
                },
                { $unwind: { path: "$conteudos.disciplina", preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: {
                            simulado_id: "$_id",
                            conteudo_id: "$conteudos._id"
                        },
                        numero: { $first: "$numero" },
                        tipo: { $first: "$tipo" },
                        bimestre: { $first: "$bimestre" },
                        data_realizacao: { $first: "$data_realizacao" },
                        turma: { $first: "$turma" },
                        conteudo: {
                            $first: {
                                _id: "$conteudos._id",
                                turma_disciplina_id: "$conteudos.turma_disciplina_id",
                                quantidade_questoes: "$conteudos.quantidade_questoes",
                                peso: "$conteudos.peso",
                                disciplina: "$conteudos.disciplina",
                                resultados: "$conteudos.resultados"
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: "$_id.simulado_id",
                        numero: { $first: "$numero" },
                        tipo: { $first: "$tipo" },
                        bimestre: { $first: "$bimestre" },
                        data_realizacao: { $first: "$data_realizacao" },
                        turma: { $first: "$turma" },
                        conteudos: {
                            $push: "$conteudo"
                        }
                    }
                },
                {
                    $addFields: {
                        "turma.alunos": {
                            $map: {
                                input: "$turma.alunosDetalhes",
                                as: "aluno",
                                in: {
                                    _id: "$$aluno._id",
                                    nome: "$$aluno.nome",
                                    email: "$$aluno.email",
                                    resultados: {
                                        $map: {
                                            input: "$conteudos",
                                            as: "conteudo",
                                            in: {
                                                conteudo_id: "$$conteudo._id",
                                                disciplina: "$$conteudo.disciplina.nome",
                                                quantidade_questoes: "$$conteudo.quantidade_questoes",
                                                resultado: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$$conteudo.resultados",
                                                                cond: { $eq: ["$$this.aluno_id", "$$aluno._id"] }
                                                            }
                                                        },
                                                        0
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        numero: 1,
                        tipo: 1,
                        bimestre: 1,
                        data_realizacao: 1,
                        turma: {
                            _id: 1,
                            ano: 1,
                            serie: 1,
                            alunos: 1
                        },
                        conteudos: 1
                    }
                }
            ]);

            if (!simulado || simulado.length === 0)
                return res.status(404).json({ message: 'Simulado não encontrado' });

            const simuladoData = simulado[0];
            res.status(200).json({ simulado: simuladoData });

        } catch (error) {
            console.error('Erro:', error);
            res.status(500).json({ message: 'Erro ao buscar simulado', error: error.message });
        }
    }

    static async getByTurma(req, res) {

        const id = req.params.turma_id;
        const ObjectId = Types.ObjectId;

        if (!ObjectId.isValid(id))
            return res.status(422).json({ message: "Id de simulado invalido", id });

        try {

            const simulados = await Simulado.find({ turma_id: id });
            res.status(200).json({ simulados });

        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar simulado por turma', error });
        }
    }

    static async findSimuladoByAlunoId(id) {
        return await Simulado.find({
            "conteudos.resultados.aluno_id": id
        });;
    }

    static async findSimuladoByDisciplinaId(id) {
        return await Simulado.find({
            "conteudos.turma_disciplina_id": id
        });;
    }
}