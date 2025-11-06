// export POSTGRES_HOST=ep-blue-feather-a4ve7rp2.us-east-1.aws.neon 
// export POSTGRES_USER=default
// export POSTGRES_PASSWORD=xxxxx
import 'dotenv/config'
import { Sequelize } from "sequelize";

// Ajusta las variables de entorno según tu entorno local
const sequelize = new Sequelize(
	process.env.DB_DATABASE || "your_db",
	process.env.DB_USER || "postgres",
	process.env.DB_PASSWORD || "password",
	{
		host: process.env.DB_HOST || "localhost",
		port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
		dialect: "postgres",
		logging: false,
	}
);

export { sequelize }

export const config = {
    host :process.env.PGHOST,
    database:process.env.PGDATABASE,
    user:process.env.PGUSER,
    password:process.env.PGPASSWORD,
    port:5432,
    ssl: {
        // En muchos casos, basta con poner 'true'
        // Pero para Neon, a veces es necesario especificar 'rejectUnauthorized: false'
        // si usas una conexión simple sin archivos de certificado locales.
        rejectUnauthorized: false
    }
}

try{
    await sequelize.authenticate();
    console.log("conectado y en su prime!");
}catch(error){
    console.log("Mal ahi bro: ", error);
}
await sequelize.close();