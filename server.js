import app from "./index.js";
import {connectToDB} from "./src/config/mongoDB.js";
import { connectToDBUsingMongoose } from "./src/config/mongooseConfig.js";

app.listen(8080, ()=>{
    console.log("Server is listening on port 8080");
  //  connectToDB();

  connectToDBUsingMongoose();
})