import express from 'express';
import OrderController from './order.controller.js';

const orderRoutes = express.Router();
const orderController = new OrderController();

orderRoutes.post("/", (req, res)=>{
    orderController.placeOrder(req, res);
})


export default orderRoutes;