import { DataTypes } from "sequelize";
import { sequelize } from "../dbconfig.js";

const Cancion = sequelize.define(
	"Cancion",
	{
		CancionID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		// ...otros campos de la canción (opcional)...
		Titulo: { type: DataTypes.STRING },
	},
	{ tableName: "CANCION", timestamps: false }
);

export default Cancion;
