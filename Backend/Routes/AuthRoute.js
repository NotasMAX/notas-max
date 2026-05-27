import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
    login,
    logout,
    forgotPassword,
    forgotPasswordMobile,
    resetPassword,
} from "../Controllers/AuthController.js";

const routes = Router();

routes.post("/login", login);
routes.post("/logout", logout);
routes.get('/me', authenticateToken, (req, res) => {
    res.status(200).json({ message: "Usuário Autenticado", authenticated: true, usuario: req.user })
});
routes.post('/forgot', forgotPassword); 
routes.post('/forgot-mobile', forgotPasswordMobile);
routes.post('/reset', resetPassword);   

export default routes;

