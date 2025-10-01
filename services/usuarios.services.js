import { config } from "dotenv";
import pkg from "pg";
const {Client} = pkg;

const insterUsuario = async () => {
    //Sentencia SQl TODO: chequear lo que meti aca (mas que nada el return)
    const client = new Client(config);
    await client.connect();
    let result = await client.query(`INSERT INTO "USUARIO" (id, nombre, password, "Rol") VALUES ($1, $2, $3, $4)`, [userid, nombre, contraseñaHasheada, rol]);
    await client.end();
    return result;
}