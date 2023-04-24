import { Router } from "express";
import { create, findAll, topPost, findById, update } from "../controllers/post.crontrollers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const route = Router();


route.post('/', authMiddleware, create);
route.get('/', findAll);
route.get('/top', topPost);
route.get('/:id', findById);
route.patch('/:id', update);

export default route