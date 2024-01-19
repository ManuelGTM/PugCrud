const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const router = require("./router/router.js");
const morgan = require("morgan");

const publicPath = __dirname.replace("app", "public");

app.set("PORT", process.env.PORT | 3000);
app.set("view engine", "pug");
app.set("views", `${publicPath}/templates`);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(flash());
app.use("/", router);

module.exports = app;
