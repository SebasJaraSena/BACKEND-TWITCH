import bcryptjs from 'bcryptjs';
import mongoose from "mongoose";
const {Schema, model} = mongoose;


const usershema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
});

usershema.pre("save", async function(next){
    //hace el llamado al schema del user
    const user = this 

    if(!user.isModified('password')) return next()

 try{
    //hash la contraseña  y le dan un tamaño de salto 
    const salt= await bcryptjs.genSalt(10)
    //trae la contraseña y la hash 
    user.password = await bcryptjs.hash(user.password, salt)
    next()
 }catch(error){
    console.log(error) 
    throw new error("fallo el hash de contraseña");
 }
})

export const User = mongoose.model('User',usershema)