import mongoose from "mongoose";
import { CategoryModel } from "../features/product/category.schema.js";

export const connectToDBUsingMongoose = async () =>{
    try{
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
        console.log("MongoDB connected using Mongoose");
        await addCategory();
    }catch(err){
        console.log(err);
    }
}

async function addCategory(){
    const categories = await CategoryModel.find();
    if(!categories || await categories.length==0){
        await CategoryModel.insertMany([{name:"Electronics"}, {name:"Clothing"}, {name:"Books"}]);
    }
    console.log("Categories added");

}