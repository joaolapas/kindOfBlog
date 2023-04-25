import { Router } from "express";
const router = Router();

import swagger from "swagger-ui-express";
import swaggerDoc from "../swagger.json";

router.use("/", swagger.serve);
router.get("/", swagger.setup(swaggerDoc));

export default router;
