
import express from "express";
import CartItemsController from "./cartItems.controller.js";

const cartRouter = express.Router();

cartRouter.post("/", CartItemsController.addCartItems);
cartRouter.get("/", CartItemsController.getCartItems);
cartRouter.put("/", CartItemsController.updateCart);
cartRouter.delete("/:id", CartItemsController.deleteCart);

export default cartRouter;
