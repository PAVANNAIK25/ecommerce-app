import UserModel from "../features/user/user.model.js";


export const basicAuth = (req, res, next)=>{

    // 1. check the authentication headers
    const authHeader = req.headers["authorization"];

    if(!authHeader){
        return res.status(404).send("No authentication headers found");
    }

    //2. get data from the req body

    const base64Cred = authHeader.replace("Basic ", '');

    // 3. decode the credentials

    const decodecreds = Buffer.from(base64Cred, 'base64').toString('utf-8');

    // 4. get crendentials in array

    const creds = decodecreds.split(":");

    // 5. check the login and password

    const user = UserModel.getAll().find((u)=> u.email==creds[0] && u.password==creds[1]);

    if(!user){
        res.status(401).send("Invalid Credentials");
    }else{
        next();
    }

}