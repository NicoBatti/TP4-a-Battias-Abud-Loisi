import * as cancionService from "../services/canciones.services.js"

export const canciones = async (req, res) =>{
    try{
        const result = await cancionService.canciones();
        res.send(result.rows)}
        catch(error){
            return res.status(500).json({message: "Error al obtener canciones: " + error.message})
    }
}

export const agregarCancion = async (req, res) => {
    //Rest code
    const nombre = req.body.nombre;
    try{
        const result = await cancionService.agregarCancion(nombre);
        res.status(200).json({message: "Canción actualizada con éxito.", data: result});
    }catch(error){
        return res.status(500).json({message: "Error al agregar cancion: " + error.message});
    }
}

export const putCancion = async (req, res) => {
    //REST code

}