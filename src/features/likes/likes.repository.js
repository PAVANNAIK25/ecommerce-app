import mongoose from "mongoose";
import ApplicationError from "../../Error Handling/applicationError.js";
import { likesSchema } from "./likes.schema.js";
import { ObjectId } from "mongodb";

const likeModel = mongoose.model('Likes', likesSchema)
export default class LikesRepository{

    async getLikes(typeId, type){
        try{

            return await likeModel.find({
                likeable: new ObjectId(typeId),
                on_Model: type
            }).populate({path: 'likeable', model: type})

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }
    }

    async likeProduct(userId, productId){
        try{
            
            const newLike = new likeModel({user: new ObjectId(userId), likeable: new ObjectId(productId), on_Model: 'Products'});
            await newLike.save();

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }

    }

    async likeCategory(userId, categoryId){
        try{
            
            const newLike = new likeModel({user: new ObjectId(userId), likeable: new ObjectId(categoryId), on_Model: 'Category'});
            await newLike.save();

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }

    }

}