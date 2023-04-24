import { Router } from "express";
const router = Router();
import userController from "../controllers/user.controller.js";


import {
  validateId,
  validateUser,
} from "../middlewares/global.middleware.js";

router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/:id", validateId, validateUser, userController.findById);
router.patch("/:id", validateId, validateUser, userController.update);

export default router;
