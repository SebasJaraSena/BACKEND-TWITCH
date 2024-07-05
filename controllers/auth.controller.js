import { query,validationResult } from "express-validator";

export const register = (req, res)=>{
    //en req esta interceptando lo que trae el usuario 
    const errors =validationResult(req);

    if(!errors.isEmpty()){
        return res.status (400).json({errors: errors.array});
        return res.send(`Hello, ${req.query.person}!`);
    }


    console.log(req.body);
    res.json({ok: "register"});
}
export const login = (req, res)=>{
    console.log(req.body);
    res.json({ok: "login"});
}