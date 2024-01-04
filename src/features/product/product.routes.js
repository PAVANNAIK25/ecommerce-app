import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";

// initialize express router

const productRouter = express.Router();

const productController = new ProductController();

productRouter.post("/rate", productController.rateProduct);
productRouter.get("/", productController.getAllProducts);
productRouter.post("/", upload.single("imageUrl"), productController.addProduct);
productRouter.get('/filter', productController.filterProduct);
productRouter.get("/:id", productController.getOneProduct);



export default productRouter;