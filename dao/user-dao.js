"use strict";
const fs = require("fs");
const path = require("path");

const DEFAULT_USER_STORAGE_PATH = path.join(__dirname, "storage", "users.json");

class UserDao {
  constructor(storagePath) {
    this.userStoragePath = storagePath ? storagePath : DEFAULT_USER_STORAGE_PATH;
    console.log("User storage path:", this.userStoragePath);

  }

  async createUser(name) {
    let userList = await this._loadAllUsers();
    let currentUser = userList.find((item) => item.name === name);

    if (currentUser) {
      throw `User with name ${name} already exists in the database`;
    }

    const newUser = {
      name: name,
      favoriteVideoIds: [],
    };

    userList.push(newUser);
    await this._saveUsers(userList);
    return newUser;
  }

  async getUser(name) {
    const userList = await this._loadAllUsers();
    return userList.find((user) => user.name.toLowerCase() === name.toLowerCase());
}


  async addFavoriteVideo(name, videoId) {
    const userList = await this._loadAllUsers();
    const userIndex = userList.findIndex((user) => user.name === name);

    if (userIndex < 0) {
      throw new Error(`User with name ${name} does not exist`);
    }

    const user = userList[userIndex];
    if (!user.favoriteVideoIds.includes(videoId)) {
      user.favoriteVideoIds.push(videoId);
      await this._saveUsers(userList);
    }

    return user;
  }

  async _loadAllUsers() {
    let userList;
    try {
      userList = JSON.parse(await fs.promises.readFile(this._getUserStorageLocation()));
    } catch (e) {
      if (e.code === "ENOENT") {
        console.info("No user storage found, initializing new one...");
        userList = [];
      } else {
        throw new Error(
          "Unable to read from user storage. Wrong data format. " +
            this._getUserStorageLocation()
        );
      }
    }
    return userList;
  }

  async _saveUsers(userList) {
    await fs.promises.writeFile(this._getUserStorageLocation(), JSON.stringify(userList, null, 2));
  }

  _getUserStorageLocation() {
    return this.userStoragePath;
  }
}

module.exports = UserDao;
