import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";



export default class ProductController {
    constructor(){
        this.productRepository = new ProductRepository();
    }
    async getAllProducts(req, res, next) {
        try{
            const products = await this.productRepository.getAll();
            return res.status(200).send(products);
        }catch(err){
            next(err);
        }
    }

    async addProduct(req, res, next) {
        const { name, price, desc, categories, sizes } = req.body;
        const imageUrl = req.file.filename;
        const createdRecord = new ProductModel(name, desc, imageUrl, categories, price, sizes);
        try{
            const result = await this.productRepository.addProduct(createdRecord);
            res.status(201).send(result);
        }catch(err){
            next(err);
        }
    }

    async rateProduct(req, res, next) {
        try{
            const userId = req.body.id;
            const {productId, rating} = req.body;
            const ratedProduct = await this.productRepository.rateProduct(userId, productId, rating);
            res.status(201).send("Rating has been added");
        }catch(err){
            console.log(err);
            next(err);
        }
        
    }

    async getOneProduct(req, res, next) {
        const id = req.params.id;
        try{
            const product = await this.productRepository.get(id);
            if (!product) {
                res.status(404).send("Product not found");
            } else {
                res.status(200).send(product);
            }
        }catch(err){
            next(err);
        }
    }

    async filterProduct(req, res) {
        try{
            const {minPrice, maxPrice, category} = req.query;    
            const result = await this.productRepository.filter(minPrice, maxPrice, category);
            res.status(200).send(result);
        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }

    }

    async averagePrice(req, res){
        try{
        
            const result = await this.productRepository.averagePrice();

            res.send(result);

        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }
}