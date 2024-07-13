import express from 'express'
import { infoUser, login, register } from '../controllers/auth.controller.js';
import {body} from 'express-validator';
import {validationResultExpress} from '../middlewares/validationResultExpress.js';
import { requireToken } from '../middlewares/requireToken.js';

const router = express.Router();

router.post ("/register",[
    body('email', "formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body('password', "formato de password incorrecta")
    .trim()
    .isLength({min:6})
    .custom((value, {req})=>{
        if(value !== req.body.repassword){
            throw new error ('No coinciden las contraseñas')
        }
        return value  
        }),
], 
validationResultExpress,
register
);
router.post ("/login", [
    body("email", "formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
body('password', "minimo 6 caracteres")
    .trim()
    .isLength({ min : 6 }),
],
validationResultExpress,
login
);  

router.get("/protected", requireToken, infoUser);

export default router;