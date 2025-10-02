import { config } from "../dbconfig.js"; 
import pkg from "pg";
const {Client} = pkg;

export const crearUsuario = async (id, nombre, contraseñaHasheada, Rol) => {
    let client;
    console.log(Rol);
    try{
        client = new Client(config);
        await client.connect();
        let result = await client.query(`INSERT INTO "USUARIO" (id, nombre, password, "Rol") VALUES ($1, $2, $3, $4)`, [id, nombre, contraseñaHasheada, Rol]);
        await client.end();
        return {success: true};
    }catch(error){
        await client.end();
        throw new Error("Error en la base de datos: " + error.message)
    }
}

export const login = async (user) => {
    let client;
    try {
        const client = new Client(config);
        await client.connect();
        let result = await client.query(`select * from "USUARIO" where id=$1`,[user.userid]);
        await client.end()
        return result;
    }catch(error){
        await client.end()
        throw new Error("Error en la base de datos: " + error.message)
    }
}