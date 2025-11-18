
import bcrypt from "bcryptjs";
import mongoose from "./conn.js";
import Usuario from "../Models/Usuario.js";

async function seedUsuarios() {
	const usuarios = [
		{
			nome: "João Silva",
			email: "joao@exemplo.com",
			telefone_contato: "11999999999",
			senha: "123456",
			tipo_usuario: "aluno",
			telefone_responsavel: "11988888888"
		},
		{
			nome: "Maria Souza",
			email: "maria@exemplo.com",
			telefone_contato: "11988887777",
			senha: "654321",
			tipo_usuario: "professor"
		},
		{
			nome: "Carlos Admin",
			email: "admin@exemplo.com",
			telefone_contato: "11977776666",
			senha: "admin123",
			tipo_usuario: "administrador"
		}
	];

	for (const u of usuarios) {
		const salt = 12;
		u.senha = await bcrypt.hash(u.senha, salt);
		await Usuario.create(u);
		console.log(`Usuário ${u.email} inserido.`);
	}

	await mongoose.disconnect();
	console.log("Seed finalizado.");
}

seedUsuarios().catch(console.error);

//Entra na pasta db dentro do backend, node seed.js 