import Simulado from '../Models/Simulado.js';
import './TurmasController.js';
import { Types } from 'mongoose';
import TurmasController from './TurmasController.js';

export default class SimuladosController {
    static async create(req, res) {
        const {
            numero,
            conteudos,
            tipo,
            bimestre,
            data_realizacao,
            turma_id } = req.body;

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

        try {
            const existingSimulado = await Simulado.findOne({ numero, bimestre, turma_id });
            if (existingSimulado) {
                return res.status(422).json({ message: "Já existe um simulado com este número e bimestre para a turma" });
            }
            if (!conteudos || conteudos.length <= 0)
                return res.status(422).json({ message: "Informe as disciplinas." });

            const turmaExists = await TurmasController.BuscarTurma({ _id: turma_id });
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

            const simuladoSave = await simulado.save();
            res.status(200).json({ message: 'Sucesso ao inserir o simulado', simulado: simuladoSave });

        } catch (error) {
            res.status(500).json({ message: 'erro ao inserir simulado', error });
        }
    }

    static async getAll(req, res) {

        try {
            const simulados = await Simulado.find({}).sort("+createdAt");
            res.status(200).json({ simulados });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar simulados', error })
        }

    }

    static async getOneSimple(req, res) {
        const id = req.params.id;
        const ObjectId = Types.ObjectId;
        if (!ObjectId.isValid(id))
            return res.status(422).json({ message: "Id de simulado invalido", id });
        try {
            const simulado = await Simulado.findById(id);
            if (!simulado)
                return res.status(404).json({ message: 'Simulado não encontrado' });
            res.status(200).json({ simulado });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar simulado', error });
        }
    }


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
                        localField:
                            'turma.alunos',
                        foreignField: '_id',
                        as: 'turma.alunosDetalhes'
                    }
                },
                {
                    $unwind: {
                        path: "$conteudos", preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'turmadisciplinas',
                        localField: 'conteudos.turma_disciplina_id',
                        foreignField: '_id',
                        as: 'conteudos.turma_disciplina'
                    }
                },
                { $unwind: { path: "$conteudos.turma_disciplina", preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: { simulado_id: "$_id", conteudo_id: "$conteudos._id" },
                        numero: { $first: "$numero" },
                        tipo: { $first: "$tipo" },
                        bimestre: { $first: "$bimestre" },
                        data_realizacao: { $first: "$data_realizacao" },
                        turma: { $first: "$turma" },
                        conteudo: {
                            $first: {
                                _id: "$conteudos._id",
                                turma_disciplina_id: "$conteudos.turma_disciplina_id",
                                turma_disciplina: {
                                    _id: "$conteudos.turma_disciplina._id",
                                    turma_id: "$conteudos.turma_disciplina.turma_id",
                                    professor_id: "$conteudos.turma_disciplina.professor_id",
                                    materia_id: "$conteudos.turma_disciplina.materia_id"
                                },
                                quantidade_questoes: "$conteudos.quantidade_questoes",
                                peso: "$conteudos.peso",
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
                        conteudos: { $push: "$conteudo" }
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
                                                disciplina: "$$conteudo.turma_disciplina.materia_id", // ou outro campo se quiser nome depois de outro lookup
                                                quantidade_questoes: "$$conteudo.quantidade_questoes",
                                                resultado: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$$conteudo.resultados",
                                                                cond: { $eq: [ "$$this.aluno_id", "$$aluno._id" ] }
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
                        turma: { _id: 1, ano: 1, serie: 1, alunos: 1 },
                        conteudos: 1,
                        createdAt: 1
                    }
                }
            ]);

            if (!simulado || simulado.length === 0)
                return res.status(404).json({ message: 'Simulado não encontrado' });

            res.status(200).json({ simulado: simulado[ 0 ] });
        } catch (error) {
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

    static async getByAlunoAndBimestre(req, res) {
        const aluno_id = req.params.aluno;
        const simulado_id = req.params.simulado;
        const bimestre = Number(req.params.bimestre); // Converter para número

        const ObjectId = Types.ObjectId;

        if (!ObjectId.isValid(aluno_id))
            return res.status(422).json({ message: "Id de Aluno inválido", aluno_id });

        if (!ObjectId.isValid(simulado_id))
            return res.status(422).json({ message: "Id de Simulado inválido", simulado_id });

        if (!bimestre || isNaN(bimestre) || bimestre <= 0)
            return res.status(422).json({ message: "Informe um bimestre válido (número positivo)" });

        const turma_id = await Simulado.findOne({ _id: simulado_id }).then(s => s ? s.turma_id : null);

        try {
            const simulados = await Simulado.aggregate([
                {
                    $match: {
                        "conteudos.resultados.aluno_id": new ObjectId(aluno_id),
                        bimestre: bimestre,
                        turma_id: turma_id
                    }
                },
                {
                    $lookup: {
                        from: 'turmas',
                        localField: 'turma_id',
                        foreignField: '_id',
                        as: 'turma'
                    }
                },
                { $unwind: '$turma' },
                { $unwind: '$conteudos' },
                {
                    $lookup: {
                        from: 'turmadisciplinas',
                        localField: 'conteudos.turma_disciplina_id',
                        foreignField: '_id',
                        as: 'conteudos.turma_disciplina'
                    }
                },
                { $unwind: { path: '$conteudos.turma_disciplina', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'materias',
                        localField: 'conteudos.turma_disciplina.materia_id',
                        foreignField: '_id',
                        as: 'conteudos.turma_disciplina.materia'
                    }
                },
                { $unwind: { path: '$conteudos.turma_disciplina.materia', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'usuarios',
                        localField: 'conteudos.turma_disciplina.professor_id',
                        foreignField: '_id',
                        as: 'conteudos.turma_disciplina.professor'
                    }
                },
                { $unwind: { path: '$conteudos.turma_disciplina.professor', preserveNullAndEmptyArrays: true } },
                {
                    $addFields: {
                        "conteudos.resultado_aluno": {
                            $arrayElemAt: [
                                {
                                    $filter: {
                                        input: "$conteudos.resultados",
                                        cond: { $eq: [ "$$this.aluno_id", new ObjectId(aluno_id) ] }
                                    }
                                },
                                0
                            ]
                        }
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        numero: { $first: "$numero" },
                        tipo: { $first: "$tipo" },
                        bimestre: { $first: "$bimestre" },
                        data_realizacao: { $first: "$data_realizacao" },
                        turma: { $first: "$turma" },
                        conteudos: {
                            $push: {
                                turma_disciplina: {
                                    _id: "$conteudos.turma_disciplina._id",
                                    turma_id: "$conteudos.turma_disciplina.turma_id",
                                    professor_id: "$conteudos.turma_disciplina.professor_id",
                                    professor: "$conteudos.turma_disciplina.professor.nome",
                                    materia_id: "$conteudos.turma_disciplina.materia_id",
                                    materia: "$conteudos.turma_disciplina.materia.nome",
                                },
                                quantidade_questoes: "$conteudos.quantidade_questoes",
                                peso: "$conteudos.peso",
                                resultado: "$conteudos.resultado_aluno"
                            }
                        }
                    }
                },
                { $sort: { data_realizacao: -1, numero: -1 } }
            ]);
            res.status(200).json({ simulados });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar simulado por aluno', error: error.message });
        }
    }

    static async findSimuladoByAlunoId(id, turma_id) {
        return await Simulado.find({
            turma_id: turma_id,
            "conteudos.resultados.aluno_id": id
        });;
    }

    static async findSimuladoByDisciplinaId(id) {
        return await Simulado.find({
            "conteudos.turma_disciplina_id": id
        });;
    }

    static async findSimuladoByBimestreAnoSerie(req, res) {
        const { bimestre, ano, serie } = req.params;

        const bimestreNum = Number(bimestre);
        const anoNum = Number(ano);
        const serieNum = serie !== undefined ? Number(serie) : null;

        if (!bimestre || isNaN(bimestreNum) || bimestreNum <= 0)
            return res.status(422).json({ message: "Informe um bimestre válido (número positivo)" });
        if (!ano || isNaN(anoNum) || anoNum <= 0)
            return res.status(422).json({ message: "Informe um ano válido (número positivo)" });

        try {
            if (serie !== "undefined") {
                const simulados = await Simulado.aggregate([
                    { $match: { bimestre: bimestreNum } },
                    { $lookup: { from: 'turmas', localField: 'turma_id', foreignField: '_id', as: 'turma' } },
                    { $unwind: '$turma' },
                    { $match: { 'turma.serie': serieNum, 'turma.ano': anoNum } },
                    { $project: { turma: 1, numero: 1, tipo: 1, bimestre: 1, data_realizacao: 1, conteudos: 1, createdAt: 1 } },
                    { $sort: { 'turma.serie': 1, numero: 1 } }
                ]);
                return res.status(200).json({ simulados });
            }
            const simulados = await Simulado.aggregate([
                { $match: { bimestre: bimestreNum } },
                { $lookup: { from: 'turmas', localField: 'turma_id', foreignField: '_id', as: 'turma' } },
                { $unwind: '$turma' },
                { $match: { 'turma.ano': anoNum } },
                { $project: { turma: 1, numero: 1, tipo: 1, bimestre: 1, data_realizacao: 1, conteudos: 1, createdAt: 1 } },
                { $sort: { 'turma.serie': 1, numero: 1 } }
            ]);
            return res.status(200).json({ simulados });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar simulados", error });
        }
    }

    static async update(req, res) {
        const {
            numero,
            conteudos,
            tipo,
            bimestre,
            data_realizacao,
            turma_id } = req.body;

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

        try {

            const existingSimulado = await Simulado.findOne({ _id: req.params.id });
            if (!existingSimulado) {
                return res.status(422).json({ message: "Simulado não existe" });
            }

            const existingSimuladoNumero = await Simulado.findOne({ numero, bimestre, turma_id });
            if (existingSimuladoNumero && existingSimuladoNumero._id.toString() !== req.params.id) {
                return res.status(422).json({ message: "Já existe um simulado com este número e bimestre para a turma" });
            }

            if (!conteudos || conteudos.length <= 0)
                return res.status(422).json({ message: "Informe as disciplinas." });

            const simuladoupdate = await Simulado.findByIdAndUpdate(req.params.id, {
                numero,
                tipo,
                bimestre,
                data_realizacao,
                turma_id,
                conteudos,
            }, { new: true });

            res.status(200).json({ message: 'Sucesso ao atualizar o simulado', simulado: simuladoupdate });

        } catch (error) {
            res.status(500).json({ message: 'erro ao atualizar simulado', error });
        }
    }

    static async getSimuladosByTurma(req, res) {
        try {
            const id = req.params.id;
            const ObjectId = Types.ObjectId;

            if (!ObjectId.isValid(id))
                return res.status(422).json({ message: "Id da turma invalido", id });

            const turmaExists = await TurmasController.BuscarTurma({ _id: id });

            if (!turmaExists)
                return res.status(422).json({ message: "Turma não encontrada" });

            const simulados = await Simulado.find().where({ turma_id: id });

            if (!simulados || simulados.length === 0)
                return res.status(404).json({ message: 'Simulados não encontrados.' });

            res.status(200).json({ simulados });

        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar simulado', error });
        }
    }

    static async atualizarConteudos(req, res) {
        const { conteudos } = req.body;

        if (!conteudos || conteudos.length <= 0)
            return res.status(422).json({ message: "Informe os conteúdos com os resultados." });
        try {
            const simulado = await Simulado.findById(req.params.id);
            if (!simulado)
                return res.status(404).json({ message: 'Simulado não encontrado...' });

            const simuladoAtualizado = await Simulado.findByIdAndUpdate(req.params.id, {
                conteudos: conteudos
            }, { new: true });

            res.status(200).json({ message: 'Notas atualizadas com sucesso', simulado: simuladoAtualizado });

        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar resultados', error });
        }

    }

    static async getDesempenhoByDisciplina(req, res) {
        const disciplina_id = req.params.disciplina;
        const ObjectId = Types.ObjectId;
        if (!ObjectId.isValid(disciplina_id))
            return res.status(422).json({ message: "Id de disciplina invalido", disciplina_id });

        try {
            // Etapa 1: Buscar todos os simulados da disciplina com notas
            const simulados = await Simulado.aggregate([
                { $match: { "conteudos.turma_disciplina_id": new ObjectId(disciplina_id) } },
                { $unwind: "$conteudos" },
                { $match: { "conteudos.turma_disciplina_id": new ObjectId(disciplina_id) } },
                { $unwind: "$conteudos.resultados" },
                {
                    $lookup: {
                        from: 'usuarios',
                        localField: 'conteudos.resultados.aluno_id',
                        foreignField: '_id',
                        as: 'aluno_info'
                    }
                },
                { $unwind: { path: "$aluno_info", preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        simulado_id: "$_id",
                        numero: "$numero",
                        aluno_id: "$conteudos.resultados.aluno_id",
                        aluno_nome: "$aluno_info.nome",
                        nota: "$conteudos.resultados.nota"
                    }
                }
            ]);

            if (!simulados || simulados.length === 0)
                return res.status(404).json({ message: 'Simulados não encontrados' });

            // Processar dados para formato final
            const mapaAlunos = {};
            const mapaSimuladoMedia = {};
            const todasAsNotas = [];

            simulados.forEach(doc => {
                const alunoId = doc.aluno_id.toString();
                const simuladoId = doc.simulado_id.toString();

                // Acumular notas dos alunos
                if (!mapaAlunos[ alunoId ]) {
                    mapaAlunos[ alunoId ] = {
                        id: doc.aluno_id,
                        nome: doc.aluno_nome,
                        notas: []
                    };
                }
                mapaAlunos[ alunoId ].notas.push(doc.nota);
                todasAsNotas.push(doc.nota);

                // Acumular notas por simulado
                if (!mapaSimuladoMedia[ simuladoId ]) {
                    mapaSimuladoMedia[ simuladoId ] = {
                        simulado_id: doc.simulado_id,
                        numero_simulado: doc.numero,
                        notas: []
                    };
                }
                mapaSimuladoMedia[ simuladoId ].notas.push(doc.nota);
            });

            // Calcular médias dos alunos
            const alunos = Object.values(mapaAlunos).map(aluno => ({
                id: aluno.id,
                nome: aluno.nome,
                media: aluno.notas.reduce((a, b) => a + b, 0) / aluno.notas.length
            }));

            // Calcular médias dos simulados
            const notasSimulados = Object.values(mapaSimuladoMedia).map(sim => ({
                simulado_id: sim.simulado_id,
                numero_simulado: sim.numero_simulado,
                media: sim.notas.reduce((a, b) => a + b, 0) / sim.notas.length
            }));

            // Calcular média geral
            const mediaGeral = todasAsNotas.length > 0 ? todasAsNotas.reduce((a, b) => a + b, 0) / todasAsNotas.length : 0;

            // Calcular distribuição
            const mediasAlunos = alunos.map(a => a.media);
            const distribuicao = [
                { faixa: "<5", quantidade: mediasAlunos.filter(m => m < 5).length },
                { faixa: "5-7", quantidade: mediasAlunos.filter(m => m >= 5 && m < 7).length },
                { faixa: ">7", quantidade: mediasAlunos.filter(m => m >= 7).length }
            ];

            const resposta = {
                alunos,
                simulados: {
                    media: mediaGeral,
                    notas: notasSimulados
                },
                distribuicao
            };

            res.status(200).json(resposta);

        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar simulado', error: error.message });
        }
    }

}
