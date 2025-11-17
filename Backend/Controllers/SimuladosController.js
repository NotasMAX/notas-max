import Simulado from '../Models/Simulado.js';
import Turmas from "../Models/Turma.js";
import { Types } from 'mongoose';

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

        const existingSimulado = await Simulado.findOne({ numero, bimestre, turma_id });
        if (existingSimulado) {
            return res.status(422).json({ message: "Já existe um simulado com este número e bimestre para a turma" });
        }
        if (!conteudos || conteudos.length <= 0)
            return res.status(422).json({ message: "Informe as disciplinas." });

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
            res.status(200).json({ message: 'Sucesso ao inserir o simulado', simuladoSave });

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

        try {

            const id = req.params.id;
            const ObjectId = Types.ObjectId;

            if (!ObjectId.isValid(id))
                return res.status(422).json({ message: "Id de simulado invalido", id });

            const simulado = await Simulado.findById(id);

            if (!simulado)
                return res.status(404).json({ message: 'Simulado não encontrado...' });

            res.status(200).json({ simulado });

        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar simulado', error });
        }
    }

    static async getTurma(req, res) {
        try {
            const id = req.params.id;
            const ObjectId = Types.ObjectId;

            if (!ObjectId.isValid(id))
                return res.status(422).json({ message: "Id de simulado invalido", id });

            // pega o simulado só com turma_id
            const simulado = await Simulado.findById(id).select('turma_id');
            if (!simulado)
                return res.status(404).json({ message: 'Simulado não encontrado...' });

            // busca a turma e retorna apenas os alunos
            const turma = await Turmas.findById(simulado.turma_id).select('alunos');
            if (!turma)
                return res.status(404).json({ message: 'Turma não encontrada...' });

            return res.status(200).json({ alunos: turma.alunos });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar turma', error });
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