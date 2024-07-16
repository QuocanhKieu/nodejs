const express = require("express");
const { route } = require("./web.route");
const router = express.Router();
const controller = require("./../controller/classroom.controller")

router.get("/",controller.get);
router.get("/create",controller.create);
router.post("/create",controller.save);

module.exports = router;