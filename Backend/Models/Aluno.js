import mongoose from "../DB/conn.js";

const {Schema} = mongoose;

const AlunoSchema = new mongoose.Schema({
    nome: {type: String, 
    required: true
    },

    email: {type: String, 
    required: true
    },

    telefone: {type: String, 
    required: true
    },

    nome_responsavel: {type: String, 
    required: true
    },

    telefone_responsavel: {type: String, 
    required: true
    },
});

const Aluno = mongoose.model("Alunos", AlunoSchema);

export default Aluno;