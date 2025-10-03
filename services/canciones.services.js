import { config } from "../dbconfig.js"; 
import pkg from "pg";
const {Client} = pkg;

export const canciones = async () =>{
    
    let client; // <--- Declaración ÚNICA

    try{
        client = new Client(config);
        
        await client.connect();
        const result = await client.query('SELECT * from "CANCION"');
        await client.end();
        
        //Si hay un error de DB, lo lanzamos.
        return result; 

    } catch(error) {
        // 3. El catch SIEMPRE PUEDE ACCEDER a 'client' (si fue asignado)
        if (client) { 
            await client.end(); 
        }
        
        // El Controller lanza el error final.
        throw new Error("Hubo un error en la base de datos: " + error.message);
    }
}

export const agregarCancion = async (nombre) => {
    //SQL
    let client;
    try{
        client = new Client(config);
        await client.connect();
        const result = await client.query('INSERT INTO "CANCION" (nombre) VALUES ($1)', [nombre]);
        await client.end();
        return result
    }catch(error){
        if (client){
            client.end();
        }
        throw new Error("Hubo un error en la base de datos: " + error.message)
    }
}

export const putCancion = async (idCancion, nuevosDatos) => {
    //SQL
    let client;
    try{
        client = new Client(config);
        await client.connect();
        const result = await client.query('UPDATE "CANCION" SET nombre = $2 WHERE id = $1', [idCancion, nuevosDatos.nombre]);
        await client.end();
        return result;
    }catch(error){
        if (client){
            client.end();
        }
        throw new Error("Error en base de datos: " + error.message);
        }
}
///Aguante python
export const deleteCancion = async (idCancion) => {
    //SQL
    let client;
    try{
        client = new Client(config);
        await client.connect();
        const result = await client.query('DELETE FROM "CANCION" WHERE id = $1', [idCancion]);
        await client.end();
        return result;
    }catch(error){
        if (client){
            client.end();
        }
        throw new Error("Error en base de datos: " + error.message);
        }
}