const path = require("path");
const Ajv = require("ajv").default;
const VideoDao = require("../../dao/video-dao");
let dao = new VideoDao(
    path.join(__dirname, "..", "..", "storage", "videos.json")
);

let schema = {
    type: "object",
    properties: {},
    required: [],
};



async function ListAbl(req, res) {
    try {
        const videos = await dao.listVideos();
        res.json(videos);
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = ListAbl;
