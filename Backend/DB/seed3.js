import mongoose from "./conn.js";
import Usuario from "../Models/Usuario.js";
import Turma from "../Models/Turma.js";
import Materia from "../Models/Materia.js";
import TurmaDisciplina from "../Models/TurmaDisciplina.js";
import Simulado from "../Models/Simulado.js";
import bcrypt from "bcryptjs";

const seedDatabase = async () => {
    try {
        console.log("🌱 Iniciando seed do banco de dados...");

        // Limpar coleções existentes
        await Usuario.deleteMany({});
        await Turma.deleteMany({});
        await Materia.deleteMany({});
        await TurmaDisciplina.deleteMany({});
        await Simulado.deleteMany({});
        console.log("✓ Coleções limpas");

        // ===== CRIAR USUÁRIOS =====
        const senhaHash = await bcrypt.hash("admin123", 12);

        const usuariosData = [
            {
                nome: "Carlos Mendonça",
                email: "cassinotte@gmail.com",
                telefone_contato: "11987654321",
                senha: senhaHash,
                tipo_usuario: "administrador"
            },
            {
                nome: "Prof. João Silva",
                email: "joao.silva@school.com",
                telefone_contato: "11987654322",
                senha: senhaHash,
                tipo_usuario: "professor"
            },
            {
                nome: "Prof. Maria Santos",
                email: "maria.santos@school.com",
                telefone_contato: "11987654323",
                senha: senhaHash,
                tipo_usuario: "professor"
            },
            {
                nome: "Prof. Carlos Oliveira",
                email: "carlos.oliveira@school.com",
                telefone_contato: "11987654324",
                senha: senhaHash,
                tipo_usuario: "professor"
            },
            // Alunos
            {
                nome: "Ana Paula",
                email: "ana.paula@student.com",
                telefone_contato: "11987654325",
                senha: senhaHash,
                tipo_usuario: "aluno",
                nome_responsavel: "Sr. Paulo Silva",
                telefone_responsavel: "11987654326"
            },
            {
                nome: "Bruno Costa",
                email: "bruno.costa@student.com",
                telefone_contato: "11987654327",
                senha: senhaHash,
                tipo_usuario: "aluno",
                nome_responsavel: "Sra. Carla Costa",
                telefone_responsavel: "11987654328"
            },
            {
                nome: "Camila Ferreira",
                email: "camila.ferreira@student.com",
                telefone_contato: "11987654329",
                senha: senhaHash,
                tipo_usuario: "aluno",
                nome_responsavel: "Sr. Roberto Ferreira",
                telefone_responsavel: "11987654330"
            },
            {
                nome: "Diego Mendes",
                email: "diego.mendes@student.com",
                telefone_contato: "11987654331",
                senha: senhaHash,
                tipo_usuario: "aluno",
                nome_responsavel: "Sra. Fernanda Mendes",
                telefone_responsavel: "11987654332"
            },
            {
                nome: "Carolina Rocha",
                email: "carolina.rocha@student.com",
                telefone_contato: "11987654333",
                senha: senhaHash,
                tipo_usuario: "aluno",
                nome_responsavel: "Sr. Guilherme Rocha",
                telefone_responsavel: "11987654334"
            },
            {
                nome: "Felipe Gomes",
                email: "felipe.gomes@student.com",
                telefone_contato: "11987654335",
                senha: senhaHash,
                tipo_usuario: "aluno",
                nome_responsavel: "Sra. Helena Gomes",
                telefone_responsavel: "11987654336"
            }
        ];

        const usuarios = await Usuario.insertMany(usuariosData);
        console.log(`✓ ${usuarios.length} usuários criados`);

        // ===== CRIAR MATÉRIAS =====
        const materiasData = [
            { nome: "Matemática" },
            { nome: "Português" },
            { nome: "História" },
            { nome: "Geografia" },
            { nome: "Física" },
            { nome: "Química" },
            { nome: "Biologia" },
            { nome: "Inglês" }
        ];

        const materias = await Materia.insertMany(materiasData);
        console.log(`✓ ${materias.length} matérias criadas`);

        // ===== CRIAR TURMAS =====
        // Pegar IDs dos alunos
        const alunosIds = usuarios.filter(u => u.tipo_usuario === "aluno").map(u => u._id);

        const turmasData = [
            {
                serie: 1,
                ano: 2026,
                alunos: alunosIds.slice(0, 5) // Ana, Bruno, Camila, Diego, Carolina
            },
            {
                serie: 2,
                ano: 2026,
                alunos: alunosIds.slice(5, 10) // Felipe e mais 4 alunos
            },
            {
                serie: 3,
                ano: 2026,
                alunos: alunosIds.slice(3, 8) // Alguns alunos
            }
        ];

        const turmas = await Turma.insertMany(turmasData);
        console.log(`✓ ${turmas.length} turmas criadas`);

        // ===== CRIAR TURMA-DISCIPLINAS =====
        const professorIds = usuarios.filter(u => u.tipo_usuario === "professor").map(u => u._id);

        const turmaDisciplinasData = [
            // Turma 1º EM
            {
                turma_id: turmas[ 0 ]._id,
                professor_id: professorIds[ 0 ], // João
                materia_id: materias[ 0 ]._id // Matemática
            },
            {
                turma_id: turmas[ 0 ]._id,
                professor_id: professorIds[ 1 ], // Maria
                materia_id: materias[ 1 ]._id // Português
            },
            {
                turma_id: turmas[ 0 ]._id,
                professor_id: professorIds[ 2 ], // Carlos
                materia_id: materias[ 4 ]._id // Física
            },
            // Turma 2º EM
            {
                turma_id: turmas[ 1 ]._id,
                professor_id: professorIds[ 0 ], // João
                materia_id: materias[ 0 ]._id // Matemática
            },
            {
                turma_id: turmas[ 1 ]._id,
                professor_id: professorIds[ 1 ], // Maria
                materia_id: materias[ 1 ]._id // Português
            },
            {
                turma_id: turmas[ 1 ]._id,
                professor_id: professorIds[ 2 ], // Carlos
                materia_id: materias[ 5 ]._id // Química
            },
            // Turma 3º EM
            {
                turma_id: turmas[ 2 ]._id,
                professor_id: professorIds[ 0 ], // João
                materia_id: materias[ 0 ]._id // Matemática
            },
            {
                turma_id: turmas[ 2 ]._id,
                professor_id: professorIds[ 1 ], // Maria
                materia_id: materias[ 2 ]._id // História
            }
        ];

        const turmaDisciplinas = await TurmaDisciplina.insertMany(turmaDisciplinasData);
        console.log(`✓ ${turmaDisciplinas.length} turma-disciplinas criadas`);

        // ===== CRIAR SIMULADOS =====
        // ===== CRIAR SIMULADOS =====
        const quantidade_questoes = 10;
        const notaMaxima = 10;
        const simuladosData = [
            {
                numero: 1,
                tipo: "objetivo",
                bimestre: 1,
                data_realizacao: new Date("2026-02-15"),
                turma_id: turmas[ 0 ]._id,
                conteudos: [
                    {
                        turma_disciplina_id: turmaDisciplinas[ 0 ]._id, // Matemática - Turma 1
                        quantidade_questoes: quantidade_questoes,
                        peso: 100.0,
                        resultados: [
                            { aluno_id: alunosIds[ 0 ], acertos: 9, nota: (notaMaxima / quantidade_questoes) * 9, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 1 ], acertos: 7, nota: (notaMaxima / quantidade_questoes) * 7, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 2 ], acertos: 9, nota: (notaMaxima / quantidade_questoes) * 9, notificacao_pendente: "pendente" }
                        ]
                    },
                    {
                        turma_disciplina_id: turmaDisciplinas[ 1 ]._id, // Português - Turma 1
                        quantidade_questoes: quantidade_questoes,
                        peso: 100.0,
                        resultados: [
                            { aluno_id: alunosIds[ 0 ], acertos: 10, nota: (notaMaxima / quantidade_questoes) * 10, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 1 ], acertos: 6, nota: (notaMaxima / quantidade_questoes) * 6, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 2 ], acertos: 8, nota: (notaMaxima / quantidade_questoes) * 8, notificacao_pendente: "pendente" }
                        ]
                    }
                ]
            },
            {
                numero: 1,
                tipo: "objetivo",
                bimestre: 2,
                data_realizacao: new Date("2026-02-15"),
                turma_id: turmas[ 0 ]._id,
                conteudos: [
                    {
                        turma_disciplina_id: turmaDisciplinas[ 0 ]._id, // Matemática - Turma 1
                        quantidade_questoes: quantidade_questoes,
                        peso: 100.0,
                        resultados: [
                            { aluno_id: alunosIds[ 0 ], acertos: 6, nota: (notaMaxima / quantidade_questoes) * 6, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 1 ], acertos: 5, nota: (notaMaxima / quantidade_questoes) * 5, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 2 ], acertos: 4, nota: (notaMaxima / quantidade_questoes) * 4, notificacao_pendente: "pendente" }
                        ]
                    },
                    {
                        turma_disciplina_id: turmaDisciplinas[ 1 ]._id, // Português - Turma 1
                        quantidade_questoes: quantidade_questoes,
                        peso: 100.0,
                        resultados: [
                            { aluno_id: alunosIds[ 0 ], acertos: 8, nota: (notaMaxima / quantidade_questoes) * 8, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 1 ], acertos: 7, nota: (notaMaxima / quantidade_questoes) * 7, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 2 ], acertos: 6, nota: (notaMaxima / quantidade_questoes) * 6, notificacao_pendente: "pendente" }
                        ]
                    }
                ]
            },
            {
                numero: 1,
                tipo: "objetivo",
                bimestre: 3,
                data_realizacao: new Date("2026-02-15"),
                turma_id: turmas[ 0 ]._id,
                conteudos: [
                    {
                        turma_disciplina_id: turmaDisciplinas[ 0 ]._id, // Matemática - Turma 1
                        quantidade_questoes: quantidade_questoes,
                        peso: 100.0,
                        resultados: [
                            { aluno_id: alunosIds[ 0 ], acertos: 4, nota: (notaMaxima / quantidade_questoes) * 4, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 1 ], acertos: 9, nota: (notaMaxima / quantidade_questoes) * 9, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 2 ], acertos: 10, nota: (notaMaxima / quantidade_questoes) * 10, notificacao_pendente: "pendente" }
                        ]
                    },
                    {
                        turma_disciplina_id: turmaDisciplinas[ 1 ]._id, // Português - Turma 1
                        quantidade_questoes: quantidade_questoes,
                        peso: 100.0,
                        resultados: [
                            { aluno_id: alunosIds[ 0 ], acertos: 10, nota: (notaMaxima / quantidade_questoes) * 10, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 1 ], acertos: 6, nota: (notaMaxima / quantidade_questoes) * 6, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 2 ], acertos: 9, nota: (notaMaxima / quantidade_questoes) * 9, notificacao_pendente: "pendente" }
                        ]
                    }
                ]
            },
            {
                numero: 1,
                tipo: "objetivo",
                bimestre: 4,
                data_realizacao: new Date("2026-02-15"),
                turma_id: turmas[ 0 ]._id,
                conteudos: [
                    {
                        turma_disciplina_id: turmaDisciplinas[ 0 ]._id, // Matemática - Turma 1
                        quantidade_questoes: quantidade_questoes,
                        peso: 100.0,
                        resultados: [
                            { aluno_id: alunosIds[ 0 ], acertos: 9, nota: (notaMaxima / quantidade_questoes) * 9, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 1 ], acertos: 6, nota: (notaMaxima / quantidade_questoes) * 6, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 2 ], acertos: 3, nota: (notaMaxima / quantidade_questoes) * 3, notificacao_pendente: "pendente" }
                        ]
                    },
                    {
                        turma_disciplina_id: turmaDisciplinas[ 1 ]._id, // Português - Turma 1
                        quantidade_questoes: quantidade_questoes,
                        peso: 100.0,
                        resultados: [
                            { aluno_id: alunosIds[ 0 ], acertos: 10, nota: (notaMaxima / quantidade_questoes) * 10, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 1 ], acertos: 4, nota: (notaMaxima / quantidade_questoes) * 4, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 2 ], acertos: 6, nota: (notaMaxima / quantidade_questoes) * 6, notificacao_pendente: "pendente" }
                        ]
                    }
                ]
            },
            {
                numero: 2,
                tipo: "objetivo",
                bimestre: 1,
                data_realizacao: new Date("2026-03-10"),
                turma_id: turmas[ 1 ]._id,
                conteudos: [
                    {
                        turma_disciplina_id: turmaDisciplinas[ 3 ]._id, // Matemática - Turma 2
                        quantidade_questoes: quantidade_questoes,
                        peso: 100.0,
                        resultados: [
                            { aluno_id: alunosIds[ 5 ], acertos: 8, nota: (notaMaxima / quantidade_questoes) * 8, notificacao_pendente: "pendente" }
                        ]
                    }
                ]
            },
            {
                numero: 1,
                tipo: "dissertativo",
                bimestre: 2,
                data_realizacao: new Date("2026-05-20"),
                turma_id: turmas[ 2 ]._id,
                conteudos: [
                    {
                        turma_disciplina_id: turmaDisciplinas[ 6 ]._id, // Matemática - Turma 3
                        quantidade_questoes: quantidade_questoes,
                        peso: 2.0,
                        resultados: [
                            { aluno_id: alunosIds[ 3 ], acertos: 3, nota: (notaMaxima / quantidade_questoes) * 3, notificacao_pendente: "pendente" },
                            { aluno_id: alunosIds[ 4 ], acertos: 4, nota: (notaMaxima / quantidade_questoes) * 4, notificacao_pendente: "pendente" }
                        ]
                    }
                ]
            }
        ];

        const simulados = await Simulado.insertMany(simuladosData);

        console.log("✅ Seed concluído com sucesso!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Erro ao fazer seed:", error);
        process.exit(1);
    }
};

seedDatabase();
