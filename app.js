//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

var items = ["Buy Food","Cook food","Eat Food"]; 
var workitems=[];

const app = express();
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
let day = date.getDate();
  
 res.render("list",{ListTitle: day, newListItems: items });

});
app.post("/",function(req,res){
 let item = req.body.newitem;
 if(req.body.list == "Work List")
 {
  
  workitems.push(item);
  res.redirect("/work");
 }
 else{
  items.push(item);
  res.redirect("/");
 }
 
 
});

app.get("/work",function(req,res){
 res.render("list",{ListTitle: "Work List" , newListItems: workitems});
});

app.post("/work",function(req,res){
 let item = req.body.newitem;
 workitems.push(item);
 res.redirect("/work");

});
app.get("/about",function(req,res){
 res.render("about");

});

app.listen(3000,function(){
 console.log("Server 3000 is running");
});