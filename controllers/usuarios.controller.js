import usuariosService from "../services/usuarios.services.js"

const crearUsuario = async (req,res) => {
    //funcionalidad REST TODO: chequear lo que meti aca adentro
    const userid = req.body.userid;
    const nombre = req.body.nombre;
    const password = req.body.password;
    const rol = req.body.Rol;
    console.log(`Rol equivale a: `, rol)
    const contraseñaHasheada = await bcrypt.hash(password, 10)
}

const login = async (req,res) => {
    //funcionalidad REST
    
}