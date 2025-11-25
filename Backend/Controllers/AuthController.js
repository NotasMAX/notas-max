import Usuario from "../Models/Usuario.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../services/emailService.js";

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

export const logout = async (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).json({ message: "Logout com sucesso" });
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O email é obrigatório.' });
  }

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 3000));
      return res.status(200).json({
        message: "Se o e-mail informado for válido, um token de recuperação de senha será enviado para sua caixa de entrada."
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(resetToken, 10);
    const resetTokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hora

    await Usuario.updateOne({ _id: usuario._id }, {
      resetToken: hashedToken,
      resetTokenExpiry: resetTokenExpiry
    });

    try {
      await sendPasswordResetEmail(usuario.email, resetToken);
    } catch (emailError) {
      console.error("Falha ao enviar o email de redefinição:", emailError);
      
      if (emailError.code === 'ESOCKET' || emailError.code === 'EHOSTUNREACH' || emailError.code === 'ENOTFOUND' || emailError.code === 'EDNS') {
        return res.status(503).json({ 
          message: 'Erro de conexão com a internet. Verifique sua conexão e tente novamente.',
          errorType: 'CONNECTION_ERROR'
        });
      }

      return res.status(500).json({ 
        message: 'Erro ao enviar email de redefinição. Tente novamente mais tarde.',
        errorType: 'EMAIL_ERROR'
      });
    }

    return res.status(200).json({
      message: "Se o e-mail informado for válido, um token de recuperação de senha será enviado para sua caixa de entrada."
    });

  } catch (error) {
    console.error("Erro no forgotPassword:", error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const resetPassword = async (req, res) => {
  const { token, novaSenha } = req.body;
  if (!token || !novaSenha || novaSenha.length < 6) {
    return res.status(400).json({ message: 'Token e nova senha válidos (mínimo 6 caracteres) são obrigatórios.' });
  }
  try {
    const usuarioComToken = await Usuario.findOne({
      resetTokenExpiry: { $gt: new Date() }
    }).select("+resetToken");
    if (!usuarioComToken) {
      return res.status(400).json({ message: 'Token inválido ou expirado.' });
    }
    // Comparar o token enviado com o HASH armazenado
    const tokenValido = await bcrypt.compare(token, usuarioComToken.resetToken);
    if (!tokenValido) {
      return res.status(400).json({ message: 'Token inválido ou expirado.' });
    }
    // Hash da Nova Senha
    const hashedNewPassword = await bcrypt.hash(novaSenha, 10);
    // Atualizar a Senha e Limpar os Campos de Token
    await Usuario.updateOne(
      { _id: usuarioComToken._id },
      {
        senha: hashedNewPassword,
        resetToken: null,
        resetTokenExpiry: null,
      }
    );
    return res.status(200).json({
      message: 'Senha redefinida com sucesso! Você já pode fazer login com sua nova senha.'
    });
  } catch (error) {
    console.error('Erro na redefinição de senha:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};