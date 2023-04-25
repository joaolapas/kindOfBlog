import { Router } from "express";
import {
  create,
  findAll,
  topPost,
  findById,
  byUser,
  searchByTitle,
  update,
  deletePost,
  likePost,
  addComment,
  removeComment
} from "../controllers/post.crontrollers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topPost);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, byUser);
router.get("/:id", authMiddleware, findById);
router.patch("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, deletePost);
router.patch("/like/:id", authMiddleware, likePost);
router.patch("/comments/:id", authMiddleware, addComment);
router.patch("/comments/:postId/:id", authMiddleware, removeComment);

export default router;
