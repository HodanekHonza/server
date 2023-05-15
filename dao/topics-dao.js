"use strict";
const fs = require("fs");
const path = require("path");

const DEFAULT_TOPIC_STORAGE_PATH = path.join(__dirname, "storage", "topics.json");

class TopicDao {
  constructor(storagePath) {
    this.topicStoragePath = storagePath ? storagePath : DEFAULT_TOPIC_STORAGE_PATH;
    console.log("Topic storage path:", this.topicStoragePath);
  }

  async listTopics() {
    let topicsList = await this._loadAllTopics();
    return topicsList;
  }

  async _loadAllTopics() {
    let topicsList;
    try {
      topicsList = JSON.parse(await fs.promises.readFile(this._getTopicStorageLocation()));
    } catch (e) {
      if (e.code === "ENOENT") {
        console.info("No topic storage found, initializing new one...");
        topicsList = [];
      } else {
        throw new Error(
          "Unable to read from topic storage. Wrong data format. " +
            this._getTopicStorageLocation()
        );
      }
    }
    return topicsList;
  }

  async _saveTopics(topicsList) {
    await fs.promises.writeFile(this._getTopicStorageLocation(), JSON.stringify(topicsList, null, 2));
  }

  _getTopicStorageLocation() {
    return this.topicStoragePath;
  }
}

module.exports = TopicDao;
