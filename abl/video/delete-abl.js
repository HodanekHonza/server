const path = require("path");
const VideoDao = require("../../dao/video-dao");
let dao = new VideoDao(
    path.join(__dirname, "..", "..", "storage", "videos.json")
);

async function DeleteAbl(req, res) {
    try {
        const videoId = req.params.id;
        await dao.deleteVideo(videoId);
        res.json({});
    } catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = DeleteAbl;
