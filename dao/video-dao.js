"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "videos.json");

class VideoDao {
  constructor(storagePath) {
    this.videoStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
  }

  async createVideo(video) {
    let videolist = await this._loadAllVideos();
    let currentVideo = videolist.find(
        (item) => item.name === video.name
    );

    // Check if the name already exists in the database
    if (currentVideo) {
      throw `video with name ${video.name} already exists in db`;
    }

    // Generate a unique ID
    video.id = crypto.randomBytes(8).toString("hex");

  
    // Add the video to the list
    videolist.push(video);

    // Save the updated list to the storage
    await wf(this._getStorageLocation(), JSON.stringify(videolist, null, 2));

    // Return the created video
    return video;
}


  async getVideo(id) {
    let videolist = await this._loadAllVideos();
    const result = videolist.find((video) => video.id === id);
    return result;
  }

  async updateVideo(video) {
    let videolist = await this._loadAllVideos();
    const videoIndex = videolist.findIndex((b) => b.id === video.id);
    if (videoIndex < 0) {
      throw new Error(`Video with given id ${video.id} does not exists`);
    } else {
      videolist[videoIndex] = {
        ...videolist[videoIndex],
        ...video,
      };
    }
    await wf(this._getStorageLocation(), JSON.stringify(videolist, null, 2));
    return videolist[videoIndex];
  }

  async deleteVideo(id) {
    let videolist = await this._loadAllVideos();

    const videoIndex = videolist.findIndex((b) => b.id === id);

    if (videoIndex >= 0) {
      videolist.splice(videoIndex, 1);
    } else {
      console.log("Video not found, not deleting.");
    }
    await wf(this._getStorageLocation(), JSON.stringify(videolist, null, 2));
    return {};
  }
  

  async listVideos() {
    let videolist = await this._loadAllVideos();
    return videolist;
  }

  async _loadAllVideos() {
    let videolist;
    try {
      videolist = JSON.parse(await rf(this._getStorageLocation()));
    } catch (e) {
      if (e.code === "ENOENT") {
        console.info("No storage found, initializing new one...");
        videolist = [];
      } else {
        throw new Error(
            "Unable to read from storage. Wrong data format. " +
            this._getStorageLocation()
        );
      }
    }
    return videolist;
  }

  _getStorageLocation() {
    return this.videoStoragePath;
  }
}

module.exports = VideoDao;
