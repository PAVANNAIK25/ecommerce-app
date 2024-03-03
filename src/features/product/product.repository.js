import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongoDB.js";
import { reviewModel } from "./review.Schema.js";
import { productSchema } from "./product.schema.js";
import ApplicationError from "../../Error Handling/applicationError.js"
import { CategoryModel } from "./category.schema.js";


const productModel = mongoose.model('products', productSchema);


class ProductRepository {

    constructor() {
        this.collection = 'products';
    }

    async addProduct(productData) {
        try {
            // const db = getDb();
            // const collection = db.collection(this.collection);
            // await collection.insertOne(newProduct);
            // return newProduct;

            // 1. Adding new Product
            const newProduct = new productModel(productData);
            const savedProduct = await newProduct.save();

            // 2. update categories

            await CategoryModel.updateMany(
                { _id: { $in: productData.categories } },
                { $push: { products: new ObjectId(savedProduct._id) } }
            );


        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }
    }

    // async updateProduct(productId){
    //     try{
    //         const db = getDb();
    //         const collection = db.collection(this.collection);
    //         await collection.updateOne({_id: new ObjectId(productId), userId: new ObjectId(userId)},
    //             {$set: {name:$name, }}
    //         );

    //     } catch (err) {
    //         console.log(err);
    //         throw new ApplicationError("Something went wrong with Database", 500);
    //     }
    // }

    async getAll() {
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            return await collection.find().toArray();
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }
    }

    async get(id) {
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            return await collection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.log(err)
            throw new ApplicationError("Something went wrong with Database", 500);
        }
    }

    async filter(minPrice, maxPrice, category) {
        try {
            const db = getDb();
            const collection = db.collection(this.collection);

            let filterOptions = {};

            if (minPrice) {
                filterOptions.price = { $gte: parseFloat(minPrice) }
            }

            if (maxPrice) {
                filterOptions.price = { ...filterOptions.price, $lte: parseFloat(maxPrice) }
            }

            if (category) {
                filterOptions.category = category;
            }

            const result = await collection.find(filterOptions).toArray();

            return result;


        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }
    }

    // async rateProduct(userId, productId, rating) {
    //     try {
    //         const db = getDb();
    //         const collection = db.collection(this.collection);

    //         //Approach 2

    //         await collection.updateOne({ _id: new ObjectId(productId) },
    //             { $pull: { ratings: { userId: new ObjectId(userId) } } }
    //         )

    //         await collection.updateOne({ _id: new ObjectId(productId) }, {
    //             $set: {
    //                 "ratings": [
    //                     {
    //                         "userId": userId,
    //                         "rating": rating
    //                     }
    //                 ]
    //             }
    //         })



    //         /* Approach 1 finding the rating and updating it

    //         const product = await collection.findOne({_id: new ObjectId(productId)});
    //         const userRating = product?.rating?.find(r => r.userId == userId);
    //         if(userRating){
    //             await collection.updateOne({_id: new ObjectId(productId), "rating.userId": new ObjectId(userId)}, {
    //                 $set: {
    //                     "ratings.$.rating":rating
    //                 }
    //             })
    //         }else{
    //             await collection.updateOne({_id: new ObjectId(productId)}, {
    //                 $set:{
    //                     "rating":{
    //                         "userId": userId,
    //                         "rating": rating
    //                     }
    //                 }
    //             })
    //         } */

    //     } catch (err) {
    //         console.log(err);
    //         throw new ApplicationError("Something went wrong with Database", 500);
    //     }

    // }

    async rateProduct(userId, productId, rating) {
        try {
            const product = await productModel.findById(productId);
            if (!product) {
                throw new Error("Product not found");
            }

            const userReview = await reviewModel.findOne({ user: new ObjectId(userId), product: new ObjectId(productId) });
            // updating reviews collections
            if (userReview) {
                userReview.rating = rating;
                reviewToSave = await userReview.save();
            } else {
                const newReview = new reviewModel({
                    product: new ObjectId(productId),
                    user: new ObjectId(userId),
                    rating: rating
                })
                const reviewToSave = await newReview.save();

                // updating product repository
                if (!product.reviews || product.reviews.length == 0) {
                    await productModel.updateOne({_id: new ObjectId(productId)}, {
                        $set:{
                            reviews: reviewToSave._id
                        }
                    });
                } else {
                    product.reviews.push(reviewToSave._id);
                    await product.save();
                    console.log(product.reviews);
                }
            }

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }

    }

    async averagePrice() {
        try {
            const avgPrice = await productModel.aggregate([
                {

                    $group: {
                        _id: "$category",
                        "averagePrice": {
                            $avg: "$price"
                        }
                    }
                }])
            return avgPrice;

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }
    }


}

export default ProductRepository;