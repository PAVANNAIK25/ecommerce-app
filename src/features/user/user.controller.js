import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';


export default class UserController {

    static signUp(req, res) {
        const { name, email, password, type } = req.body;
        const user = UserModel.signUp(name, email, password, type);
        res.status(201).send(user);
    }

    static signIn(req, res) {
        const { email, password } = req.body;
        const user = UserModel.signIn(email, password);
        if (!user) {
            res.status(400).send("Invalid Credentials");
        } else {
            const token = jwt.sign({ user: user.email, id: user.id }, 'qxtNigEnO0aqLLfVayXRFU9yQBmcYMVK', { algorithm: "HS256", expiresIn: "1h" });
            res.status(200).send(token);
        }
    }


}