const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");
const tuitRoutes = require("./routes/tuit");
const followerRoutes = require("./routes/follower");
const likeRoutes = require("./routes/like");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRoutes);
app.use(tuitRoutes);
app.use(followerRoutes);
app.use(likeRoutes);

app.get("/", (req, res) => {
    res.send("Twitter Clon by Luis Caro");
});

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));


app.listen(port, () => console.log('Server listening on port', port));