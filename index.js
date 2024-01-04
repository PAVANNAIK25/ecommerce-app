import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import bodyParser from "body-parser";
import { basicAuth } from "./src/middlewares/basicAuth.middleware.js";
import { jwtAuth } from "./src/middlewares/jwtAuth.middleware.js";

const app = express();

app.use(bodyParser.json());

//using routes to redirect to specific featur routes
app.use("/api/products", jwtAuth, productRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
})

export default app;

