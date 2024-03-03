import CartItemsModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.repository.js"

export default class CartItemsController {

    constructor() {
        this.cartItemsRepository = new CartItemsRepository();
    }

    async addCartItems(req, res, next) {
        try {
            const { productId, quantity } = req.body;
            const userId = req.body.id;
            await this.cartItemsRepository.add(productId, userId, quantity);
            return res.status(201).send("Cart has been updated successfully!");
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async getCartItems(req, res, next) {
        try {
            const userId = req.body.id;
            const cartItem = await this.cartItemsRepository.get(userId);
            return res.status(200).send(cartItem);
        } catch (err) {
            console.log(err);
            next(err);
        }

    }

    async deleteCartItem(req, res) {
        try {

            const userId = req.body.id;
            const cartId = req.params.id;
            await this.cartItemsRepository.delete(cartId, userId);
            return res.status(200).send("CartItem deleted successfully");

        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }

    }
}