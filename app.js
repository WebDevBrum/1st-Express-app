const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app;

app.set("view engine", "pug");
app.use(cookieParser());
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/cards", (req, res) => {
  res.render("card", {
    prompt: "Who is buried in Grants tomb?",
  });
});

app.get("/hello", (req, res) => {
  res.render("hello", { name: req.cookies.username });
});

app.post("/hello", (req, res) => {
  //console.log(req.body);
  res.cookie("username", req.body.username);
  res.render("hello", { name: req.body.username });
});

app.listen(3000, () => {
  console.log("The application is running on localhost:3000");
});
