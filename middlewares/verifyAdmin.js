import { sequelize } from "../dbconfig.js";
import { DataTypes } from "sequelize";

const Usuario = sequelize.define("Usuario", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    Rol: { type: DataTypes.STRING },
}, { tableName: "USUARIO", timestamps: false });

export async function verifyAdmin(req, res, next) {
    try {
        const user = await Usuario.findOne({ where: { id: req.body.user } });
        if (!user || user.Rol !== "Admin") {
            throw new Error("No sos admin pa");
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(412).json({ message: error.message });
    }
}