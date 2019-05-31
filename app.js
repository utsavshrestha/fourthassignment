const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path =require('path');

const multer = require('multer');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); 
require('./database/mongoose');
const User = require('./models/user');
const Item = require('./models/item');
app.use("/images",express.static("./images"));

// to upload the image


var storage = multer.diskStorage({         
    destination: "images",         
    filename: function (req, file, callback)          
    {          
        const ext = path.extname(file.originalname);          
        callback(null, "img" + Date.now() + ext);          
    } })

var upload = multer({ storage: storage });


app.post('/imageupload',upload.single('item'),(req,res)=>{ //item is name of the input
    res.json(req.file);
    console.log("Image uploaded successfully");
})

// to register user
app.post("/adduser", (req, res) => 
{     
    var myData = new User(req.body);  
    console.log(req.body);   
    myData.save().then(function(){         
        res.send('User Registered Successfully');         
    })
    .catch(function(e){             
        res.send(e)         
    }); 
})    

//to add  items
app.post("/additems",(req,res) => {
    var myItem = new Item(req.body);
    console.log(req.body);
    myItem.save().then(function(){
        res.send("Item added Successfully");
    })
    .catch(function(e){
        res.send(e)
    })
})

app.get("/showItems",(req,res)=>{
    Item.find()
    .then(function(item){
        res.send(item)
    })
    .catch(function(e){
        res.send(e)
    })
})

app.post("/getuser",(req,res)=>{
    var username =req.body.username;
    var password = req.body.password;
    User.find({username: username , password: password })
    .then(function(user)
    {
        var modelUser = JSON.stringify(user);
        console.log(modelUser);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(modelUser);
    })
    .catch(function(e)
    {
        res.send(e);

    });
})




app.listen(8888);
