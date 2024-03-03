import jwt from "jsonwebtoken";
import ApplicationError from "../Error Handling/applicationError.js";

export const jwtAuth = (req, res, next)=>{

    // 1. req.header for authorization

    const authHeader = req.headers['authorization'];

    // 2. check if no token available in authorization
    if(!authHeader){
        return res.status(401).send("Unauthorized");
    }

    // 3. check if token is valid or errors
    try{
       const payload = jwt.verify(authHeader, process.env.SIGN_IN_JWT);
       req.body.id = payload.id;
       next();
    }catch(err){
        throw new ApplicationError("Jwt Expired", 400);
    }  
    

}