import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import swagger from 'swagger-ui-express';
import cors from "cors";

import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import { basicAuth } from "./src/middlewares/basicAuth.middleware.js";
import { jwtAuth } from "./src/middlewares/jwtAuth.middleware.js";
import cartRouter from "./src/features/cart/cartItems.routes.js"
import document from "./swagger.json" assert {type: "json"};
import loggerMiddleware, { logger } from './src/middlewares/logger.middleware.js'
import ApplicationError from "./src/Error Handling/applicationError.js";
import orderRoutes from './src/features/order/order.routes.js';
import likesRouter from './src/features/likes/likes.routes.js';


const app = express();
// CORS Policy, defining allowed origins and headers

// using external middleware
// app.use(cors());

// manually defining the policy middleware
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
app.use("/api/orders", jwtAuth, orderRoutes);
app.use("/api/likes", jwtAuth, likesRouter);


app.get("/", (req, res) => {
    res.send("Hello World");
})

//Application level error handling

app.use((err, req, res, next)=>{
    if(err instanceof ApplicationError){
        logger.error(err.message);
        return res.status(err.code).send(err.message);
    }
        logger.error(err.message);
    res.status(500).send("Something went wrong");

})

app.use((req, res)=> {
    res.status(404).send("API not found. Please use the http://localhost:8080/api-docs/ to get more information");
})

export default app;

