import app from "./index.js";
import {connectToDB} from "./src/mongoDB/mongoDB.js";

app.listen(8080, ()=>{
    console.log("Server is listening on port 8080");
    connectToDB();
})