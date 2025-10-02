import { Router } from "express";
import * as cancionesController from "../controllers/canciones.controller.js"
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = Router();

router.get('/canciones', cancionesController.canciones)

export default router;