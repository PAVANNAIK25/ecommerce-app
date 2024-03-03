import LikesRepository from "./likes.repository.js";


export default class LikesController{
    constructor(){
        this.likesRepository = new LikesRepository();
    }

    async getLikes(req, res, next){
        try{
            const {typeId, type} = req.query;

            const likes = await this.likesRepository.getLikes(typeId, type);
            res.status(200).send(likes);

        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async like(req, res, next){
        try{
            const {typeId, type} = req.body;
            const userId = req.body.id;
            if(type!='Products' && type != 'Category'){
                res.status(400).send("Invalid")
            }

            if(type == 'Products'){
                await this.likesRepository.likeProduct(userId, typeId); 
                return res.send("Product liked successfully");
            }else{
                await this.likesRepository.likeCategory(userId, typeId); 
                res.send("Category liked successfully");
            }
        

        }catch(err){
            console.log(err);
            next(err);
        }
    }
}