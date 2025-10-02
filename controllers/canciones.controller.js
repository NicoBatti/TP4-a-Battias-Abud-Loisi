import * as cancionService from "../services/canciones.services.js"

export const canciones = async (req, res) =>{
    try{
    const result = await cancionService.canciones;
    res.send(result.rows)}
    catch(error){
        throw new Error("El error es: " + error.message)
    }
}