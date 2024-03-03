import { MongoClient } from "mongodb";

// const url = "mongodb://127.0.0.1:27017/ecommerceDB";

let client;
export const connectToDB = ()=>{
    MongoClient.connect(process.env.DB_URL)
        .then((clientInstance)=>{
            client = clientInstance;
            console.log("application is connected to MongoDB");
            createCounter(client.db());
        }).catch((err)=>{
            console.log(err.message);
        })
}

export const getDb = ()=>{
    return client.db('ecommerceDB');
}


export const getClient = ()=>{
    return client;
}

const createCounter = async (db)=>{
    const existingCounter = await db.collection('counters').findOne({_id: 'cartItemsId'});
    if(!existingCounter){
        await db.collection('counters').insertOne({_id: 'cartItemsId', value: 0});
    }
}
