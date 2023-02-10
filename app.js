//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const mongoose=require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://aditi_project0:todolist@cluster0.tj2bo8o.mongodb.net/todolistDB",{useNewUrlParser:true});

const itemSchema ={
  name:String
};

const Item=mongoose.model("Item",itemSchema);

const item1 = new Item ({
  name:"Welcome to your todo list!"

});

const defaultItems=[item1];


app.get("/", function(req, res) {

Item.find({},function(err,foundItems){
  if(foundItems.length===0){
    Item.insertMany(defaultItems,function(err){
      if(err){
       console.log(err);
        }
        else{
         console.log("Successfully saved default item to DB");
        } 
     });
     res.redirect("/");
  }
  else{
    res.render("list", {listTitle: "Today", newListItems: foundItems});
  }
 
});
  

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
const item=new Item({
  name:itemName
});
 
item.save();
res.redirect("/");
});
app.post("/delete",function(req,res){
 const checkedItemId=req.body.checkbox;
 Item.findByIdAndRemove(checkedItemId,function(err){
  if(err){
    console.log("Cannot delete the item");
      }
      else{
        console.log("Item deleted successfully.")
      }
      res.redirect("/");

 });
});
app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully.");
});
