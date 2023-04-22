import { Router } from "express";
import { create, findAll, findById, update } from "../controllers/post.crontrollers.js";

const route = Router();

route.post('/', create);
route.get('/', findAll);
route.get('/:id', findById);
route.patch('/:id', update);

export default route