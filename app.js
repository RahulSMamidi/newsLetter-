const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");
const https= require("https");

const app = express();
app.use(express.static ("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.listen(process.env.PORT||3000,function(req,res){

  console.log("server is running on port 3000");

});


app.get("/",function(req,res){

res.sendFile(__dirname+"/signup.html")


});

app.post("/",function(req,res){

  var firstName = req.body.fname;
    var lastName = req.body.lname;
      var email = req.body.email;

      var data = {
        members: [
          {
          email_address:email,
          status: "subscribed",
          merge_fields :{
            FNAME: firstName,
            LNAME: lastName,


          }

          }
        ]
      };


  var jsonData= JSON.stringify(data);

url="https://us10.api.mailchimp.com/3.0/lists/75b612a2f2";
 var options={

  method:"POST",
  auth: "rahul1:1d5c0b57f9bdd9863dce718459c5acc4-us10"

}
const request =https.request(url,options,function(response){

if(response.statusCode === 200){
  res.sendFile(__dirname+"/success.html");

}
else{
  res.sendFile(__dirname+"/failure.html");

}


response.on("data",function(data){
  console.log(JSON.parse(data));


});

});

request.write(jsonData);
request.end();
});

//API KEY
// 1d5c0b57f9bdd9863dce718459c5acc4-us10
//audience id -75b612a2f2
