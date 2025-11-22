import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta-super-segura";

export const authenticateToken = (req, res, next) => {
    // 1. Obter o token do COOKIE 'jwt'
    const token = req.cookies.jwt; 
    
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Necessário estar logado.' });
    }

    try {
        // 2. Verificar e Decodificar o Token
        const decoded = jwt.verify(token, JWT_SECRET);

        // 3. Anexar o payload do usuário
        req.user = decoded; 

        // Atualizar a duração do token para 1 hora
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });

        next();
        
    } catch (err) {
        // Token inválido/expirado: limpa o cookie
        console.error("ERRO NA VERIFICAÇÃO DO JWT. Tipo:", (err).name, "Mensagem:", (err).message);
        res.clearCookie('jwt'); 
        return res.status(403).json({ message: 'Sessão inválida ou expirada. Faça login novamente.' });
    }
};

export const authorizeAdmin = (req, res, next) => {
   
    if (!req.user || req.user.tipo_usuario !== 'administrador') {
        console.log("Usuário sem permissão de admin:", req.user?.tipo_usuario);
        return res.status(403).json({ message: 'Proibido. Apenas administradores podem realizar esta ação.' });
    }
    next();
};