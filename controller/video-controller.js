const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/video/create-abl");
const GetAbl = require("../abl/video/get-abl");
const UpdateAbl = require("../abl/video/update-abl");
const DeleteAbl = require("../abl/video/delete-abl");
const ListAbl = require("../abl/video/list-abl");

router.post("/create", async (req, res) => {
    await CreateAbl(req, res);
});

router.get("/get", async (req, res) => {
    await GetAbl(req, res);
});

router.post("/update", async (req, res) => {
    await UpdateAbl(req, res);
});

router.delete("/delete/:id", async (req, res) => {
    await DeleteAbl(req, res);
});

router.get("/list", async (req, res) => {
    await ListAbl(req, res);
});

module.exports = router;
