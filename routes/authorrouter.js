var express=require('express');
const router=express.Router();
var mongoose=require("mongoose")
const path=require("path")
router.use(express.static(path.join(__dirname,"/public")))
var bodyparser=require("body-parser")
var url="mongodb://127.0.0.1:27017/library"
var auth=require("../model/authors")

router.use(bodyparser.urlencoded({extended:true}))
mongoose.connect(url,function(err){
    if(err) throw err
    else{
        console.log("database connected")
    }
})
var multer=require("multer")
var upload=multer({dest:"uploads/"})
var type=upload.single("file1")
router.get("/add",function(req,res){
    res.render("newbook")
})
router.post("/add" ,function(req,res){
    var u=new auth();
    u.btitle=req.body.bt;
    u.genre=req.body.ge;
    u.author=req.body.au;
    u.image=req.body.file1;
    u.save(function(err){
        if(err) throw err
        else{
            res.redirect("/")
        }
    })
    console.log()
    })
router.get("/",function(req,res){
    auth.find({},function(req,result){
       
    
    res.render("authors",{pagetitle:"Library",nav:[{link:"/books",title:"books"},{link:"/authors",title:"authors"}],authorr:result})  
    })
})
router.get("/:title",function(req,res){
    auth.findOne({},function(req,result){
    
    var btitle=req.params.btitle
    res.render("singleauthor",{pagetitle:"Library",nav:[{link:"/books",title:"books"},{link:"/authors",title:"authors"}],authorr:result})  
    })
})
module.exports=router;