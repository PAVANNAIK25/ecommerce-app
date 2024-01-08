import express from "express";
import swagger from 'swagger-ui-express';
import cors from "cors";

import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import { basicAuth } from "./src/middlewares/basicAuth.middleware.js";
import { jwtAuth } from "./src/middlewares/jwtAuth.middleware.js";
import cartRouter from "./src/features/cart/cartItems.routes.js"
import document from "./swagger.json" assert {type: "json"};
import loggerMiddleware from './src/middlewares/logger.middleware.js'


const app = express();

// app.use(cors());
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin' , 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Headers' , '*');
    res.header('Access-Control-Allow-Methods' , '*');
    if(req.method=="OPTIONS"){
        return res.sendStatus(200);
    }
    next();
})

app.use(express.json());
app.use(loggerMiddleware);

//using routes to redirect to specific featur routes

app.use("/api-docs", swagger.serve, swagger.setup(document));
app.use("/api/products", jwtAuth, productRouter);
app.use("/api/cartitmes", jwtAuth, cartRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use((req, res)=> {
    res.status(404).send("API not found. Please use the http://localhost:8080/api-docs/ to get more information");
})

export default app;

