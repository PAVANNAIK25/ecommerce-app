
import express from "express";
import CartItemsController from "./cartItems.controller.js";

const cartRouter = express.Router();
const cartItemsController = new CartItemsController();
//add and update items to cart
cartRouter.post("/", (req, res, next)=>{
    cartItemsController.addCartItems(req, res, next);
});
cartRouter.get("/", (req, res, next)=>{
    cartItemsController.getCartItems(req, res, next);
});
cartRouter.delete("/:id", (req, res, next)=>{
    cartItemsController.deleteCartItem(req, res, next);
});

export default cartRouter;
