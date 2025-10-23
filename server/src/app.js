
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const gifRoutes = require("./routes/gifRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/' , (req , res) => {
    res.send("🎉 GIF Hub backend is running!");
});


app.use("/api/gifs" , gifRoutes);
app.use("/api/users" , userRoutes);

module.exports = app;



