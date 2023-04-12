const path = require("path");
const Ajv = require("ajv").default;
const FavoriteVideoDao = require("../../dao/user-dao");
const dao = new FavoriteVideoDao(
  path.join(__dirname, "..", "..", "storage", "favoritevideos.json")
);

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

async function deleteAbl(req, res) {
  try {
    if (!userDao || !videoDao) {
      throw new Error("Failed to load user or video data");
    }

    const name = req.params.name;
    const videoId = req.params.videoId;

    const user = await userDao.getUser(name);

    if (user && user.favoriteVideoIds.includes(videoId)) {
      const updatedUser = await userDao.removeFavoriteVideo(name, videoId);
      res.json(updatedUser);
    } else {
      res.status(404).send({ errorMessage: `Video with ID ${videoId} not found for user ${name}` });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}



module.exports = deleteAbl;
