var express = require('express');
// var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var burgerController = require('./controllers/burgers_controller.js');
var burger = require('./models/burger.js');

var port = process.env.PORT || 3000;

var app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.get("/", function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

app.use("/api/burgers", burgerController);

app.listen(port, function(error){
	if(error){
		console.log("error connecting");
	}
});
