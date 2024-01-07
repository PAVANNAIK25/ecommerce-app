import express from "express";
import swagger from 'swagger-ui-express';
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import { basicAuth } from "./src/middlewares/basicAuth.middleware.js";
import { jwtAuth } from "./src/middlewares/jwtAuth.middleware.js";
import cartRouter from "./src/features/cart/cartItems.routes.js"
import document from "./swagger.json" assert {type: "json"};

const app = express();
app.use(express.json());

//using routes to redirect to specific featur routes

app.use("/api-docs", swagger.serve, swagger.setup(document));
app.use("/api/products", jwtAuth, productRouter);
app.use("/api/cartitmes", jwtAuth, cartRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
})

export default app;

