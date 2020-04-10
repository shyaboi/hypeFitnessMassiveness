const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const route = require("./route/workout");
const apiroute = require("./route/api");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(apiroute);
app.use(route);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})