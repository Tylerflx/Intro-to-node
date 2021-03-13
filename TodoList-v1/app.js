const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//using templating EJS
app.set("view engine", "ejs");
//index.html
app.get("/", function(req, res) {

  var today = new Date();
  var currentDay = today.getDay();
  var day = "";
  if (currentDay === 6 || currentDay === 0){
    day = "Weekend";
    //render list page to send the variable to list.ejs
  }else{
    day = "Weekday";
  }
  res.render("list", {kindofDay: day});

});

app.listen("3000", function(){
  console.log("Listen on port 3000");
});
