import jwt from 'jsonwebtoken'; 
export const requireToken = ( req, res, next) => {
    try {
        let token = req.headers?.authorization
        if(!token) throw new Error ('No existe el token en el header usa bearer')

        token = token.split(" ")[1]
        const {uid}=  jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid;
        /* console.log(payload); */

        next();
    } catch (error) {
        console.log(error.message);

        const TokenVerificationErrors = {
            "invalid signature":"la firma del jwt no es valida", 
            "jwt expired":"JWT expirado", 
            "invalid token ":"token no valido", 
            "No Bearer":"Utiliza formato Bearer", 

        }
        return res.status(401).json({error: TokenVerificationErrors[error.message]});
    }
} 