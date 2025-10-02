import * as usuariosService from "../services/usuarios.services.js";
import 'dotenv/config';
import jwt from "jsonwebtoken"
import * as escuchaService from "../services/escucha.services.js"

export const escucho = async (req, res) => {
    //Extrayendo Token de authorization
    const secretKey = process.env.SECRETKEY
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
    return res.status(401).json({ message: "Falta token" });
    }
    const token = authHeader.split(" ")[1];
    let payload;
    try {
    // Decodifica y chequea el Token
    payload = jwt.verify(token, secretKey);
    console.log("Payload:", payload); // Por si el token no coincide:
    }catch (err) {
    res.status(403).json({ message: "Token inválido" });
    }
    const result = await escuchaService.escucho(payload);
    res.send(result.rows);
}

export const grabarEscucha = async (req,res) => {
    //TODO:
}