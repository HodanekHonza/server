const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/favorite-video/create-abl");
const GetAbl = require("../abl/favorite-video/get-abl");
const UpdateAbl = require("../abl/favorite-video/update-abl");
const DeleteAbl = require("../abl/favorite-video/delete-abl");
const ListAbl = require("../abl/favorite-video/list-abl");

router.post("/create", async (req, res) => {
    await CreateAbl(req, res);
});

router.get("/get", async (req, res) => {
    await GetAbl(req, res);
});

router.post("/update", async (req, res) => {
    await UpdateAbl(req, res);
});

router.delete("/delete/:name/:videoId", async (req, res) => {
    console.log("DELETE favorite video route called");
    await DeleteAbl(req, res);
});


router.get("/list/:name", async (req, res) => {
    await ListAbl(req, res);
});


module.exports = router;
