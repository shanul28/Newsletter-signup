const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

  var lastName = req.body.Lname;
  var firstName = req.body.Fname;
  var email = req.body.email;

  const data = {
    members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }


    ]
  };
  const jsonData = JSON.stringify(data);
  const options = {
    method: 'POST',
    auth: "Shanul:a91c9cccb99615a508a8afc1369a19d6-us1"
  }
  const url = "https://us1.api.mailchimp.com/3.0/lists/2e55d0194c"
  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      console.log(JSON.parse(data));

    })
    if(response.statusCode === 200 ){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
  })

  request.write(jsonData)
  request.end();


});

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function() {
  console.log("server running at port 3000");
})




// list id
// 2e55d0194c

// API key
// a91c9cccb99615a508a8afc1369a19d6-us1

// endpoint
// https://<dc>.api.mailchimp.com/3.0/
//
