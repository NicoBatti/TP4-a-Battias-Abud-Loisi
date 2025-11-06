import Escucha from "../models/escucha.js";

export const grabarEscucha = async (cancionId, userId) => {
	console.log(userId);
	try {
		const nueva = await Escucha.create({
			CancionID: cancionId,
			UsuarioID: userId,
			fechaEscucha: new Date(),
		});
		return nueva;
	} catch (error) {
		throw new Error("Error en la base de datos " + error.message);
	}
};