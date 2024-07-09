const express = require("express");
const router = express.Router();

const web_controller = require("../controller/web.controller");
router.get("/", web_controller.student_get);

module.exports = router;
