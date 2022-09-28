const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
	const firstName = req.body.Fname;
	const lastName = req.body.Lname;
	const email = req.body.Email;
	
	const data = {
		members: [
			{
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

 const url = "https://us17.api.mailchimp.com/3.0/lists/1f40863203"

 const opt = {
 	method: "POST",
 	auth: "lyon:4dabf8bbb7e7ace31016897ff0e2c1e1-us17"
 }
		const request = https.request(url, opt, function(response){
		
		if(response.statusCode === 200) {
			res.sendFile(__dirname + "/success.html");
		} else {
			res.sendFile(__dirname + "/failure.html");
		}

		response.on("data", function(data){
			console.log(JSON.parse(data));
				});
	});

		request.write(jsonData);
		request.end();

});


app.post("/failure", function(req, res) {
	res.redirect("/");
});

app.post("/success", function(req, res) {
	res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
	console.log("Server is running on port 3000");
});
