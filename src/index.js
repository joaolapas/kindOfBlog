import express from "express";
const app = express();
import connectDatabase from "./database/db.js";
import dotenv from "dotenv";

import userRoute from "./routes/user.router.js";
import authRoute from "./routes/auth.router.js";
import postRoute from "./routes/post.router.js";
import swaggerRoute from "./routes/swagger.router.js";

dotenv.config();

const port = process.env.PORT || 3000;

connectDatabase();

app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/post", postRoute);
app.use("/doc", swaggerRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
