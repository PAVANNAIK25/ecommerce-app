import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    sizes: [String],
    stock: Number,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reviews'

    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
})