import Usuarios from "../models/Usuario.js";
import Turma from "../models/Turma.js";
import Simulado from "../models/Simulado.js";
import { Types } from "mongoose";

export default class UsuariosController {
    static async createAluno(req, res) { //Somente para testes
        const {
            nome,
            email,
            telefone_contato,
            senha,
            tipo_usuario,
            telefone_responsavel
        } = req.body;

        const usuario = new Usuarios({
            nome,
            email,
            telefone_contato,
            senha,
            tipo_usuario,
            telefone_responsavel
        });

        try {
            const novoUsuario = await usuario.save();
            res.status(200).json({ message: "Usuário inserido com sucesso!", novoUsuario });
        }
        catch (error) {
            res.status(500).json({ message: "Problema ao inserir o Usuário", error });
        }
    }

    static async getAllAlunos(req, res) {
        try {
            const alunos = await Usuarios.find({}).where({ tipo_usuario: "aluno" }).sort("nome");
            if (!alunos || alunos.length === 0) {
                return res.status(404).json({ message: "Nenhum aluno encontrado." });
            }
            res.status(200).json({ alunos });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar todos os alunos", error });
        }
    }

    static async getAllProfessores(req, res) {
        try {
            const professores = await Usuarios.find({}).where({ tipo_usuario: "professor" }).sort("nome");
            if (!professores || professores.length === 0) {
                return res.status(404).json({ message: "Nenhum professor encontrado." });
            }
            res.status(200).json({ professores });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar todos os professores", error });
        }
    }

    static async getOne(req, res) {

        const id = req.params.id;
        const ObjectId = Types.ObjectId;
        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: "Id do aluno inválido" });
        }
        try {
            const aluno = await Usuarios.findById(id);
            if (!aluno) {
                return res.status(404).json({ message: "Aluno não encontrado." });
            }
            res.status(200).json(aluno);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar o Aluno", error });
        }
    }


    static async getAlunoByNameOrEmail(req, res) {
        const { text } = req.query;
        if (!text || typeof text !== 'string' || text.trim() === '') {
            return res.status(422).json({ message: "Texto de busca inválido" });
        }
        try {
            const alunos = await Usuarios.find({ $or: [{ nome: { $regex: text, $options: "i" } }, { email: { $regex: text, $options: "i" } }] }).where({ tipo_usuario: "aluno" }).sort("nome")  ;
            res.status(200).json({ alunos });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar o Aluno", error });
        }
    }

    static async getProfessorByNameOrEmail(req, res) {
        const { text } = req.query;
        if (!text || typeof text !== 'string' || text.trim() === '') {
            return res.status(422).json({ message: "Texto de busca inválido" });
        }
        try {
            const professores = await Usuarios.find({ $or: [{ nome: { $regex: text, $options: "i" } }, { email: { $regex: text, $options: "i" } }] }).where({ tipo_usuario: "professor" }).sort("nome");
            res.status(200).json({ professores });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar o Professor", error });
        }
    }


    static async findUsuarioById(id) {
        return await Usuarios.findById(id);
    }

   static async getDesempenhoByAluno(req, res) {
    const alunoId = req.params.id;
    const ObjectId = Types.ObjectId;

    if (!ObjectId.isValid(alunoId))
        return res.status(422).json({ message: "Aluno inválido" });

    try {
        const aluno = await Usuarios.findById(alunoId);

        if (!aluno) {
            return res.status(404).json({ message: "Aluno não encontrado" });
        }

        const turma = await Turma.findOne({ alunos: aluno._id });

        let turmaNome = "Sem turma";

        if (turma) {
            turmaNome = `${turma.serie}º Ano - ${turma.ano}`;
        }

        const simulados = await Simulado.aggregate([
            { $unwind: "$conteudos" },
            { $unwind: "$conteudos.resultados" },
            {
                $match: {
                    "conteudos.resultados.aluno_id": new ObjectId(alunoId)
                }
            },
            {
                $group: {
                    _id: "$bimestre",
                    media: { $avg: "$conteudos.resultados.nota" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const desempenho = [1, 2, 3, 4].map(bi => {
            const d = simulados.find(s => s._id === bi);
            return {
                bimestre: bi,
                media: d?.media ?? 0
            };
        });

        return res.status(200).json({
            alunoNome: aluno.nome,
            turmaNome,
            desempenho
        });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao buscar desempenho", error });
        }
    }
}

