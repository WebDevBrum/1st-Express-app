//think about this backwards , an express app recieves requests and sends responses back to the end user

const express = require("express");
const bodyParser = require("body-parser"); //parse incoming form data
const cookieParser = require("cookie-parser"); //parse cookie info

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app;

app.set("view engine", "pug");
app.use(cookieParser());
app.use("/static", express.static("public"));

const mainRoutes = require("./routes"); //node auto chooses index file
const cardRoutes = require("./routes/cards");

app.use(mainRoutes); // calls the routes module
app.use("/cards", cardRoutes); //used for flashcard routes, using cardroutes variable

app.use((req, res, next) => {
  //req.message = "This message made it"; //.message could be any name
  console.log("hello");
  //const err = new Error("on no!");
  //err.status = 500;
  next(); //err also taken out of next
});

app.use((req, res, next) => {
  //console.log(req.message); //is passed message from above
  console.log("world");
  next();
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//app.use((err, req, res, next) => {
//induced error
//res.locals.error = err;
//res.status(err.status);
//res.render("error");
//});

app.listen(3000, () => {
  console.log("The application is running on localhost:3000");
});
