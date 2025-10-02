import {config} from './dbconfig.js'
import express from "express";
import 'dotenv/config'
import usuariosRouter from './routes/usuarios.routes.js';
import escuchaRouter from './routes/escucha.routes.js';
import cancionesRouter from './routes/canciones.routes.js'

const app = express() //Instancia / objeto al que se hara referencia para hacer TODO.

app.use(express.json()) //Traduce las cosas que llegan en el body a un formato .json interpretable por js

const PORT = 8000 //se define el puerto de escucha


app.get('/', (req, res) => {
    res.send(`Ejecutando get!`)
})

app.get('/about', (req, res) => {
    res.send('About route 🎉 ')
})

//USUARIOS ✅
app.use('/usuarios', usuariosRouter)
//ESCUCHA ✅
app.use('/escucha', escuchaRouter)

app.use('/canciones', cancionesRouter)


app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
})