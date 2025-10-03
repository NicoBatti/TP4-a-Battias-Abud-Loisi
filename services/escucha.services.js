import { config } from "../dbconfig.js"; 
import pkg from "pg";
const {Client} = pkg;

export const grabarEscucha = async (cancionId, userId) => {
    let client;
    console.log(userId)
    try{
        client = new Client(config);
        await client.connect();
        const result = await client.query('INSERT into "ESCUCHA" ("UsuarioID", "CancionID", "Reproducciones") VALUES ($1, $2, 1)',[userId, cancionId]);
        await client.end();
        return result;
    }catch(error){
        if(client){
            client.end();
        }
        throw new Error("Error en la base de datos " + error.message);
    }
}