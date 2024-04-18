const path = require("path");

const express = require("express");

const db = require("./data/database");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use("/auth", authRoutes);

db.connectToDb()
  .then(() => {
    app.listen(3000, () => console.log("Server start at port: 3000."));
  })
  .catch((err) => {
    console.log("Failed to connect to the database.");
    console.log(err);
  });
