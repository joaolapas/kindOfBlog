const router = require("express").Router;

const swagger = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");

router.use("/", swagger.serve);
router.get("/", swagger.setup(swaggerDoc));

module.exports = router;
