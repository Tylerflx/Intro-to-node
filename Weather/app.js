const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

//body parser
app.use(bodyParser.urlencoded({extended: true}));
//get request
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
  });
//post request
app.post("/", function(req, res){
  //api
  const apiKey = "f62293bc6dd2d26d3a6437cafe7a2fda";
  const country = req.body.countryName;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+country+"&appid="+apiKey+"&units="+unit;
  //perform a get request using call back function
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data); //parse into JSON
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconImage = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      //send back the response we got
      res.write("<h1>The tempurature is: "+ temp + "C</h1>");
      res.write("<p>It is : " + description+ "</p>");
      res.write("<img src="+ iconImage + ">");
      res.send();
    });
  });
});


app.listen(3000, function(){
  console.log("Server is up and running on port 3000");
});
