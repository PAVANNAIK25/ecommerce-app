import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';

export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(req, res, next) {
        try {
            const { name, email, type } = req.body;
            const encryptedPassword = await bcrypt.hash(req.body.password, 12);
            const user = new UserModel(name, email, encryptedPassword, type);
            const result = await this.userRepository.signUp(user);
            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }

    }

    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                return res.status(400).send("Invalid Credentials");
            } else {
                const result = bcrypt.compare(password, user.password);

                if (result) {
                    const token = jwt.sign({ user: user.email, id: user._id }, process.env.SIGN_IN_JWT, { algorithm: "HS256", expiresIn: "1d" });
                    res.status(200).send(token);
                } else {
                    return res.status(400).send("Invalid Credentials");
                }

            }

        } catch (err) {
            next(err);
        }
    }


}