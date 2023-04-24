import express from "express";
const app = express();
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv";

import userRouter from "./src/routes/user.router.js";
import authRouter from "./src/routes/auth.router.js";
import postRouter from "./src/routes/post.router.js";

dotenv.config();

const port = process.env.PORT || 3000;

connectDatabase();

app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
