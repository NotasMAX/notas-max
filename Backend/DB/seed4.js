import mongoose from "./conn.js";
import Usuario from "../Models/Usuario.js";
import Turma from "../Models/Turma.js";
import Materia from "../Models/Materia.js";
import TurmaDisciplina from "../Models/TurmaDisciplina.js";
import Simulado from "../Models/Simulado.js";
import bcrypt from "bcryptjs";

const seedDatabase = async () => {
    try {
        console.log("🌱 Iniciando seed4 do banco de dados...");

        // Limpar coleções existentes
        await Usuario.deleteMany({});
        await Turma.deleteMany({});
        await Materia.deleteMany({});
        await TurmaDisciplina.deleteMany({});
        await Simulado.deleteMany({});
        console.log("✓ Coleções limpas");

        // ===== USUÁRIOS =====
        const senhaHash = await bcrypt.hash("admin123", 12);

        const usuariosData = [
            // Administrador
            { nome: "Admin Sistema", email: "admin@escola.com", telefone_contato: "11990000000", senha: senhaHash, tipo_usuario: "administrador" },
            // 3 Professores
            { nome: "Prof. João Pereira", email: "joao.pereira@school.com", telefone_contato: "11990000001", senha: senhaHash, tipo_usuario: "professor" },
            { nome: "Prof. Maria Oliveira", email: "maria.oliveira@school.com", telefone_contato: "11990000002", senha: senhaHash, tipo_usuario: "professor" },
            { nome: "Prof. Carlos Almeida", email: "carlos.almeida@school.com", telefone_contato: "11990000003", senha: senhaHash, tipo_usuario: "professor" },
        ];

        // 15 alunos (5 por turma) — cada aluno só em uma turma
        const alunos = [];
        const nomesAlunos = [
            "Lucas Santos", "Sofia Oliveira", "Mateus Costa", "Isabela Pereira", "Gustavo Almeida",
            "Camila Rodrigues", "Rafael Lima", "Larissa Souza", "Bruno Fernandes", "Mariana Gomes",
            "Thiago Ribeiro", "Julia Carvalho", "Felipe Silva", "Amanda Torres", "Leonardo Mendes"
        ];
        const responsaveis = [
            "Paulo Silva", "Carla Costa", "Roberto Ferreira", "Fernanda Mendes", "Guilherme Rocha",
            "Helena Gomes", "Marcos Lima", "Patrícia Alves", "Eduardo Torres", "Luciana Mendes",
            "André Souza", "Daniela Ribeiro", "Felipe Santos", "Aline Sousa", "Renato Barros"
        ];

        for (let i = 0; i < 15; i++) {
            const aluno = {
                nome: nomesAlunos[ i ],
                email: `${nomesAlunos[ i ].toLowerCase().replace(/\s+/g, '.')}@student.com`,
                telefone_contato: `1198000${String(100 + i).slice(-3)}`,
                senha: senhaHash,
                tipo_usuario: "aluno",
                nome_responsavel: responsaveis[ i ],
                telefone_responsavel: `1197000${String(200 + i).slice(-3)}`
            };
            alunos.push(aluno);
        }

        const usuariosAll = await Usuario.insertMany([ ...usuariosData, ...alunos ]);
        console.log(`✓ ${usuariosAll.length} usuários criados`);

        // ===== MATÉRIAS =====
        const materiasData = [
            { nome: "Matemática" },
            { nome: "Português" },
            { nome: "História" },
            { nome: "Geografia" },
            { nome: "Física" },
            { nome: "Química" },
            { nome: "Biologia" },
            { nome: "Inglês" },
            { nome: "Artes" },
            { nome: "Educação Física" },
            { nome: "Filosofia" },
            { nome: "Sociologia" }
        ];

        const materias = await Materia.insertMany(materiasData);
        console.log(`✓ ${materias.length} matérias criadas`);

        // ===== TURMAS =====
        const usuariosObjs = usuariosAll;
        const alunosIds = usuariosObjs.filter(u => u.tipo_usuario === "aluno").map(u => u._id);

        // Distribuir 5 alunos por turma, sem repetição
        const turmasData = [
            { serie: 1, ano: 2026, alunos: alunosIds.slice(0, 5) },
            { serie: 2, ano: 2026, alunos: alunosIds.slice(5, 10) },
            { serie: 3, ano: 2026, alunos: alunosIds.slice(10, 15) }
        ];

        const turmas = await Turma.insertMany(turmasData);
        console.log(`✓ ${turmas.length} turmas criadas`);

        // ===== TURMA-DISCIPLINAS =====
        const professorIds = usuariosObjs.filter(u => u.tipo_usuario === "professor").map(u => u._id);

        // Atribuir 5 disciplinas por turma, usando matérias distintas quando possível
        const turmaDisciplinasData = [];
        for (let t = 0; t < turmas.length; t++) {
            const materiasParaTurma = materias.slice(t * 5 % materias.length, (t * 5 % materias.length) + 5);
            // se slice não retornar 5 por atingir final, completar com início
            if (materiasParaTurma.length < 5) {
                materiasParaTurma.push(...materias.slice(0, 5 - materiasParaTurma.length));
            }
            for (let m = 0; m < materiasParaTurma.length; m++) {
                turmaDisciplinasData.push({
                    turma_id: turmas[ t ]._id,
                    professor_id: professorIds[ m % professorIds.length ],
                    materia_id: materiasParaTurma[ m ]._id
                });
            }
        }

        const turmaDisciplinas = await TurmaDisciplina.insertMany(turmaDisciplinasData);
        console.log(`✓ ${turmaDisciplinas.length} turma-disciplinas criadas`);

        // ===== SIMULADOS =====
        const quantidade_questoes = 10;
        const notaMaxima = 10;
        const simuladosData = [];

        // função auxiliar para gerar resultados para alunos de uma turma
        const gerarResultados = (alunosIdArray, completado = true) => {
            return alunosIdArray.map(alunoId => {
                const acertos = Math.floor(Math.random() * 8) + 3; // 3..10
                return {
                    aluno_id: alunoId,
                    acertos,
                    nota: (notaMaxima / quantidade_questoes) * acertos,
                    notificacao_pendente: completado ? "enviada" : "pendente"
                };
            });
        };

        // Para cada turma: 3 realizados (datas passadas) + 1 marcado (data futura)
        for (let i = 0; i < turmas.length; i++) {
            const turma = turmas[ i ];
            const turmaDiscIds = turmaDisciplinas.filter(td => td.turma_id.toString() === turma._id.toString()).map(td => td._id);
            const turmaAlunoIds = turma.alunos;
            const pesoIgual = 100.0 / turmaDiscIds.length; // Distribuir peso igualmente entre todas as disciplinas

            // 3 realizados
            for (let b = 1; b <= 3; b++) {
                const conteudos = turmaDiscIds.map(discId => ({
                    turma_disciplina_id: discId,
                    quantidade_questoes,
                    peso: pesoIgual,
                    resultados: gerarResultados(turmaAlunoIds, true)
                }));

                simuladosData.push({
                    numero: b,
                    tipo: b % 2 === 0 ? "dissertativo" : "objetivo",
                    bimestre: b,
                    data_realizacao: new Date(`2026-0${2 + i}-${10 + b}`),
                    turma_id: turma._id,
                    conteudos
                });
            }

            // 1 marcado (futuro) — sem resultados
            const conteudosAgendado = turmaDiscIds.map(discId => ({
                turma_disciplina_id: discId,
                quantidade_questoes,
                peso: pesoIgual,
                resultados: []
            }));

            simuladosData.push({
                numero: 99 + i, // identificar como agendado
                tipo: "objetivo",
                bimestre: 0,
                data_realizacao: new Date(`2026-12-${10 + i}`),
                turma_id: turma._id,
                conteudos: conteudosAgendado
            });
        }

        const simulados = await Simulado.insertMany(simuladosData);
        console.log(`✓ ${simulados.length} simulados criados`);

        console.log("✅ Seed4 concluído com sucesso!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Erro ao fazer seed4:", error);
        process.exit(1);
    }
};

seedDatabase();
