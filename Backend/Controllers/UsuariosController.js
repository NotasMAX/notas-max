import Usuarios from "../Models/Usuario.js";
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
            const alunos = await Usuarios.find({}).where({ tipo_usuario: "aluno" }).sort("-createdAt");
            if (!alunos || alunos.length === 0) {
                return res.status(404).json({ message: "Nenhum aluno encontrado." });
            }
            res.status(200).json({ alunos });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar todos os alunos", error });
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
        const { text } = req.body;
        if (!text) {
            return res.status(422).json({ message: "Texto de busca inválido" });
        }
        try {
            const aluno = await Usuarios.find({ $or: [{ nome: { $regex: text, $options: "i" } }, { email: { $regex: text, $options: "i" } }] }).where({ tipo_usuario: "aluno" });
            if (!aluno || aluno.length === 0) {
                return res.status(404).json({ message: "Aluno não encontrado." });
            }
            res.status(200).json(aluno);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar o Aluno", error });
        }
    }

}

