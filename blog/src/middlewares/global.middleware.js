import mongoose from "mongoose";
import userService from "../services/user.service.js";

export const validateId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid ID" });
  }

  next();
};
export const validateUser = async (req, res, next) => {
  const id = req.params.id;

  const user = await userService.findById(id);

  if (!user) {
    return res.status(400).send({ message: "User doesn't exist!" });
  }

  req.id = id;
  req.user = user;

  next();
};

