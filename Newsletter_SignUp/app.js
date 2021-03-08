const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

//connect public static folder
app.use(express.static("public"));
//connect bodyParser
app.use(bodyParser.urlencoded({extended: true}));
//get request
app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html")
});
//post request form
app.post("/", function(req, res){
  const first = req.body.firstName;
  const last = req.body.lastName;
  const email = req.body.email;
  //data format
  var data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: first,
        LNAME: last
      }
    }
  ]
  }
  //convert js to string
  const jsonData = JSON.stringify(data);
  //endpoint api url
  const url = "https://{API-SERVER}.api.mailchimp.com/3.0/lists/{LIST-ID}";
  //info data
  const options = {
    method: "POST",
    auth:"{STRING-NAME}:{API-KEY}"
  };
  //make request
  const request = https.request(url, options, function(response){
    // if request == 200 send to success page
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  });
  request.write(jsonData);
  request.end();
});

//redirect to homepage
//success redirect
app.post("/success", function(req, res) {
  res.redirect("/");
})
//failure redirect
app.post("/failure", function(req, res) {
  res.redirect("/");
})

//dynamic port for heroku or 3000 locally
app.listen(process.env.PORT || 3000, function(){
  console.log("Running on port 3000");
})
