import CartItemsModel from "./cartItems.model.js";

export default class CartItemsController{

    static addCartItems(req, res) {
        const {productId, quantity} = req.body;
        const userId = req.body.id;
        const message = CartItemsModel.add(productId, userId, quantity);
        return res.status(201).json({msg:message});
    }

    static getCartItems(req, res){
        const userId = req.body.id;
        const cartItem = CartItemsModel.get(userId);
        return res.status(200).send(cartItem);
    }

    static updateCart(req, res){
        const userId = req.body.id;
        const {productId, quantity} = req.query;
        const result = CartItemsModel.update(userId, productId, quantity);
        res.status(200).json({msg: result});

    }

    static deleteCart(req, res){
        const userId = req.body.id;
        const cartId = req.params.id;
        const result = CartItemsModel.delete(cartId, userId);
        return res.status(200).send({msg: result});

    }
}