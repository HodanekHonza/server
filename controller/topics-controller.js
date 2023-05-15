const express = require("express");
const router = express.Router();

const ListTopicAbl = require("../abl/topics/list-abl");



router.get("/list", async (req, res) => {
    await ListTopicAbl(req, res);
});

module.exports = router;
