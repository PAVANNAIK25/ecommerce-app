import OrderRepository from "./order.repository.js";


export default class OrderController{
    constructor(){
        this.orderRepository = new OrderRepository();
    }

    async placeOrder(req, res){
        try{
            const userId = req.body.id;    
            await this.orderRepository.placeOrder(userId);
            res.send("Order Placed successfully!");

        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

}