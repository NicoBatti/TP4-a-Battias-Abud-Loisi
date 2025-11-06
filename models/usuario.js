import { DataTypes } from "sequelize";
import { sequelize } from "../dbconfig.js";

const Usuario = sequelize.define(
	"Usuario",
	{
		UsuarioID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		// ...otros campos del usuario (opcional)...
		Nombre: { type: DataTypes.STRING },
	},
	{ tableName: "USUARIO", timestamps: false }
);

export default Usuario;
