import { Router } from "express";
import { create, findAll, topPost, findById, searchByTitle } from "../controllers/post.crontrollers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const route = Router();


route.post('/', authMiddleware, create);
route.get('/', findAll);
route.get('/top', topPost);
route.get('/search', searchByTitle);
route.get('/find/:id', authMiddleware, findById);

export default route