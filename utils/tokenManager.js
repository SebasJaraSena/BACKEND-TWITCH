import jwt from "jsonwebtoken";
export const  generarToken = (uid) =>{
    try{
        const  expiresIn= 60 * 15 //tiempo de expiracion del token 
        const token = jwt.sign({uid}, process.env.JWT_SECRET, { expiresIn} )//trae el token.env y se envia su expiracion 
        return {token, expiresIn}
    }catch(error){
        console.log(error)
    }
}