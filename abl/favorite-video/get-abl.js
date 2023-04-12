const path = require("path");
const UserDao = require("../../dao/user-dao");
const VideoDao = require("../../dao/video-dao");
const Ajv = require("ajv");

const ajv = new Ajv();
const getSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    videoId: { type: "string" },
  },
  required: ["name", "videoId"],
};

let userDao;
let videoDao;

try {
  userDao = new UserDao(
    path.join(__dirname, "..", "..", "storage", "users.json")
  );
} catch (e) {
  console.error("Failed to load users.json:", e);
}

try {
  videoDao = new VideoDao(
    path.join(__dirname, "..", "..", "storage", "videos.json")
  );
} catch (e) {
  console.error("Failed to load videos.json:", e);
}

async function GetAbl(req, res) {
  try {
    const valid = ajv.validate(getSchema, req.query);
    if (!valid) {
      res.status(400).send(ajv.errors);
      return;
    }

    if (!userDao || !videoDao) {
      throw new Error("Failed to load user or video data");
    }

    const { name, videoId } = req.query;

    const user = await userDao.getUser(name);

    if (user && user.favoriteVideoIds.includes(videoId)) {
      const video = await videoDao.getVideo(videoId);
      res.json(video);
    } else {
      res.status(404).send({ errorMessage: `Video with ID ${videoId} not found for user ${name}` });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = GetAbl;
