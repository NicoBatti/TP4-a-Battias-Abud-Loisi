import { sequelize } from "../dbconfig.js";
import { DataTypes } from "sequelize";

const Cancion = sequelize.define("Cancion", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    nombre: { type: DataTypes.STRING },
}, { tableName: "CANCION", timestamps: false });

export const canciones = async () => {
    try {
        const result = await Cancion.findAll();
        return result;
    } catch (error) {
        throw new Error("Hubo un error en la base de datos: " + error.message);
    }
};

export const agregarCancion = async (nombre) => {
    try {
        const result = await Cancion.create({ nombre });
        return result;
    } catch (error) {
        throw new Error("Hubo un error en la base de datos: " + error.message);
    }
};

export const putCancion = async (idCancion, nuevosDatos) => {
    try {
        const result = await Cancion.update({ nombre: nuevosDatos.nombre }, { where: { id: idCancion } });
        return result;
    } catch (error) {
        throw new Error("Error en base de datos: " + error.message);
    }
};

export const deleteCancion = async (idCancion) => {
    try {
        const result = await Cancion.destroy({ where: { id: idCancion } });
        return result;
    } catch (error) {
        throw new Error("Error en base de datos: " + error.message);
    }
};