import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017/ecommerceDB";

let client;
export const connectToDB = ()=>{
    MongoClient.connect(url)
        .then((clientInstance)=>{
            client = clientInstance;
            console.log("application is connected to MongoDB");
        }).catch((err)=>{
            console.log(err.message);
        })
}

export const getDb = ()=>{
    return client.db();
}
