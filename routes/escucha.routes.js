import { Router } from "express";
import * as escuchaController from "../controllers/escucha.controller.js"
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = Router();

router.post('/escucho',verifyToken, escuchaController.grabarEscucha);

export default router;