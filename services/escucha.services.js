import { sequelize } from "../dbconfig.js";
import { DataTypes } from "sequelize";

const Escucha = sequelize.define("Escucha", {
    UsuarioID: { type: DataTypes.INTEGER },
    CancionID: { type: DataTypes.INTEGER },
    Reproducciones: { type: DataTypes.INTEGER },
}, { tableName: "ESCUCHA", timestamps: false });

export const grabarEscucha = async (cancionId, userId) => {
    try {
        const result = await Escucha.create({ UsuarioID: userId, CancionID: cancionId, Reproducciones: 1 });
        return result;
    } catch (error) {
        throw new Error("Error en la base de datos " + error.message);
    }
};