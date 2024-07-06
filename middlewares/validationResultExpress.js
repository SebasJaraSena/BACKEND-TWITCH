import { validationResult } from "express-validator";
//en req esta interceptando lo que trae el usuario 
export const validationResultExpress= ( req , res ,next) => {
    const errors =validationResult(req);

    if(!errors.isEmpty()){
        return res.status (400).json({errors: errors.array()});
        
    }

    next ();
}