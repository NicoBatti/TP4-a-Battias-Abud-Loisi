import {Datatypes, Model} from "sequelize";
import {sequelize} from "../dbconfig.js";
export class Escucha extends Model {}
Escucha.init(
    {
        id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        UsuarioID: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        CancionID: {
            type: Datatypes.INTEGER,
            allowNull: false,
        },
        FechaEscucha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Asigna la fecha y hora actuales al crear
        },
    },
    {
        sequelize,
        modelName: "Escucha",
        tableName: "Escucha",
    }
)
