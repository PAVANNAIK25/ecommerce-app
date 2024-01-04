import jwt from "jsonwebtoken";

export const jwtAuth = (req, res, next)=>{

    // 1. req.header for authorization

    const authHeader = req.headers['authorization'];

    // 2. check if no token available in authorization
    if(!authHeader){
        return res.status(401).send("Unauthorized");
    }

    // 3. check if token is valid or errors

    try{
       const payload = jwt.verify(authHeader, 'qxtNigEnO0aqLLfVayXRFU9yQBmcYMVK');
       console.log(payload);
    }catch(err){
        console.log(err);
    }  
    
    next();

}