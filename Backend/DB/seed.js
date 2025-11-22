// Seed script para gerar dados fictícios.
// Execute: node ./seed/seed.js
import mongoose from './conn.js';
import bcrypt from "bcryptjs";
import Materia from '../Models/Materia.js';
import Usuario from '../Models/Usuario.js';
import Turma from '../Models/Turma.js';
import TurmaDisciplina from '../Models/TurmaDisciplina.js';
import Simulado from '../Models/Simulado.js';

function randInt(max) { return Math.floor(Math.random() * max); }

async function seed() {
  try {
    console.log('Limpando coleções...');
    await Promise.all([
      Materia.deleteMany({}),
      Usuario.deleteMany({}),
      Turma.deleteMany({}),
      TurmaDisciplina.deleteMany({}),
      Simulado.deleteMany({})
    ]);

    console.log('Inserindo matérias...');
    const materias = await Materia.insertMany([
      { nome: 'Matemática' },
      { nome: 'Português' },
      { nome: 'História' },
      { nome: 'Geografia' },
      { nome: 'Química' },
      { nome: 'Física' },
      { nome: 'Biologia' }
    ]);

    console.log('Inserindo professores, admin e alunos...');
    const professores = await Usuario.insertMany([
      { nome: 'João Silva', email: 'joao.prof@example.com', telefone_contato: '11990000001', senha: 'hash1', tipo_usuario: 'professor' },
      { nome: 'Maria Souza', email: 'maria.prof@example.com', telefone_contato: '11990000002', senha: 'hash2', tipo_usuario: 'professor' },
      { nome: 'Carlos Lima', email: 'carlos.prof@example.com', telefone_contato: '11990000003', senha: 'hash3', tipo_usuario: 'professor' },
      { nome: 'Ana Pereira', email: 'ana.prof@example.com', telefone_contato: '11990000004', senha: 'hash4', tipo_usuario: 'professor' }
    ]);

    const admin = await Usuario.create({
      nome: 'Admin',
      email: 'admin@example.com',
      telefone_contato: '11991111111',
      senha: 'adminhash',
      tipo_usuario: 'administrador'
    });

    const alunos = await Usuario.insertMany(
      Array.from({ length: 20 }).map((_, i) => ({
        nome: `Aluno ${i + 1}`,
        email: `aluno${i + 1}@example.com`,
        telefone_contato: `1199222${String(100 + i)}`,
        senha: 'hashAluno',
        tipo_usuario: 'aluno',
        telefone_responsavel: `1199333${String(100 + i)}`
      }))
    );



    console.log('Inserindo turmas...');
    const anoAtual = new Date().getFullYear();
    const turmas = await Turma.insertMany([
      { serie: 1, ano: anoAtual, alunos: alunos.slice(0, 10).map(a => a._id) },
      { serie: 2, ano: anoAtual, alunos: alunos.slice(10).map(a => a._id) }
    ]);

    console.log('Inserindo disciplinas das turmas...');
    const turmaDisciplinasPayload = [];
    for (const turma of turmas) {
      // 5 primeiras matérias
      for (const materia of materias.slice(0, 5)) {
        turmaDisciplinasPayload.push({
          turma_id: turma._id,
          professor_id: professores[randInt(professores.length)]._id,
          materia_id: materia._id
        });
      }
    }
    const turmaDisciplinas = await TurmaDisciplina.insertMany(turmaDisciplinasPayload);

    console.log('Inserindo simulados...');
    const simuladosPayload = [];
    for (const turma of turmas) {
      for (let numero = 1; numero <= 2; numero++) {
        const disciplinasDaTurma = turmaDisciplinas.filter(td => String(td.turma_id) === String(turma._id));
        const conteudos = disciplinasDaTurma.slice(0, 3).map(td => {
          const resultados = turma.alunos.slice(0, 6).map(alunoId => {
            const acertos = randInt(21); // 0..20
            const nota = Number((acertos * (10 / 20)).toFixed(2));
            return {
              aluno_id: alunoId,
              nota,
              acertos,
              notificacao_enviada: Math.random() > 0.7 ? 'enviada' : 'pendente'
            };
          });
          return {
            turma_disciplina_id: td._id,
            quantidade_questoes: 20,
            peso: 1.0,
            resultados
          };
        });
        simuladosPayload.push({
          numero,
          tipo: numero % 2 === 0 ? 'objetivo' : 'dissertativo',
          bimestre: numero,
          data_realizacao: new Date(anoAtual, numero, 10),
          turma_id: turma._id,
          conteudos
        });
      }
    }
    await Simulado.insertMany(simuladosPayload);

    console.log('Seed concluído com sucesso.');
  } catch (err) {
    console.error('Erro no seed:', err);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
