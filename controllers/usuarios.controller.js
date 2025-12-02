import * as usuariosService from "../services/usuarios.services.js";
import 'dotenv/config';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const crearUsuario = async (req, res) => {
    let result;
    // 1. Funcionalidad REST: Extracción de datos del cuerpo (body)
    const {id, nombre, password, Rol } = req.body; 
    console.log(id);
    console.log(nombre);
    console.log(password);
    console.log(Rol);
    try {
        // 2. Ejecución del Service con 'await' y pasando los datos
        // El await debe ir sobre la LLAMADA (usuariosService.crearUsuario(...))
        const contraseñaHasheada = await bcrypt.hash(password, 10);
        result = await usuariosService.crearUsuario(id, nombre, contraseñaHasheada, Rol); 
        
        // 3. Respuesta REST: Enviar el resultado al cliente
        return res.status(201).json({message: "Usuario registrado"}); 

    } catch (error) {
        // 4. Manejo de errores (si el Service lanza un error, se atrapa aquí)
        // Usar error.message para dar más detalle (o next(error) si es un error inesperado)
        return res.status(400).json({ message: error.message + " Es en usuario.controller" || "Hace falta completar todos los campos." });
    }
}

export const login = async (req,res) => {
    //funcionalidad REST
    const secretKey = process.env.SECRETKEY
    const user = req.body;
    if (!user.userid || !user.password) {
        return res.status(400).json({ message: "Debe completar todos los campos" });
    }
    try{
        const dbUser = await usuariosService.login(user);
        if (!dbUser) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
        const passOK = await bcrypt.compare(user.password, dbUser.password);
        if (passOK) {
            const payload = { userid: user.userid };
            const options = { expiresIn: '1h' }; // Expirará en 1 hora. 60
            const token = jwt.sign(payload, secretKey, options);
            res.send({nombre: dbUser.nombre, token: token})
        } else {
            res.status(401).json({ message: "Clave invalida" })
        }
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}