import * as usuariosService from "../services/usuarios.services.js";
import 'dotenv/config';
import jwt from "jsonwebtoken"
import * as escuchaService from "../services/escucha.services.js"

export const grabarEscucha = async (req,res) => {
    //REST code:
    try{
        const cancionId = req.body.cancionId;
        const userId = req.body.user;
        const result = await escuchaService.grabarEscucha(cancionId, userId);
        res.status(200).json({message: "Escucha registrada con éxito"});
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}