const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const favicon = require("express-favicon");
// routes
const usersRouter = require("./routes/users-routes");
const restaurantRouter = require("./routes/restaurant-routes");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "../build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });
// app.use(favicon(__dirname + "../public/favicon.ico"));

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB databse connection estabilished succesfully");
});

app.listen(port, () => {
  console.log(`Sever is running on port ${port}`);
});

app.use("/users", usersRouter);
app.use("/restaurants", restaurantRouter);
