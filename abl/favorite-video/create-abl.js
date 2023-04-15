const path = require("path");
const UserDao = require("../../dao/user-dao");
const Ajv = require("ajv");

const ajv = new Ajv();
const createSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    videoId: { type: "string" },
  },
  required: ["name", "videoId"],
};

let userDao;


try {
  userDao = new UserDao(
    path.join(__dirname, "..", "..", "storage", "users.json")
  );
} catch (e) {
  console.error("Failed to load users.json:", e);
}


//here its diff
async function CreateAbl(req, res) {
  try {
    const valid = ajv.validate(createSchema, req.body);
    if (!valid) {
      res.status(400).send(ajv.errors);
      return;
    }

    const { name, videoId } = req.body;
    const user = await userDao.addFavoriteVideo(name, videoId);
    res.status(201).json(user);
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = CreateAbl;
