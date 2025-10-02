import {config} from './dbconfig.js'
import express from "express";
import 'dotenv/config'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import {verifyToken} from "./middlewares/verifyToken.js"

import pkg from 'pg'
import { verifyAdmin } from './middlewares/verifyAdmin.js';
const {Client} = pkg;

const app = express() //Instancia / objeto al que se hara referencia para hacer TODO.
app.use(express.json()) //Traduce las cosas que llegan en el body a un formato .json interpretable por js
const PORT = 8000 //se define el puerto de escucha


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
})

app.get('/pruebaToken', verifyToken, verifyAdmin,(req, res)=>{
  res.json({ 
        message: "✅ Token válido. ¡Acceso concedido!",
        user: req.user // Muestra el payload adjunto por el middleware
    });
    
})
//GET a todas las tablas:
app.get('/canciones', async (req, res) => {
  const client = new Client(config);
  await client.connect();
  let result = await client.query('select * from "CANCION"');
  await client.end();
  console.log(result.rows);
  res.send(result.rows)

})

app.post('/crearusuario', async (req, res) => {
  const userid = req.body.userid;
  const nombre = req.body.nombre;
  const password = req.body.password;
  const rol = req.body.Rol;
  console.log(`Rol equivale a: `, rol)
  const contraseñaHasheada = await bcrypt.hash(password, 10)
  const client = new Client(config);
  await client.connect();
  let result = await client.query(`INSERT INTO "USUARIO" (id, nombre, password, "Rol") VALUES ($1, $2, $3, $4)`, [userid, nombre, contraseñaHasheada, rol]);
  await client.end();
  res.send(`Registro Existoso ${rol}`);

})

app.post('/login', async (req, res) => {
    const secretKey = process.env.SECRETKEY
    const user = req.body;
    if (!user.userid || !user.password) {
        return res.status(400).json({ message: "Debe completar todos los campos" });
    }
    try {
        const client = new Client(config);
        await client.connect();
        let result = await client.query(`select * from "USUARIO" where id=$1`,[user.userid]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
          }
        await client.end();
        let dbUser = result.rows[0];
        const passOK = await bcrypt.compare(user.password, dbUser.password);
        if (passOK) {
            const payload = { userid: user.userid };
            const options = { expiresIn: '1h' }; // Expirará en 1 hora. 60
            const token = jwt.sign(payload, secretKey, options);
            res.send({nombre: dbUser.nombre, token: token})
        } else {
            res.send("Clave invalida")
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

app.get('/escucho', async (req, res) => {
  const secretKey = process.env.SECRETKEY
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: "Falta token" });
  }
  const token = authHeader.split(" ")[1];
  let payload;
  try {
    // Verifica y decodifica
    payload = jwt.verify(token, secretKey);
    console.log("Payload:", payload);

//    res.json({ message: "Token válido", payload });
// Por si el token no coincide
  } catch (err) {
    res.status(403).json({ message: "Token inválido" });
  }
  const client = new Client(config);
  await client.connect();
  let result = await client.query('select E."Reproducciones", C.nombre from "ESCUCHA" E inner join "CANCION" C on E."CancionID" = C.id WHERE E."UsuarioID" = $1', [payload.userid]);

  await client.end();
  //console.log(result.rows);
  res.send(result.rows)

})

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})