
const express = require("express");
const cors = require("cors");

const videoRouter = require("./controller/video-controller");
const favoriteVideoRouter = require("./controller/favorite-video-controller");
const topicsRouter = require("./controller/topics-controller");
const { addAbortSignal } = require("stream");


const app = express();

const port = process.env.PORT || 8000;


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cors())


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/video", videoRouter);
app.use("/favoritevideo", favoriteVideoRouter);
app.use("/topics", topicsRouter);


app.get("/*", (req, res) => {
    res.send(`Unknown path: ${req.method} ${req.path}`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


