//hello world from express server

const express = require('express');

const app = express();

//get request
app.get("/", function(request, response){
  response.send("<h1>Hello World!</h1>")
});

app.get("/contact", function(req, res){
  res.send("Contact me at: tylernguyen33325@gmail.com");
});

app.get("/about", function(req, res){
  res.send("I'm the coolest person! I can be a great programmer")
});

app.get("/hobbies", function(req, res){
  res.send("I love programming in my spare time!")
});

//listen to 3000 port
//this is request
app.listen(3000, function(){
  console.log("Server started on port 3000");
});
