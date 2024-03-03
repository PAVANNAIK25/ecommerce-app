import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongoDB.js"


export default class CartItemsRepository {
    constructor() {
        this.collectionName = "cart";
    }


    async add(productId, userId, quantity) {
        try {
            const db = getDb();
            const collection = db.collection(this.collectionName);

            //getting ID
            const id = await this.getNextCounter(db);
            await collection.updateOne({ productId: new ObjectId(productId), userId: new ObjectId(userId) },
                { $setOnInsert: { _id: id }, $inc: { quantity: quantity } }, { upsert: true });
            // await collection.insertOne({productId: new ObjectId(productId), userId: new ObjectId(userId), quantity});
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }

    }

    async get(userId) {
        try {
            const db = getDb();
            const collection = db.collection(this.collectionName);
            const cart = await collection.find({ userId: new ObjectId(userId) }).toArray();
            return cart;

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }
    }

    async delete(cartId, userId) {
        try {
            const db = getDb();
            const collection = db.collection(this.collectionName);
            await collection.deleteOne({ _id: Number(cartId), userId: new ObjectId(userId) });
            await db.collection("counters").updateOne({ _id: 'cartItemsId' }, { $inc: { value: -1 } });

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Database", 500);
        }
    }


    async getNextCounter(db) {
        const resultDocument = await db.collection("counters").findOneAndUpdate({ _id: 'cartItemsId' }, { $inc: { value: 1 } }, { returnDocument: 'after' });
        return resultDocument.value;
    }


}