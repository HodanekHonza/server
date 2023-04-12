const path = require("path");
const Ajv = require("ajv").default;
const VideoDao = require("../../dao/video-dao");
let dao = new VideoDao(
    path.join(__dirname, "..", "..", "storage", "videos.json")
);

let schema = {
    type: "object",
    properties: {
        id: { type: "string" },
    },
    required: ["id"],
};

async function GetAbl(req, res) {
    try {
        const ajv = new Ajv();
        const body = req.query.id ? req.query : req.body;
        const valid = ajv.validate(schema, body);
        if (valid) {
            const videoId = body.id;
            const video = await dao.getVideo(videoId);
            if (!video) {
                res
                    .status(400)
                    .send({ error: `Video with id '${videoId}' doesn't exist.` });
            }
            res.json(video);
        } else {
            res.status(400).send({
                errorMessage: "validation of input failed",
                params: body,
                reason: ajv.errors,
            });
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = GetAbl;
