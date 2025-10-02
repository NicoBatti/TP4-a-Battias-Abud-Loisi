import { Router } from "express";
import * as cancionesController from "../controllers/canciones.controller.js"
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = Router();

router.get('/canciones', cancionesController.canciones)

router.post('/cancion',verifyToken, verifyAdmin, cancionesController.agregarCancion)

router.put('/:id',verifyToken, verifyAdmin, cancionesController.putCancion)

router.delete('/:id',verifyToken, verifyAdmin, cancionesController.deleteCancion)

export default router;