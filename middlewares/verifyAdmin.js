import {config} from '../dbconfig.js'
import 'dotenv/config'
import pkg from 'pg'
const {Client} = pkg;

export async function verifyAdmin(req, res, next){
    try{
        const client = new Client(config);
        const userid = req.body.user;
        await client.connect();
        let result = await client.query('SELECT "Rol" FROM "USUARIO" WHERE id = $1', [userid])
        await client.end();
        result = result.rows[0].Rol;
        console.log(result);
        
        if (result != "Admin"){
            throw new Error('No sos admin pa');
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(412).json({ message: error.message });
    }
    
}