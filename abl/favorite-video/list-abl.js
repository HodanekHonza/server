const path = require("path");
const UserDao = require("../../dao/user-dao");
const VideoDao = require("../../dao/video-dao");

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

async function ListAbl(req, res) {
  try {
    if (!userDao || !videoDao) {
      throw new Error("Failed to load user or video data");
    }

    const name = req.params.name;
    const user = await userDao.getUser(name);

    if (user) {
      const allVideos = await videoDao.listVideos();
      const favoriteVideos = allVideos.filter(video => user.favoriteVideoIds.includes(video.id));
      res.json(favoriteVideos);
    } else {
      res.status(404).send({ errorMessage: `User with name ${name} not found` });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = ListAbl;
