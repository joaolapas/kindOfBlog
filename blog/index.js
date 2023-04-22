import express from "express";
const app = express();
import connectDatabase from "./src/database/db.js";

import userRoute from "./src/routes/user.route.js";
import dotenv from "dotenv";
dotenv.config();

const port = 3000;

connectDatabase();

app.use(express.json());
app.use("/user", userRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
