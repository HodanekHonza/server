const path = require("path");
const TopicDao = require("../../dao/topics-dao");

let topicDao;

try {
  topicDao = new TopicDao(
    path.join(__dirname, "..", "..", "storage", "topics.json")
  );
} catch (e) {
  console.error("Failed to load topics.json:", e);
}

async function ListAbl(req, res) {
  try {
    if (!topicDao) {
      throw new Error("Failed to load topic data");
    }

    const allTopics = await topicDao.listTopics();
    res.json(allTopics);
  } catch (e) {
    res.status(500).send({ errorMessage: e.message });
  }
}

module.exports = ListAbl;
