import Usuario from "../Models/Usuario.js";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";

export default {

    async cadastrarProfessor(req, res) {
        try {
            const { nome, email, telefone_contato, senha } = req.body;

            const senhaHash = await bcrypt.hash(senha, 12);

            const novoProfessor = await Usuario.create({
                nome,
                email,
                telefone_contato,
                senha: senhaHash,
                tipo_usuario: "professor"
            });

            return res.status(201).json({
                _id: novoProfessor._id,
                nome: novoProfessor.nome,
                email: novoProfessor.email,
                telefone_contato: novoProfessor.telefone_contato
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao cadastrar professor." });
        }
    },

    async cadastrarAluno(req, res) {
        try {
            const { nome, email, telefone_contato, senha, telefone_responsavel } = req.body;

            // Criptografar senha com salt 12
            const senhaHash = await bcrypt.hash(senha, 12);

            const novoAluno = await Usuario.create({
                nome,
                email,
                telefone_contato,
                senha: senhaHash,
                telefone_responsavel,
                tipo_usuario: "aluno"
            });

            return res.status(201).json({
                _id: novoAluno._id,
                nome: novoAluno.nome,
                email: novoAluno.email,
                telefone_contato: novoAluno.telefone_contato,
                telefone_responsavel: novoAluno.telefone_responsavel
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao cadastrar aluno." });
        }
    },

    async listarProfessores(req, res) {
        try {
            const professores = await Usuario.find(
                { tipo_usuario: "professor" },
                "nome email telefone_contato"
            );

            return res.status(200).json(professores);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar professores." });
        }
    },

    async listarAlunos(req, res) {
        try {
            const alunos = await Usuario.find(
                { tipo_usuario: "aluno" },
                "nome email telefone_contato"
            );

            return res.status(200).json(alunos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar alunos." });
        }
    },

    async getUsuario(req, res) {
        try {
            const id = req.params.id?.trim();
            if (!Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID inválido." });
            }

            const usuario = await Usuario.findById(id).select(
                "nome email telefone_contato telefone_responsavel tipo_usuario"
            );

            if (!usuario) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            const { tipo_usuario, ...resto } = usuario.toObject();
            return res.status(200).json(resto);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar o usuário." });
        }
    },

    async atualizarUsuario(req, res) {
        try {
            const id = req.params.id?.trim(); 
            if (!Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID inválido." });
            }

            const usuario = await Usuario.findById(id);

            if (!usuario) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            const updates = { ...req.body };

            if (updates.senha) {
                updates.senha = await bcrypt.hash(updates.senha, 12);
            }

            const usuarioAtualizado = await Usuario.findByIdAndUpdate(
                id,
                updates,
                { 
                    new: true, 
                    runValidators: true, 
                    fields: "nome email telefone_contato telefone_responsavel" 
                }
            );

            return res.status(200).json(usuarioAtualizado);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao atualizar usuário." });
        }
    }
};



/* export default class UsuariosController {
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

} */

