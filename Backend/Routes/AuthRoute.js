import express from "express";
import { authenticateToken} from "../middlewares/authMiddleware.js";
import { login, logout } from "../Controllers/AuthController.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get('/me', authenticateToken, (req, res) => {
    res.status(200).json({ message: "Usuário Autenticado", authenticated: true, usuario: req.user })
});

export default router;
