import mongoose from "mongoose";


export const likesSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        refPath: 'on_Model'
    },
    on_Model:{
        type: String,
        enum:['Category', 'Products']
    }
})