import Usuario from "../Models/Usuario.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta-super-segura";

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
    }

    const usuario = await Usuario.findOne({ email }).select("+senha");
    if (!usuario) {
      return res.status(401).json({ message: "Credenciais Inválidas." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: "Credenciais Inválidas." });
    }

    const token = jwt.sign(
      { id: usuario._id, nome: usuario.nome, email: usuario.email, tipo_usuario: usuario.tipo_usuario },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Definir cookie com o token
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false, // Mude para true em produção com HTTPS
      sameSite: "lax",
      maxAge: 3600000 // 1 hora em ms
    });

    return res.status(200).json({
      message: "Login realizado com sucesso.",
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        tipo_usuario: usuario.tipo_usuario,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

export const logout = async(req, res)=>{
    res.clearCookie("jwt");
    console.log("Cookies apagado:");
    return res.status(200).json({message:"Logout com sucesso"});
};
