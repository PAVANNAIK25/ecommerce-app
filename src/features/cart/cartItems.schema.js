import mongoose, { Schema } from "mongoose";

export const cartSchema = new Schema({
    productId: {type:mongoose.Schema.Types.ObjectId, ref: 'produtcts'},
    userId: {type:mongoose.Schema.Types.ObjectId, ref: 'users'},
})

