const express = require("express");
const bodyParser = require("body-parser")

const app = express();

//use to parse http request
app.use(bodyParser.urlencoded({extended: true}));


//This is HTTP request for Simple Calculator
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


//post request from root
app.post("/", function(req, res){
  //getting http post request back from the form
  //console.log(req.body.num1);
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var sum = num1 + num2;
  console.log(total);
  res.send("Thanks!");
});

//This is HTTP request for BMI calculator
app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname + "/bmicalculator.html");
});

app.post("/bmicalculator", function(req, res){
  var ht = parseFloat(req.body.height);
  var wgt = parseFloat(req.body.weight);
  var bmi = wgt / (ht * wgt);

  res.send("This is your bmi " + bmi);
});




app.listen(3000, function(){
  console.log("Listen on port 3000");
});
