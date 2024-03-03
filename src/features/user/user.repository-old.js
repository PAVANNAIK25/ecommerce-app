import ApplicationError from "../../Error Handling/applicationError.js";
import { getDb } from "../../config/mongoDB.js";

export default class UserRepository {

    constructor(){
        this.collection = 'users';
    }

    async signUp(newUser) {
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            const existingUser = await collection.findOne({email: newUser.email});
            if(existingUser){
                return "User already exist in system";
            }else{
                await collection.insertOne(newUser);
                const {password, ...other} = newUser;
                const userClone = {...other};
                return userClone;

            }

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }
    }

    async signIn(email, password) {
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            return await collection.findOne({ email, password });

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }
    }

    async findByEmail(email) {
        try {
            const db = getDb();
            const collection = db.collection("users");
            return await collection.findOne({ email});

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }
    }

}