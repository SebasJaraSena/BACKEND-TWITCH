import { User } from "../models/user.js";
export const register = async(req, res)=>{
    /*console.log(req.body);
     res.json({ok: "register"}); */
    //viene con todas las validaciones
     const {email, password}= req.body
     try{
        //alternativa uno
         /* let user = new User({email, password}) */


        //alternativa dos
        let user = await User.findOne({email})
        if(user) throw {code: 11000};

            user = new User({email, password})
            await user.save()
        


        //jwt token 
        return res.json({ok: true})
    }catch(error){
        console.log(error.code);
   if(error.code === 11000){
    return res.status (400).json({error: ' Ya existe este usuario'})
   }
    }
}
export const login = async(req, res)=>{
    console.log(req.body);
    res.json({ok: "Login"});
}