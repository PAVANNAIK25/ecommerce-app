
import ProductModel from "../product/product.model.js";
import UserModel from "../user/user.model.js";

export default class CartItemsModel{

    constructor(productId, userId, quantity){
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this.id = cartItems.length+1;
    }

    static add(productId, userId, quantity){

        const product = ProductModel.get(productId);
        if (!product) {
            return "Product not found";
        }

        const cart = this.getByUserId(userId);

        if(!cart){
            const newItem = new CartItemsModel(productId, userId, quantity);
            cartItems.push(newItem);
            return "Cart updated successfully!"
        }else{
            if(cart.productId == productId){
                cart.quantity = quantity;
                return "Cart updated successfully!"
            }else{
                const newItem = new CartItemsModel(productId, userId, quantity);
                cartItems.push(newItem);
                return "Cart updated successfully!"
            }
        }
        
    }

    static getByUserId(userId){
        const cartItem = cartItems.find((item) => item.userId == userId);
        return cartItem;
    }

    static get(userId){
        const cartItem = cartItems.filter((item) => item.userId == userId);
        return cartItem;
    }

    static update(userId, productId, quantity){
        const product = ProductModel.get(productId);
        if (!product) {
            return "Product not found";
        }
        const cartItem = cartItems.find((item) => {
            return (item.productId == productId && userId == item.userId) 
        });
            
        cartItem.quantity = quantity;

        return "Cart updated succefully!";
    }

    static delete(cartId, userId){
        const cartItemIndex = cartItems.findIndex(item => item.id == cartId && item.userId==userId);
        if(cartItemIndex < 0){
            return "cart not found!";
        }

        cartItems.splice(cartItemIndex,1);
        return "Cart deleted successfully!";
    }

}

let cartItems = [{
    productId: 1,
    userId: 2,
    quantity: 2,
    id: 1
}, {
    productId: 2,
    userId: 2,
    quantity: 3,
    id:2
}]