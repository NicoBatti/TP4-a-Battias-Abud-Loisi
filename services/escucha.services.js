import { config } from "../dbconfig.js"; 
import pkg from "pg";
const {Client} = pkg;

export const escucho = async (payload) => {
    console.log(payload)
    let client;
    try{const client = new Client(config);
    await client.connect();
    let result = await client.query('select E."Reproducciones", C.nombre from "ESCUCHA" E inner join "CANCION" C on E."CancionID" = C.id WHERE E."UsuarioID" = $1', [payload.userid]);
    await client.end();
    return result //cuando el controller lo lea, debe hacer result.rows()
    }catch(error){
        await client.end();
        throw new Error("Error en la base de datos " + error.message)
    }
}