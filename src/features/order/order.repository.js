import { ObjectId } from "mongodb";
import { getClient, getDb } from "../../config/mongoDB.js";
import ApplicationError from "../../Error Handling/applicationError.js"
import OrderModel from "./order.model.js";


export default class OrderRepository {

    constructor() {
        this.collectionName = "orders";
    }

    async placeOrder(userId) {
        const db = getDb();
        const client = getClient();
        const session = client.startSession();
        try {
            session.startTransaction();
            //step 1: Get the cartItems and calculate totalAmount
            const items = await this.calculateTotalAmount(userId, { session });
            if(items.length==0){
                throw new Error("cart is empty");
            }
            const finalAmount = items.reduce((acc, item) => (acc + item.totalAmount), 0);

            // step 2: Create an order record
            const newOrder = new OrderModel(new ObjectId(userId), finalAmount, new Date());
            await db.collection(this.collectionName).insertOne(newOrder, { session });

            // step 3: Reduce the stock

            for (let item of items) {
                await db.collection('products').updateOne(
                    { _id: new ObjectId(item.productId) },
                    {
                        $inc: {
                            "stock": -item.quantity
                        }
                    },
                    { session }
                );
            }

            // step 4: Clear the cart items
            await db.collection('cart').deleteMany({ userId: new ObjectId(userId) }, { session });

            await session.commitTransaction();

        } catch (err) {
            await session.abortTransaction();
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);

        } finally {
            await session.endSession();
        }

    }

    async calculateTotalAmount(userId) {
        const db = getDb();
        const resultArray = await db.collection('cart').aggregate([

            //1. Match the cart with userId
            
            {
                $match: { userId: new ObjectId(userId) }
            },

            //2. Get the products information from 
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "orderProducts"
                }
            },
            // 3. unwind the orderProducts Array

            {
                $unwind: "$orderProducts"
            },

            //4. group the products to calculate totalAmount

            {
                $addFields: {
                    "totalAmount": {
                        $multiply: ["$quantity", "$orderProducts.price"]
                    }
                }
            }

        ]).toArray();

        return resultArray;
    }

}