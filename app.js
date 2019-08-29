var express=require('express')
const path=require("path")
var mongoose=require("mongoose")
var bodyparser=require("body-parser")
var url="mongodb://127.0.0.1:27017/library"
var user=require("./model/user")

var app=express();



app.use(bodyparser.urlencoded({extended:true}))
var bookrouter=require('./routes/bookrouter')
var authorrouter=require('./routes/authorrouter')

app.get("/",function(req,res){
    res.render("login")
})
var log=require("./model/user")

    

app.post("/login",function(req,res){
    var p=req.body.uname
    var s=req.body.pwd
    user.find({name:p,email:s},function(err,result){
if(result.length==0){
    res.redirect("/")
}
else{
    res.redirect("/index")
}
    })
         
        
        
    
    })
app.get("/index",function(req,res){
 res.render("index",{pagetitle:"Library",nav:[{link:"/books",title:"books"},{link:"/authors",title:"authors"},{link:"/newbook",title:"newbook"}]})  
})

app.post("/register",function(req,res){
var u=new user();
u.name=req.body.name;
u.email=req.body.email;
u.phonenumber=req.body.phonenumber;
u.role=req.body.role;
u.save(function(err){
    if(err) throw err
    else{
        res.redirect("/")
    }
})
console.log()
})
app.get("/reg",function(req,res){
    res.render("reg")
})
app.get("/newbook",function(req,res){
    res.render("newbook")
})

app.use("/books",bookrouter)
app.use("/authors",authorrouter)
app.use(express.static(path.join(__dirname,"/public")))
app.set("view engine","ejs")
app.set("views","./src/views")

app.listen(3000,function(req,res){
    console.log("started")
})