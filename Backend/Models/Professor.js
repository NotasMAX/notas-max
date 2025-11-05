import mongoose from "../DB/conn.js";

const {Schema} = mongoose;

const ProfessorSchema = new mongoose.Schema({
    nome: {type: String, 
    required: true
    },
    
    email: {type: String, 
    required: true
    },

    telefone: {type: String, 
    required: true
    },
});

const Professor = mongoose.model("Professores", ProfessorSchema);

export default Professor;