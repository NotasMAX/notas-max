import Simulado from '../Models/Simulado.js';
import Turmas from "../Models/Turma.js";
import { Types } from 'moongose';

export default class simuladoController {
    static async create(req, res) {
        try {
            const {
                numero,
                tipo,
                bimestre,
                data_realizacao,
                turma_id,
                conteudos // <- array com as matérias e professores
            } = req.body;

            // === VALIDAÇÕES DO SIMULADO ===
            if (!numero)
                return res.status(422).json({ message: 'Preencha o Nº do Simulado' });
            if (!tipo || !['objetivo', 'dissertativo'].includes(tipo))
                return res.status(422).json({ message: "Tipo de simulado inválido. Use 'objetivo' ou 'dissertativo'." });
            if (!bimestre)
                return res.status(422).json({ message: 'Informe o bimestre' });
            if (!data_realizacao)
                return res.status(422).json({ message: 'Informe a data de realização' });
            if (!turma_id)
                return res.status(422).json({ message: 'Turma não informada' });

            // Verifica se a turma existe
            if (!Types.ObjectId.isValid(turma_id))
                return res.status(422).json({ message: 'Id da turma inválido' });

            const turmaExiste = await Turma.findById(turma_id);
            if (!turmaExiste)
                return res.status(404).json({ message: 'Turma não encontrada' });

            // === CRIA O SIMULADO ===
            const novoSimulado = await Simulado.create({
                numero,
                tipo,
                bimestre,
                data_realizacao,
                turma_id
            });

            // === CRIA OS CONTEÚDOS DO SIMULADO ===
            if (conteudos && conteudos.length > 0) {
                const conteudosComSimuladoId = conteudos.map(c => ({
                    ...c,
                    simulado_id: novoSimulado._id
                }));

                await SimuladoConteudo.insertMany(conteudosComSimuladoId);
            }

            res.status(201).json({
                message: 'Simulado e conteúdos cadastrados com sucesso!',
                simulado: novoSimulado
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Erro ao cadastrar simulado e conteúdos',
                error: error.message
            });
        }
    }// fim create

    static async getAll(req, res) {

        try {
            const simulados = await Simulado.find({}).sort("-createdAt");
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
                return res.status(422).json({ message: "Id de simulado invalido" });

            const simulado = await Simulado.find(id);

            if (!simulado)
                return res.status(404).json({ message: 'Simulado não encontrado...' });

            res.status(200).json({ simulado });

        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar simulado', error });
        }
    }
}