const path = require("path");
const Ajv = require("ajv").default;
const UserDao = require("../../dao/user-dao");
const userDao = new UserDao(
  path.join(__dirname, "..", "..", "storage", "users.json")
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
    const { name, videoId } = req.params;

    const user = await userDao.getUser(name);

    if (!user) {
      return res.status(404).json({ errorMessage: `User with name ${name} not found` });
    }

    if (!user.favoriteVideoIds.includes(videoId)) {
      return res.status(404).json({ errorMessage: `Video with ID ${videoId} not found for user ${name}` });
    }

    const updatedUser = await userDao.removeFavoriteVideo(name, videoId);
    res.json(updatedUser);
  } catch (e) {
    res.status(500).send(e);
  }
}


module.exports = deleteAbl;
