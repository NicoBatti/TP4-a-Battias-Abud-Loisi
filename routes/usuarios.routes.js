import { Router } from "express";
import usuariosControler from "../controllers/usuarios.controler.js"
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = Router();

router.post('/crearusuario', usuariosControler.crearUsuario);
router.post('/login', usuariosControler.login);