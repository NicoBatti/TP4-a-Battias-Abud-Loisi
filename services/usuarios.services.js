import { sequelize } from "../dbconfig.js";
import { DataTypes } from "sequelize";

const Usuario = sequelize.define("Usuario", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    nombre: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    Rol: { type: DataTypes.STRING },
}, { tableName: "USUARIO", timestamps: false });

export const crearUsuario = async (id, nombre, contraseñaHasheada, Rol) => {
    try {
        await Usuario.create({ id, nombre, password: contraseñaHasheada, Rol });
        return { success: true };
    } catch (error) {
        throw new Error("Error en la base de datos: " + error.message);
    }
};

export const login = async (user) => {
    try {
        const result = await Usuario.findOne({ where: { id: user.userid } });
        return result;
    } catch (error) {
        throw new Error("Error en la base de datos: " + error.message);
    }
};