import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { generarToken } from "../utils/tokenManager.js";

export const register = async(req, res)=>{
    /*console.log(req.body);
     res.json({ok: "register"}); */
    //viene con todas las validaciones
     const {email, password}= req.body
     //revisar si un usuario ya esta registrado
     try{
        //alternativa buscando email
        let user = await User.findOne({email})
        if(user) throw {code: 11000};

            user = new User({email, password})
            await user.save()

        //Generar token jwt  

        return res.status(201).json({ok: true})
    }catch(error){
        console.log(error.code);
        //Alternativa por defecto moongose 
   if(error.code === 11000){
    return res.status (400).json({error: ' Ya existe este usuario'})
   }
   return res.status(500).json({error: "error de servidor "})
    }
}
export const login = async(req, res)=>{
    try{
        const {email, password}= req.body;

        //buscar al usuario por correo electronico
        let user =await  User.findOne({email})
        //si no existe el usuario
        if(!user) 
            return res.status (403).json({error: 'No existe este usuario'});

        const respuetaPassword= await user.comparePassword(password)
        if(!respuetaPassword)
            return res.status (403).json({error: 'Contraseña incorrecta'})

        //const token = jwt.sign({uid: user._id}, process.env.JWT_SECRET)//token establecido 
        //Generar el token jwt
        const {token,expiresIn} = generarToken(user.id)
        return res.json({token,expiresIn});

    }catch(error){
        console.log(error);
        return res.status(500).json({error: "error de servidor "})

    }
};

//ejemplo 
export const infoUser = async ( req, res ) => {
    try {
        const user = await User.findById(req.uid).lean()
        return res.json({ email: user.email, uid: user.id});   
    } catch (error) {
        return res.status(500).json({error: "error de server"})
    }
};

