import { Router } from "express";
import { create, findAll, topPost, findById, byUser, searchByTitle } from "../controllers/post.crontrollers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();


router.post('/', authMiddleware, create);
router.get('/', findAll);
router.get('/top', topPost);
router.get('/search', searchByTitle);
router.get('/byUser', authMiddleware, byUser);
router.get('/find/:id', authMiddleware, findById);

export default router