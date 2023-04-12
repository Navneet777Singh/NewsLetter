const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const { futimesSync } = require("fs")

const app = express()


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))


app.get("/", function(req, res){
   
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){

    const FirstName = req.body.fName
    const LastName = req.body.lName
    const email = req.body.email

    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : FirstName,
                    LNAME : LastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data)
    
    const url = "https://us21.api.mailchimp.com/3.0/lists/a957d7f905"

    const options = {
        method : "POST",
        auth : "nav1:72a987309475bdda53ca8fbaca61cc40-us21"
    }

   const request = https.request(url, options, function(response){
  

    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
    }
    else{
        res.sendFile(__dirname + "/failure.html")
    }
       
    })

    

    request.write(jsonData);
    request.end();
   
})

app.post("/failure.html", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on 3000...")
})



// api id : 4163afee6ef13e9c3662b5b646485ef4-us21 (Mailchimp API)
// list id: a957d7f905.
