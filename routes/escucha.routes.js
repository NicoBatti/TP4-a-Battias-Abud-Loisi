import { Router } from "express";
import * as escuchaController from "../controllers/escucha.controller.js"
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = Router();

router.get('/escucho', escuchaController.escucho);

router.post('/escucho', escuchaController.grabarEscucha);

export default router;