//načtení modulu express
const express = require("express");
const cors = require("cors");

const videoRouter = require("./controller/video-controller");
const favoriteVideoRouter = require("./controller/favorite-video-controller");
const { addAbortSignal } = require("stream");

//inicializace nového Express.js serveru
const app = express();
//definování portu, na kterém má aplikace běžet na localhostu
const port = process.env.PORT || 8000;

// Parsování body
app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors())

//jednoduchá definice routy s HTTP metodou GET, která pouze navrací text
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/video", videoRouter);
app.use("/favoritevideo", favoriteVideoRouter);


app.get("/*", (req, res) => {
    res.send(`Unknown path: ${req.method} ${req.path}`);
});

//nastavení portu, na kterém má běžet HTTP server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


