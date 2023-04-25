import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).send({ message: "Unauthorized!" });
    }

    const parts = authorization.split(" ");
    const [schema, token] = parts;

    if (parts.length !== 2) {
      res.status(401).send({ message: "Unauthorized!" });
    }
    if (schema !== "Bearer") {
      res.status(401).send({ message: "Unauthorized!" });
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send(error);
      }
      const user = await userService.findById(decoded.id);

      if (!user || !user._id) {
        res.status(401).send("invalid user");
      }

      req.userId = user._id;
      return next();
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
