import mongoose from "mongoose";
import { userModel } from "./user.schema.js";
import ApplicationError from "../../Error Handling/applicationError.js";

export default class UserRepository{

    async signUp(user){
        try{
            const newUser = new userModel(user);
            await newUser.save();
            return newUser;
        }catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }
    }

    async signIn(email, password){
        try{
            await userModel.findOne(email, password);

        }catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }
    }

    async findByEmail(email){
        try{
            return await userModel.findOne({email: email});
            

        }catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }
    }

}