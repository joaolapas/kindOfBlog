import { Router } from "express";
const route = Router();
import userController from "../controllers/user.controller.js";


import {
  validateId,
  validateUser,
} from "../middlewares/global.middleware.js";

route.post("/", userController.create);
route.get("/", userController.findAll);
route.get("/:id", validateId, validateUser, userController.findById);
route.patch("/:id", validateId, validateUser, userController.update);

export default route;
