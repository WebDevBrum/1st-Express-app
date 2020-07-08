const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const name = req.cookies.username; //renders name as post response body username (after render)
  if (name) {
    //checks if cookie exists , if not redirects to /hello
    res.render("index", { name }); //view variable name assigned const name was {name: name } but key:value if same name in es6 can just use name as thaey are the same
  } else {
    res.redirect("/hello");
  }
});
// get appends to url, post sends data to the server to update a resource, can also define a response cookie

router.get("/hello", (req, res) => {
  const name = req.cookies.username;
  if (name) {
    // like above, checks if cookie available
    res.redirect("/");
  } else {
    res.render("hello");
  }
}); //requests username from cookies

router.post("/hello", (req, res) => {
  //console.log(req.body);
  res.cookie("username", req.body.username); //adds cookie from request body name=username via a cookie response (cookie parser requires)
  res.redirect("/");
});

router.post("/goodbye", (req, res) => {
  res.clearCookie("username");
  res.redirect("/hello");
});

module.exports = router;
