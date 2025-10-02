import { config } from "../dbconfig.js"; 
import pkg from "pg";
const {Client} = pkg;

export const canciones = async () =>{
    let client;
    try{
    const client = Client(config);
    await client.connect();
    const result = await client.query('select * from "CANCION"');
    await client.end();
    console.log(result);
    return result
    }catch(error){
        client.end();
        throw new Error("Hubo un error en la base de datos " + error.message)
    }
}