import { getDb } from "../../mongoDB/mongoDB.js";

export default class UserRepository{
    
    async signUp(newUser){
        try{
            const db = getDb();
            const collection = db.collection("users");
            await collection.insertOne(newUser);    
            return newUser;
        }catch(err){

        }
    }

    async signIn(email, password){
        try{
            const db = getDb();
            const collection = db.collection("users");
            return await collection.findOne({email, password});

        }catch(err){
            throw new Error(err.message);
        }
    }

}