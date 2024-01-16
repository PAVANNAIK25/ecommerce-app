import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js";

export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(req, res, next) {
        try {
            const { name, email, password, type } = req.body;
            const user = new UserModel(name, email, password, type);
            await this.userRepository.signUp(user);
            res.status(201).send(user);
        } catch (error) {
            next(error);
        }

    }

    async signIn(req, res, next) {
        try{
            const { email, password } = req.body;
            const user = await this.userRepository.signIn(email, password);
            if (!user) {
                return res.status(400).send("Invalid Credentials");
            } else {
                const token = jwt.sign({ user: user.email, id: user.id }, 'qxtNigEnO0aqLLfVayXRFU9yQBmcYMVK', { algorithm: "HS256", expiresIn: "1h" });
                res.status(200).send(token);
            }
        }catch(err){
            next(err);
        }
    }


}