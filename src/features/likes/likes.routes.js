
import express from 'express';
import LikesController from './likes.controller.js';

const likesRouter = express.Router();

const likesController = new LikesController();

likesRouter.post('/', (req, res, next)=>{
    likesController.like(req, res, next);
})

likesRouter.get('/', (req, res, next)=>{
    likesController.getLikes(req, res, next);
})

export default likesRouter;