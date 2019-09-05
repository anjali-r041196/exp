var express=require('express')
const path=require("path")
var mongoose=require("mongoose")
var bodyparser=require("body-parser")
var url="mongodb+srv://anjalir:anjali@cluster0-vp9od.mongodb.net/library?retryWrites=true&w=majority/library"
var user=require("./model/user")

var app=express();



app.use(bodyparser.urlencoded({extended:true}))

var authorrouter=require('./routes/authorrouter')

app.get("/",function(req,res){
    res.render("login")
})
var log=require("./model/user")
var multer=require("multer")
var upload=multer({dest:"uploads/"})
var type=upload.single("file1")
    

app.post("/login",function(req,res){
    var p=req.body.uname
    var s=req.body.pwd
    user.find({name:p,password:s},function(err,result){
if(result.length==0){
    res.redirect("/")
}
else{
    res.redirect("/index")
}
    })
         
        
        
    
    })
app.get("/index",function(req,res){
 res.render("index",{pagetitle:"Library",nav:[{link:"/newbook",title:"newbook"},{link:"/authors",title:"books"},{link:"/newbook",title:"newbook"}]})  
})
app.get("/view/:id",function(req,res){
    res.sendFile(__dirname+"/uploads/"+req.params.id)
})


app.post("/register",function(req,res){
var u=new user();
u.name=req.body.name;
u.email=req.body.email;
u.phonenumber=req.body.phonenumber;
u.password=req.body.password
u.role=req.body.role;
u.save(function(err){
    
        res.redirect("/")
    
})
console.log()
})
app.get("/reg",function(req,res){
    res.render("reg")
})
app.get("/newbook",function(req,res){
    res.render("newbook")
})
mongoose.connect(url,function(err){
       
    console.log("database connected")

})

app.use("/authors",authorrouter)
app.use(express.static(path.join(__dirname,"/public")))
app.set("view engine","ejs")
app.set("views","./src/views")

app.listen(process.env.PORT || 3000,function(req,res){
    console.log("started")
})
