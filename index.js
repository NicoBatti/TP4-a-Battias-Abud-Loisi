import express from "express";
import 'dotenv/config'
import usuariosRouter from './routes/usuarios.routes.js';
import escuchaRouter from './routes/escucha.routes.js';
import cancionesRouter from './routes/canciones.routes.js'
import { sequelize } from "./dbconfig.js";
import Usuario from "./models/usuario.js";
import Cancion from "./models/cancion.js";
import Escucha from "./models/escucha.js";

const app = express() //Instancia / objeto al que se hara referencia para hacer TODO.

app.use(express.json()) //Traduce las cosas que llegan en el body a un formato .json interpretable por js

const PORT = 8000 //se define el puerto de escucha


app.get('/', (req, res) => {
    res.send(`Ejecutando get!`)
})

app.get('/about', (req, res) => {
    res.send('About route 🎉 ')
})


app.use('/usuarios', usuariosRouter)

app.use('/escucha', escuchaRouter)

app.use('/canciones', cancionesRouter)

// Relaciones
Usuario.hasMany(Escucha, { foreignKey: "UsuarioID" });
Cancion.hasMany(Escucha, { foreignKey: "CancionID" });
Escucha.belongsTo(Usuario, { foreignKey: "UsuarioID" });
Escucha.belongsTo(Cancion, { foreignKey: "CancionID" });

// Sincronizar modelos con la base de datos
(async () => {
	try {
		await sequelize.authenticate();
		// Usar { alter: true } solo si quieres que Sequelize intente adaptar tablas (riesgos en producción)
		await sequelize.sync();
		console.log("Sequelize: conexión y sincronización OK");
	} catch (err) {
		console.error("Sequelize error:", err);
	}
})();

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
})