const path = require("path");

const express = require("express");
const csrf = require("csurf")
const expresSession = require("express-session")

const db = require("./data/database");
const authRoutes = require("./routes/auth.routes");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token")
const errorHandlerMiddleware = require("./middlewares/error-handler")
const createSessionConfig = require("./config/session")

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))

const sessionConfig = createSessionConfig()

app.use(expresSession(sessionConfig))

app.use(csrf())

app.use(addCsrfTokenMiddleware)

app.use(authRoutes);

app.use(errorHandlerMiddleware)

db.connectToDb()
  .then(() => {
    app.listen(3000, () => console.log("Server start at port: 3000."));
  })
  .catch((err) => {
    console.log("Failed to connect to the database.");
    console.log(err);
  });
