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
        res.status(200).json({message: "Canción agregada con éxito."});
    }catch(error){
        return res.status(500).json({message: "Error al agregar cancion: " + error.message});
    }
}

export const putCancion = async (req, res) => {
    //REST code
    const idCancion = req.params.id;
    const nuevosDatos = req.body;
    try{
        const result = await cancionService.putCancion(idCancion, nuevosDatos);
        res.status(200).json({message: "Canción actualizada con éxito"});
    }catch(error){
        return res.status(500).json({message: "Error al actualizar cancion" + error.message})
    }
}

export const deleteCancion = async (req, res) => {
    //REST code
    try{
        console.log("Hola");
        const idCancion = req.params.id;
        const result = await cancionService.deleteCancion(idCancion);
        res.status(200).json({message: "Canción eliminada con éxito"});
    }catch(error){
        return res.status(500).json({message: "Error al eliminar cancion" + error.message})
    }
}