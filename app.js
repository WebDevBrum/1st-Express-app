//think about this backwards , an express app recieves requests and sends responses back to the end user

const express = require("express");
const bodyParser = require("body-parser"); //parse incoming form data
const cookieParser = require("cookie-parser"); //parse cookie info

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app;

app.set("view engine", "pug");
app.use(cookieParser());

app.use((req, res, next) => {
  //req.message = "This message made it"; //.message could be any name
  console.log("hello");
  const err = new Error("on no!");
  next(err);
});

app.use((req, res, next) => {
  //console.log(req.message); //is passed message from above
  console.log("world");
  next();
});

app.get("/", (req, res) => {
  const name = req.cookies.username; //renders name as post response body username (after render)
  if (name) {
    //checks if cookie exists , if not redirects to /hello
    res.render("index", { name }); //view variable name assigned const name was {name: name } but key:value if same name in es6 can just use name as thaey are the same
  } else {
    res.redirect("/hello");
  }
});
// get appends to url, post sends data to the server to update a resource, can also define a response cookie
app.get("/cards", (req, res) => {
  res.render("card", {
    prompt: "Who is buried in Grants tomb?",
  });
});

app.get("/hello", (req, res) => {
  const name = req.cookies.username;
  if (name) {
    // like above, checks if cookie available
    res.redirect("/");
  } else {
    res.render("hello");
  }
}); //requests username from cookies

app.post("/hello", (req, res) => {
  //console.log(req.body);
  res.cookie("username", req.body.username); //adds cookie from request body name=username via a cookie response (cookie parser requires)
  res.redirect("/");
});

app.post("/goodbye", (req, res) => {
  res.clearCookie("username");
  res.redirect("/hello");
});

app.listen(3000, () => {
  console.log("The application is running on localhost:3000");
});
