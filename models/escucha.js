import { DataTypes } from "sequelize";
import { sequelize } from "../dbconfig.js";

const Escucha = sequelize.define(
	"Escucha",
	{
		ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		UsuarioID: { type: DataTypes.INTEGER, allowNull: false },
		CancionID: { type: DataTypes.INTEGER, allowNull: false },
		fechaEscucha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
	},
	{ tableName: "ESCUCHA", timestamps: false }
);

export default Escucha;
