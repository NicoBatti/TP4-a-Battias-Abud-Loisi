import jwt from 'jsonwebtoken';
import 'dotenv/config'; 
//Token para probar: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJ1c2VybmFtZSI6InBydWViYSIsImlhdCI6MTc1OTE4ODcyOCwiZXhwIjoxNzU5MTkyMzI4fQ.vxz1JagTn8bNGUNmEmgi9oQYKb1bfSIU3WmajpwOymc

export function verifyToken(req, res, next) {
    
    let token; 
    const authHeader = req.headers['authorization'];
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else {
        // ERROR 401: Falta el token o el formato es incorrecto
        return res.status(401).json({ message: "Acceso denegado. Token no proporcionado o formato incorrecto." });
    }
    
    const secretKey = process.env.SECRETKEY; 

    try {
        // VERIFICACIÓN: Decodifica y valida el token
        let payload = jwt.verify(token, secretKey);
        // ASIGNACIÓN: Adjunta la identidad a req.user (cumpliendo la consigna)
        payload = payload.userid; 
        req.body.user = payload;
        console.log(`El payload del usuario con ese token es: ${payload}`)
        // CONTINUAR: Pasa al siguiente middleware o ruta
        next(); 
        
    } catch (error) {
        // ERROR 403: El token es inválido (expirado, modificado, etc.)
        console.log(error.message);
        return res.status(403).json({ message: "Token inválido o expirado." });
    }
}